import { exampleRouter } from "@/server/modules/example/router";
import { createTRPCRouter } from "@/server/api/trpc";
import { contractServiceRouter } from "@/server/modules/contract-service/router";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  contract: contractServiceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
