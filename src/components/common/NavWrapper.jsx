// NavWrapper.jsx
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import GradientButton from "./GradientButton";
import { useNavigate } from "react-router-dom";

const NavWrapper = () => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          pt: "1.25rem",
          top: 0, // ensures it sticks to top
          zIndex: (theme) => theme.zIndex.drawer + 1, // ensure it's above other content
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", p: 0 }}>
          {/* Left Box */}
          <Box
            sx={{
              backgroundColor: "white",
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              borderRadius: ".75rem",
            }}
          >
            <img
              src="/tamcherry-logo.png"
              alt="Logo of tamcherry"
              style={{ width: 83 }}
            />
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            {/* <Typography variant="h6" color="black">
              Left Section
            </Typography> */}
          </Box>

          {/* Spacer (transparent) */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Right Box */}
          <Box
            sx={{
              backgroundColor: "white",
              padding: ".3rem",
              display: "flex",
              borderRadius: ".75rem",
              alignItems: "center",
            }}
          >
            <GradientButton
              blur
              variant={"outlined"}
              color={"black"}
              // gradientStart="#ff7e5f"
              // gradientEnd="#feb47b"
              buttonColor="white"
              borderRadius=".5rem"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </GradientButton>
            <GradientButton
              blur
              variant={"outlined"}
              color={"white"}
              gradientStart="#374bff"
              borderRadius=".5rem"
              gradientEnd="#212d99"
              buttonColor="white"
            >
              Book a demo
            </GradientButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavWrapper;
