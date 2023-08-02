import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type ContractFormRegisterType } from "../../NewContract";

export const SignerInputs = ({
  index,
  onRemove,
  register,
  isMultipleSignersAdded,
}: {
  index: number;
  onRemove: () => void;
  register: ContractFormRegisterType;
  isMultipleSignersAdded: boolean;
}) => {
  const regName = `signers.signer${index}.name` as `signers.${string}`;
  const regEmail = `signers.signer${index}.email` as `signers.${string}`;

  return (
    <>
      <div className="py-7 first:border-b">
        <div className="grid w-full gap-2">
          <Label htmlFor="name">Signer Name</Label>
          <Input
            type="text"
            id={regName}
            placeholder="Enter signer name"
            {...register(regName, {
              required: true,
            })}
          />
        </div>

        <div className="mt-6 grid w-full gap-2">
          <Label htmlFor="email">Signer Email</Label>
          <Input
            type="email"
            id={regEmail}
            placeholder="Enter signer email"
            {...register(regEmail, {
              required: true,
            })}
          />
        </div>

        {isMultipleSignersAdded && (
          <Button
            type="button"
            onClick={onRemove}
            className="mt-4 bg-red-100 text-sm text-red-500"
            variant="secondary"
            size="sm"
          >
            Remove
          </Button>
        )}
      </div>
    </>
  );
};
