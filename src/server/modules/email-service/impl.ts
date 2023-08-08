import { env } from "@/env.mjs";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  auth: {
    user: env.EMAIL_USER_NAME,
    pass: env.EMAIL_USER_PASSWORD,
  },
});

// EMAIL_SERVER_HOST = "mailhog";
// EMAIL_SERVER_PORT = "1025";
// EMAIL_SERVER_USER = "email-user";
// EMAIL_SERVER_PASSWORD = "email-pass";
