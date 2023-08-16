import { type ActivityType } from "@prisma/client";
import { ContentToActivity } from "@/containers/dashboard-page/utils";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ArrowUpRight, Check, EyeIcon } from "lucide-react";

export const IconToActivity: Record<ActivityType, any> = {
  CONTRACT_CREATED: <ArrowUpRight />,
  CONTRACT_OPENED: <EyeIcon />,
  CONTRACT_SIGNED: <Check />,
};

const CirclePlusIcon = ({ status }: { status: ActivityType }) => {
  return (
    <div className="border-rgba(0, 0, 0, 0.08) flex h-[50px] w-[50px] items-center justify-center rounded-full border bg-white">
      <span className="h-6 w-6">{IconToActivity[status]}</span>
    </div>
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
    <div className="flex flex-wrap items-center">
      <CirclePlusIcon status={status} />

      <div className="ml-4">
        <p>
          {user} {ContentToActivity[status]} <b>{contract}</b>
        </p>
      </div>

      <div className="ml-2 flex items-center gap-2">
        <span className="mb-3 text-2xl font-bold">.</span>

        <p>{formatDate(timestamp)}</p>
      </div>
    </div>
  );
};
