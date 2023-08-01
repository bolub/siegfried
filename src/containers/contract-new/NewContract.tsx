import React from "react";
import { ContractTitleEditor } from "@/containers/contract-new/components/ContractTitleEditor";
import { ContractEditor } from "@/containers/contract-new/components/ContractEditor";
import { ContractSigners } from "@/containers/contract-new/components/ContractSigners";

export const NewContractPage = () => {
  return (
    <div>
      <ContractTitleEditor />
      <ContractEditor />
      <ContractSigners />
    </div>
  );
};
