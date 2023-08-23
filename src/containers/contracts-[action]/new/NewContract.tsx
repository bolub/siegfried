import React from "react";
import { ContractTitleEditor } from "@/containers/contracts-[action]/components/ContractTitleEditor";
import { ContractEditor } from "@/containers/contracts-[action]/components/ContractEditor/ContractEditor";
import { ContractSignersAndActivity } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/ContractSignersAndActivity";
import { ContractSignersFooter } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/components/ContractSignersFooter";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLeavePageConfirm } from "@/hooks/useLeavePageConfirm";
import { type ContractFormData } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/interface";
import { api } from "@/utils/api";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/router";
import { routes } from "@/routes";
import {
  ContractContentShell,
  ContractMainWrapper,
  ContractSignersActivityShell,
} from "@/containers/contracts-[action]/components/ContractShells";
export const NewContractPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    mutate: createContract,
    isLoading: createContractLoading,
    isSuccess: hideConfirmationWhenContractIsCreatedSuccessfully,
  } = api.contract.create.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Contract sent successfully",
      });

      void router.push(routes.contracts.all());
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

  useLeavePageConfirm({
    message:
      "Are you sure you want to leave this page? you still have unsaved changes",
    isConfirm: !hideConfirmationWhenContractIsCreatedSuccessfully,
  });

  const onSubmit: SubmitHandler<ContractFormData> = (data) => {
    createContract(data);
  };

  const { handleSubmit, register, control } = useForm<ContractFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContractTitleEditor register={register} />

      <ContractMainWrapper>
        <ContractContentShell>
          <ContractEditor control={control} />
        </ContractContentShell>

        <ContractSignersActivityShell>
          <ContractSignersAndActivity hideActivity register={register}>
            <ContractSignersFooter
              isLoading={createContractLoading}
              action="Send Contract"
            />
          </ContractSignersAndActivity>
        </ContractSignersActivityShell>
      </ContractMainWrapper>
    </form>
  );
};
