import { ContractSignedPage } from "@/containers/contract/ContractSigned";
import { prisma } from "@/server/db";
import { type Contract } from "@prisma/client";
import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type GetServerSidePropsContext,
} from "next";
import React from "react";

export type SingleContractType = Pick<Contract, "emailSent" | "name">;

export const getServerSideProps: GetServerSideProps<{
  contract?: SingleContractType | null;
}> = async (ctx: GetServerSidePropsContext) => {
  const { contractId } = ctx.query as {
    contractId: string;
    recipientId: string;
  };

  const contract = await prisma.contract.findUnique({
    where: {
      id: contractId,
    },
    select: {
      emailSent: true,
      name: true,
    },
  });

  return {
    props: {
      contract,
    },
  };
};

const ContractSigned = ({
  contract,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <ContractSignedPage contract={contract} />;
};

export default ContractSigned;
