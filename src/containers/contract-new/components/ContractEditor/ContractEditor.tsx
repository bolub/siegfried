import React from "react";
import { type ContractFormControlType } from "@/containers/contract-new/components/ContractSigners/interface";
import { TipTapEditor } from "./TipTapEditor";
import { Controller } from "react-hook-form";

export const ContractEditor = ({
  control,
}: {
  control: ContractFormControlType;
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
