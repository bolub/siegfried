/* eslint-disable @typescript-eslint/no-misused-promises */

import React from "react";
import { ContractTitleEditor } from "@/containers/contract-new/components/ContractTitleEditor";
import { ContractEditor } from "@/containers/contract-new/components/ContractEditor/ContractEditor";
import { ContractSigners } from "@/containers/contract-new/components/ContractSigners/ContractSigners";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLeavePageConfirm } from "@/hooks/useLeavePageConfirm";
import { type ContractFormData } from "@/containers/contract-new/components/ContractSigners/interface";
import { api } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const NewContractPage = () => {
  const { toast } = useToast();

  useLeavePageConfirm({
    message:
      "Are you sure you want to leave this page? you still have unsaved changes",
  });

  const { mutate: createContract, isLoading: createContractLoading } =
    api.contract.create.useMutation({
      onSuccess(data) {
        console.log(data);
        toast({
          title: "Success",
          description: "Contract sent successfully",
        });
      },
      onError() {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      },
    });

  const onSubmit: SubmitHandler<ContractFormData> = (data) => {
    createContract(data);
  };

  const { handleSubmit, register, control } = useForm<ContractFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContractTitleEditor register={register} />
      <ContractEditor control={control} />
      <ContractSigners
        register={register}
        createContractLoading={createContractLoading}
      />
    </form>
  );
};
