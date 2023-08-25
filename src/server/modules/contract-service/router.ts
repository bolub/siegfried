import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { ContractSignerSchema } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/interface";
import { ContractService } from "@/server/modules/contract-service/impl";

export const contractServiceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
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
  stats: protectedProcedure.query(async ({ ctx }) => {
    return await ContractService.stats({
      userId: ctx.session.user.id,
    });
  }),

  list: protectedProcedure.query(async ({ ctx }) => {
    return await ContractService.list({
      userId: ctx.session.user.id,
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        contractName: z.string(),
        contractContent: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ContractService.update({
        contract: {
          ...input,
        },
        user: {
          name: ctx.session?.user.name,
          id: ctx.session?.user.id,
        },
      });
    }),
  save: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        contractName: z.string(),
        contractContent: z.string(),
        signers: z.array(
          ContractSignerSchema.extend({
            id: z.string().optional(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ContractService.save({
        contract: {
          contractName: input.contractName,
          contractContent: input.contractContent,
          id: input.id,
          signers: input.signers,
        },
        user: {
          name: ctx.session?.user.name,
          id: ctx.session?.user.id,
        },
      });
    }),
});
