import React, { useEffect, useRef } from "react";
import { Camera } from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";

const lerp = (a, b, t) => a * (1 - t) + b * t;

const CameraWithARShirt = ({ filterImage, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const shirtImgRef = useRef(null);

  const lastState = useRef({
    x: 320,
    y: 240,
    width: 150,
    height: 200,
  });

  useEffect(() => {
    const shirtImg = new Image();
    shirtImg.src = filterImage;
    shirtImg.onload = () => {
      shirtImgRef.current = shirtImg;
    };

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    let camera = null;

    const startCamera = async () => {
      if (videoRef.current) {
        camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await pose.send({ image: videoRef.current });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    };

    startCamera();

    return () => {
      if (camera) camera.stop();
    };
  }, [filterImage]);

  const onResults = (results) => {
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.clearRect(0, 0, 640, 480);
    canvasCtx.drawImage(results.image, 0, 0, 640, 480);

    if (!shirtImgRef.current || !results.poseLandmarks) return;

    const lm = results.poseLandmarks;
    const leftShoulder = lm[11];
    const rightShoulder = lm[12];
    const leftHip = lm[23];
    const rightHip = lm[24];

    if (leftShoulder && rightShoulder && leftHip && rightHip) {
      const x1 = leftShoulder.x * 640;
      const y1 = leftShoulder.y * 480;
      const x2 = rightShoulder.x * 640;
      const y2 = rightShoulder.y * 480;

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      const shoulderWidth = Math.abs(x2 - x1);
      const hipY = ((leftHip.y + rightHip.y) / 2) * 480;

      const height = hipY - midY + 40;

      const shirtWidth = shoulderWidth * 1.8;
      const shirtHeight = height * 1.2;

      lastState.current.x = lerp(lastState.current.x, midX, 0.3);
      lastState.current.y = lerp(lastState.current.y, midY, 0.3);
      lastState.current.width = lerp(lastState.current.width, shirtWidth, 0.3);
      lastState.current.height = lerp(lastState.current.height, shirtHeight, 0.3);

      const verticalOffset = -80;
      lastState.current.y += verticalOffset;

      canvasCtx.globalAlpha = 0.95;
      canvasCtx.drawImage(
        shirtImgRef.current,
        lastState.current.x - lastState.current.width / 2,
        lastState.current.y,
        lastState.current.width,
        lastState.current.height
      );
      canvasCtx.globalAlpha = 1;
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <video
        ref={videoRef}
        className="absolute top-0 left-0"
        width="640"
        height="480"
        playsInline
        muted
        autoPlay
      />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        className="rounded shadow relative z-10"
      />
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded z-20"
      >
        Close
      </button>
    </div>
  );
};

export default CameraWithARShirt;
