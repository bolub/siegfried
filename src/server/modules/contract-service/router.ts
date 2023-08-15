import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { ContractSignerSchema } from "@/containers/contract-new/components/ContractSigners/interface";
import { ContractService } from "@/server/modules/contract-service/impl";

export const contractServiceRouter = createTRPCRouter({
  create: protectedProcedure
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
          id: ctx.session?.user.id,
        },
      });
    }),
  sign: publicProcedure
    .input(
      z.object({
        contractContent: z.string(),
        contractId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await ContractService.signContract({
        contractContent: input.contractContent,
        contractId: input.contractId,
        userId: input.userId,
      });
    }),
  sendContractSignedEmail: publicProcedure
    .input(
      z.object({
        contractId: z.string(),
        recipientId: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await ContractService.sendContractSignedEmail({
        contractId: input.contractId,
        recipientId: input.recipientId,
      });
    }),
});
