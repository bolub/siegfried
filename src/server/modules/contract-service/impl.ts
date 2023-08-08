import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { type ContractServiceType } from "@/server/modules/contract-service/interface";
import { PdfService } from "@/server/modules/pdf-service/impl";
import {
  getContract,
  sendContractEmailsToSigners,
  sendContractSignedEmail,
} from "@/server/modules/contract-service/utils";

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

  sendContractEmailsToSigners({
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

  const generatedPdfFilePath = await PdfService.generatePdf({
    html: contractContent,
    name: pdfName,
  });

  if (!generatedPdfFilePath) {
    console.error(
      "Contract pdf could not be generated, please try again later"
    );

    return;
  }

  // send pdf over to supabase to be saved
  const response = await fetch(`${env.NEXTAUTH_URL}/api/contracts/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filePath: generatedPdfFilePath.pdfFilePath,
      pdfName,
    }),
  });

  const { data: supabaseFilePath } = (await response.json()) as {
    data: string;
  };

  await Promise.all([
    // save pdf data to db
    prisma.contractDocument.create({
      data: {
        storageId: supabaseFilePath,
        contractId,
        userId,
      },
    }),

    // set signed status to SIGNED
    prisma.contract.update({
      where: {
        id: contractId,
      },
      data: {
        status: "SIGNED",
      },
    }),

    // send emails
    sendContractSignedEmail({
      contract,
      recipientId,
      storageId: supabaseFilePath,
    }),
  ]);
};

export const ContractService: ContractServiceType = {
  create,
  signContract,
};
