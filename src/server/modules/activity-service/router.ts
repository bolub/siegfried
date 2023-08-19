import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { ActivityService } from "@/server/modules/activity-service/impl";

export const activityServiceRouter = createTRPCRouter({
  recent: protectedProcedure.query(async ({ ctx }) => {
    return await ActivityService.recent({
      user: {
        id: ctx.session.user.id,
      },
    });
  }),
});
