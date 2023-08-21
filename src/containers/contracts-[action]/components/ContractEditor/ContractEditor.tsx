import React from "react";
import { type ContractFormControlType } from "@/containers/contracts-[action]/components/ContractSigners/interface";
import { TipTapEditor } from "./TipTapEditor";
import { Controller } from "react-hook-form";
import { type SingleContractType } from "@/pages/contracts/edit/[id]";

export const ContractEditor = ({
  control,
  contract,
}: {
  control: ContractFormControlType;
  contract?: SingleContractType | null;
}) => {
  return (
    <div className="container mx-auto mb-10 mt-32">
      <Controller
        name="contractContent"
        control={control}
        render={({ field, fieldState }) => (
          <TipTapEditor
            description={field.value}
            onChange={field.onChange}
            error={fieldState?.error}
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
    </div>
  );
};
