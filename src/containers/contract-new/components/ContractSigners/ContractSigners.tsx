import { PlusIcon, Users2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ContractFormRegisterType } from "@/containers/contract-new/NewContract";
import { SignerInputs } from "./SignerInputs";
import { useState } from "react";

export const ContractSignersFooter = () => {
  return (
    <div className="mb-22 mt-auto w-full border-t p-6">
      <Button variant="secondary" className="w-full" size="lg">
        Preview
      </Button>
      <Button type="submit" className="mt-3 w-full" size="lg">
        Send Contract
      </Button>
    </div>
  );
};

export const ContractSignersInner = ({
  register,
}: {
  register: ContractFormRegisterType;
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
            index={index}
            register={register}
            isMultipleSignersAdded={indexes.length > 1}
            onRemove={() => {
              setIndexes((prevIndexes) => [
                ...prevIndexes.filter((item) => item !== index),
              ]);
              setCounter((prevCounter) => prevCounter - 1);
            }}
          />
        );
      })}

      {indexes.length < 2 && (
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
}: {
  register: ContractFormRegisterType;
}) => {
  return (
    <div className="fixed right-0 top-0 mt-22 h-full w-full max-w-[424px] bg-white">
      <div className="flex h-full flex-col">
        <div className="h-[80vh] overflow-y-auto p-8">
          <div className="flex items-center">
            <Users2Icon className="mr-2 h-5 w-5" />
            <h2 className="text-sm font-bold">Signers (Max of 2)</h2>
          </div>

          <ContractSignersInner register={register} />
        </div>

        <ContractSignersFooter />
      </div>
    </div>
  );
};
