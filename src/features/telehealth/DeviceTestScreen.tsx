import React, { useEffect, useState, useRef } from "react";
import { FiCheckCircle, FiAlertCircle, FiRefreshCw, FiVideo, FiMic } from "react-icons/fi";

type MediaDevice = {
  deviceId: string;
  label: string;
};

const DeviceTestScreen: React.FC = () => {
  const [cameras, setCameras] = useState<MediaDevice[]>([]);
  const [microphones, setMicrophones] = useState<MediaDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedMic, setSelectedMic] = useState<string>("");
  const [cameraStatus, setCameraStatus] = useState<"ok" | "error" | "pending">("pending");
  const [micStatus, setMicStatus] = useState<"ok" | "error" | "pending">("pending");
  const [micLevel, setMicLevel] = useState<number>(0);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [permissionPrompt, setPermissionPrompt] = useState(false);

  const [speakerTestPlaying, setSpeakerTestPlaying] = useState(false);
  const speakerAudioRef = useRef<HTMLAudioElement>(null);

  // Enumerate devices
  const enumerateDevices = async () => {
    console.log("Enumerating devices...");
    setCameraStatus("pending");
    setMicStatus("pending");
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("Devices found:", devices);
      const cams = devices.filter((d) => d.kind === "videoinput").map((d) => ({
        deviceId: d.deviceId,
        label: d.label || "Camera",
      }));
      const mics = devices.filter((d) => d.kind === "audioinput").map((d) => ({
        deviceId: d.deviceId,
        label: d.label || "Microphone",
      }));
      setCameras(cams);
      setMicrophones(mics);
      if (!selectedCamera && cams.length > 0) setSelectedCamera(cams[0].deviceId);
      if (!selectedMic && mics.length > 0) setSelectedMic(mics[0].deviceId);
    } catch (e) {
      console.error("Error enumerating devices:", e);
      setCameraStatus("error");
      setMicStatus("error");
    }
  };

  // Get camera stream
  const getCameraStream = async (deviceId: string) => {
    console.log("Getting camera stream for device:", deviceId);
    setCameraStatus("pending");
    if (videoStream) {
      console.log("Stopping existing video stream");
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
        audio: false,
      });
      console.log("Camera stream obtained");
      setVideoStream(stream);
      setCameraStatus("ok");
    } catch (e) {
      console.error("Error getting camera stream:", e);
      setCameraStatus("error");
    }
  };

  // Get mic stream and analyze
  const getMicStream = async (deviceId: string) => {
    setMicStatus("pending");
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current.disconnect();
      analyserRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } },
        video: false,
      });
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateLevel = () => {
        analyser.getByteTimeDomainData(dataArray);
        // Calculate RMS
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          const val = (dataArray[i] - 128) / 128;
          sum += val * val;
        }
        const rms = Math.sqrt(sum / dataArray.length);
        setMicLevel(rms);
        animationRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();
      setMicStatus("ok");
    } catch (e) {
      setMicStatus("error");
      setMicLevel(0);
    }
  };

  // Check permissions on mount
  useEffect(() => {
    (async () => {
      if (navigator.permissions) {
        try {
          const camPerm = await navigator.permissions.query({ name: "camera" as PermissionName });
          const micPerm = await navigator.permissions.query({ name: "microphone" as PermissionName });
          if (camPerm.state !== "granted" || micPerm.state !== "granted") {
            setPermissionPrompt(true);
          }
        } catch {
          // Permissions API may not be supported or may throw
        }
      }
    })();
  }, []);

  // Handle device changes
  useEffect(() => {
    enumerateDevices();
    navigator.mediaDevices.addEventListener("devicechange", enumerateDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", enumerateDevices);
      if (videoStream) videoStream.getTracks().forEach((track) => track.stop());
      if (audioContextRef.current) audioContextRef.current.close();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
    // eslint-disable-next-line
  }, []);

  // Ensure selectedCamera is set when cameras list updates
  useEffect(() => {
    if (!selectedCamera && cameras.length > 0) {
      setSelectedCamera(cameras[0].deviceId);
    }
  }, [cameras, selectedCamera]);

  // When selected camera changes
  useEffect(() => {
    if (selectedCamera) getCameraStream(selectedCamera);
    // eslint-disable-next-line
  }, [selectedCamera]);

  // When selected mic changes
  useEffect(() => {
    if (selectedMic) getMicStream(selectedMic);
    // eslint-disable-next-line
  }, [selectedMic]);

  // Attach video stream to video element
  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
      // Explicitly call play to ensure video plays
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Video play was prevented:", error);
          // Set cameraStatus to error if video play fails
          setCameraStatus("error");
        });
      }
    }
  }, [videoStream]);

  const handleRetry = () => {
    enumerateDevices();
    if (selectedCamera) getCameraStream(selectedCamera);
    if (selectedMic) getMicStream(selectedMic);
  };

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermissionPrompt(false);
      enumerateDevices();
    } catch {
      setPermissionPrompt(true);
    }
  };

  const playSpeakerTest = () => {
    if (speakerAudioRef.current) {
      speakerAudioRef.current.currentTime = 0;
      speakerAudioRef.current.play();
      setSpeakerTestPlaying(true);
    }
  };

  // Reset playing state when audio ends
  useEffect(() => {
    const audio = speakerAudioRef.current;
    if (!audio) return;
    const handleEnded = () => setSpeakerTestPlaying(false);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-8">
      {/* Permission prompt */}
      {permissionPrompt && (
        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded text-yellow-900 flex flex-col items-center">
          <p className="mb-2 font-semibold">
            Please allow camera and microphone access to test your devices.
          </p>
          <button
            onClick={requestPermissions}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Request camera and microphone permissions"
            type="button"
          >
            Grant Permissions
          </button>
        </div>
      )}
      <h2 className="text-4xl font-extrabold mb-8 flex items-center gap-4 text-blue-600 dark:text-blue-400">
        <FiVideo className="text-4xl" /> Device Test
      </h2>
      <div className="flex flex-col gap-10">
        {/* Camera Test */}
        <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-inner border border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-4 mb-4">
            <FiVideo className="text-2xl text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-xl">Camera</span>
            {cameraStatus === "ok" && (
              <FiCheckCircle className="text-green-600" title="Camera working" aria-live="polite" aria-atomic="true" />
            )}
            {cameraStatus === "error" && (
              <FiAlertCircle className="text-red-600" title="Camera error" aria-live="polite" aria-atomic="true" />
            )}
            {cameraStatus === "pending" && (
              <div role="status" aria-live="polite" className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm italic">
                <svg
                  className="animate-spin h-5 w-5 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Checking...
              </div>
            )}
          </div>
          <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm">
            Select your camera device from the list below and ensure the preview is visible.
          </p>
          <select
            className="w-full p-4 border rounded mb-4 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-visible:ring-4 focus-visible:ring-blue-500"
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            aria-label="Select camera device"
            role="listbox"
            tabIndex={0}
          >
            {cameras.length === 0 && <option>No camera found</option>}
            {cameras.map((cam) => (
              <option key={cam.deviceId} value={cam.deviceId}>
                {cam.label}
              </option>
            ))}
          </select>
          <div className="w-full h-52 bg-black rounded-lg flex items-center justify-center overflow-hidden shadow-lg border border-gray-400 dark:border-gray-700">
            {cameraStatus === "ok" && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-contain rounded-lg"
                  style={{ maxHeight: "220px" }}
                />
                <p className="mt-3 text-green-700 dark:text-green-400 text-base font-medium" title="Camera is working properly">
                  Camera is working properly.
                </p>
              </>
            )}
            {cameraStatus === "error" && (
              <>
                <span className="text-red-700 dark:text-red-500 font-semibold" title="Unable to access camera">
                  Unable to access camera
                </span>
                <p className="mt-3 text-red-700 dark:text-red-500 text-base font-medium">
                  Please check your camera connection, permissions, and ensure no other application is using the camera.
                </p>
                <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                  Try restarting your browser or computer if the problem persists.
                </p>
              </>
            )}
            {cameraStatus === "pending" && (
              <span className="text-gray-500 dark:text-gray-400 italic">Loading...</span>
            )}
          </div>
          {/* Snapshot Capture */}
          {cameraStatus === "ok" && (
            <div className="mt-6 flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  if (!videoRef.current) return;
                  const video = videoRef.current;
                  const canvas = document.createElement("canvas");
                  canvas.width = video.videoWidth;
                  canvas.height = video.videoHeight;
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const dataUrl = canvas.toDataURL("image/png");
                    setSnapshot(dataUrl);
                  }
                }}
                className="px-5 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Capture camera snapshot"
              >
                Capture Snapshot
              </button>
              {snapshot && (
                <div className="flex flex-col items-center">
                  <img
                    src={snapshot}
                    alt="Camera snapshot"
                    className="max-w-full max-h-52 rounded-lg border border-gray-300 dark:border-gray-600 shadow-md"
                  />
                  <div className="flex gap-4 mt-3">
                    <a
                      href={snapshot}
                      download="camera-snapshot.png"
                      className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                      aria-label="Download camera snapshot"
                    >
                      Download Snapshot
                    </a>
                    <button
                      onClick={() => setSnapshot(null)}
                      className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
                      aria-label="Clear camera snapshot"
                      type="button"
                    >
                      Clear Snapshot
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
        {/* Mic Test */}
        <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-inner border border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-4 mb-4">
            <FiMic className="text-2xl text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-xl">Microphone</span>
            {micStatus === "ok" && (
              <FiCheckCircle className="text-green-600" title="Mic working" aria-live="polite" aria-atomic="true" />
            )}
            {micStatus === "error" && (
              <FiAlertCircle className="text-red-600" title="Mic error" aria-live="polite" aria-atomic="true" />
            )}
            {micStatus === "pending" && (
              <div role="status" aria-live="polite" aria-atomic="true" className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <svg
                  className="animate-spin h-5 w-5 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span className="text-sm italic">Checking...</span>
              </div>
            )}
          </div>
          <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm">
            Select your microphone device and speak to test the input level.
          </p>
          <select
            className="w-full p-4 border rounded mb-4 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-visible:ring-4 focus-visible:ring-blue-500"
            value={selectedMic}
            onChange={(e) => setSelectedMic(e.target.value)}
            aria-label="Select microphone device"
            role="listbox"
            tabIndex={0}
          >
            {microphones.length === 0 && <option>No microphone found</option>}
            {microphones.map((mic) => (
              <option key={mic.deviceId} value={mic.deviceId}>
                {mic.label}
              </option>
            ))}
          </select>
          <div className="w-full h-10 flex items-center" aria-label="Microphone input level">
            <div className="flex-1 h-5 bg-gray-300 dark:bg-gray-700 rounded overflow-hidden shadow-inner">
              <div
                className="h-5 bg-green-600 transition-all"
                style={{ width: `${Math.min(micLevel * 100 * 2, 100)}%` }}
              />
            </div>
            <span className="ml-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
              {micStatus === "ok" ? "Speak to test" : ""}
            </span>
          </div>
          {micStatus === "error" && (
            <div>
              <span className="text-red-700 dark:text-red-500 font-semibold">Unable to access microphone</span>
              <p className="mt-1 text-red-700 dark:text-red-500 text-base font-medium">
                Please check your microphone connection, permissions, and ensure no other application is using the microphone.
              </p>
              <p className="mt-1 text-red-600 dark:text-red-400 text-sm">
                Try restarting your browser or computer if the problem persists.
              </p>
            </div>
          )}
          {/* Mic Recording */}
          <div className="mt-6 flex flex-col items-center gap-4">
            {!isRecording && (
              <button
                onClick={async () => {
                  if (isRecording) return;
                  try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                      audio: { deviceId: selectedMic ? { exact: selectedMic } : undefined },
                      video: false,
                    });
                    const recorder = new MediaRecorder(stream);
                    setMediaRecorder(recorder);
                    setRecordedChunks([]);
                    recorder.ondataavailable = (e) => {
                      if (e.data.size > 0) {
                        setRecordedChunks((prev) => [...prev, e.data]);
                      }
                    };
                    recorder.onstop = () => {
                      const blob = new Blob(recordedChunks, { type: "audio/webm" });
                      const url = URL.createObjectURL(blob);
                      setAudioURL(url);
                      stream.getTracks().forEach((track) => track.stop());
                    };
                    recorder.start();
                    setIsRecording(true);
                  } catch (error) {
                    console.error("Error accessing microphone for recording:", error);
                  }
                }}
                className="px-5 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600"
                aria-label="Start microphone recording"
              >
                Start Recording
              </button>
            )}
            {isRecording && (
              <button
                onClick={() => {
                  if (!mediaRecorder) return;
                  mediaRecorder.stop();
                  setIsRecording(false);
                }}
                className="px-5 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
                aria-label="Stop microphone recording"
              >
                Stop Recording
              </button>
            )}
            {isRecording && (
              <span className="ml-4 text-green-600 font-semibold" aria-live="polite" aria-atomic="true">
                Recording...
              </span>
            )}
            {audioURL && (
              <div className="flex flex-col items-center">
                <audio controls src={audioURL} className="mt-3" />
                <div className="flex gap-4 mt-3">
                  <a
                    href={audioURL}
                    download="microphone-recording.webm"
                    className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
                    aria-label="Download microphone recording"
                  >
                    Download Recording
                  </a>
                  <button
                    onClick={() => {
                      setAudioURL(null);
                      setRecordedChunks([]);
                    }}
                    className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
                    aria-label="Clear microphone recording"
                    type="button"
                  >
                    Clear Recording
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* Speaker Test */}
        <section className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow-inner border border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-4 mb-4">
            <svg className="text-2xl text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width={24} height={24}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12a7 7 0 00-7-7m7 7a7 7 0 01-7 7m7-7H17" />
            </svg>
            <span className="font-semibold text-xl">Speaker</span>
          </div>
          <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm">
            Click the button below to play a test sound. If you hear the sound, your speakers are working.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={playSpeakerTest}
              className="px-5 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Play speaker test sound"
              type="button"
              disabled={speakerTestPlaying}
            >
              {speakerTestPlaying ? "Playing..." : "Play Test Sound"}
            </button>
            <audio
              ref={speakerAudioRef}
              src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
              preload="auto"
              aria-label="Speaker test sound"
            />
            {speakerTestPlaying && (
              <span className="text-green-600 font-medium ml-2" aria-live="polite">
                Playing test sound...
              </span>
            )}
          </div>
          <div className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
            If you do not hear the sound, check your speaker connection and volume settings.
          </div>
        </section>
        {/* Retry Button */}
        <div className="flex justify-end">
          <button
            onClick={handleRetry}
            className="flex items-center gap-4 px-6 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors shadow-md focus:outline-none focus:ring-4 focus:ring-blue-600 focus-visible:ring-4 focus-visible:ring-blue-500"
            aria-label="Retry device test"
          >
            <FiRefreshCw className="text-xl" /> Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceTestScreen;