import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Link,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import VideoSourceSelector from "../utils/VideoSourceSelector";
import AudioSourceSelector from "../utils/AudioSourceSelector";
import AudioVisualizer from "../utils/AudioVisualizer";
import CameraFeed from "../utils/CameraFeed";
import ScreenShare from "../utils/ScreenShare"; // Keep ScreenShare component for handling the logic
import AppModal from "./../utils/AppModal";
import { useNavigate } from "react-router-dom";
import CameraWithObjectDetection from "./CameraWithObjectDetection";

function TestEquipments(props) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  let screenStream = null;

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      // Check if the user picked the whole screen
      const track = stream.getVideoTracks()[0];
      const settings = track.getSettings();

      if (settings.displaySurface !== "monitor") {
        setModalOpen(true); // Show warning if not full screen
        stream.getTracks().forEach((t) => t.stop()); // Stop the stream
        return;
      }

      screenStream = stream;
      setIsSharing(true);
      setModalOpen(false); // Close modal if screen sharing is correct

      // Handle when the user stops sharing manually
      track.onended = () => stopScreenShare(true);
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const stopScreenShare = (manualStop = false) => {
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
    }
    setIsSharing(false);

    // If the user manually stops sharing, show the modal again
    if (manualStop) {
      setModalOpen(true);
    }
  };

  const handleStartInterview = () => {
    if (isSharing) {
      // Proceed with starting the interview
      navigate("/interview");
      console.log("Interview started.");
    } else {
      // Start screen sharing first, then begin the interview
      startScreenShare();
    }
  };

  return (
    <Container maxWidth="md" sx={{ backgroundColor: "#e7eaff" }}>
      <CssBaseline />

      <Box component="main" marginTop={5} sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          fontWeight={700}
          textAlign={"center"}
          fontFamily={"Poppins"}
          variant="h5"
        >
          Check camera, mic and share screen
        </Typography>

        <Typography
          style={{ marginTop: 8 }}
          textAlign={"center"}
          fontFamily={"Poppins"}
        >
          We use audio, video and screen sharing to generate an accurate
          assessment & proctoring score. Please note that the recording of
          screen will be included in the AI interview report.
        </Typography>
      </Box>

      <Box
        display={"flex"}
        flexDirection={"row"}
        mt={2}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} maxWidth={392} flexDirection={"column"}>
          <VideoSourceSelector />
          <Box
            sx={{
              height: "265px",
              borderRadius: 3,
              minWidth: 392,
              padding: 0,
              backgroundColor: "#eff1ff",
            }}
          >
            <CameraFeed />
            {/* <CameraWithObjectDetection /> */}
          </Box>
        </Box>

        <Box
          maxWidth={392}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <AudioSourceSelector />
          <Container
            sx={{
              borderRadius: 3,
              display: "flex",
              minWidth: 392,
              height: "265px",
              flexDirection: "column",
              alignItems: "center",
              pt: 2,
              pb: 2,
              backgroundColor: "#eff1ff",
            }}
          >
            <Typography
              width={306}
              margin={"auto"}
              fontSize={15}
              fontWeight={500}
              textAlign={"center"}
            >
              Speak and pause to check your microphone, you will hear your voice{" "}
              <span style={{ fontWeight: 600 }}>(mandatory).</span>
            </Typography>
            <Box
              sx={{
                mt: 2,
                width: "100%",

                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <AudioVisualizer />
            </Box>
          </Container>
        </Box>
      </Box>

      <Box
        mt={3}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              color="primary"
            />
          }
          label={
            <Typography variant="body1">
              I agree to the{" "}
              <Link href="/terms-and-conditions" underline="hover">
                terms & conditions
              </Link>{" "}
              of this AI interview process.
            </Typography>
          }
        />

        {/* Share screen and start interview button */}
        <Button
          disabled={!checked}
          onClick={handleStartInterview} // Start screen sharing and interview
          sx={{
            fontSize: "1.125rem",
            borderRadius: 43,
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: "500",
            padding: "20px 44px",
            marginTop: "1.4rem",
          }}
          variant="contained"
        >
          Share screen and start the interview
        </Button>

        {/* Modal for warning */}
        <AppModal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Typography mb={1} fontWeight={800} variant="h6">
            We recommend you to share your entire screen
          </Typography>
          <Typography>
            To ensure an accurate assessment and proctoring score, please share
            your entire screen. This will help us evaluate your performance more
            precisely.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              padding: "1rem 2rem",
              borderRadius: 25,
              textTransform: "none",
              fontWeight: 600,
            }}
            onClick={startScreenShare} // Re-share screen when clicked
          >
            Re-share screen
          </Button>
        </AppModal>
      </Box>
    </Container>
  );
}

export default TestEquipments;
