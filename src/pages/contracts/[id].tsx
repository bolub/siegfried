import { SingleContractPage } from "@/containers/contract/SingleContract";
import React from "react";
import {
  type GetServerSidePropsContext,
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import { prisma } from "@/server/db";
import { type Contract } from "@prisma/client";
import { env } from "@/env.mjs";

export const getServerSideProps: GetServerSideProps<{
  contract?: Contract | null;
}> = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query as { id: string };

  const contract = await prisma.contract.findUnique({
    where: {
      id,
    },
  });

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
