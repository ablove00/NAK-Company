// hooks/useConfirm.tsx
import React, { createContext, useContext, useState } from "react";
import { ConfirmModal } from "../components/ConfirmModal";

type ConfirmFn = (message: string) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn>(() => Promise.resolve(false));

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState("");
  const [resolver, setResolver] = useState<(value: boolean) => void>(() => {});

  const confirm: ConfirmFn = (msg) => {
    setMessage(msg);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    resolver(true);
    setMessage("");
  };
  const handleCancel = () => {
    resolver(false);
    setMessage("");
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {message && (
        <ConfirmModal message={message} onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
