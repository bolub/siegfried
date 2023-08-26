import { NewContractPage } from "@/containers/contracts-[action]/new/NewContract";
import { routes } from "@/routes";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
  type GetServerSideProps,
} from "next";
import { type SingleContractType } from "@/pages/contracts/edit/[id]";
import { decodeHTML } from "@/server/modules/contract-service/utils";

export const getServerSideProps: GetServerSideProps<{
  contract?: SingleContractType | null;
}> = async (ctx: GetServerSidePropsContext) => {
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

  const contractId = ctx.query.id as string;

  if (contractId) {
    const contract = await prisma.contract.findUnique({
      where: {
        id: contractId,
      },
      include: {
        recipients: true,
        user: true,
      },
    });

    const decodedContent = decodeHTML(contract?.content || "");
    if (contract) {
      contract.content = decodedContent;
    }

    return {
      props: {
        contract,
      },
    };
  }

  return {
    props: {},
  };
};

const NewContract = ({
  contract,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <NewContractPage contract={contract} />;
};

export default NewContract;
