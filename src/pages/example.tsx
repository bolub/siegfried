import { Appshell } from "@/components/Appshell";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";

export default function Example() {
  const { mutate: testEmailSending } =
    api.example.testEmailSending.useMutation();

  return (
    <>
      <Appshell>
        <p>Hello from Example</p>
        <Button
          onClick={() => {
            testEmailSending();
          }}
        >
          Send test email
        </Button>
      </Appshell>
    </>
  );
}
