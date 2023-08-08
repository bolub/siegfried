import ContractRequest from "@/emails/ContractRequest";
import { env } from "@/env.mjs";
import { routes } from "@/routes";
import { prisma } from "@/server/db";
import { transporter } from "@/server/modules/email-service/impl";
import {
  type Contract as PrismaContract,
  type ContractRecipient,
  type User,
} from "@prisma/client";
import { render } from "@react-email/render";
import { TokenService } from "@/server/modules/token-service/impl";
import { ContractUser } from "@/containers/contract/utils";
import { FileStorageService } from "@/server/modules/file-storage-service/impl";
import ContractSigned from "@/emails/ContractSigned";

export const getContract = async ({ contractId }: { contractId: string }) => {
  const contract = await prisma.contract.findUnique({
    where: {
      id: contractId,
    },
    select: {
      name: true,
      user: true,
      recipients: true,
    },
  });

  if (!contract) {
    throw new Error("Contract does not exist");
  }

  if (!contract.user) {
    throw new Error("User does not exist");
  }

  if (!contract.recipients) {
    throw new Error("Contract does not have any recipients");
  }

  return contract;
};

export const sendContractEmailsToSigners = ({
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
    await transporter.sendMail({
      from: env.CONTACT_EMAIL,
      to: signer.email,
      subject: `Request to sign ${contract.name} from ${user.name}`,
      html: render(
        ContractRequest({
          contractName: contract.name,
          contractUrl: `${env.NEXTAUTH_URL}${routes.contracts.view(
            contract.id
          )}?token=${token}&user=${signer.id}`,
          user: {
            name: user.name ?? "",
          },
        })
      ),
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
    transporter.sendMail({
      from: env.CONTACT_EMAIL,
      to: recipient?.email,
      subject: `${contract.name} signed successfully`,
      html: render(
        ContractSigned({
          contractName: contract.name,
        })
      ),
      attachments: [
        {
          filename: storageId,
          content: Buffer.from(fileToArrayBuffer),
          contentType: "application/pdf",
        },
      ],
    }),
  ]);
};