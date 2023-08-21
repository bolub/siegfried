import { type ActivityType } from "@prisma/client";
import { ContentToActivity } from "@/containers/dashboard-page/utils";
import { ArrowUpRight, Check, EyeIcon, RefreshCcw } from "lucide-react";
import { formatDateFromNow } from "@/lib/time";
import { Skeleton } from "@/components/ui/skeleton";

export const IconToActivity: Record<ActivityType, any> = {
  CONTRACT_CREATED: <ArrowUpRight className="h-4 w-4 md:h-6 md:w-6" />,
  CONTRACT_OPENED: <EyeIcon className="h-4 w-4 md:h-6 md:w-6" />,
  CONTRACT_SIGNED: <Check className="h-4 w-4 md:h-6 md:w-6" />,
  CONTRACT_UPDATED: <RefreshCcw className="h-4 w-4 md:h-6 md:w-6" />,
};

const CirclePlusIcon = ({ status }: { status: ActivityType }) => {
  return (
    <div className="border-rgba(0, 0, 0, 0.08) flex h-[32px] w-[32px] items-center justify-center rounded-full border bg-white md:h-[50px] md:w-[50px]">
      <span>{IconToActivity[status]}</span>
    </div>
  );
};

export const ActivityShimmer = () => {
  return (
    <>
      <div className="flex w-full flex-wrap items-center">
        {/* circle */}
        <Skeleton className="h-[32px] w-[32px] rounded-full bg-gray-300 md:h-[50px] md:w-[50px]" />

        {/* long rectangle */}
        <div className="ml-4">
          <Skeleton className="h-4 w-[250px] bg-gray-300" />
        </div>
      </div>
    </>
  );
};

export const ActivityComponent = ({
  status,
  user,
  contract,
  timestamp,
}: {
  status: ActivityType;
  user: string;
  contract: string;
  timestamp: Date;
}) => {
  return (
    <div className="flex w-full flex-wrap items-center">
      <CirclePlusIcon status={status} />

      <div className="ml-2 md:ml-4">
        <p className="">
          {user} {ContentToActivity[status]} <b>{contract}</b>
        </p>
      </div>

      <div className="ml-2 flex items-center gap-2">
        <span className="mb-3 text-2xl font-bold">.</span>

        <p className="">{formatDateFromNow(timestamp)}</p>
      </div>
    </div>
  );
};
