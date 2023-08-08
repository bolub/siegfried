import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { PdfService } from "@/server/modules/pdf-service/impl";
import { transporter } from "@/server/modules/email-service/impl";
import { render } from "@react-email/render";
import ContractRequest from "@/emails/ContractRequest";

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
    return await transporter
      .sendMail({
        from: "abiol5202@gmail.com",
        to: "biolaseyi19@gmail.com",
        subject: "Contract email test",
        html: render(
          ContractRequest({
            contractName: "Bolu Frontend Contract",
            contractUrl: "https://boluabiola.com",
            user: {
              name: "Bolu Abiola",
            },
          })
        ),
      })
      .then(() => {
        return "email sent successfully";
      })
      .catch((e) => {
        console.log(e);
        return "Something happened";
      });
  }),

  testGeneratePdf: publicProcedure.mutation(async () => {
    const resp = await PdfService.generatePdf({
      html: "<h1>Installation</h1><p>Playwright Test was created specifically to accommodate the needs of end-to-end testing. Playwright supports all modern rendering engines including Chromium, WebKit, and Firefox. Test on Windows, Linux, and macOS, locally or on CI, headless or headed with native mobile emulation of Google Chrome for Android and Mobile Safari.</p><p><strong>You will learn</strong></p><ul><li><p>How to install Playwright</p></li><li><p>What's Installed</p></li><li><p>How to run the example test</p></li><li><p>How to open the HTML test report</p></li></ul>",
    });
    return resp;
  }),
});
