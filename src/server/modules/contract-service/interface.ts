import { type ContractSigners } from "@/containers/contract-new/components/ContractSigners/interface";
import { type Activity, type Contract } from "@prisma/client";

export interface ContractServiceType {
  create: (args: {
    contract: {
      contractName: string;
      contractContent: string;
      signers: ContractSigners;
    };
    user: {
      name?: string | null;
      id?: string;
    };
  }) => Promise<Contract | null>;

  signContract: (args: {
    contractContent: string;
    contractId: string;
    userId: string;
    recipientId: string;
  }) => Promise<void>;

  sendContractSignedEmail: (args: {
    contractId: string;
    recipientId: string;
  }) => Promise<string>;

  markContractAsOpened: (args: {
    contractId: string;
    userId: string;
    recipientId: string;
  }) => Promise<Activity | null>;

  stats: (args: { userId: string }) => Promise<{
    total: number;
    signed: number;
    pending: number;
  }>;
}
