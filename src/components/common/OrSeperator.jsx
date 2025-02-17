import React from "react";
import { Box, Typography } from "@mui/material";

function OrSeparator() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "1px",
        color: "#8d8e92", // Set the color of the text and the line
        my: 2, // Vertical margin
      }}
    >
      <Box sx={{ flexGrow: 1, height: 1, backgroundColor: "#8d8e92" }} />
      <Typography
        sx={{
          mx: 2, // Horizontal margin
          fontWeight: "semi-bold",
          textTransform: "lowercase", // Ensures "or" is in lowercase
        }}
      >
        or
      </Typography>
      <Box sx={{ flexGrow: 1, height: 1, backgroundColor: "#8d8e92" }} />
    </Box>
  );
}

export default OrSeparator;
