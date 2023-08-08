/* eslint-disable @typescript-eslint/no-misused-promises */
import Contract from "@/emails/contract";
import { env } from "@/env.mjs";
import { routes } from "@/routes";
import { prisma } from "@/server/db";
import { type ContractServiceType } from "@/server/modules/contract-service/interface";
import { transporter } from "@/server/modules/email-service/impl";
import {
  type Contract as PrismaContract,
  type ContractRecipient,
} from "@prisma/client";
import { render } from "@react-email/render";
import { TokenService } from "@/server/modules/token-service/impl";
import { PdfService } from "@/server/modules/pdf-service/impl";
import { ContractUser } from "@/containers/contract/utils";
import { FileStorageService } from "../file-storage-service/impl";

const sendContractEmailsToSigners = ({
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
        Contract({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

export const create: ContractServiceType["create"] = async (args) => {
  const { contract } = args;

  if (!args.user.id) {
    throw new Error("User does not exist");
  }

  const newContract = await prisma.contract.create({
    data: {
      name: contract.contractName,
      content: contract.contractContent,
      status: "PENDING",
      recipients: {
        createMany: {
          data: [...contract.signers],
        },
      },
      userId: args.user.id,
    },
    include: {
      recipients: true,
    },
  });

  if (!contract) {
    console.error("Contract not created successfully");
    return null;
  }

  sendContractEmailsToSigners({
    contract: newContract,
    user: args.user,
  });

  return newContract;
};

const sendContractSignedEmail = async ({
  contractId,
  recipientId,
  storageId,
}: {
  contractId: string;
  recipientId: string;
  storageId: string;
}) => {
  const contract = await prisma.contract.findUnique({
    where: {
      id: contractId,
    },
    include: {
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
    transporter.sendMail({
      from: env.CONTACT_EMAIL,
      to: contract.user.email || "",
      subject: `${recipient?.name} has signed the contract`,
      text: "Contract signed successfully",
      attachments: [
        {
          filename: storageId,
          content: Buffer.from(fileToArrayBuffer),
          contentType: "application/pdf",
        },
      ],
    }),

    // send to recipient
    transporter.sendMail({
      from: env.CONTACT_EMAIL,
      to: recipient?.email,
      subject: `${contract.name} signed successfully`,
      text: "Contract signed successfully",
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

export const signContract: ContractServiceType["signContract"] = async ({
  contractContent,
  contractId,
  recipientId,
  userId,
}) => {
  // get our pdf from pdfService - html
  const generatedPdfFilePath = await PdfService.generatePdf({
    html: contractContent,
  });

  if (!generatedPdfFilePath) {
    console.error(
      "Contract pdf could not be generated, please try again later"
    );

    return;
  }

  // send pdf over to supabase to be saved
  const response = await fetch("/api/contracts/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filePath: generatedPdfFilePath }),
  });

  const data = (await response.json()) as {
    path: string;
  };

  // save pdf data to db
  await prisma.contractDocument.create({
    data: {
      storageId: data.path,
      contractId,
      userId,
    },
  });

  // send email
  await sendContractSignedEmail({
    contractId,
    recipientId,
    storageId: data.path,
  });
};

export const ContractService: ContractServiceType = {
  create,
  signContract,
};
