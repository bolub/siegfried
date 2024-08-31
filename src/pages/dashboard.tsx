import { DashboardPage } from "@/containers/dashboard-page/DashboardPage";
import { routes } from "@/routes";
import { trpcHelpers } from "@/server/api/root";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      redirect: {
        destination: routes.login(),
        permanent: false,
      },
    };
  }

  await trpcHelpers.contract.stats.prefetch();
  await trpcHelpers.activity.recent.prefetch();

  return {
    props: {
      trpcState: trpcHelpers.dehydrate(),
    },
  };
};

export default function Dashboard() {
  return <DashboardPage />;
}
