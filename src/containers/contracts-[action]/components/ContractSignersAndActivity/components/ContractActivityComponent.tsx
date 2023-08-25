import { type ActivityType } from "@prisma/client";
import { ContentToActivity } from "@/containers/dashboard-page/utils";
import { ArrowUpRight, Check, EyeIcon, RefreshCcw } from "lucide-react";
import { formatDateFromNow } from "@/lib/time";
import { Skeleton } from "@/components/ui/skeleton";

export const IconToActivity: Record<ActivityType, any> = {
  CONTRACT_CREATED: <ArrowUpRight className="h-[18px] w-[18px] " />,
  CONTRACT_OPENED: <EyeIcon className="h-[18px] w-[18px] " />,
  CONTRACT_SIGNED: <Check className="h-[18px] w-[18px] " />,
  CONTRACT_UPDATED: <RefreshCcw className="h-[18px] w-[18px] " />,
};

const CirclePlusIcon = ({ status }: { status: ActivityType }) => {
  return (
    <div className="border-rgba(0, 0, 0, 0.08) flex h-[38px] w-[38px] items-center justify-center rounded-full border bg-white">
      <span>{IconToActivity[status]}</span>
    </div>
  );
};

export const ContractActivityShimmer = () => {
  return (
    <>
      <div className="flex w-full flex-wrap items-center">
        {/* circle */}
        <Skeleton className="h-[38px] w-[38px] rounded-full bg-gray-300" />

        {/* long rectangle */}
        <div className="ml-4">
          <Skeleton className="h-2 w-[150px] bg-gray-300" />
        </div>
      </div>
    </>
  );
};

export const ContractActivityComponent = ({
  status,
  user,
  timestamp,
}: {
  status: ActivityType;
  user: string;
  timestamp: Date;
}) => {
  return (
    <div className="flex w-full">
      <CirclePlusIcon status={status} />

      <div className="ml-3 text-sm">
        <p className="">
          Contract {ContentToActivity[status]} by <b>{user}</b>
        </p>

        <p className="mt-1 text-sm">{formatDateFromNow(timestamp)}</p>
      </div>
    </div>
  );
};
