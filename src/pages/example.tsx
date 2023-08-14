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
        body: JSON.stringify({
          filePath: pdfFilePath,
          pdfName: "test",
          userId: "007",
        }),
      });

      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
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
              testGeneratePdf();
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
        </div>
      </Appshell>
    </>
  );
}
