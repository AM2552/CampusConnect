import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./helpers/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth();

  if (!authState) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;