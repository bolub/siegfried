import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/utils/api";
import React from "react";

const StatShimmer = () => {
  return (
    <div className="border-[rgba(0, 0, 0, 0.08)] rounded-lg border bg-white px-8 pb-10 pt-8">
      <Skeleton className="h-5 w-32 bg-gray-300" />

      <Skeleton className="mt-4 h-10 w-6 bg-gray-300" />
    </div>
  );
};

export const Stat = ({
  label,
  value = 0,
}: {
  label: string;
  value?: string | number;
}) => {
  return (
    <div className="border-[rgba(0, 0, 0, 0.08)] rounded-lg border bg-white px-8 pb-10 pt-8">
      <p className="font-medium text-[#667085]">{label}</p>

      <p className="mt-4 text-4xl font-bold">{value}</p>
    </div>
  );
};

export const Stats = () => {
  const { data: stats, isLoading } = api.contract.stats.useQuery();

  if (isLoading)
    return (
      <>
        <StatShimmer />
        <StatShimmer />
        <StatShimmer />
      </>
    );

  return (
    <>
      <Stat label="All contracts" value={stats?.total} />
      <Stat label="Signed contracts" value={stats?.signed} />
      <Stat label="Pending contracts" value={stats?.pending} />
    </>
  );
};
