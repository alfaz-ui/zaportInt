// src/routes/ProtectedRoute.jsx
import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const token = localStorage.getItem("access_token");

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="text" width={200} height={30} />
        <Skeleton variant="text" width={150} height={20} />
        <Typography fontStyle="italic" color="#868999">
          Loading
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
