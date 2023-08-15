import { Logo } from "@/components/Logo";
import { type SingleContractType } from "@/pages/contracts/signed";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";
import {
  LoadingData,
  NoContractDataAvailable,
} from "@/containers/contract/components/Feedback";

export const ContractSignedPage = ({
  contract,
}: {
  contract?: SingleContractType | null;
}) => {
  const { query } = useRouter();

  const { recipientId, contractId } = query as {
    recipientId: string;
    contractId: string;
  };

  const { isLoading } = api.contract.sendContractSignedEmail.useQuery(
    {
      recipientId,
      contractId,
    },
    {
      enabled: !contract?.emailSent,
      refetchOnWindowFocus: false,
    }
  );

  if (!contract) return <NoContractDataAvailable />;
  if (isLoading) return <LoadingData />;

  return (
    <>
      <main className="container flex h-screen w-full max-w-2xl">
        <div className="m-auto w-full flex-col text-center">
          <Logo />

          <h1 className="mt-24 font-mono text-3xl font-bold leading-[50px]">
            Thank you for signing {contract.name}
          </h1>

          <p className="mt-14">
            You will receive the finalized documents in your email
          </p>
        </div>
      </main>
    </>
  );
};
