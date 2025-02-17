import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, isLoading, children }) => {
  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
