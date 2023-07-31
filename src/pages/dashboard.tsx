import { Appshell } from "@/components/Appshell";
import { type GetServerSidePropsContext } from "next";
import { getServerAuthSession } from "@/server/auth";

export default function Dashboard() {
  return (
    <>
      <Appshell>
        <p>Hello from dashboard</p>
      </Appshell>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
