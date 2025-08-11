import { createContext, useContext } from "react";
import { useNetworkStatus } from "./useNetworkStatus";

const NetworkStatusContext = createContext<boolean>(true);

export const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const online = useNetworkStatus();
  return (
    <NetworkStatusContext.Provider value={online}>
      {children}
    </NetworkStatusContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkStatusContext);