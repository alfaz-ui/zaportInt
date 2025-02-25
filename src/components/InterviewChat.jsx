import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import SpeechToText from "./../utils/SpeechToText";
import TextToSpeech from "./TextToSpeech";
import TypingEffect from "../utils/TypingEffect";
import SkeletonLoader from "../utils/SkeletonLoader";
import interviewServices from "./services/interviewServices";
import SnackbarUtils from "../utils/SnackbarUtils";

const InterviewChat = () => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(
    "Hello! I am Tamcherry's AI interviewer. Welcome, I'm excited to get to know you. Could you briefly introduce yourself?"
  );

  const [answers, setAnswers] = useState([]);

  // Function to fetch the next question automatically
  const fetchNextQuestion = async () => {
    setIsTranscribing(true); // Show skeleton while fetching

    try {
      const response = await interviewServices.getQuestion({
        questions,
        answers,
      });

      if (response.status === 200) {
        const newQuestion =
          response.data.questions[response.data.questions.length - 1];

        setQuestions((prev) => [...prev, ...response.data.questions]);
        setQuestion(newQuestion);
      } else {
        SnackbarUtils.error("Error fetching question");
      }
    } catch (error) {
      SnackbarUtils.error("Something went wrong");
    } finally {
      // Ensure state updates fully before stopping the skeleton
      setTimeout(() => setIsTranscribing(false), 3000);
    }
  };

  // Trigger next question when transcription is done (new answer added)
  useEffect(() => {
    if (answers.length > 0) {
      fetchNextQuestion();
    }
  }, [answers]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <SkeletonLoader isLoading={isTranscribing} />

      {!isTranscribing && (
        <Box sx={{ mb: 3 }}>
          <TypingEffect
            setLoading={setLoading}
            text={questions.length > 0 ? questions[questions.length - 1] : ""}
          />
        </Box>
      )}

      {/* SpeechToText (Triggers Next Question Automatically) */}
      {!loading && (
        <SpeechToText
          setIsTranscribing={setIsTranscribing}
          setAnswers={setAnswers}
        />
      )}

      {!isTranscribing && <TextToSpeech text={question ? question : ""} />}
    </Container>
  );
};

export default InterviewChat;
