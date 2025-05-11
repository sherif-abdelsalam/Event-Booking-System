import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const RoleRoute = ({ children, roles }) => {
  const { hasRole, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleRoute;
