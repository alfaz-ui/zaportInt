import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

function VideoSourceSelector({ onVideoSourceChange }) {
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    const getVideoDevices = async () => {
      try {
        // Request camera access explicitly
        await navigator.mediaDevices.getUserMedia({ video: true });

        // Get available media devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoSources = devices.filter(
          (device) => device.kind === "videoinput"
        );

        setVideoDevices(videoSources);

        if (videoSources.length > 0) {
          setSelectedVideo(videoSources[0].deviceId); // Default to first camera
          onVideoSourceChange(videoSources[0].deviceId);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    getVideoDevices();
  }, [onVideoSourceChange]);

  const handleChange = (event) => {
    setSelectedVideo(event.target.value);
    onVideoSourceChange(event.target.value);
  };

  return (
    <FormControl style={{ marginBottom: 10 }}>
      <InputLabel id="video-source-label">Select Video Source</InputLabel>
      <Select
        labelId="video-source-label"
        value={selectedVideo}
        onChange={handleChange}
        label="Select Video Source"
        style={{
          backgroundColor: "#eff1ff",
          fontFamily: "Poppins",
          fontSize: "0.875rem",
        }}
      >
        {videoDevices.map((device) => (
          <MenuItem key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${device.deviceId}`}
          </MenuItem>
        ))}
      </Select>
      {videoDevices.length === 0 && (
        <FormHelperText>No video devices found</FormHelperText>
      )}
    </FormControl>
  );
}

export default VideoSourceSelector;
