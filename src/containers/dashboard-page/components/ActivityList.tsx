import { Empty } from "@/components/Empty";
import { ActivityComponent } from "@/containers/dashboard-page/components/ActivityComponent";
import { type DashboardType } from "@/pages/dashboard";
import { FileBarChart2 } from "lucide-react";

export const ActivityList = ({
  activities,
}: {
  activities: DashboardType["recentActivities"];
}) => {
  if (activities.length === 0)
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
      {activities.map((activity) => {
        const isContractCreated = activity.action === "CONTRACT_CREATED";
        const user = isContractCreated
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
