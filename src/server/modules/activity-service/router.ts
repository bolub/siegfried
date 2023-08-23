import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ActivityService } from "@/server/modules/activity-service/impl";
import { z } from "zod";

export const activityServiceRouter = createTRPCRouter({
  recent: protectedProcedure.query(async ({ ctx }) => {
    return await ActivityService.recent({
      user: {
        id: ctx.session.user.id,
      },
    });
  }),
  byContract: protectedProcedure
    .input(z.object({ contractId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ActivityService.byContract({
        user: {
          id: ctx.session.user.id,
        },
        contractId: input.contractId,
      });
    }),
});
