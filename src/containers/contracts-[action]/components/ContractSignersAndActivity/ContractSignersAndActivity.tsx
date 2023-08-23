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
    <div className="flex h-full flex-col">
      <div className="overflow-y-auto p-8 md:h-[35vh]">
        <ContractSigners
          register={register}
          contract={contract}
          disabled={disabled}
        />
      </div>

      <div className="w-full overflow-y-auto border-t p-8 md:h-[38vh]">
        <ContractActivityList />
      </div>

      <div className="mt-auto">{children}</div>
    </div>
  );
};
