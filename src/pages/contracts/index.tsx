import { ContractsPage } from "@/containers/contracts-list/Contracts";
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

  await trpcHelpers.contract.list.prefetch();

  return {
    props: {
      trpcState: trpcHelpers.dehydrate(),
    },
  };
};

export default function Contracts() {
  return <ContractsPage />;
}
