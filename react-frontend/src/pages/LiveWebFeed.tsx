import { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Pose, Results, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { Box, Button } from "@chakra-ui/react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

interface Landmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

interface PostureData {
  landmarks: Landmark[];
  shoulderLevel: number;
  headPosition: number;
}

const LiveWebFeed = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [counter, setCounter] = useState(0)
  const [, setLoaded] = useState(false);
  const [goodPosture, setGoodPosture] = useState<PostureData | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);

  const onResults = useCallback(
    (results: Results) => {
      const canvasElement = canvasRef.current;
      const videoElement = webcamRef.current?.video;

      if (!canvasElement || !videoElement) return;

      const canvasCtx = canvasElement.getContext("2d");
      if (!canvasCtx) return;

      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;

      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.save();
      canvasCtx.scale(-1, 1);
      canvasCtx.translate(-canvasElement.width, 0);

      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      if (results.poseLandmarks) {
        drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 4,
        });
        drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }

      canvasCtx.restore();

      if (results.poseLandmarks) {
        const feedback = getPostureFeedback(results.poseLandmarks);
        console.log(feedback);

        canvasCtx.save();
        canvasCtx.scale(-1, 1);
        canvasCtx.translate(-canvasElement.width, 0);
        canvasCtx.font = "16px Arial";
        canvasCtx.fillStyle = "#FFFFFF";

        if (isCalibrating) {
          canvasCtx.fillStyle = "#FFFF00";
          canvasCtx.fillText("Calibrating... Hold your good posture!", 10, 30);
        } else if (!goodPosture) {
          canvasCtx.fillStyle = "#FFA500";
          canvasCtx.fillText(
            "Click 'Calibrate Posture' to set your baseline",
            10,
            30
          );
        } else {
          canvasCtx.fillStyle = "#FFFFFF";
          canvasCtx.fillText(feedback, 10, 30);
        }

        canvasCtx.restore();
      }
    },
    [goodPosture, isCalibrating]
  );

  const calibratePosture = useCallback(() => {
    if (!webcamRef.current?.video) return;

    setIsCalibrating(true);

    setTimeout(() => {
      const video = webcamRef.current?.video;
      if (!video) return;

      const tempPose = new Pose({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      tempPose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      tempPose.onResults((results: Results) => {
        if (results.poseLandmarks) {
          const landmarks = results.poseLandmarks;
          const shoulderLevel = Math.abs(landmarks[11].y - landmarks[12].y);
          const headPosition = landmarks[0].y - landmarks[11].y;

          setGoodPosture({
            landmarks: [...landmarks],
            shoulderLevel,
            headPosition,
          });

          setIsCalibrating(false);
          console.log("Posture calibrated successfully!");
        } else {
          console.log("No landmarks detected during calibration");
          setIsCalibrating(false);
        }

        tempPose.close();
      });

      tempPose.send({ image: video });
    }, 2000);
  }, []);

  function getPostureFeedback(landmarks: Landmark[]): string {
    let feedback: string[] = [];

    if (!goodPosture) {
      return "Calibrate your posture first!";
    }

    const currentHeadYDiff = landmarks[0].y - landmarks[11].y;
    const headTolerance = 0.04;

    if (Math.abs(currentHeadYDiff - goodPosture.headPosition) > headTolerance) {
      if (currentHeadYDiff > goodPosture.headPosition + headTolerance) {
        feedback.push("Lift your head slightly.");
      } else {
        feedback.push("Lower your head slightly.");
      }
    }

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const currentShoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
    const shoulderTolerance = 0.04;

    if (
      Math.abs(currentShoulderDiff - goodPosture.shoulderLevel) >
      shoulderTolerance
    ) {
      feedback.push("Adjust your shoulders to match your calibrated posture.");
    }

    return feedback.length
      ? feedback.join(" ")
      : "Great posture! Maintaining your calibrated position!";
  }

  useEffect(() => {
    if (!webcamRef.current?.video) return;

    const pose = new Pose({
      locateFile: (file: string) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(onResults);

    const camera = new Camera(webcamRef.current.video, {
      onFrame: async () => {
        if (webcamRef.current?.video) {
          await pose.send({ image: webcamRef.current.video });
        }
      },
      width: window.innerWidth / 2,
      height: window.innerHeight / 2,
    });

    camera.start();

    return () => {
      camera.stop();
      pose.close();
    };
  }, [onResults]);

  return (
    <Box position="relative" width="640px" height="480px">
      <Webcam
        ref={webcamRef}
        style={{
          display: "none",
        }}
        width={640}
        height={480}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          transform: "scaleX(-1)",
        }}
      />
      <Button
        position="absolute"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        colorScheme={goodPosture ? "green" : "blue"}
        onClick={calibratePosture}
        isLoading={isCalibrating}
        loadingText="Calibrating..."
      >
        {goodPosture ? "Recalibrate Posture" : "Calibrate Posture"}
      </Button>
      {goodPosture && !isCalibrating && (
        <Box
          position="absolute"
          top="10px"
          right="10px"
          backgroundColor="green.500"
          color="white"
          padding="8px 12px"
          borderRadius="md"
          fontSize="14px"
        >
          Calibrated.
        </Box>
      )}
    </Box>
  );
};

export default LiveWebFeed;
