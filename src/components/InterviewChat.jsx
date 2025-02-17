import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import { useSpring, animated } from "react-spring"; // For fade animation
import SpeechToText from "./../utils/SpeechToText";
import TextToSpeech from "./TextToSpeech";

const InterviewChat = () => {
  // const [messages, setMessages] = useState([]);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello, welcome to the interview.", sender: "AI" },
    { text: "Hi", sender: "User" },
    {
      text: "How are you doing today? How are you doing today? How are you doing today?",
      sender: "AI",
    },
    { text: "I'm doing good.", sender: "User" },
    { text: "Hello, welcome to the interview.", sender: "AI" },
    { text: "Hi", sender: "User" },
    {
      text: "How are you doing today? How are you doing today? How are you doing today?",
      sender: "AI",
    },
    { text: "I'm doing good.", sender: "User" },
    { text: "Hello, welcome to the interview.", sender: "AI" },
    { text: "Hi", sender: "User" },
    {
      text: "How are you doing today? How are you doing today? How are you doing today?",
      sender: "AI",
    },
    { text: "I'm doing good.", sender: "User" },
    { text: "Hello, welcome to the interview.", sender: "AI" },
    { text: "Hi", sender: "User" },
    {
      text: "How are you doing today? How are you doing today? How are you doing today?",
      sender: "AI",
    },
    { text: "I'm doing good.", sender: "User" },
  ]);
  const [scrollY, setScrollY] = useState(0);

  // Fade effect for top of the container as it scrolls out of view
  const fadeEffect = useSpring({
    opacity: scrollY > 50 ? 0.5 : 1, // Apply fade when scroll is beyond 50px
    config: { tension: 100, friction: 25 },
  });

  // Track the scroll position
  const handleScroll = (e) => {
    setScrollY(e.target.scrollTop);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Box
        sx={{
          height: 400, // Fixed height for scrollable container
          overflowY: "auto", // Enable vertical scrolling
          paddingBottom: 3, // Ensure content is not hidden at the bottom
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar
          },
        }}
        onScroll={handleScroll}
      >
        {messages.map((message, index) => (
          <Box sx={{ mb: 3 }} key={index}>
            <Typography
              className="font-medium"
              sx={{
                fontFamily: "Poppins",
                fontSize: 10,
                color: message.sender === "User" ? "#7b7c85" : "#7c83e1",
              }}
            >
              {message.sender === "User" ? "You" : "AI Interviewer"}
            </Typography>
            {index < 3 ? ( // Apply fade effect only to the first 3 messages
              <animated.div style={fadeEffect}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: 13,
                    color: message.sender === "User" ? "#7b7c85" : "black",
                  }}
                >
                  {message.text}
                </Typography>
              </animated.div>
            ) : (
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: 13,
                  color: message.sender === "User" ? "#7b7c85" : "black",
                }}
              >
                {message.text}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      <TextToSpeech text={"hello, how are you sss?"} />
      <SpeechToText
        setIsTranscribing={setIsTranscribing}
        setMessages={setMessages}
      />
      {isTranscribing ? (
        <Typography
          sx={{
            color: "#7b7c85",
            fontFamily: "Poppins",
            fontWeight: 600,
            fontSize: 13,
            fontStyle: "italic",
            mt: 3,
          }}
        >
          Transcribing answer ...
        </Typography>
      ) : null}
    </Container>
  );
};

export default InterviewChat;
