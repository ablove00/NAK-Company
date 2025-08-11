import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

interface Props {
  children: React.ReactNode;
  requireAuth: boolean;
}

export function AuthRoute({ children, requireAuth }: Props) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}