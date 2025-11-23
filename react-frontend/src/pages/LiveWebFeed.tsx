import { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Pose, Results, POSE_CONNECTIONS } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";
import { Box, Button, HStack, Link } from "@chakra-ui/react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

const postureTimer = 10000;

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
  const [counter, setCounter] = useState(0);
  const [, setLoaded] = useState(false);
  const [goodPosture, setGoodPosture] = useState<PostureData | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [badPostureStartTime, setBadPostureStartTime] = useState<number | null>(
    null
  );
  const [isBadPosture, setIsBadPosture] = useState(false);
  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>("default");

  // Request notification permission on component mount
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);

      if (Notification.permission === "default") {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission);
        });
      }
    }
  }, []);
  const handleSessionEnd = () => {};
  const showBadPostureNotification = useCallback(() => {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications");
      return;
    }

    if (notificationPermission !== "granted") {
      console.warn("Notification permission not granted");
      return;
    }

    const lastNotification = localStorage.getItem("lastPostureNotification");
    const now = Date.now();

    if (lastNotification && now - parseInt(lastNotification) < 30000) {
      return;
    }

    const notification = new Notification("SIT UP STRAIGHT !", {
      body: "You've had bad posture for more than 10 seconds. Please adjust your position!",
      tag: "posture-alert",
      requireInteraction: true,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    localStorage.setItem("lastPostureNotification", now.toString());
  }, [notificationPermission]);

  const requestNotificationPermission = useCallback(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications");
      return;
    }

    Notification.requestPermission().then((permission) => {
      setNotificationPermission(permission);
      if (permission !== "granted") {
        alert("Please enable notifications for the best experience!");
      }
    });
  }, []);

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
      // uncomment for landmarks ;D
      // if (results.poseLandmarks) {
      //   drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      //     color: "#00FF00",
      //     lineWidth: 4,
      //   });
      //   drawLandmarks(canvasCtx, results.poseLandmarks, {
      //     color: "#FF0000",
      //     lineWidth: 2,
      //   });
      // }

      canvasCtx.restore();

      if (results.poseLandmarks) {
        const feedback = getPostureFeedback(results.poseLandmarks);
        const hasBadPosture =
          feedback !== "Great posture! Maintaining your calibrated position!";

        if (hasBadPosture && !isBadPosture) {
          setIsBadPosture(true);
          setBadPostureStartTime(Date.now());
        } else if (!hasBadPosture && isBadPosture) {
          setIsBadPosture(false);
          setBadPostureStartTime(null);
        }

        if (
          hasBadPosture &&
          badPostureStartTime &&
          Date.now() - badPostureStartTime > postureTimer
        ) {
          showBadPostureNotification();
          setBadPostureStartTime(Date.now());
        }

        canvasCtx.save();
        canvasCtx.scale(-1, 1);
        canvasCtx.translate(-canvasElement.width, 0);
        canvasCtx.font = "16px Arial";
        canvasCtx.fillStyle = "#FFFFFF";

        if (isCalibrating) {
          canvasCtx.fillStyle = "#FFFF00";
          canvasCtx.fillText("Calibrating... please hold", 10, 30);
        } else if (!goodPosture) {
          canvasCtx.fillStyle = "#FFA500";
          canvasCtx.fillText("Calibrate your posture for base", 10, 30);
        } else {
          if (hasBadPosture) {
            canvasCtx.fillStyle = "#FF6B6B";
            if (badPostureStartTime) {
              const timeElapsed = Date.now() - badPostureStartTime;
              const timeLeft = Math.max(
                0,
                Math.ceil((postureTimer - timeElapsed) / 1000)
              );
              if (timeLeft > 0) {
                canvasCtx.fillText(`${feedback}`, 10, 30);
                canvasCtx.fillText(
                  `(Please sit up straight or you may be alerted!)`,
                  10,
                  50
                );
              } else {
                canvasCtx.fillText(`${feedback} (ALERT ACTIVE!)`, 10, 30);
              }
            } else {
              canvasCtx.fillText(feedback, 10, 30);
            }
          } else {
            canvasCtx.fillStyle = "#51CF66";
            canvasCtx.fillText(feedback, 10, 30);
          }
        }
        canvasCtx.restore();
      }
    },
    [
      goodPosture,
      isCalibrating,
      isBadPosture,
      badPostureStartTime,
      showBadPostureNotification,
      notificationPermission,
    ]
  );

  const calibratePosture = useCallback(() => {
    if (!webcamRef.current?.video) return;

    setIsCalibrating(true);
    setIsBadPosture(false);
    setBadPostureStartTime(null);

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
      width: 1380,
      height: 960,
    });
    camera.start();
    return () => {
      camera.stop();
      pose.close();
    };
  }, [onResults]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      flexDirection="column"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin="1.5rem"
        width="100%"
      >
        <Webcam
          ref={webcamRef}
          style={{
            display: "none",
            borderRadius: "1rem",
          }}
          width={1380}
          height={960}
        />
        <canvas
          ref={canvasRef}
          style={{
            transform: "scaleX(-1)",
            maxWidth: "100%",
            height: "auto",
            borderRadius: "1rem",
          }}
        />
      </Box>
      <HStack>
        <Button
          colorScheme={goodPosture ? "green" : "blue"}
          onClick={calibratePosture}
          isLoading={isCalibrating}
          loadingText="Calibrating..."
          zIndex={10}
        >
          {goodPosture ? "Recalibrate Posture" : "Calibrate Posture"}
        </Button>
        <Button colorScheme="red">
          <Link href="/survey">End Session</Link>
        </Button>
      </HStack>

      {notificationPermission !== "granted" && (
        <Button
          colorScheme="orange"
          onClick={requestNotificationPermission}
          mt={2}
          size="sm"
        >
          Enable Notifications
        </Button>
      )}
      {goodPosture && !isCalibrating && (
        <Box mt={2} color="white" padding="8px 12px" fontSize="14px">
          Calibrated :D
        </Box>
      )}
    </Box>
  );
};

export default LiveWebFeed;
