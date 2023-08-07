import { Appshell } from "@/components/Appshell";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";

export default function Example() {
  const { mutate: testEmailSending } =
    api.example.testEmailSending.useMutation();

  const { mutate: testGeneratePdf, mutateAsync: testGeneratePdfAsync } =
    api.example.testGeneratePdf.useMutation();

  const sendPdfToUrlTest = async () => {
    const { pdfFilePath } = await testGeneratePdfAsync();

    // upload pdf to supabase
    try {
      const response = await fetch("/api/contracts/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filePath: pdfFilePath }),
      });

      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Appshell>
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
              testGeneratePdf();
            }}
            className="w-fit"
          >
            Generate Pdf test
          </Button>

          <Button
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              await sendPdfToUrlTest();
            }}
            className="w-fit"
          >
            Generate Pdf url test
          </Button>
        </div>
      </Appshell>
    </>
  );
}
