import { NewContractPage } from "@/containers/contract-new/NewContract";

import { routes } from "@/routes";
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

  return {
    props: {},
  };
};

export default function NewContract() {
  return <NewContractPage />;
}
