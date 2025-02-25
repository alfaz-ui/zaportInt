import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import AppModal from "./AppModal";
import { useNavigate } from "react-router-dom";

const ScreenShare = () => {
  const navigate = useNavigate();
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

  return (
    <div>
      {/* Warning Modal */}
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
          onClick={startScreenShare} // Open prompt again when clicked
        >
          Re-share screen
        </Button>
      </AppModal>
    </div>
  );
};

export default ScreenShare;
