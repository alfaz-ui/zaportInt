import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/success.json";
import RatingComponent from "../utils/RatingComponent";
import { CheckCircle } from "@mui/icons-material";

const options = {
  animationData: animationData,
  loop: true, // Loops the animation indefinitely
  autoplay: true, // Starts the animation automatically
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice", // Adjusts the animation size proportionally
  },
};

function FeedbackScreen() {
  const handleRating = (value) => {
    console.log("User Rating:", value);
  };

  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Container
      maxWidth={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <CssBaseline />

      <Box
        sx={{
          width: "300px",
          height: "300px",
          marginTop: "-40px",
          borderRadius: "150px", // Optional: For rounded corners
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Centers the animation
        }}
      >
        <Lottie options={options} />
      </Box>
      <Typography
        fontWeight={700}
        textAlign={"center"}
        fontFamily={"Poppins"}
        variant="h5"
      >
        How was your overall experience with our AI interview ?
      </Typography>
      {submitted ? (
        <>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
              padding: "1rem 2.5rem",
              borderRadius: 10,
              alignItems: "center",
              mt: "2rem",
            }}
          >
            <CheckCircle sx={{ color: "#36ba3c", mr: 1 }} />
            <Typography
              fontWeight={400}
              textAlign={"center"}
              fontFamily={"Poppins"}
              fontSize={10}
            >
              Thank you! Your feedback has been successfully submitted.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <RatingComponent initialRating={3} onChange={handleRating} />
          <TextField
            multiline
            label="Feedback"
            sx={{ mt: 3, mb: 2, backgroundColor: "white", width: 300 }}
            minRows={4}
            value={feedback}
            onChange={handleChange}
            variant="outlined"
            placeholder="Feedback"
          />
          <Button
            onClick={handleSubmit}
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
      )}
    </Container>
  );
}

export default FeedbackScreen;
