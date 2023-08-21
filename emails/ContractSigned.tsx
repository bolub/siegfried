import React from "react";
import { Appshell } from "./components/Appshell";
import { Text } from "@react-email/components";

export const ContractSigned = ({
  contractName = "Frontend Contract Agreement",
}: {
  contractName: string;
}) => {
  return (
    <Appshell title="Contract signed successfully">
      <Text className="text-xl font-bold">Hello,</Text>

      <Text className="mt-5 text-base">
        <span className="font-bold">{contractName}</span> has been signed
        successfully
      </Text>
    </Appshell>
  );
};

export default ContractSigned;
