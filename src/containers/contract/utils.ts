import { type ContractRecipient } from "@prisma/client";

export const ContractUser = ({
  userId,
  recipients,
}: {
  userId: string;
  recipients: ContractRecipient[];
}) => {
  if (!recipients) return;

  return recipients.filter((recipient) => {
    return recipient.id === userId;
  })[0];
};
