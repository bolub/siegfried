import React from "react";
import { type ContractFormControlType } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/interface";
import { TipTapEditor } from "@/containers/contracts-[action]/components/ContractEditor/TipTapEditor";
import { Controller } from "react-hook-form";
import { type SingleContractType } from "@/pages/contracts/edit/[id]";

export const ContractEditor = ({
  control,
  contract,
  disabled,
}: {
  control: ContractFormControlType;
  contract?: SingleContractType | null;
  disabled?: boolean;
}) => {
  return (
    <Controller
      name="contractContent"
      control={control}
      render={({ field, fieldState }) => (
        <TipTapEditor
          description={field.value}
          onChange={field.onChange}
          error={fieldState?.error}
          disabled={disabled}
        />
      )}
      defaultValue={contract?.content}
      rules={{
        required: {
          value: true,
          message: "Please add contract content",
        },
      }}
    />
  );
};
