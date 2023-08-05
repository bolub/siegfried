import { transporter } from "@/server/modules/nodemailer/impl";
import { type Example } from "./interface";

const testEmailSending: Example["testEmailSending"] = async () => {
  return await transporter
    .sendMail({
      from: "abiol5202@gmail.com",
      to: "biolaseyi19@gmail.com",
      subject: "Hello 2",
      text: "Hello, World!",
    })
    .then(() => {
      return "email sent successfully";
    })
    .catch((e) => {
      console.log(e);
      return "Something happened";
    });
};

export { testEmailSending };
