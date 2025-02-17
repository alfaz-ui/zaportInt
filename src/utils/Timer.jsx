import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { AccessAlarmOutlined } from "@mui/icons-material";

const Timer = ({ inputTime = 16 }) => {
  const localStorageKey = "timer-timeLeft";
  const initialTime =
    Number(localStorage.getItem(localStorageKey)) || inputTime * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    localStorage.setItem(localStorageKey, timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          localStorage.setItem(localStorageKey, prev - 1);
          return prev - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <Box
      sx={{
        borderRadius: 10,
        border: "2px solid #c4c4c4",
        width: 130,
        p: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AccessAlarmOutlined sx={{ color: "blue", mr: 1 }} />
      <Typography
        fontFamily={"monospace"} // Ensures equal spacing for numbers
        sx={{
          minWidth: "50px", // Set a fixed width to prevent movement
          textAlign: "center",
        }}
        variant="h6"
        fontWeight="bold"
      >
        {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
};

export default Timer;
