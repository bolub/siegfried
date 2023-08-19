import { prisma } from "@/server/db";
import {
  type SiegfriedEvents,
  type EventServiceTypes,
} from "@/server/modules/event-service/interface";
import EventEmitter from "events";
import { sendNewContractEmailsToSigners } from "@/server/modules/contract-service/utils";

export class TypedEventEmitter<TEvents extends Record<string, any>> {
  private emitter = new EventEmitter();

  emit<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    ...eventArg: TEvents[TEventName]
  ) {
    this.emitter.emit(eventName, ...(eventArg as []));
  }

  on<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void
  ) {
    this.emitter.on(eventName, handler as any);
  }

  off<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void
  ) {
    this.emitter.off(eventName, handler as any);
  }
}

const Emitter = new TypedEventEmitter<SiegfriedEvents>();

// Emitter.on("CONTRACT_CREATED", async ({ contractId, userId }) => {
//   await prisma.activity.create({
//     data: {
//       action: "CONTRACT_CREATED",
//       contractId,
//       userId,
//     },
//   });
// });

Emitter.on("CONTRACT_CREATED", async ({ contract, user }) => {
  await prisma.activity.create({
    data: {
      action: "CONTRACT_CREATED",
      contractId: contract.id,
      userId: user?.id || "",
    },
  });

  // TODO: this times out, why?
  await sendNewContractEmailsToSigners({
    contract,
    user,
  });
});

Emitter.on("CONTRACT_SIGNED", async ({ contractId, userId, recipientId }) => {
  await prisma.activity.create({
    data: {
      action: "CONTRACT_SIGNED",
      contractId,
      userId,
      recipientId,
    },
  });
});

export const EventService: EventServiceTypes = {
  Emitter,
};
