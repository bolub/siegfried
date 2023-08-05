/* eslint-disable @typescript-eslint/no-misused-promises */
import { type ContractSigners } from "@/containers/contract-new/components/ContractSigners/interface";
import Contract from "@/emails/contract";
import { env } from "@/env.mjs";
import { routes } from "@/routes";
import { prisma } from "@/server/db";
import { type ContractServiceType } from "@/server/modules/contract-service/interface";
import { transporter } from "@/server/modules/email-service/impl";
import { type Contract as PrismaContract } from "@prisma/client";
import { render } from "@react-email/render";

const sendContractEmailsToSigners = ({
  contract,
  user,
}: {
  contract: PrismaContract & {
    recipients: ContractSigners;
  };
  user: {
    name?: string | null;
  };
}) => {
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
          )}`,
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

export const ContractService: ContractServiceType = {
  create,
};
