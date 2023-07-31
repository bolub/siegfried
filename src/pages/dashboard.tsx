import { Appshell } from "@/components/Appshell";
import { useSession } from "next-auth/react";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Dashboard() {
  const session = useSession();
  console.log(session);
  return (
    <Appshell>
      <p>Hello from dashboard</p>
    </Appshell>
  );
}
