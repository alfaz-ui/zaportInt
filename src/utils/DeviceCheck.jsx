import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const blockedRoutes = new Set([
  // "/interview", "/test"
]);

const DeviceCheck = ({ children }) => {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const checkDevice = () =>
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);

    const resizeListener = () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(checkDevice, 200); // Debounce resize event
    };

    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  if (!isDesktop && blockedRoutes.has(location.pathname)) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box sx={{ p: "20px" }}>
          <img
            src="/tamcherry-logo.png"
            alt="Tamcherry Logo"
            style={{ width: 120 }}
          />
        </Box>
        <img
          src="/desktop-only.svg"
          alt="Desktop only"
          style={{ width: 140, height: 140 }}
        />
        <Typography mt={5} variant="h6">
          🚫 This page is only accessible from a desktop device.
        </Typography>
      </Box>
    );
  }

  return children;
};

export default DeviceCheck;
