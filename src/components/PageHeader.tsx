import React, { type ReactNode } from "react";

export const PageHeader = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <h1 className="font-mono text-xl font-bold md:text-3xl">{title}</h1>

      {children}
    </div>
  );
};
