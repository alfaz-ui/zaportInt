import {
  Box,
  Button,
  Container,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InterviewChat from "./InterviewChat";
import Timer from "../utils/Timer";
import Lottie from "react-lottie";
import animationData from "../assets/audio-visual.json";
import CameraFeed from "../utils/CameraFeed";
import AudioPlayer from "../utils/AudioPlayer";

const options = {
  animationData: animationData,
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function InterviewScreen() {
  const [startInterview, setStartInterview] = useState(false);
  const instructions = [
    "Please note that your AI Interview recording will be available in your profile. Please stay on the interview environment.",
    "Don't leave to any other tabs.",
    "Keep general eye contact with the screen and try not to look away too much.",
    "Feel free to ask any clarifying questions throughout the interview.",
  ];

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
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

      {/* Main Content Section with 3 Equal Parts */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 5,
          pt: 0,
          display: "flex",
          justifyContent: "space-between", // Ensures even spacing
          alignItems: "center",
          gap: 2, // Adds some space between sections
        }}
      >
        <Box
          sx={{
            flex: 1, // Makes it take equal space
            display: "flex",
            justifyContent: "flexStart",
            alignItems: "center",
            alignSelf: "flex-end",
            height: "100%", // Ensures full height alignment
            padding: 2,
          }}
        >
          <Paper
            sx={{
              width: 240,

              alignItems: "center",
              display: "flex",
              outline: "3px solid white",
              outlineOffset: "5px",
            }}
            elevation={3}
          >
            <CameraFeed />
          </Paper>
        </Box>

        {/* Middle Section - Animation */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "120px",
              height: "120px",
              border: "2px solid #cac4c4",
              backgroundColor: "#f0f0f0",
              borderRadius: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lottie options={options} />
          </Box>
        </Box>

        {/* Right Section - Instructions */}
        <Box sx={{ flex: 1 }}>
          {startInterview ? (
            <InterviewChat />
          ) : (
            <>
              <Typography variant="h5">
                Before starting the interview,
              </Typography>
              <List>
                {instructions.map((text, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: "flex", alignItems: "flex-start" }}
                  >
                    <Typography variant="h6" sx={{ marginRight: 1 }}>
                      {index + 1}.
                    </Typography>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  padding: "1rem 2rem",
                  borderRadius: 25,
                  textTransform: "none",
                  fontWeight: 600,
                }}
                onClick={() => setStartInterview(true)}
              >
                Done, start the interview
              </Button>
              <AudioPlayer audioSrc={"/guidelines.mp3"} />
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default InterviewScreen;
