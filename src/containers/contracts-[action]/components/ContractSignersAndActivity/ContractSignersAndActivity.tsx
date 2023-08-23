import { type ContractFormRegisterType } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/interface";
import { type ReactNode } from "react";
import { type SingleContractType } from "@/pages/contracts/edit/[id]";
import { ContractActivityList } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/components/ContractActivityList";
import { ContractSigners } from "@/containers/contracts-[action]/components/ContractSignersAndActivity/components/ContractSigners";

export const ContractSignersAndActivity = ({
  register,
  contract,
  disabled,
  children,
}: {
  register: ContractFormRegisterType;
  contract?: SingleContractType | null;
  disabled?: boolean;
  children: ReactNode;
  hideActivity?: boolean;
}) => {
  return (
    <div className="right-0 top-0 mt-22 w-full max-w-[424px] bg-white md:fixed">
      <div className="flex h-full flex-col">
        <ContractSigners
          register={register}
          contract={contract}
          disabled={disabled}
        />

        <ContractActivityList />

        <div className="mt-auto">{children}</div>
      </div>
    </div>
  );
};
