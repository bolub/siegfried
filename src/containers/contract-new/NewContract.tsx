/* eslint-disable @typescript-eslint/no-misused-promises */

import React from "react";
import { ContractTitleEditor } from "@/containers/contract-new/components/ContractTitleEditor";
import { ContractEditor } from "@/containers/contract-new/components/ContractEditor/ContractEditor";
import { ContractSigners } from "@/containers/contract-new/components/ContractSigners/ContractSigners";
import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
  type Control,
} from "react-hook-form";
import { z } from "zod";
import { useLeavePageConfirm } from "@/hooks/useLeavePageConfirm";

const formDataSchema = z.object({
  contractName: z.string(),
  contractContent: z.string(),
  signers: z.any(),
});

export type ContractFormData = z.infer<typeof formDataSchema>;
export type ContractFormRegisterType = UseFormRegister<ContractFormData>;
export type ContractFormControlType = Control<ContractFormData>;

export const NewContractPage = () => {
  useLeavePageConfirm({
    message:
      "Are you sure you want to leave this page? you still have unsaved changes",
  });

  const { handleSubmit, register, control } = useForm<ContractFormData>();

  const onSubmit: SubmitHandler<ContractFormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContractTitleEditor register={register} />
      <ContractEditor control={control} />
      <ContractSigners register={register} />
    </form>
  );
};
