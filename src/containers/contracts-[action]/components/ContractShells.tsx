import React, { type ReactNode } from "react";

export const ContractMainWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-22 flex w-full flex-col lg:flex-row">{children}</div>
  );
};

export const ContractContentShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto flex w-full py-10">
      <div className="mx-auto w-full lg:ml-16 lg:max-w-[748px]">{children}</div>
    </div>
  );
};

export const ContractSignersActivityShell = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="relative mx-auto mt-5 w-full max-w-[424px] bg-white lg:mx-0 lg:mt-0">
      <div className="sticky top-20">{children}</div>
    </div>
  );
};
