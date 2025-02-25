import React, { useEffect, useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

const CameraWithObjectDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    const loadModel = async () => {
      await tf.ready();
      const model = await cocoSsd.load();
      setLoading(false);
      detectObjects(model);
    };

    const detectObjects = async (model) => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (video.readyState === 4) {
        const predictions = await model.detect(video);

        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        ctx.font = "18px Arial";
        ctx.fillStyle = "red";

        predictions.forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox;
          ctx.strokeRect(x, y, width, height);
          ctx.fillText(prediction.class, x, y - 10);

          if (prediction.class === "cell phone") {
            alert("⚠️ Mobile phone detected! Warning!");
          }
        });
      }

      requestAnimationFrame(() => detectObjects(model));
    };

    startCamera();
    loadModel();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {true && <p>Loading object detection model...</p>}

      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />

      {/* Canvas for Object Detection */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default CameraWithObjectDetection;
