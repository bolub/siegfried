import { Appshell } from "@/components/Appshell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Stat } from "@/containers/dashboard-page/components/Stat";
import { type DashboardType } from "@/pages/dashboard";
import { ActivityList } from "./components/ActivityList";

export const DashboardPage = ({
  stats,
  recentActivities,
}: {
  stats: DashboardType["stats"];
  recentActivities: DashboardType["recentActivities"];
}) => {
  return (
    <Appshell title="Dashboard">
      <PageHeader title="Dashboard">
        <Button size="lg" asChild>
          <Link href={routes.contracts.new()}>
            <PlusIcon className="mr-2" />
            New contract
          </Link>
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Stat label="All contracts" value={stats.total} />
        <Stat label="Signed contracts" value={stats.signed} />
        <Stat label="Pending contracts" value={stats.pending} />
      </div>

      {/* Activity */}
      <div className="mt-22">
        <h2 className="font-mono text-xl font-bold">Recent Activity</h2>

        <div className="mt-8 flex flex-col gap-6">
          <ActivityList activities={recentActivities} />
        </div>
      </div>
    </Appshell>
  );
};
