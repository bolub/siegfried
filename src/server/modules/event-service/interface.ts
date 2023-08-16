import { type TypedEventEmitter } from "./impl";

export interface SiegfriedEvents {
  CONTRACT_CREATED: { userId: string; contractId: string }[];
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
}

export interface EventServiceTypes {
  Emitter: TypedEventEmitter<SiegfriedEvents>;
}
