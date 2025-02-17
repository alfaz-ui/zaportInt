import React from "react";
import { useSpeech } from "react-text-to-speech";

function TextToSpeech({ text }) {
  const {
    Text, // Component that renders the processed text
    speechStatus, // Current speech status
    isInQueue, // Indicates if the speech is active or queued
    start, // Starts or queues the speech
    pause, // Pauses the speech
    stop, // Stops or removes the speech from the queue
  } = useSpeech({ text: "This library is awesome!" });

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Text />
      <div style={{ display: "flex", columnGap: "0.5rem" }}>
        {speechStatus !== "started" ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
}

export default TextToSpeech;
