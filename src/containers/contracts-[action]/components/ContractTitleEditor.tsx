import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, FileTextIcon } from "@radix-ui/react-icons";
import React, { type ReactNode } from "react";
import { type ContractFormRegisterType } from "@/containers/contracts-[action]/components/ContractSigners/interface";
import Link from "next/link";
import { routes } from "@/routes";
import { type SingleContractType } from "@/pages/contracts/edit/[id]";

const TopBarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed right-0 top-0 z-50 h-22 w-full border-b bg-white">
      <div className="container mx-auto flex h-full items-center">
        {children}
      </div>
    </div>
  );
};

export const ContractTitleEditor = ({
  register,
  contract,
}: {
  register: ContractFormRegisterType;
  contract?: SingleContractType | null;
}) => {
  return (
    <TopBarContainer>
      <div className="flex w-full items-center">
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="mr-5 rounded-full"
          asChild
        >
          <Link href={routes.contracts.all()}>
            <ArrowLeftIcon className="h-5 w-5 stroke-2" />
          </Link>
        </Button>

        <div className="ml-2 flex w-full items-center">
          <FileTextIcon className="mr-2 h-6 w-6 stroke-2" />
          <input
            placeholder="New Contract"
            className="w-full max-w-2xl rounded-none font-mono text-base font-bold focus-visible:outline-none"
            {...register("contractName", {
              required: true,
              value: contract?.name,
            })}
          />
        </div>
      </div>
    </TopBarContainer>
  );
};
