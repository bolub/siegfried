import { Appshell } from "@/components/Appshell";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export const ContractsPage = () => {
  return (
    <Appshell>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-medium">Contracts</h1>

        <Button size="lg" asChild>
          <Link href={routes.contracts.new()}>
            <PlusIcon className="mr-2" />
            Create contracts
          </Link>
        </Button>
      </div>
    </Appshell>
  );
};
