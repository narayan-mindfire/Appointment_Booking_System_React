import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/app.context";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: "doctor" | "patient";
}

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const { state } = useAppContext();
  const user = state.token;
  if (!user) {
    return <Navigate to="/unauthenticated" replace />;
  }
  if (role && role !== state.userType) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
}
