import { createContext, ReactNode, useContext } from "react";
import { RootStore } from "stores/root-store";

const StoreContext = createContext(new RootStore());

type Props = {
  children: ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  const rootStore = new RootStore();

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStoreContext = () => useContext(StoreContext);
