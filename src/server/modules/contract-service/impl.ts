import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { type ContractServiceType } from "@/server/modules/contract-service/interface";
import {
  createContract,
  getContract,
  updateContract,
} from "@/server/modules/contract-service/utils";
import { ContractUser } from "@/containers/contract/utils";
import { FileStorageService } from "@/server/modules/file-storage-service/impl";
import { EmailService } from "@/server/modules/email-service/impl";
import ContractSigned from "@/emails/ContractSigned";
import { EventService } from "@/server/modules/event-service/impl";
import { PdfService } from "@/server/modules/pdf-service/impl";

export const save: ContractServiceType["save"] = async (args) => {
  const { contract, user } = args;

  if (!user.id) {
    throw new Error("User does not exist");
  }

  if (Boolean(contract.id)) {
    try {
      const updatedContract = await updateContract({
        contract,
        status: "DRAFT",
      });

      return updatedContract;
    } catch (error) {
      throw error;
    }
  } else {
    try {
      return await createContract({
        contract,
        status: "DRAFT",
        user: {
          id: user.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
};

export const create: ContractServiceType["create"] = async (args) => {
  const { contract, user } = args;

  if (!user.id) {
    throw new Error("User does not exist");
  }

  let newContract;

  if (Boolean(contract.id)) {
    newContract = await updateContract({
      contract,
      status: "PENDING",
    });
  } else {
    newContract = await createContract({
      contract,
      status: "PENDING",
      user: {
        id: user.id,
      },
    });
  }

  if (!newContract) {
    throw new Error("Contract not created");
  }

  EventService.Emitter.emit("CONTRACT_CREATED", {
    user,
    contract: newContract,
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

  const pdfName = `${contract.name}-signed`;

  // Send pdf over to supabase to be saved
  try {
    const { pdfPath: supabaseFilePath } = await PdfService.generatePdf({
      html: contractContent,
      pdfName,
      user: {
        id: userId,
      },
    });

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

// We need function to handle email sending after contract has been sent, because vercel serverless
// functions time out after 10s, and we can't avoid that right now
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

    return "Contract sent to all parties successfully";
  };

const markContractAsOpened: ContractServiceType["markContractAsOpened"] =
  async ({ contractId, userId, recipientId }) => {
    const existingActivity = await prisma.activity.findFirst({
      where: {
        action: "CONTRACT_OPENED",
        contractId,
        recipientId,
      },
    });

    if (Boolean(existingActivity)) return null;

    return await prisma.activity.create({
      data: {
        action: "CONTRACT_OPENED",
        contractId,
        userId,
        recipientId,
      },
    });
  };

const stats: ContractServiceType["stats"] = async ({ userId }) => {
  const countQueries = [
    prisma.contract.count({
      where: {
        userId,
      },
    }),
    prisma.contract.count({
      where: {
        status: "SIGNED",
        userId,
      },
    }),
    prisma.contract.count({
      where: {
        status: "PENDING",
        userId,
      },
    }),
  ];

  try {
    const results = await Promise.all(countQueries);

    if (results.length === 0) {
      throw new Error("data not available");
    }

    const [total, signed, pending] = results;

    return {
      total: total || 0,
      signed: signed || 0,
      pending: pending || 0,
    };
  } catch (error) {
    return {
      total: 0,
      signed: 0,
      pending: 0,
    };
  }
};

const list: ContractServiceType["list"] = async ({ userId }) => {
  return await prisma.contract.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
    },
  });
};

export const update: ContractServiceType["update"] = async (args) => {
  const { contract, user } = args;

  if (!user.id) {
    throw new Error("User does not exist");
  }

  const contractData = await prisma.contract.findUnique({
    where: {
      id: contract.id,
    },
    select: {
      status: true,
    },
  });

  if (contractData?.status === "SIGNED") {
    throw new Error("Contract has already been signed");
  }

  const updatedContract = await prisma.contract.update({
    where: {
      id: contract.id,
    },
    data: {
      name: contract.contractName,
      content: contract.contractContent,
    },
    include: {
      recipients: true,
    },
  });

  if (!updatedContract) {
    throw new Error("Contract not updated successfully");
  }

  EventService.Emitter.emit("CONTRACT_UPDATED", {
    user,
    contract: updatedContract,
  });

  return updatedContract;
};

export const ContractService: ContractServiceType = {
  create,
  signContract,
  sendContractSignedEmail,
  markContractAsOpened,
  stats,
  list,
  update,
  save,
};
