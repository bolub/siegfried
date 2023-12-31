import { api } from "@/utils/api";
import { useRouter } from "next/router";
import {
  ContractActivityComponent,
  ContractActivityShimmer,
} from "@/containers/contracts-[action]/components/ContractSignersAndActivity/components/ContractActivityComponent";

export const ContractActivityListInner = () => {
  const router = useRouter();
  const isNewContract = router.pathname.includes("new");
  const { id: contractId } = router.query as { id: string };

  const { data: activities, isLoading } = api.activity.byContract.useQuery(
    {
      contractId,
    },
    {
      enabled: Boolean(contractId),
    }
  );

  if (!isNewContract && isLoading)
    return (
      <>
        <ContractActivityShimmer />
        <ContractActivityShimmer />
        <ContractActivityShimmer />
        <ContractActivityShimmer />
      </>
    );

  if (isNewContract || activities?.length === 0)
    return (
      <div className="flex h-[20vh] items-center justify-center">
        <p className="max-w-[200px] text-center text-sm">
          Activity will be available when you send the contract
        </p>
      </div>
    );

  return (
    <>
      {activities?.map((activity) => {
        const isContractCreated = activity.action === "CONTRACT_CREATED";
        const isContractUpdated = activity.action === "CONTRACT_UPDATED";

        const user =
          isContractCreated || isContractUpdated
            ? activity.contract.user.name
            : activity.recipient?.name;

        return (
          <ContractActivityComponent
            key={activity.id}
            status={activity.action}
            user={user || ""}
            timestamp={activity.timestamp}
          />
        );
      })}
    </>
  );
};

export const ContractActivityList = () => {
  return (
    <>
      <div className="flex items-center">
        <h2 className="font-mono text-sm font-bold">Activity</h2>
      </div>

      <div className="mt-5 flex w-full flex-col space-y-6">
        <ContractActivityListInner />
      </div>
    </>
  );
};
