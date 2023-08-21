import React from "react";
import { Appshell } from "./components/Appshell";
import { Button, Text } from "@react-email/components";

export const ContractUpdated = ({
  contractName = "Frontend Contract Agreement",
  contractUrl = "https://example.com",
}: {
  contractName: string;
  contractUrl: string;
}) => {
  return (
    <Appshell>
      <Text className="text-xl font-bold">Hello,</Text>

      <Text className="mt-5 text-base">
        <span className="font-bold">{contractName}</span> was updated. Please
        review
      </Text>

      <Button
        href={contractUrl}
        className="mt-8 rounded-lg bg-[#101828] px-[18px] py-[10px] text-center text-base font-bold text-white"
      >
        View and Sign
      </Button>
    </Appshell>
  );
};

export default ContractUpdated;
