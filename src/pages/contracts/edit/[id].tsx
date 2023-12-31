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
import { EditContractPage } from "@/containers/contracts-[action]/edit/EditContract";
import { decodeHTML } from "@/server/modules/contract-service/utils";
import { trpcHelpers } from "@/server/api/root";

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

  const decodedContent = decodeHTML(contract?.content || "");
  if (contract) {
    contract.content = decodedContent;
  }

  trpcHelpers.activity.byContract.prefetch({
    contractId: id,
  });

  return {
    props: {
      contract,
      trpcState: trpcHelpers.dehydrate(),
    },
  };
};

const ContractPage = ({
  contract,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <EditContractPage contract={contract} />;
};

export default ContractPage;
