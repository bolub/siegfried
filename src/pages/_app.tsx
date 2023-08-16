import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { dm_sans, space_mono } from "theme/fonts";
import NextProgress from "next-progress";
import { useRouter } from "next/router";
import { routes } from "@/routes";
import { Toaster } from "@/components/ui/toaster";
import { DefaultSeo } from "next-seo";
import { seoConfig } from "utils/seo";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <link
          href="../favicon-light.png"
          rel="icon"
          media="(prefers-color-scheme:light)"
        />
        <link
          href="../favicon-dark.png"
          rel="icon"
          media="(prefers-color-scheme:dark)"
        />
      </Head>

      {router.pathname !== routes.contracts.new() && (
        <NextProgress height={4} color="black" />
      )}

      <div className={`${dm_sans.variable} ${space_mono.variable} font-sans`}>
        <Toaster />
        <DefaultSeo {...seoConfig} />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
