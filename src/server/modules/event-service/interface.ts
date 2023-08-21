import { type TypedEventEmitter } from "./impl";
import {
  type Contract as PrismaContract,
  type ContractRecipient,
} from "@prisma/client";

export interface SiegfriedEvents {
  CONTRACT_CREATED: {
    contract: PrismaContract & {
      recipients: ContractRecipient[];
    };
    user: {
      name?: string | null;
      id?: string;
    };
  }[];
  CONTRACT_OPENED: {
    userId: string;
    contractId: string;
    recipientId: string;
  }[];
  CONTRACT_SIGNED: {
    userId: string;
    contractId: string;
    recipientId: string;
  }[];
  CONTRACT_UPDATED: {
    contract: PrismaContract & {
      recipients: ContractRecipient[];
    };
    user: {
      name?: string | null;
      id?: string;
    };
  }[];
}

export interface EventServiceTypes {
  Emitter: TypedEventEmitter<SiegfriedEvents>;
}
