import { Logo } from "@/components/Logo";
import React, { useState } from "react";
import { type SingleContractType } from "@/pages/contracts/[id]";
import { useRouter } from "next/router";
import { NoContractDataAvailable } from "./components/NoContractAvailable";
import { type ContractRecipient } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignatureSigner } from "./components/SignatureSigner";

const ContractUser = ({
  userId,
  recipients,
}: {
  userId: string;
  recipients: ContractRecipient[];
}) => {
  if (!recipients) return;

  return recipients.filter((recipient) => {
    return recipient.id === userId;
  })[0];
};

export const SingleContractPage = ({
  contract,
}: {
  contract?: SingleContractType | null;
}) => {
  const { query } = useRouter();
  const [signature, setSignature] = useState("");

  if (!contract) return <NoContractDataAvailable />;

  const user = ContractUser({
    userId: query.user as string,
    recipients: contract.recipients,
  });

  return (
    <>
      <header className="mx-auto mt-20 w-full max-w-[800px]">
        <div className="flex w-full flex-col text-center">
          <Logo />

          <h1 className="mt-9 font-mono font-bold">{contract.name}</h1>
        </div>
      </header>

      <main className=" mx-auto mb-32 mt-16 w-full max-w-[800px]">
        <section
          id="content"
          className="prose"
          dangerouslySetInnerHTML={{
            __html: contract.content,
          }}
        />

        <section id="signature" className="mt-10 border-t pt-12">
          <SignatureSigner signature={signature} setSignature={setSignature} />

          <div className="mt-12 text-center">
            <p className="font-mono text-base font-bold">{user?.name}</p>
            <p className="mt-1 text-base">{formatDate(new Date())}</p>
          </div>
        </section>

        <section id="submit" className="mt-10 flex border-t">
          <Button disabled={!signature} className="mx-auto mt-10">
            Finish and Submit
          </Button>
        </section>
      </main>
    </>
  );
};
