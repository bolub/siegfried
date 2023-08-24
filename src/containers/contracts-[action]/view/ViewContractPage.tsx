import React from "react";
import { ContractTitleEditor } from "@/containers/contracts-[action]/components/ContractTitleEditor";
import { ContractEditor } from "@/containers/contracts-[action]/components/ContractEditor/ContractEditor";
import { ContractSignersAndActivity } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/ContractSignersAndActivity";
import { useForm } from "react-hook-form";
import { type ContractFormData } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/interface";
import { type SingleContractType } from "@/pages/contracts/edit/[id]";
import { ContractSignersFooter } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/components/ContractSignersFooter";
import {
  ContractContentShell,
  ContractMainWrapper,
  ContractSignersActivityShell,
} from "@/containers/contracts-[action]/components/ContractShells";

export const ViewContractPage = ({
  contract,
}: {
  contract?: SingleContractType | null;
}) => {
  const { register, control, getValues, watch } = useForm<ContractFormData>();

  const content = getValues("contractName");

  return (
    <form>
      <ContractTitleEditor contract={contract} register={register} disabled />

      <ContractMainWrapper>
        <ContractContentShell>
          <ContractEditor contract={contract} control={control} disabled />
        </ContractContentShell>

        <ContractSignersActivityShell>
          <ContractSignersAndActivity
            contract={contract}
            register={register}
            disabled
          >
            <ContractSignersFooter
              action="Update Contract"
              disabled={contract?.status === "SIGNED"}
              contract={{
                name: watch("contractName") || contract?.name,
                content: watch("contractContent") || contract?.content,
              }}
            />
          </ContractSignersAndActivity>
        </ContractSignersActivityShell>
      </ContractMainWrapper>
    </form>
  );
};
