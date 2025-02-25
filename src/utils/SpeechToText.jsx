import { Button, keyframes } from "@mui/material";
import { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from "react-router-dom";

const SpeechToText = ({ setAnswers, setIsTranscribing }) => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

  const navigate = useNavigate();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onstart = () => {
    // Indicate transcription is in progress
  };

  recognition.onresult = (event) => {
    setIsTranscribing(true);
    const newAnswer = event.results[0][0].transcript; // Extract text
    setText(newAnswer);

    // Append the new answer and trigger the next question
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);

    setIsTranscribing(false); // Stop transcribing
  };

  recognition.onerror = (event) => {
    setText(" ");

    // Append the new answer and trigger the next question
    setAnswers((prevAnswers) => [...prevAnswers, " "]);
    console.error("Speech recognition error", event);
    setIsTranscribing(false);
  };

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };

  return (
    <div>
      {/* <p>{text}</p> */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          borderRadius: 43,
          textTransform: "none",
          fontFamily: "Poppins",
          fontWeight: "500",
          backgroundColor: "white",
          color: "black",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5, // Add space between icon and text
        }}
        onClick={listening ? stopListening : startListening}
      >
        {listening && (
          <FiberManualRecordIcon
            sx={{
              color: "red",
              fontSize: 20,
              animation: `${blink} 1s infinite`,
            }}
          />
        )}
        {listening ? "Recording..." : "Answer"}
      </Button>
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          borderRadius: 43,
          textTransform: "none",
          fontFamily: "Poppins",
          fontWeight: "500",
        }}
        onClick={() => navigate("/feedback")}
      >
        Done answering ? Continue
      </Button>
    </div>
  );
};

export default SpeechToText;
