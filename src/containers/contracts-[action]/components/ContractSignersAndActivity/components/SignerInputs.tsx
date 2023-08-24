import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type ContractFormRegisterType } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/interface";
import { type ContractRecipient } from "@prisma/client";

export const SignerInputs = ({
  index,
  onRemove,
  register,
  isMultipleSignersAdded,
  defaultValue,
  disabled,
}: {
  index: number;
  onRemove: () => void;
  register: ContractFormRegisterType;
  isMultipleSignersAdded: boolean;
  defaultValue?: ContractRecipient;
  disabled?: boolean;
}) => {
  const signerNameLabel = `signers.${index}.name` as const;
  const signerEmailLabel = `signers.${index}.email` as const;

  return (
    <>
      {/* first:border-b */}
      <div className="py-7">
        <div className="grid w-full gap-2">
          <Label htmlFor={signerNameLabel}>Signer Name</Label>
          <Input
            type="text"
            id={signerNameLabel}
            placeholder="Enter signer name"
            {...register(signerNameLabel, {
              required: true,
              value: defaultValue?.name,
            })}
            disabled={disabled}
          />
        </div>

        <div className="mt-6 grid w-full gap-2">
          <Label htmlFor={signerEmailLabel}>Signer Email</Label>
          <Input
            type="email"
            id={signerEmailLabel}
            placeholder="Enter signer email"
            {...register(signerEmailLabel, {
              required: true,
              value: defaultValue?.email,
            })}
            disabled={disabled}
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