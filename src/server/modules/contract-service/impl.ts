import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { type ContractServiceType } from "@/server/modules/contract-service/interface";
import { PdfService } from "@/server/modules/pdf-service/impl";
import {
  getContract,
  sendNewContractEmailsToSigners,
} from "@/server/modules/contract-service/utils";
import axios from "axios";
import { ContractUser } from "@/containers/contract/utils";
import { FileStorageService } from "@/server/modules/file-storage-service/impl";
import { EmailService } from "@/server/modules/email-service/impl";
import ContractSigned from "@/emails/ContractSigned";
import { EventService } from "@/server/modules/event-service/impl";

export const create: ContractServiceType["create"] = async (args) => {
  const { contract, user } = args;

  if (!user.id) {
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
      userId: user.id,
    },
    include: {
      recipients: true,
    },
  });

  if (!newContract) {
    throw new Error("Contract not created successfully");
  }

  EventService.Emitter.emit("CONTRACT_CREATED", {
    userId: user.id,
    contractId: newContract.id,
  });

  await sendNewContractEmailsToSigners({
    contract: newContract,
    user: args.user,
  });

  return newContract;
};

export const signContract: ContractServiceType["signContract"] = async ({
  contractContent,
  contractId,
  userId,
  recipientId,
}) => {
  const contract = await getContract({
    contractId,
  });

  const pdfName = `${contract.name} signed`;

  // Generate signed pdf
  const { url: generatedPdfUrl } = await PdfService.generatePdf({
    html: contractContent,
  });

  // Send pdf over to supabase to be saved
  try {
    const response = await axios.post(`${env.APP_URL}/api/contracts/upload`, {
      filePath: generatedPdfUrl,
      pdfName,
      userId,
    });

    const { data: supabaseFilePath } = response.data as {
      data: string;
    };

    await prisma.$transaction(async (tx) => {
      try {
        await tx.contractDocument.create({
          data: {
            storageId: supabaseFilePath,
            contractId,
            userId,
          },
        });

        await tx.contract.update({
          where: {
            id: contractId,
          },
          data: {
            status: "SIGNED",
          },
        });
      } catch (error) {
        console.log("transaction failed");
        throw error;
      }
    });

    EventService.Emitter.emit("CONTRACT_SIGNED", {
      userId: contract.user.id,
      contractId: contractId,
      recipientId,
    });
  } catch (error) {
    console.log(error);

    throw new Error("Couldn't proceed with upload, sorry");
  }
};

export const markContractAsOpened: ContractServiceType["markContractAsOpened"] =
  async ({ contractId, userId, recipientId }) => {
    const existingActivity = await prisma.activity.findFirst({
      where: {
        action: "CONTRACT_OPENED",
        contractId,
        recipientId,
      },
    });

    if (!existingActivity) return;

    await prisma.activity.create({
      data: {
        action: "CONTRACT_OPENED",
        contractId,
        userId,
        recipientId,
      },
    });
  };

// We function to handle email sending after contract has been sent, because vercel functions times out after 10s, and we can't avoid that right now
const sendContractSignedEmail: ContractServiceType["sendContractSignedEmail"] =
  async ({ contractId, recipientId }) => {
    const contract = await getContract({
      contractId,
    });

    if (!contract) {
      throw new Error("Contract does not exist");
    }

    const recipient = ContractUser({
      recipients: contract.recipients,
      userId: recipientId,
    });

    if (!recipient) {
      throw new Error("Recipient does not exist");
    }

    const contractDocument = await prisma.contractDocument.findFirst({
      where: {
        contractId,
      },
      select: {
        storageId: true,
      },
    });

    if (!contractDocument) {
      throw new Error("Contract document does not exist");
    }

    const file = await FileStorageService.download({
      bucket: env.SUPABASE_CONTRACTS_BUCKET,
      path: contractDocument.storageId,
    });

    const fileToArrayBuffer = await file.blob.arrayBuffer();
    const attachmentBuffer = Buffer.from(fileToArrayBuffer);

    try {
      await Promise.all([
        // send to user
        EmailService.send({
          to: contract.user.email || "",
          subject: `${recipient.name} has signed the contract`,
          content: ContractSigned({
            contractName: contract.name,
          }),
          attachments: [
            {
              filename: contractDocument.storageId + ".pdf",
              content: attachmentBuffer,
            },
          ],
        }),

        // send to recipient
        EmailService.send({
          to: recipient.email || "",
          subject: `${contract.name} signed successfully`,
          content: ContractSigned({
            contractName: contract.name,
          }),
          attachments: [
            {
              filename: contractDocument.storageId + ".pdf",
              content: attachmentBuffer,
            },
          ],
        }),
      ]);
    } catch (error) {
      throw new Error("Couldn't send email");
    }

    await prisma.contract.update({
      where: {
        id: contractId,
      },
      data: {
        emailSent: true,
      },
    });
  };

export const ContractService: ContractServiceType = {
  create,
  signContract,
  sendContractSignedEmail,
  markContractAsOpened,
};
