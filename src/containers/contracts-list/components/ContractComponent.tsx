import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { type Contract } from "@prisma/client";
import { PencilLine } from "lucide-react";
import React from "react";

export const ContractComponent = ({ contract }: { contract: Contract }) => {
  return (
    <div className="border-[rgba(0, 0, 0, 0.08)] w-full rounded-lg border bg-white">
      {/* top */}
      <div className="mt-6 flex items-center space-x-[20px] px-8">
        <div className="border-[rgba(0, 0, 0, 0.08)] flex h-[50px] w-[50px] items-center justify-center rounded-lg border-[1.5px] bg-[#f9fafb]">
          <PencilLine className="h-6 w-6" />
        </div>

        <h3 className="truncate font-mono text-base font-bold">
          {contract.name}
        </h3>
      </div>

      {/* bottom */}
      <div className="mt-8 flex flex-col space-y-[22px] px-8 pb-9">
        <div className="flex w-full items-center justify-between">
          <span className="font-medium text-[#667085]">Created on</span>
          <p>{formatDate(contract.createdAt)}</p>
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="font-medium text-[#667085]">Status</span>
          <Badge
            variant={contract.status === "PENDING" ? "secondary" : "success"}
            className="text-sm"
          >
            {contract.status}
          </Badge>
        </div>
      </div>
    </div>
  );
};
