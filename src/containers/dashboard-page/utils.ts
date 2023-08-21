import { type ActivityType } from "@prisma/client";

export const ContentToActivity: Record<ActivityType, string> = {
  CONTRACT_CREATED: "sent",
  CONTRACT_OPENED: "opened",
  CONTRACT_SIGNED: "signed",
  CONTRACT_UPDATED: "updated",
};
