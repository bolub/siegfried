/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ContractSigners } from "@/containers/contract-new/components/ContractSigners/interface";
import Contract from "@/emails/contract";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { type ContractServiceType } from "@/server/modules/contract-service/interface";
import { transporter } from "@/server/modules/email-service/impl";
import { render } from "@react-email/render";

const sendContractEmailsToSigners = ({
  contract,
  user,
}: {
  contract: {
    contractName: string;
    contractContent: string;
    signers: ContractSigners;
  };
  user: {
    name?: string | null;
  };
}) => {
  contract.signers.forEach(async (signer) => {
    await transporter.sendMail({
      from: env.CONTACT_EMAIL,
      to: signer.email,
      subject: `Request to sign ${contract.contractName} from ${user.name}`,
      html: render(
        Contract({
          contractName: contract.contractName,
          // contract id needs to be part of this url
          contractUrl: "https://boluabiola.com",
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
    },
  });

  if (!contract) {
    console.error("Contract not created successfully");
    return null;
  }

  sendContractEmailsToSigners(args);

  return newContract;
};

export const ContractService: ContractServiceType = {
  create,
};
