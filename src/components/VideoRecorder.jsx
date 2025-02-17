import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { io } from "socket.io-client";

const VideoAudioStream = () => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    // Establish WebSocket connection to Node.js server
    socketRef.current = io("ws://your-node-server-url");

    // Capture video and audio streams from the user's webcam
    const getUserMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Set up MediaRecorder to capture media chunks
        mediaRecorderRef.current = new MediaRecorder(mediaStream, {
          mimeType: "video/webm;codecs=vp8",
        });

        // Send each data chunk to the server
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            socketRef.current.emit("send-media", event.data); // Send the chunk to the server
          }
        };

        mediaRecorderRef.current.start(1000); // Send chunks every second
      } catch (err) {
        console.error("Error accessing media devices: ", err);
      }
    };

    getUserMedia();

    // Clean up the media stream on component unmount
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [stream]);

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Video and Audio Streaming</h2>
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            maxWidth: "600px",
            border: "1px solid black",
          }}
        />
      </div>
      <div>
        <Button variant="contained" onClick={handleStopRecording}>
          Stop Recording
        </Button>
      </div>
    </div>
  );
};

export default VideoAudioStream;
