import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
