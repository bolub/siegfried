import { Users2Icon } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type ContractFormRegisterType } from "@/containers/contract-new/NewContract";

export const ContractSigners = ({}: { register: ContractFormRegisterType }) => {
  return (
    <div className="fixed right-0 top-0 mt-22 h-full w-full max-w-[424px] bg-white">
      <div className="flex h-full flex-col">
        <div className="p-8">
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

        <div className="mb-22 mt-auto w-full border-t p-6">
          <Button variant="secondary" className="w-full" size="lg">
            Preview
          </Button>
          <Button type="submit" className="mt-3 w-full" size="lg">
            Send Contract
          </Button>
        </div>
      </div>
    </div>
  );
};
