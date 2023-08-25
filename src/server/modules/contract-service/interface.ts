import {
  type ContractSigner,
  type ContractSigners,
} from "@/containers/contracts-[action]/components/ContractSignersAndActivity/interface";
import { type Activity, type Contract } from "@prisma/client";

export type ContractForList = Pick<
  Contract,
  "id" | "name" | "status" | "createdAt"
>;

export type ContractSignerForDraft = ContractSigner & {
  id?: string;
};

export interface ContractServiceType {
  create: (args: {
    contract: {
      id?: string;
      contractName: string;
      contractContent: string;
      signers: ContractSignerForDraft[];
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
  list: (args: { userId: string }) => Promise<ContractForList[]>;
  update: (args: {
    contract: {
      id: string;
      contractName: string;
      contractContent: string;
    };
    user: {
      name?: string | null;
      id?: string;
    };
  }) => Promise<Contract | null>;
  save: (args: {
    contract: {
      id?: string;
      contractName: string;
      contractContent: string;
      signers: ContractSignerForDraft[];
    };
    user: {
      name?: string | null;
      id?: string;
    };
  }) => Promise<Contract | null>;
}
