import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type ContractFormRegisterType } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/interface";
import { type ContractStatus, type ContractRecipient } from "@prisma/client";

export const SignerInputs = ({
  index,
  onRemove,
  register,
  isMultipleSignersAdded,
  defaultValue,
  disabled,
  contractStatus,
}: {
  index: number;
  onRemove: () => void;
  register: ContractFormRegisterType;
  isMultipleSignersAdded: boolean;
  defaultValue?: ContractRecipient;
  disabled?: boolean;
  contractStatus?: ContractStatus;
}) => {
  const signerNameLabel = `signers.${index}.name` as const;
  const signerEmailLabel = `signers.${index}.email` as const;
  const signerIdLabel = `signers.${index}.id` as const;

  const isDraft = contractStatus === "DRAFT";

  return (
    <>
      {/* first:border-b */}
      <div className="grid w-full gap-2">
        <Label htmlFor={signerNameLabel}>Recipient Name</Label>
        <Input
          type="text"
          id={signerNameLabel}
          placeholder="Enter recipient name"
          {...register(signerNameLabel, {
            required: true,
            value: !isDraft ? defaultValue?.name : undefined,
          })}
          defaultValue={defaultValue?.name}
          disabled={disabled}
        />
      </div>

      <div className="mt-6 grid w-full gap-2">
        <Label htmlFor={signerEmailLabel}>Recipient Email</Label>
        <Input
          type="email"
          id={signerEmailLabel}
          placeholder="Enter recipient email"
          {...register(signerEmailLabel, {
            required: true,
            value: !isDraft ? defaultValue?.email : undefined,
          })}
          defaultValue={defaultValue?.email}
          disabled={disabled}
        />
      </div>

      <Input
        className="hidden"
        id={signerIdLabel}
        placeholder="Enter recipient email"
        {...register(signerIdLabel, {
          value: defaultValue?.id,
        })}
        disabled={disabled}
      />

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
    </>
  );
};
