{
  /* eslint-disable @next/next/no-page-custom-font */
}
import { Tailwind } from "@react-email/tailwind";
import { type ReactNode } from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
} from "@react-email/components";
import tailwindTheme from "./tailwind.config";
import { EmailLogo } from "./EmailLogo";

export const Appshell = ({ children }: { children: ReactNode }) => {
  return (
    <Tailwind
      config={{
        theme: tailwindTheme.theme,
      }}
    >
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Preview>You have a new contract to sign</Preview>
        <Body className="bg-background-100 font-sans">
          <Section className="mt-10 h-full">
            <Container className="m-auto w-full max-w-[532px] bg-white px-10 pb-16 pt-2">
              <EmailLogo />

              <div className="mt-4">{children}</div>
            </Container>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
};
