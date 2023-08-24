import { Appshell } from "@/components/Appshell";
import { Button } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { routes } from "@/routes";
import { api } from "@/utils/api";

export default function Example() {
  const { mutate: testEmailSending } =
    api.example.testEmailSending.useMutation();

  const { mutate: testGeneratePdf } = api.example.testGeneratePdf.useMutation();

  const { mutate: testEmitEvents } = api.example.testEmitEvents.useMutation();

  const sendPdfToUrlTest = async () => {
    // const htmlContent = document.querySelector("html");
    // if (!htmlContent) return;
    // const { url: pdfFilePath } = await testGeneratePdfAsync({
    //   html: htmlContent.outerHTML,
    // });
    // // upload pdf to supabase
    // try {
    //   const response = await fetch("/api/contracts/upload", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       filePath: pdfFilePath,
    //       pdfName: "test",
    //       userId: "007",
    //     }),
    //   });
    //   console.log(await response.json());
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <Appshell title="Example">
        <div className="flex flex-col gap-4">
          <Button
            onClick={() => {
              testEmailSending();
            }}
            className="w-fit"
          >
            Send test email
          </Button>

          <Button
            onClick={() => {
              const htmlContent = document.querySelector("html");

              if (!htmlContent) return;

              testGeneratePdf({
                html: htmlContent.outerHTML,
              });
            }}
            className="w-fit"
          >
            Generate Pdf test
          </Button>

          <Button
            onClick={async () => {
              await sendPdfToUrlTest();
            }}
            className="w-fit"
          >
            Generate Pdf url test
          </Button>

          <Button
            onClick={async () => {
              testEmitEvents();
            }}
            className="w-fit"
          >
            Event Emitter test
          </Button>
        </div>
      </Appshell>
    </>
  );
}

export const getServerSideProps = async () => {
  if (env.NODE_ENV === "production") {
    return {
      props: {},
      redirect: {
        destination: routes.home(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
