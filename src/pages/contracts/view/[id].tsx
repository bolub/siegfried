import React from "react";
import {
  type GetServerSidePropsContext,
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import { prisma } from "@/server/db";
import { type ContractRecipient, type Contract } from "@prisma/client";
import { getServerAuthSession } from "@/server/auth";
import { routes } from "@/routes";
import { ViewContractPage } from "@/containers/contracts-[action]/view/ViewContractPage";

export type SingleContractType = Contract & {
  recipients: ContractRecipient[];
};

export const getServerSideProps: GetServerSideProps<{
  contract?: SingleContractType | null;
}> = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      redirect: {
        destination: routes.login(),
        permanent: false,
      },
    };
  }

  const { id } = ctx.query as { id: string };
  const contract = await prisma.contract.findUnique({
    where: {
      id,
    },
    include: {
      recipients: true,
      user: true,
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
  return <ViewContractPage contract={contract} />;
};

export default ContractPage;
