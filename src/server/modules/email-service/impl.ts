import { env } from "@/env.mjs";
import nodemailer from "nodemailer";
import { type EmailServiceTypes } from "@/server/modules/email-service/interface";
import { render } from "@react-email/render";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  auth: {
    user: env.EMAIL_USER_NAME,
    pass: env.EMAIL_USER_PASSWORD,
  },
});

const send: EmailServiceTypes["send"] = async ({
  to,
  subject,
  content,
  attachments,
}) => {
  if (env.NODE_ENV === "production" || env.NODE_ENV === "preview") {
    await resend.emails
      .send({
        from: "Bolu <bolu@siegfried.dev>",
        to,
        subject,
        html: render(content),
        attachments,
      })
      .then(() => {
        console.log("sent");
        return "email sent successfully";
      })
      .catch((e) => {
        console.log(e);
        throw new Error("Couldn't send email");
      });
  } else {
    await transporter
      .sendMail({
        from: env.CONTACT_EMAIL,
        to,
        subject,
        html: render(content),
        attachments,
      })
      .then(() => {
        console.log("sent");
        return "email sent successfully";
      })
      .catch((e) => {
        console.log(e);
        throw new Error("Couldn't send email");
      });
  }
};

export const EmailService: EmailServiceTypes = {
  send,
};
