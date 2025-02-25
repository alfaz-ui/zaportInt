import React, { useRef, useEffect } from "react";
import { useSpeech } from "react-text-to-speech";

function TextToSpeech({ text }) {
  const {
    Text, // Component that renders the processed text
    speechStatus, // Current speech status
    start, // Starts or queues the speech
    pause, // Pauses the speech
    stop, // Stops or removes the speech from the queue
  } = useSpeech({ text });

  const startButtonRef = useRef(null);

  useEffect(() => {
    if (startButtonRef.current) {
      startButtonRef.current.click();
    }
  }, [text]);

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <div style={{ display: "none", columnGap: "0.5rem" }}>
        <button ref={startButtonRef} onClick={start}>
          Start
        </button>
      </div>
    </div>
  );
}

export default TextToSpeech;
