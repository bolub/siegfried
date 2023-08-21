import { Empty } from "@/components/Empty";
import {
  ActivityComponent,
  ActivityShimmer,
} from "@/containers/dashboard-page/components/ActivityComponent";
import { api } from "@/utils/api";
import { FileBarChart2 } from "lucide-react";

export const ActivityList = () => {
  const { data: activities, isLoading } = api.activity.recent.useQuery();

  if (isLoading)
    return (
      <>
        <ActivityShimmer />
        <ActivityShimmer />
        <ActivityShimmer />
      </>
    );

  if (activities?.length === 0)
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <Empty
          icon={<FileBarChart2 className="h-6 w-6" />}
          title="No Activity"
          description="Get started by creating a new contract"
        />
      </div>
    );

  return (
    <>
      {activities?.map((activity) => {
        const isContractCreated = activity.action === "CONTRACT_CREATED";
        const isContractUpdated = activity.action === "CONTRACT_UPDATED";

        const user =
          isContractCreated || isContractUpdated
            ? activity.contract.user.name
            : activity.recipient?.name;

        return (
          <ActivityComponent
            key={activity.id}
            status={activity.action}
            user={user || ""}
            contract={activity.contract?.name || ""}
            timestamp={activity.timestamp}
          />
        );
      })}
    </>
  );
};
