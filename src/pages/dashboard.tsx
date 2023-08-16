import { DashboardPage } from "@/containers/dashboard-page/DashboardPage";
import { routes } from "@/routes";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { ContractService } from "@/server/modules/contract-service/impl";
import { type Activity, type ContractRecipient } from "@prisma/client";
import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
  type GetServerSidePropsContext,
} from "next";

type CustomActivity = Activity & {
  recipient: Pick<ContractRecipient, "name"> | null;
  contract: {
    name: string | null;
    user: {
      name: string | null;
    };
  };
};

export type DashboardType = {
  stats: {
    total: number;
    signed: number;
    pending: number;
  };
  recentActivities: CustomActivity[];
};

export const getServerSideProps: GetServerSideProps<DashboardType> = async (
  ctx: GetServerSidePropsContext
) => {
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

  const stats = await ContractService.stats({
    userId,
  });

  const recentActivities = await prisma.activity.findMany({
    take: 5,
    where: {
      userId,
    },
    orderBy: {
      timestamp: "desc",
    },
    include: {
      recipient: {
        select: {
          name: true,
        },
      },
      contract: {
        select: {
          name: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      stats,
      recentActivities,
    },
  };
};

export default function Dashboard({
  stats,
  recentActivities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <DashboardPage stats={stats} recentActivities={recentActivities} />;
}
