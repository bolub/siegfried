import { Logo } from "@/components/Logo";
import { useRouter } from "next/router";
import React from "react";

export const ContractSignedPage = () => {
  const { query } = useRouter();
  const contractName = query.name as string;

  return (
    <>
      <main className="container flex h-screen w-full max-w-2xl">
        <div className="m-auto w-full flex-col text-center">
          <Logo />

          <h1 className="mt-24 font-mono text-3xl font-bold leading-[50px]">
            Thank you for signing {contractName}
          </h1>

          <p className="mt-14">
            You will receive the finalized documents in your email
          </p>
        </div>
      </main>
    </>
  );
};
