/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, FileTextIcon } from "@radix-ui/react-icons";
import React, { type ReactNode } from "react";
import { type ContractFormRegisterType } from "@/containers/contract-new/components/ContractSigners/interface";
import Link from "next/link";
import { routes } from "@/routes";

const TopBarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-22 border-b bg-white">
      <div className="container mx-auto flex h-full items-center">
        {children}
      </div>
    </div>
  );
};

export const ContractTitleEditor = ({
  register,
}: {
  register: ContractFormRegisterType;
}) => {
  return (
    <TopBarContainer>
      <div className="flex items-center">
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="mr-5 rounded-full"
          asChild
        >
          <Link href={routes.contracts.list()}>
            <ArrowLeftIcon className="h-5 w-5 stroke-2" />
          </Link>
        </Button>

        <div className="flex items-center">
          <FileTextIcon className="mr-2 h-6 w-6 stroke-2" />
          <input
            placeholder="New Contract"
            className="rounded-none font-mono text-base font-bold focus-visible:outline-none"
            {...register("contractName", {
              required: true,
              value: "Untitled Contract",
            })}
          />
        </div>
      </div>
    </TopBarContainer>
  );
};
