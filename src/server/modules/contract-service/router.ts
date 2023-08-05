import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ContractSignerSchema } from "@/containers/contract-new/components/ContractSigners/interface";
import { ContractService } from "@/server/modules/contract-service/impl";

export const contractServiceRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        contractName: z.string(),
        contractContent: z.string(),
        signers: z.array(ContractSignerSchema),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ContractService.create({
        contract: {
          ...input,
        },
        user: {
          name: ctx.session?.user.name,
        },
      });
    }),
});
