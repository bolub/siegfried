import { Logo } from "@/components/Logo";
import SignatureCanvas from "react-signature-canvas";
import React from "react";
import { type SingleContractType } from "@/pages/contracts/[id]";

const NoContractDataAvailable = () => {
  return (
    <div className="flex items-center justify-center">
      <p className="font-mono text-lg">Contract data not available</p>
    </div>
  );
};

export const SingleContractPage = ({
  contract,
}: {
  contract?: SingleContractType | null;
}) => {
  if (!contract) return <NoContractDataAvailable />;

  console.log(contract.recipients);

  return (
    <>
      <header className="mx-auto mt-20 w-full max-w-[800px]">
        <div className="flex w-full flex-col text-center">
          <Logo />

          <h1 className="mt-9 font-mono font-bold">{contract.name}</h1>
        </div>
      </header>

      <main className="prose mx-auto mb-32 mt-16 w-full max-w-[800px]">
        <div
          dangerouslySetInnerHTML={{
            __html: contract.content,
          }}
        />

        <SignatureCanvas
          penColor="green"
          canvasProps={{
            width: 500,
            height: 200,
            className: "border mx-auto mt-10 bg-white",
          }}
        />
      </main>
    </>
  );
};
