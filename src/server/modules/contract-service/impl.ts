import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { type ContractServiceType } from "@/server/modules/contract-service/interface";
import { PdfService } from "@/server/modules/pdf-service/impl";
import {
  getContract,
  sendNewContractEmailsToSigners,
  sendContractSignedEmail,
} from "@/server/modules/contract-service/utils";
import axios from "axios";

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

  if (!contract) {
    console.error("Contract not created successfully");
    return null;
  }

  await sendNewContractEmailsToSigners({
    contract: newContract,
    user: args.user,
  });

  return newContract;
};

export const signContract: ContractServiceType["signContract"] = async ({
  contractContent,
  contractId,
  recipientId,
  userId,
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

    // send emails
    await sendContractSignedEmail({
      contract,
      recipientId,
      storageId: supabaseFilePath,
    });
  } catch (error) {
    console.log(error);

    throw new Error("Couldn't proceed with upload, sorry");
  }
};

export const ContractService: ContractServiceType = {
  create,
  signContract,
};
