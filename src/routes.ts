export const routes = {
  home: () => "/" as const,
  login: () => "/login" as const,
  dashboard: () => "/dashboard" as const,
  contracts: {
    all: () => "/contracts" as const,
    new: () => "/contracts/new" as const,
    view: (id: string) => `/contracts/${id}` as const,
    signed: (name: string) => `/contracts/signed?name=${name}` as const,
  },
};
