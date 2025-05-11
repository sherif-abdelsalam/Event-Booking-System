import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Element {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
