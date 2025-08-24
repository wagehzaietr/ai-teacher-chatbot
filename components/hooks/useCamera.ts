import { useCallback, useEffect, useRef, useState } from "react";

export function useCamera() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Clean up the stream when component unmounts or when camera is closed
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = useCallback(async () => {
    try {
      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: { 
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      // Wait for the video element to be ready
      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = mediaStream;
        
        // Play the video once it's loaded
        return new Promise<boolean>((resolve) => {
          video.onloadedmetadata = () => {
            video.play()
              .then(() => {
                setIsCameraOpen(true);
                setError(null);
                resolve(true);
              })
              .catch(err => {
                console.error("Error playing video:", err);
                setError("Could not start camera preview. Please check permissions.");
                resolve(false);
              });
          };
        });
      }
      return true;
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions and try again.");
      return false;
    }
  }, [stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
    setCapturedImage(null);
    setError(null);
  }, [stream]);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Ensure the video is playing and has valid dimensions
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageDataUrl = canvas.toDataURL("image/jpeg", 0.8);
          setCapturedImage(imageDataUrl);
          return imageDataUrl;
        }
      }
    }
    return null;
  }, []);

  return { 
    isCameraOpen, 
    capturedImage, 
    error,
    startCamera, 
    stopCamera, 
    captureImage, 
    setCapturedImage, 
    videoRef, 
    canvasRef 
  };
}
