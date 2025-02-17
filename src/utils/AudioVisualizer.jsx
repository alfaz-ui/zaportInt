import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";

const AudioVisualizer = () => {
  const [levels, setLevels] = useState(new Array(10).fill(0));
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [lowVolumeWarning, setLowVolumeWarning] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Initialize AudioContext for visualization
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 32;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      let lowVolumeCounter = 0; // Counter to track low volume duration

      // Start visualizing audio input
      const updateLevels = () => {
        if (!isRecording) return; // Stop updating if recording stops

        analyser.getByteFrequencyData(dataArrayRef.current);
        const avgLevel =
          dataArrayRef.current.reduce((a, b) => a + b, 0) /
          dataArrayRef.current.length;
        const normalizedLevel = Math.min(100, (avgLevel / 256) * 100);

        setLevels((prevLevels) => [...prevLevels.slice(1), normalizedLevel]);

        // Check if volume is consistently low
        if (normalizedLevel < 10) {
          lowVolumeCounter++;
        } else {
          lowVolumeCounter = 0; // Reset counter if voice is loud
        }

        if (lowVolumeCounter > 30) {
          setLowVolumeWarning(true); // Show warning after consistent low volume
        } else {
          setLowVolumeWarning(false);
        }

        requestAnimationFrame(updateLevels);
      };

      updateLevels();

      // Start MediaRecorder to save audio
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob); // Store the recorded audio Blob
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setLevels(new Array(10).fill(0)); // Reset levels
  };

  const playAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl; // Set audio src to Blob URL

      // Ensure audio starts playing only when it's ready
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });

      // Reset state after a short period to allow for playback
      audioRef.current.onended = () => {
        setIsPlaying(false); // Set isPlaying to false once audio ends
      };
    }
  };

  return (
    <Box
      display="flex"
      sx={{ width: "100%" }}
      flexDirection="column"
      alignItems="center"
    >
      {/* Audio Visualizer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          height: "40px",
          width: "100%",
          backgroundColor: "#eee",
          padding: "5px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {levels.map((level, index) => (
          <Box
            key={index}
            sx={{
              height: "100%",
              width: "8%",
              backgroundColor: level > 50 ? "#4caf50" : "#ff9800",
              transition: "height 100ms ease-in-out",
              borderRadius: "4px",
              transform: `scaleY(${level / 100})`,
            }}
          />
        ))}
      </Box>

      {/* Warning Message for Low Volume */}
      {lowVolumeWarning && (
        <Typography color="error" mt={2} textAlign="center">
          We are unable to hear your microphone. Please speak louder or check
          your microphone settings.
        </Typography>
      )}

      {/* Speak / Pause / Play Button */}
      <Button
        onClick={() => {
          if (!isRecording && !isPlaying) {
            setIsRecording(true); // Start Recording
          } else if (isRecording) {
            setIsRecording(false); // Stop Recording
          } else if (!isPlaying && audioBlob) {
            playAudio(); // Play Recorded Audio
          }
        }}
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          borderRadius: 43,
          fontWeight: 500,
          padding: ".5rem 1.25rem",
          fontSize: ".875rem",
          textTransform: "none",
        }}
      >
        {isRecording ? "Pause" : isPlaying ? "Playing..." : "Speak"}
      </Button>
    </Box>
  );
};

export default AudioVisualizer;
