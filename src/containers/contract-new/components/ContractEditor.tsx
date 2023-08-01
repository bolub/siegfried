/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { type ContractFormRegisterType } from "@/containers/contract-new/NewContract";

export const ContractEditor = ({
  register,
}: {
  register: ContractFormRegisterType;
}) => {
  return (
    <div className="container mx-auto my-10">
      <div className="ml-16 w-full max-w-[748px] border bg-white p-8">
        <textarea
          className="w-full rounded-none text-base focus-visible:outline-none"
          autoFocus
          {...register("contractContent", {
            required: true,
          })}
        ></textarea>
      </div>
    </div>
  );
};
