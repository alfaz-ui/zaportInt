import React from "react";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/home": "Home",
  "/dashboard": "Dashboard",
  "/search": "Search",
  "/profile": "Profile",
  "/about": "About Us",
};

function Layout({ children }) {
  const location = useLocation();
  const heading = pageTitles[location.pathname] || "Page";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography fontWeight={600} variant="h4">
          {heading}
        </Typography>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
