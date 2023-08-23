import { type Activity, type ContractRecipient } from "@prisma/client";

type CustomActivity = Activity & {
  recipient: Pick<ContractRecipient, "name"> | null;
  contract: {
    name: string | null;
    user: {
      name: string | null;
    };
  };
};

export interface ActivityServiceType {
  recent: (args: {
    user: {
      id: string;
    };
  }) => Promise<CustomActivity[]>;

  byContract: (args: {
    user: {
      id: string;
    };
    contractId: string;
  }) => Promise<CustomActivity[]>;
}
