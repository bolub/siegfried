import { Appshell } from "@/components/Appshell";
import { useSession } from "next-auth/react";
// import { routes } from "@/routes";
// import { authOptions } from "@/server/auth";
// import { type GetServerSidePropsContext } from "next";
// import { getServerSession } from "next-auth";

// export const getServerSideProps = async ({
//   req,
//   res,
// }: GetServerSidePropsContext) => {
//   const session = await getServerSession(req, res, authOptions);

//   if (session?.user && session.user.id) {
//     return {
//       redirect: {
//         destination: routes.dashboard(),
//         permanent: false,
//       },
//     };
//   } else {
//     return {
//       props: {},
//     };
//   }
// };

export default function Dashboard() {
  const session = useSession();
  console.log(session);
  return (
    <Appshell>
      <p>Hello from dashboard</p>
    </Appshell>
  );
}
