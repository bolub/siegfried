import type SMTPTransport from "nodemailer/lib/smtp-transport";

export interface Example {
  testEmailSending: () => Promise<string>;
}
