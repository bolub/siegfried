import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { PdfService } from "@/server/modules/pdf-service/impl";

export const pdfServiceRouter = createTRPCRouter({
  generatePDF: publicProcedure
    .input(
      z.object({
        html: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await PdfService.generatePdf({
        html: input.html,
        user: {
          id: ctx.session?.user.id || "",
        },
      });
    }),
});
