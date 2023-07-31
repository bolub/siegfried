import { Appshell } from "@/components/Appshell";
import { routes } from "@/routes";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSidePropsContext } from "next";

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const session = await getServerAuthSession(ctx);
//   const userId = session?.user?.id;
//   if (!userId) {
//     return {
//       props: {},
//       redirect: {
//         destination: routes.login(),
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };

export default function Dashboard() {
  return (
    <Appshell>
      <p>Hello from dashboard</p>
    </Appshell>
  );
}
