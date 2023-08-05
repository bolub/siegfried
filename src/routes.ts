export const routes = {
  login: () => "/login",
  dashboard: () => "/dashboard",
  contracts: {
    all: () => "/contracts",
    new: () => "/contracts/new",
    view: (id: string) => `/contracts/${id}`,
  },
};
