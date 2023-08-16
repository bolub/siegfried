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
        recipientId: z.string(),
      })
    )
    .mutation(
      async ({
        input: { contractContent, contractId, userId, recipientId },
      }) => {
        return await ContractService.signContract({
          contractContent,
          contractId,
          userId,
          recipientId,
        });
      }
    ),
  sendContractSignedEmail: publicProcedure
    .input(
      z.object({
        contractId: z.string(),
        recipientId: z.string(),
      })
    )
    .query(async ({ input: { contractId, recipientId } }) => {
      return await ContractService.sendContractSignedEmail({
        contractId,
        recipientId,
      });
    }),

  markContractAsOpened: publicProcedure
    .input(
      z.object({
        contractId: z.string(),
        userId: z.string(),
        recipientId: z.string(),
      })
    )
    .query(async ({ input: { contractId, recipientId, userId } }) => {
      return await ContractService.markContractAsOpened({
        contractId,
        recipientId,
        userId,
      });
    }),
});
