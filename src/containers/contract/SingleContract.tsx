import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { type Contract } from "@prisma/client";
import Link from "next/link";
import React from "react";

const NoContractDataAvailable = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center border">
      <p className="font-mono text-lg font-bold">Contract data not available</p>

      <Link href={routes.home()}>
        <Button className="mt-6">Go to homepage</Button>
      </Link>
    </div>
  );
};

export const SingleContractPage = ({
  contract,
}: {
  contract?: Contract | null;
}) => {
  if (!contract) return <NoContractDataAvailable />;

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
      </main>
    </>
  );
};
