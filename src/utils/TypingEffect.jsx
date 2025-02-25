import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { Typography, Box } from "@mui/material";

const TypingEffect = ({
  text,
  setLoading,
  defaultText = "Hello! I am Tamcherry's AI interviewer. Welcome, I'm excited to get to know you. Could you briefly introduce yourself?",
}) => {
  const [displayText, setDisplayText] = useState(defaultText);

  useEffect(() => {
    setLoading(true);
  }, [text, setLoading]);

  useEffect(() => {
    if (text && text !== displayText) {
      setDisplayText(text); // Replace default text when a new question arrives
    }
  }, [text]);

  return (
    <Box>
      <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
        <Typewriter
          key={displayText} // Forces re-render when switching text
          onInit={(typewriter) => {
            typewriter
              .pauseFor(500)
              .typeString(displayText)
              .callFunction(() => setLoading(false))
              .start();
          }}
          options={{
            delay: 60,
            cursor: "",
          }}
        />
      </Typography>
    </Box>
  );
};

export default TypingEffect;
