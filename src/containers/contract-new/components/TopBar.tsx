import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, FileTextIcon } from "@radix-ui/react-icons";
import React, { type ReactNode } from "react";

const TopBarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-22 bg-white">
      <div className="container mx-auto flex h-full items-center">
        {children}
      </div>
    </div>
  );
};

export const TopBar = () => {
  return (
    <TopBarContainer>
      <div className="flex items-center">
        <Button size="icon" variant="secondary" className="mr-5 rounded-full">
          <ArrowLeftIcon className="h-5 w-5 stroke-2" />
        </Button>

        <div className="flex items-center">
          <FileTextIcon className="mr-2 h-6 w-6 stroke-2" />
          <h1 className="font-mono text-base font-bold">
            Boluwatife Abiola - Frontend Developer Contract
          </h1>
        </div>
      </div>
    </TopBarContainer>
  );
};
