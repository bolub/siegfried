import { Appshell } from "@/components/Appshell";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { type Contract } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ContractComponent } from "./components/ContractComponent";
import { PageHeader } from "@/components/PageHeader";
import { Empty } from "@/components/Empty";
import { PencilLine } from "lucide-react";

const ContractsList = ({ contracts }: { contracts: Contract[] }) => {
  if (contracts.length === 0)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Empty
          icon={<PencilLine className="h-6 w-6" />}
          title="No Contracts"
          description="Get started by creating a new contract"
        />
      </div>
    );

  return (
    <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {contracts.map((contract) => {
        return <ContractComponent key={contract.id} contract={contract} />;
      })}
    </div>
  );
};

export const ContractsPage = ({ contracts }: { contracts: Contract[] }) => {
  return (
    <Appshell title="Contracts">
      <PageHeader title="Contracts">
        <Button size="lg" asChild>
          <Link href={routes.contracts.new()}>
            <PlusIcon className="mr-2" />
            New contract
          </Link>
        </Button>
      </PageHeader>

      <ContractsList contracts={contracts} />
    </Appshell>
  );
};
