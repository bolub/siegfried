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
  console.log(env.NODE_ENV);

  if (env.NODE_ENV === "production" || env.NODE_ENV === "preview") {
    try {
      await resend.emails.send({
        from: "Bolu <bolu@siegfried.dev>",
        to,
        subject,
        html: render(content),
        attachments,
      });

      return "email sent successfully";
    } catch (error) {
      console.log(error);
      throw new Error("Couldn't send email");
    }
  } else {
    try {
      await transporter.sendMail({
        from: env.CONTACT_EMAIL,
        to,
        subject,
        html: render(content),
        attachments,
      });

      return "email sent successfully";
    } catch (error) {
      console.log(error);
      throw new Error("Couldn't send email");
    }
  }
};

export const EmailService: EmailServiceTypes = {
  send,
};
