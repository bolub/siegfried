import { PlusIcon, Users2Icon } from "lucide-react";
import { type ContractFormRegisterType } from "@/containers/contracts-[action]/components/ContractSigners/interface";
import { SignerInputs } from "@/containers/contracts-[action]/components/ContractSigners/SignerInputs";
import { type ReactNode, useState } from "react";
import { type SingleContractType } from "@/pages/contracts/edit/[id]";

export const ContractSignersInner = ({
  register,
  contract,
  disabled,
}: {
  register: ContractFormRegisterType;
  contract?: SingleContractType | null;
  disabled?: boolean;
}) => {
  const [indexes, setIndexes] = useState<number[]>([0]);
  const [counter, setCounter] = useState(0);

  const addNewSigner = () => {
    if (indexes.length === 2) return;

    setIndexes((prevIndexes) => [...prevIndexes, counter + 1]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <div className="">
      {indexes.map((index) => {
        return (
          <SignerInputs
            key={`signers[${index + 1}]`}
            defaultValue={contract?.recipients[index]}
            index={index}
            register={register}
            isMultipleSignersAdded={indexes.length > 1}
            onRemove={() => {
              setIndexes((prevIndexes) => [
                ...prevIndexes.filter((item) => item !== index),
              ]);
              setCounter((prevCounter) => prevCounter - 1);
            }}
            disabled={disabled}
          />
        );
      })}

      {indexes.length < 1 && (
        <button
          onClick={addNewSigner}
          className="mt-5 flex items-center gap-[6px] text-sm font-bold text-[#667085]"
        >
          <PlusIcon className="h-5 w-5 stroke-2" />
          Add new signer
        </button>
      )}
    </div>
  );
};

export const ContractSigners = ({
  register,
  contract,
  disabled,
  children,
}: {
  register: ContractFormRegisterType;
  contract?: SingleContractType | null;
  disabled?: boolean;
  children: ReactNode;
}) => {
  return (
    <div className="right-0 top-0 mt-22 h-full w-full max-w-[424px] bg-white md:fixed">
      <div className="flex h-full flex-col">
        <div className="h-[80vh] overflow-y-auto p-8">
          <div className="flex items-center">
            <Users2Icon className="mr-2 h-5 w-5" />
            <h2 className="text-sm font-bold">Signers (Max of 1)</h2>
          </div>

          <ContractSignersInner
            register={register}
            contract={contract}
            disabled={disabled}
          />
        </div>

        {children}
      </div>
    </div>
  );
};
