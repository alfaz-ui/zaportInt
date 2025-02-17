import { useState } from "react";

const SpeechToText = ({ setMessages, setIsTranscribing }) => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setText(transcript);
    // When new text is transcribed, append to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: transcript, sender: "User" },
    ]);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event);
  };

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsTranscribing(true);
    setListening(false);
    recognition.stop();
    setIsTranscribing(false);
  };

  return (
    <div>
      <button onClick={listening ? stopListening : startListening}>
        {listening ? "Stop Recording" : "Start Recording"}
      </button>
      <p>
        <strong>Transcription:</strong> {text}
      </p>
    </div>
  );
};

export default SpeechToText;
