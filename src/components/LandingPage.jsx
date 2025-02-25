import React, { useState } from "react";
import { Box, Button, Container, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavWrapper from "./common/NavWrapper";
import GradientButton from "./common/GradientButton";

function LandingPage() {
  const navigate = useNavigate();
 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundImage: "url(header.png)",
      }}
    >
      <CssBaseline />
      {/* Use the NavWrapper here */}
      <NavWrapper />
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "#8868d",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            maxWidth: "57rem",
            margin: "0px auto",
          }}
        >
          <Box sx={{ height: "100vh" }}>
            <Box
              sx={{
                p: 3,
                color: "white",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "4.5rem",
                  fontFamily: "Outfit,sans-serif",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                Welcome to the new era of hiring top global talent
              </h1>
              <p class="text-size-medium text-shadow-light">
                AI recruitment engine to source, vet, and hire top global talent
                fast
              </p>
              <Box
                sx={{
                  gridColumnGap: ".7rem",
                  gridRowGap: ".7rem",
                  flexFlow: "wrap-reverse",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginTop: "1rem",
                  display: "flex",
                }}
              >
                <GradientButton
                  blur
                  variant={"outlined"}
                  color={"white"}
                  // gradientStart="#ff7e5f"
                  // gradientEnd="#feb47b"
                  buttonColor="#fff3"
                  fontFamily="'Outfit', sans-serif"
                  fontSize="1.5rem"
                  padding="1rem 2rem"
                >
                  Create an account
                </GradientButton>
                <GradientButton
                  blur
                  variant={"outlined"}
                  color={"white"}
                  // gradientStart="#ff7e5f"
                  // gradientEnd="#feb47b"
                  buttonColor="#fff3"
                  fontFamily="'Outfit', sans-serif"
                  fontSize="1.5rem"
                  padding="1rem 2rem"
                >
                  Book a demo
                </GradientButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default LandingPage;
