import { Appshell } from "@/components/Appshell";
import { routes } from "@/routes";
import { authOptions } from "@/server/auth";
import { type GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      redirect: {
        destination: routes.dashboard(),
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default function Dashboard() {
  return (
    <Appshell>
      <p>Hello from dashboard</p>
    </Appshell>
  );
}
