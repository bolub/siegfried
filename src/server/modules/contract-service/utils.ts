import ContractRequest from "@/emails/ContractRequest";
import { env } from "@/env.mjs";
import { routes } from "@/routes";
import { prisma } from "@/server/db";
import { EmailService } from "@/server/modules/email-service/impl";
import {
  type Contract as PrismaContract,
  type ContractRecipient,
  type User,
} from "@prisma/client";
import { TokenService } from "@/server/modules/token-service/impl";
import { ContractUser } from "@/containers/contract/utils";
import { FileStorageService } from "@/server/modules/file-storage-service/impl";
import ContractSigned from "@/emails/ContractSigned";
import ContractUpdated from "@/emails/ContractUpdated";
import { type ContractSignerForDraft } from "@/server/modules/contract-service/interface";

export const getContract = async ({ contractId }: { contractId: string }) => {
  const contract = await prisma.contract.findUnique({
    where: {
      id: contractId,
    },
    select: {
      name: true,
      recipients: true,
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });

  if (!contract) {
    throw new Error("Contract does not exist");
  }

  if (!contract.recipients) {
    throw new Error("Contract does not have any recipients");
  }

  return contract;
};

export const sendNewContractEmailsToSigners = async ({
  contract,
  user,
}: {
  contract: PrismaContract & {
    recipients: ContractRecipient[];
  };
  user: {
    name?: string | null;
  };
}) => {
  const token = TokenService.generateToken({
    contractId: contract.id,
  });

  contract.recipients.forEach(async (signer) => {
    await EmailService.send({
      to: signer.email,
      subject: `Request to sign ${contract.name} from ${user.name}`,
      content: ContractRequest({
        contractName: contract.name,
        contractUrl: `${env.APP_URL}${routes.contracts.publicView(
          contract.id
        )}?token=${token}&user=${signer.id}`,
        user: {
          name: user.name ?? "",
        },
      }),
    });
  });
};

export const sendContractUpdatedEmail = async ({
  contract,
  user,
}: {
  contract: PrismaContract & {
    recipients: ContractRecipient[];
  };
  user: {
    name?: string | null;
  };
}) => {
  const token = TokenService.generateToken({
    contractId: contract.id,
  });

  contract.recipients.forEach(async (signer) => {
    await EmailService.send({
      to: signer.email,
      subject: `${contract.name} from ${user.name} has new updates`,
      content: ContractUpdated({
        contractName: contract.name,
        contractUrl: `${env.APP_URL}${routes.contracts.publicView(
          contract.id
        )}?token=${token}&user=${signer.id}`,
      }),
    });
  });
};

export const sendContractSignedEmail = async ({
  contract,
  recipientId,
  storageId,
}: {
  contract: Pick<PrismaContract, "name"> & {
    user: User;
    recipients: ContractRecipient[];
  };
  recipientId: string;
  storageId: string;
}) => {
  const recipient = ContractUser({
    recipients: contract.recipients,
    userId: recipientId,
  });

  const file = await FileStorageService.download({
    bucket: env.SUPABASE_CONTRACTS_BUCKET,
    path: storageId,
  });

  const fileToArrayBuffer = await file.blob.arrayBuffer();
  const attachmentBuffer = Buffer.from(fileToArrayBuffer);

  try {
    await Promise.all([
      // send to user
      // transporter.sendMail({
      //   from: env.CONTACT_EMAIL,
      //   to: contract.user.email || "",
      //   subject: `${recipient?.name} has signed the contract`,
      //   text: "Contract signed successfully",
      //   attachments: [
      //     {
      //       filename: storageId,
      //       content: Buffer.from(fileToArrayBuffer),
      //       contentType: "application/pdf",
      //     },
      //   ],
      // }),

      // send to recipient
      EmailService.send({
        to: recipient?.email || "",
        subject: `${contract.name} signed successfully`,
        content: ContractSigned({
          contractName: contract.name,
        }),
        attachments: [
          {
            filename: storageId + ".pdf",
            content: attachmentBuffer,
          },
        ],
      }),
    ]);
  } catch (error) {
    throw new Error("Couldn't send email");
  }
};

export const updateContract = async ({
  contract,
  status = "PENDING",
}: {
  contract: {
    id?: string;
    contractName: string;
    contractContent: string;
    signers: ContractSignerForDraft[];
  };
  status?: "PENDING" | "DRAFT";
}) => {
  return await prisma.contract.update({
    where: {
      id: contract.id,
    },
    data: {
      status,
      name: contract.contractName,
      content: contract.contractContent,
      recipients: {
        upsert: contract.signers.map((recipient) => ({
          where: { id: recipient.id },
          create: recipient,
          update: recipient,
        })),
      },
    },
    include: {
      recipients: true,
    },
  });
};

export const createContract = async ({
  contract,
  user,
  status = "PENDING",
}: {
  contract: {
    id?: string;
    contractName: string;
    contractContent: string;
    signers: ContractSignerForDraft[];
  };
  user: {
    id: string;
  };
  status?: "PENDING" | "DRAFT";
}) => {
  for (const signer of contract.signers) {
    delete signer.id;
  }

  return await prisma.contract.create({
    data: {
      name: contract.contractName,
      content: contract.contractContent,
      status,
      recipients: {
        createMany: {
          data: [...contract.signers],
        },
      },
      userId: user.id,
    },
    include: {
      recipients: true,
    },
  });
};
