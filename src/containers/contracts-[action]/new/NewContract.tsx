import React, { useState } from "react";
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
import { type SingleContractType } from "@/pages/contracts/edit/[id]";

export const NewContractPage = ({
  contract,
}: {
  contract?: SingleContractType | null;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [buttonAction, setButtonAction] = useState<"create" | "update">(
    "create"
  );

  const {
    mutate: createContract,
    isLoading: createContractLoading,
    isSuccess: isContractCreatedSuccessfully,
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

  const {
    mutate: saveContractAsDraft,
    isLoading: saveContractAsDraftLoading,
    isSuccess: isContractSavedSuccessfully,
  } = api.contract.save.useMutation({
    onSuccess() {
      toast({
        title: "Success",
        description: "Contract saved successfully",
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
    isConfirm: !isContractCreatedSuccessfully && !isContractSavedSuccessfully,
  });

  const onSubmit: SubmitHandler<ContractFormData> = (data) => {
    if (buttonAction === "create") {
      createContract({
        id: contract?.id,
        ...data,
      });
    } else {
      saveContractAsDraft({
        id: contract?.id,
        ...data,
      });
    }
  };

  const { handleSubmit, register, control, watch } =
    useForm<ContractFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ContractTitleEditor contract={contract} register={register} />

      <ContractMainWrapper>
        <ContractContentShell>
          <ContractEditor contract={contract} control={control} />
        </ContractContentShell>

        <ContractSignersActivityShell>
          <ContractSignersAndActivity
            contract={contract}
            hideActivity
            register={register}
          >
            <ContractSignersFooter
              setButtonAction={setButtonAction}
              isLoading={createContractLoading || saveContractAsDraftLoading}
              action="Send Contract"
              contract={{
                name: watch("contractName") || contract?.name,
                content: watch("contractContent") || contract?.content,
                status: contract?.status,
              }}
            />
          </ContractSignersAndActivity>
        </ContractSignersActivityShell>
      </ContractMainWrapper>
    </form>
  );
};
