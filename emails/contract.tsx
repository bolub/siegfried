import React from "react";
import { Appshell } from "./components/Appshell";
import { Button, Text } from "@react-email/components";

const Contract = ({
  contractName = "Frontend Contract Agreement",
  contractUrl = "https://example.com",
}: {
  contractName: string;
  contractUrl: string;
}) => {
  return (
    <Appshell>
      <Text className="text-base font-bold">Hello</Text>

      <Text className="mt-5 text-base">
        Chilaka Chinedu has sent you a <b>{contractName}</b> to review and sign
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

export default Contract;
