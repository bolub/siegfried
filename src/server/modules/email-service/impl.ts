import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  port: 1025,
  auth: {
    user: "email-user",
    pass: "email-pass",
  },
});

// EMAIL_SERVER_HOST = "mailhog";
// EMAIL_SERVER_PORT = "1025";
// EMAIL_SERVER_USER = "email-user";
// EMAIL_SERVER_PASSWORD = "email-pass";
