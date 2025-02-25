import React, { useRef, useEffect, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

const ObjectDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready(); // Ensure TensorFlow.js is ready
      const model = await cocoSsd.load(); // Load object detection model
      setLoading(false);
      detectObjects(model);
    };

    const detectObjects = async (model) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (video && video.readyState === 4) {
        const predictions = await model.detect(video);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 4;

        predictions.forEach((prediction) => {
          const [x, y, width, height] = prediction.bbox;
          ctx.strokeRect(x, y, width, height);
          ctx.fillStyle = "blue";
          ctx.fillText(prediction.class, x, y - 10);

          if (prediction.class === "cell phone") {
            alert("⚠️ Mobile phone detected! Warning!");
          }
        });
      }

      requestAnimationFrame(() => detectObjects(model));
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
      <h2>Object Detection</h2>
      {loading && <p>Loading model...</p>}
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

export default ObjectDetection;
