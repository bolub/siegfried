import { SingleContractPage } from "@/containers/contract/SingleContract";
import React from "react";
import {
  type GetServerSidePropsContext,
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import { prisma } from "@/server/db";
import { type ContractRecipient, type Contract } from "@prisma/client";
import { TokenService } from "@/server/modules/token-service/impl";
import { decodeHTML } from "@/server/modules/contract-service/utils";

export type SingleContractType = Contract & {
  recipients: ContractRecipient[];
};

export const getServerSideProps: GetServerSideProps<{
  contract?: SingleContractType | null;
}> = async (ctx: GetServerSidePropsContext) => {
  const { id, token } = ctx.query as { id: string; token: string };

  try {
    const { contractId } = TokenService.verifyToken(token) as {
      contractId: string;
    };

    if (contractId !== id) {
      return {
        props: {
          contract: null,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        contract: null,
      },
    };
  }

  const contract = await prisma.contract.findUnique({
    where: {
      id,
    },
    include: {
      recipients: true,
      user: true,
    },
  });

  const decodedContent = decodeHTML(contract?.content || "");
  if (contract) {
    contract.content = decodedContent;
  }

  if (contract?.status === "SIGNED") {
    return {
      props: {
        contract: null,
      },
    };
  }

  return {
    props: {
      contract,
    },
  };
};

const ContractPage = ({
  contract,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SingleContractPage contract={contract} />;
};

export default ContractPage;
