import { type ContractSigners } from "@/containers/contract-new/components/ContractSigners/interface";
import { type Contract } from "@prisma/client";

export interface ContractServiceType {
  create: (args: {
    contract: {
      contractName: string;
      contractContent: string;
      signers: ContractSigners;
    };
    user: {
      name?: string | null;
    };
  }) => Promise<Contract | null>;
}
