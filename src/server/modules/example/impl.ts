import { transporter } from "@/server/modules/email-service/impl";
import { render } from "@react-email/render";
import { type ExampleTypes } from "@/server/modules/example/interface";
import Contract from "@/emails/contract";

const testEmailSending: ExampleTypes["testEmailSending"] = async () => {
  return await transporter
    .sendMail({
      from: "abiol5202@gmail.com",
      to: "biolaseyi19@gmail.com",
      subject: "Contract email test",
      html: render(
        Contract({
          contractName: "Bolu Frontend Contract",
          contractUrl: "https://boluabiola.com",
          user: {
            name: "Bolu Abiola",
          },
        })
      ),
    })
    .then(() => {
      return "email sent successfully";
    })
    .catch((e) => {
      console.log(e);
      return "Something happened";
    });
};

export const Example = { testEmailSending };
