import { ContractsPage } from "@/containers/contracts-list/Contracts";
import { routes } from "@/routes";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { type Contract } from "@prisma/client";
import {
  type GetServerSidePropsContext,
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";

export const getServerSideProps: GetServerSideProps<{
  contracts: Contract[];
  error?: any;
}> = async (ctx: GetServerSidePropsContext) => {
  try {
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

    const contracts = await prisma.contract.findMany({
      where: {
        userId,
      },
      include: {
        recipients: true,
      },
    });

    return {
      props: {
        contracts,
      },
    };
  } catch (error) {
    return {
      props: {
        contracts: [],
        error,
      },
    };
  }
};

export default function Contracts({
  contracts,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(error);

  return <ContractsPage contracts={contracts} />;
}
