import React, { type ReactNode } from "react";

export const Empty = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      {icon && (
        <div className="border-[rgba(0, 0, 0, 0.08)] flex h-[50px] w-[50px] items-center justify-center rounded-lg border-[1.5px] bg-white">
          {icon}
        </div>
      )}
      <p className="mt-5  font-medium">{title}</p>
      <p className="mt-1 font-medium text-[#667085]">{description}</p>
    </div>
  );
};
