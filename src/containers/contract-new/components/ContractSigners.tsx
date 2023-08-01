import { Users2Icon } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const ContractSigners = () => {
  return (
    <div className="fixed right-0 top-0 mt-22 h-full w-full max-w-[424px] bg-white p-8">
      <div className="flex items-center">
        <Users2Icon className="mr-2 h-5 w-5" />
        <h2 className="text-sm font-bold">Signers</h2>
      </div>

      <div className="mt-5">
        {/* signer name */}
        <div className="grid w-full gap-1.5">
          <Label htmlFor="name">Signer Name</Label>
          <Input
            type="signer-name"
            id="signer-name"
            placeholder="Enter signer name"
          />
        </div>

        {/* signer email */}
        <div className="mt-6 grid w-full gap-1.5">
          <Label htmlFor="email">Signer Email</Label>
          <Input
            type="signer-email"
            id="signer-email"
            placeholder="Enter signer email"
          />
        </div>

        <Button className="mt-6" size="sm" variant="secondary">
          Save
        </Button>
      </div>
    </div>
  );
};
