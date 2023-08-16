import React from "react";

export const Stat = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="border-[rgba(0, 0, 0, 0.08)] rounded-lg border bg-white px-8 pb-10 pt-8">
      <p className="font-medium text-[#667085]">{label}</p>

      <p className="mt-4 text-4xl font-bold">{value}</p>
    </div>
  );
};
