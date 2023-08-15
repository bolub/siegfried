export const routes = {
  home: () => "/" as const,
  login: () => "/login" as const,
  dashboard: () => "/dashboard" as const,
  contracts: {
    all: () => "/contracts" as const,
    new: () => "/contracts/new" as const,
    view: (id: string) => `/contracts/${id}` as const,
    signed: ({
      recipientId,
      contractId,
    }: {
      recipientId: string;
      contractId: string;
    }) =>
      `/contracts/signed?recipientId=${recipientId}&contractId=${contractId}` as const,
  },
};
