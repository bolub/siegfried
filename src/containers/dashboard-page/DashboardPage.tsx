import { Appshell } from "@/components/Appshell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Stats } from "@/containers/dashboard-page/components/Stats";
import { ActivityList } from "@/containers/dashboard-page/components/ActivityList";

export const DashboardPage = () => {
  return (
    <Appshell title="Dashboard">
      <PageHeader title="Dashboard">
        <Button size="lg" asChild className="hidden md:flex">
          <Link href={routes.contracts.new()}>
            <PlusIcon className="mr-2" />
            New contract
          </Link>
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Stats />
      </div>

      {/* Activity */}
      <div className="mt-22">
        <h2 className="font-mono text-xl font-bold">Recent Activity</h2>

        <div className="mt-8 flex flex-col gap-6">
          <ActivityList />
        </div>
      </div>
    </Appshell>
  );
};
