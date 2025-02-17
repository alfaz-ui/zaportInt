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

function TestEquipments(props) {
  const [checked, setChecked] = useState(false);

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
              height: "256px", // Fixed height for smaller video recorder
              borderRadius: 3,
              minWidth: 392,
              padding: 0,
              // position: "relative", // If you want to position it within a larger layout
              backgroundColor: "#eff1ff", // Optional background color for the video box
            }}
          >
            <CameraFeed />
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
              // height: "256px", // Fixed height for smaller video recorder
              borderRadius: 3,
              display: "flex",
              minWidth: 392,
              flexDirection: "column",
              alignItems: "center",
              pt: 2,
              backgroundColor: "#eff1ff", // Optional background color for the video box
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
                backgroundColor: "white",
                padding: 4,
                mt: 2,
                width: "100%",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography fontWeight={600}>Level Input</Typography>
              <AudioVisualizer />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: 43,
                fontWeight: 500,
                padding: ".5rem 1.25rem",
                fontSize: ".875rem",
                textTransform: "none",
              }}
            >
              Speak
            </Button>
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
        <Button
          disabled={checked ? false : true}
          loading={false}
          sx={{
            fontSize: "1.125rem",
            borderRadius: 43,
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: "500",
            padding: "20px 44px",
            marginTop: "1.4rem",
          }}
          // loadingPosition="start"
          // startIcon={<SaveIcon />}
          variant="contained"
        >
          Share screen and start the interview
        </Button>
      </Box>
    </Container>
  );
}

export default TestEquipments;
