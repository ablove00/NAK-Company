import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const loadFromStorage = useAuthStore((state) => state.loadFromStorage);
  const checkTokenExpired = useAuthStore((state) => state.checkTokenExpired);
  const navigate = useNavigate();

  useEffect(() => {
    loadFromStorage();

    const interval = setInterval(() => {
      if (checkTokenExpired() && useAuthStore.getState().token) {
        toast.error(t("session_expired"));
        navigate("/signin");
      }
    }, 5 * 1000); 

    return () => clearInterval(interval);
  }, [loadFromStorage, checkTokenExpired, navigate]);

  return <>{children}</>;
}