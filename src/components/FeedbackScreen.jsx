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
import { useNavigate } from "react-router-dom";
import talentService from "./services/talentService";
import SnackbarUtils from "../utils/SnackbarUtils";

const options = {
  animationData: animationData,
  loop: true, // Loops the animation indefinitely
  autoplay: true, // Starts the animation automatically
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice", // Adjusts the animation size proportionally
  },
};

function FeedbackScreen() {
  const navigate = useNavigate();
  const handleRating = (value) => {
    setRating(value);
  };

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      rating: rating,
      feedback: feedback,
    };

    try {
      const response = await talentService.feedback(data);

      if (response.status === 200) {
        SnackbarUtils.success("Done");
        setSubmitted(true);
        setTimeout(() => {
          navigate("/additional"); // Navigate after delay
        }, 2000);
      } else {
        console.log(response);
        SnackbarUtils.error("Sorry, something went wrong.");
      }
    } catch (error) {
      SnackbarUtils.error("Failed to submit feedback.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Centers vertically
        minHeight: "100vh", // Ensures it takes the full height of the viewport
        textAlign: "center",
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
      <Typography fontWeight={700} textAlign={"center"} variant="h5">
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
            <Typography fontWeight={400} textAlign={"center"} fontSize={10}>
              Thank you! Your feedback has been successfully submitted.
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <RatingComponent initialRating={0} onChange={handleRating} />
          <TextField
            multiline
            label="Feedback"
            sx={{
              mt: 3,
              mb: 2,
              width: 300,
              backgroundColor: "#e2e5ff",
            }}
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
