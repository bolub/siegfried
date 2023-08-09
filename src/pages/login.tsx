import { LoginPage } from "@/containers/login-page/Login";
import { routes } from "@/routes";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const session = await getServerAuthSession(ctx);
    const userId = session?.user?.id;

    if (userId) {
      return {
        props: {},
        redirect: {
          destination: routes.dashboard(),
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        error,
      },
    };
  }
};

export default function Login() {
  return (
    <>
      <LoginPage />
    </>
  );
}
