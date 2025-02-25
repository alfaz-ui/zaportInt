import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

const FaceDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready(); // Ensure TensorFlow.js is ready

      const model = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: "tfjs", // Explicitly specify the runtime
        }
      );

      setLoading(false);
      detectFaces(model);
    };

    const detectFaces = async (model) => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (video.readyState === 4) {
        const faces = await model.estimateFaces(video);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;

        faces.forEach((face) => {
          const keypoints = face.keypoints;
          if (keypoints.length > 0) {
            ctx.beginPath();
            keypoints.forEach(({ x, y }) => {
              ctx.arc(x, y, 2, 0, 2 * Math.PI);
            });
            ctx.stroke();
          }
        });

        // Alert user if multiple faces are detected
        if (faces.length > 1) {
          alert(
            "⚠️ Multiple faces detected! Ensure only one person is present."
          );
        }
      }

      requestAnimationFrame(() => detectFaces(model));
    };

    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startVideo();
    loadModel();
  }, []);

  return (
    <div>
      <h2>Face Detection</h2>
      {loading && <p>Loading face detection model...</p>}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="640"
        height="480"
        style={{ position: "absolute", transform: "scaleX(-1)" }}
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute", left: 0, top: 0 }}
      />
    </div>
  );
};

export default FaceDetection;
