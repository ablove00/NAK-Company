import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useNetworkStatus() {
  const { t } = useTranslation();
  const [online, setOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setOnline(true);
      toast.dismiss();
      toast.success(t("back_online"));
    };
    const handleOffline = () => {
      setOnline(false);
      toast.error(t("you_are_offline"));
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return online;
}
