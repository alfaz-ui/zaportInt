import { useState, useRef } from "react";

const AudioPlayer = (audioBlob) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={playAudio}>Play Audio</button>
      {audioUrl && <audio ref={audioRef} src={audioUrl} controls />}
    </div>
  );
};

export default AudioPlayer;
