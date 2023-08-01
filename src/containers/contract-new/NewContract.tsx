/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import React from "react";
import { ContractTitleEditor } from "@/containers/contract-new/components/ContractTitleEditor";
import { ContractEditor } from "@/containers/contract-new/components/ContractEditor/ContractEditor";
import { ContractSigners } from "@/containers/contract-new/components/ContractSigners";
import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form";
import { z } from "zod";

const formDataSchema = z.object({
  contractName: z.string(),
  contractContent: z.string(),
});

type ContractFormData = z.infer<typeof formDataSchema>;
export type ContractFormRegisterType = UseFormRegister<ContractFormData>;

export const NewContractPage = () => {
  const { handleSubmit, register } = useForm<ContractFormData>();

  const onSubmit: SubmitHandler<ContractFormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContractTitleEditor register={register} />
      <ContractEditor register={register} />
      <ContractSigners register={register} />
    </form>
  );
};
