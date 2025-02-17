import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InterviewChat from "./InterviewChat";
import Timer from "../utils/Timer";
import Lottie from "react-lottie";
import animationData from "../assets/audio-visual.json";
import CameraFeed from "../utils/CameraFeed";

const options = {
  animationData: animationData,
  loop: false, // Loops the animation indefinitely
  autoplay: false, // Starts the animation automatically
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice", // Adjusts the animation size proportionally
  },
};

function InterviewScreen() {
  return (
    <Container
      maxWidth={false}
      sx={{
        // backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
          p: "20px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/tamcherry-logo.png"
          alt="Logo of tamcherry"
          style={{ width: 120, height: "auto" }}
        />

        <Timer />
      </Box>

      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            width: 240,
            alignSelf: "flex-end",
            alignItems: "center",
            display: "flex",
            outline: "3px solid white",
            outlineOffset: "5px",
          }}
          elevation={3}
        >
          <CameraFeed />
        </Paper>

        <Box
          sx={{
            width: "120px",
            height: "120px",
            border: "2px solid #cac4c4",
            backgroundColor: "#f0f0f0", // Your desired background color
            borderRadius: "150px", // Optional: For rounded corners
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Centers the animation
          }}
        >
          <Lottie options={options} />
        </Box>
        <Box sx={{ maxWidth: "310px" }}>
          <InterviewChat />
        </Box>
      </Box>
    </Container>
  );
}

export default InterviewScreen;
