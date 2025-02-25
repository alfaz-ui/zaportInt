import React, { useRef, useEffect } from "react";
import { Button } from "@mui/material";

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
  }, [audioSrc]); // Auto-play when audioSrc updates

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error);
      });
    }
  };

  return (
    <div style={{ marginTop: "1rem", textAlign: "center" }}>
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default AudioPlayer;
