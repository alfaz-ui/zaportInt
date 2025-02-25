import React from "react";
import { Modal, Backdrop, Fade, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

const AppModal = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }} // Replaces BackdropComponent
      slotProps={{
        backdrop: { timeout: 500 },
      }}
      sx={{ backdropFilter: "blur(12px)" }}
      aria-labelledby="app-modal-title"
      aria-describedby="app-modal-description"
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default AppModal;
