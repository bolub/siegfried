import { prisma } from "@/server/db";
import { type ActivityServiceType } from "@/server/modules/activity-service/interface";

const recent: ActivityServiceType["recent"] = async ({ user }) => {
  return await prisma.activity.findMany({
    take: 5,
    where: {
      userId: user.id,
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
};

const byContract: ActivityServiceType["byContract"] = async ({
  user,
  contractId,
}) => {
  return await prisma.activity.findMany({
    where: {
      userId: user.id,
      contractId,
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
};

export const ActivityService: ActivityServiceType = {
  recent,
  byContract,
};
