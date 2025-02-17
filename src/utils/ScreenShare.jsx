import React, { useRef, useState } from "react";

const ScreenShare = () => {
  const videoRef = useRef(null);
  const [isSharing, setIsSharing] = useState(false);

  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsSharing(true);
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  const stopScreenShare = () => {
    const tracks = videoRef.current.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setIsSharing(false);
  };

  return (
    <div>
      <h2>Screen Sharing</h2>
      <video ref={videoRef} autoPlay playsInline style={{ width: "500px" }} />
      <br />
      <button onClick={isSharing ? stopScreenShare : startScreenShare}>
        {isSharing ? "Stop Sharing" : "Start Screen Share"}
      </button>
    </div>
  );
};

export default ScreenShare;
