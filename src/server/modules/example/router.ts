import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { EmailService } from "@/server/modules/email-service/impl";
import ContractRequest from "@/emails/ContractRequest";
import { PdfService } from "@/server/modules/pdf-service/impl";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  testEmailSending: publicProcedure.mutation(async () => {
    return await EmailService.send({
      to: "biolaseyi19@gmail.com",
      subject: "Contract email test",
      content: ContractRequest({
        contractName: "Bolu Frontend Contract",
        contractUrl: "https://boluabiola.com",
        user: {
          name: "Bolu Abiola",
        },
      }),
    });
  }),

  testGeneratePdf: publicProcedure
    .input(
      z.object({
        html: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await PdfService.generatePdf({
        html: input.html,
        pdfName: "Test Signed pdf",
        user: {
          id: "Test",
        },
      });
    }),

  testEmitEvents: publicProcedure.mutation(() => {
    // EventService.Emitter.emit("CONTRACT_CREATED", {
    //   contract: {
    //   },
    //   userId: "cllcbgdux0007v0uxhw330ixk",
    // });
  }),
});
