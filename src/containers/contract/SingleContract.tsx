import { Logo } from "@/components/Logo";
import React, { useState } from "react";
import { type SingleContractType } from "@/pages/contracts/[id]";
import { useRouter } from "next/router";
import { NoContractDataAvailable } from "@/containers/contract/components/Feedback";
import { formatDate } from "@/lib/time";
import { Button } from "@/components/ui/button";
import { SignatureSigner } from "@/containers/contract/components/SignatureSigner";
import { ContractUser } from "./utils";
import { api } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { routes } from "@/routes";
import { type ContractRecipient } from "@prisma/client";

export const SingleContractPageInner = ({
  contract,
  recipient,
}: {
  contract: SingleContractType;
  recipient?: ContractRecipient;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const [signature, setSignature] = useState("");
  const [hideForContractSigning, setHideForContractSigning] = useState(false);

  const { mutateAsync: signContract, isLoading } =
    api.contract.sign.useMutation({
      onSuccess() {
        setHideForContractSigning(false);

        router.push(
          routes.contracts.signed({
            contractId: contract.id,
            recipientId: recipient?.id || "",
          })
        );

        toast({
          title: "Success",
          description: "Contract signed successfully",
        });
      },
      onError() {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Please try again.",
        });
      },
    });

  const handleSignContract = async () => {
    setHideForContractSigning(true);

    const contractBody = document.querySelector("main");
    if (!contractBody) return;

    await signContract({
      userId: contract.userId,
      contractContent: contractBody.outerHTML,
      contractId: contract.id,
      recipientId: recipient?.id || "",
    });
  };

  return (
    <>
      <main className="mt-16 flex w-full justify-center">
        <div className="w-full max-w-[800px]">
          {/* header */}
          <div className="mb-20">
            <div className="flex w-full flex-col text-center">
              <Logo />

              <h1 className="mt-9 font-mono font-bold">{contract.name}</h1>
            </div>
          </div>

          <section
            id="content"
            className="prose mx-auto break-all"
            dangerouslySetInnerHTML={{
              __html: contract.content,
            }}
          />

          <section id="signature" className="mt-10 border-t pt-12">
            <SignatureSigner
              signature={signature}
              setSignature={setSignature}
              hideForContractSigning={hideForContractSigning}
            />

            <div className="mt-12 text-center">
              <p className="font-mono text-base font-bold">{recipient?.name}</p>
              <p className="mt-1 text-base">{formatDate(new Date())}</p>
            </div>
          </section>
        </div>
      </main>

      <footer
        id="submit"
        className="mx-auto mb-32 mt-10 flex w-full max-w-[800px] border-t"
      >
        <Button
          disabled={!signature || isLoading}
          isLoading={isLoading}
          className="mx-auto mt-10"
          onClick={handleSignContract}
        >
          Finish and Submit
        </Button>
      </footer>
    </>
  );
};

export const SingleContractPage = ({
  contract,
}: {
  contract?: SingleContractType | null;
}) => {
  const router = useRouter();
  const query = router.query as {
    user: string;
  };

  if (!contract) return <NoContractDataAvailable />;

  const recipient = ContractUser({
    userId: query.user,
    recipients: contract.recipients,
  });

  // Mark contract as opened
  api.contract.markContractAsOpened.useQuery(
    {
      userId: contract.userId,
      contractId: contract.id,
      recipientId: recipient?.id || "",
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return <SingleContractPageInner contract={contract} recipient={recipient} />;
};
