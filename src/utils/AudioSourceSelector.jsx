import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

function AudioSourceSelector() {
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState("");

  useEffect(() => {
    // Get available media devices and filter for audio input devices
    const getAudioDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioSources = devices.filter(
        (device) => device.kind === "audioinput"
      );
      setAudioDevices(audioSources);
      if (audioSources.length > 0) {
        setSelectedAudio(audioSources[0].deviceId); // Set default audio device
      }
    };
    getAudioDevices();
  }, []);

  const handleChange = (event) => {
    setSelectedAudio(event.target.value);
  };

  return (
    <FormControl style={{ maxWidth: 392, marginBottom: 10, width: "100%" }}>
      <InputLabel id="audio-source-label">Select Audio Source</InputLabel>
      <Select
        labelId="audio-source-label"
        value={selectedAudio}
        onChange={handleChange}
        label="Select Audio Source"
        style={{
          backgroundColor: "#eff1ff",
          fontFamily: "Poppins",
          fontSize: "0.875rem",
        }}
      >
        {audioDevices.map((device) => (
          <MenuItem key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${device.deviceId}`}
          </MenuItem>
        ))}
      </Select>
      {audioDevices.length === 0 && (
        <FormHelperText>No audio devices found</FormHelperText>
      )}
    </FormControl>
  );
}

export default AudioSourceSelector;
