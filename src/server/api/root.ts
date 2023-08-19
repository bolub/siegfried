import { exampleRouter } from "@/server/modules/example/router";
import { createTRPCRouter } from "@/server/api/trpc";
import { contractServiceRouter } from "@/server/modules/contract-service/router";
import { pdfServiceRouter } from "@/server/modules/pdf-service/router";
import { activityServiceRouter } from "@/server/modules/activity-service/router";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  contract: contractServiceRouter,
  pdf: pdfServiceRouter,
  activity: activityServiceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
