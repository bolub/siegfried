import { Appshell } from "@/components/Appshell";
import { Button } from "@/components/ui/button";
import React from "react";

export const ContractsPage = () => {
  return (
    <Appshell>
      <div className="flex w-full items-center justify-between">
        <h1>Contracts</h1>

        <Button size="lg">Create contracts</Button>
      </div>
    </Appshell>
  );
};
