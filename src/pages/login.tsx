import { LoginPage } from "@/containers/Login/Login";
import { routes } from "@/routes";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSidePropsContext } from "next";

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  // const session = await getServerAuthSession(ctx);
  // const userId = session?.user?.id;

  // if (userId) {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: routes.dashboard(),
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};

export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}
