import { Button, Typography } from "@mui/material";
import React from "react";

function InterviewInstruction(props) {
  return (
    <>
      <Typography fontWeight={700} textAlign={"center"} fontFamily={"Poppins"}>
        Please note that this <span>~17 minute</span> interview will be with an
        AI interviewer. You will answer each question by speaking out loud, so
        find a quiet spot and make sure your internet connection is stable. Once
        this portion is complete there will be a <span>25-minute</span> coding
        exercise right after.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          mb: 1,
          padding: "1rem 8rem",
          borderRadius: 25,
          fontSize: 18,
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        Submit
      </Button>
    </>
  );
}

export default InterviewInstruction;
