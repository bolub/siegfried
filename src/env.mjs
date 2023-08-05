import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const NonEmptySting = z.string().min(1);

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? NonEmptySting
        : NonEmptySting.optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? NonEmptySting : z.string().url()
    ),
    GOOGLE_CLIENT_ID: NonEmptySting,
    GOOGLE_CLIENT_SECRET: NonEmptySting,
    RESEND_API_KEY: NonEmptySting,
    CONTACT_EMAIL: NonEmptySting,
    JWT_SECRET: NonEmptySting,
  },

  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
