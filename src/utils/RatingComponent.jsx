import React, { useState } from "react";
import Rating from "react-rating";
import { Box, Typography } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

const RatingComponent = ({ initialRating = 0, onChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onChange) onChange(newRating);
  };

  return (
    <Box
      display="flex"
      mt={3}
      flexDirection="column"
      alignItems="center"
      gap={1}
    >
      <Rating
        initialRating={rating}
        emptySymbol={<StarBorder fontSize="large" sx={{ color: "#ccc" }} />}
        fullSymbol={<Star fontSize="large" sx={{ color: "#FFD700" }} />}
        onChange={handleRatingChange}
      />

      <Typography fontWeight={700} textAlign={"center"} fontFamily={"Poppins"}>
        Your Rating: {rating}
      </Typography>
    </Box>
  );
};

export default RatingComponent;
