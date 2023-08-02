import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { dm_sans, space_mono } from "theme/fonts";
import NextProgress from "next-progress";
import { useRouter } from "next/router";
import { routes } from "@/routes";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      {router.pathname !== routes.contracts.new() && (
        <NextProgress height={4} color="black" />
      )}

      <div className={`${dm_sans.variable} ${space_mono.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
