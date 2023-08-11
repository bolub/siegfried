import { Appshell } from "@/components/Appshell";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { type Contract } from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { ContractComponent } from "./components/ContractComponent";

export const ContractsPage = ({ contracts }: { contracts: Contract[] }) => {
  return (
    <Appshell title="Contracts">
      {/* header */}
      <div className="flex w-full items-center justify-between">
        <h1 className="font-mono text-3xl font-bold">Contracts</h1>

        <Button size="lg" asChild>
          <Link href={routes.contracts.new()}>
            <PlusIcon className="mr-2" />
            Create contract
          </Link>
        </Button>
      </div>

      {/* content */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {contracts.map((contract) => {
          return <ContractComponent key={contract.id} contract={contract} />;
        })}
      </div>
    </Appshell>
  );
};
