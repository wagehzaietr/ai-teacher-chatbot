import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, RotateCcw, Check, AlertCircle } from "lucide-react";
import Image from "next/image";

export function CameraDialog({
  isOpen,
  capturedImage,
  stopCamera,
  captureImage,
  useCapturedImage,
  retakePhoto,
  videoRef,
  canvasRef,
  error,
  startCamera,
}: {
  isOpen: boolean;
  capturedImage: string | null;
  stopCamera: () => void;
  captureImage: () => void;
  useCapturedImage: () => void;
  retakePhoto: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  error: string | null;
  startCamera: () => Promise<boolean>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Restart camera when dialog opens
  useEffect(() => {
    if (isOpen) {
      const initCamera = async () => {
        const success = await startCamera();
        if (!success && dialogRef.current) {
          // Focus the dialog for better accessibility when there's an error
          dialogRef.current.focus();
        }
      };
      initCamera();
    }
    return () => {
      if (!isOpen) {
        stopCamera();
      }
    };
  }, [isOpen, startCamera, stopCamera]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && stopCamera()}>
      <DialogContent 
        ref={dialogRef}
        className="max-w-md border-border bg-background"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Camera className="h-5 w-5" />
            {capturedImage ? "Photo Captured" : "Take a Photo"}
          </DialogTitle>
          {error && (
            <DialogDescription className="text-destructive flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </DialogDescription>
          )}
        </DialogHeader>

        {!capturedImage ? (
          <div className="space-y-4">
            <div className="relative w-full aspect-video rounded-lg bg-muted border border-border overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 p-4">
                  <p className="text-center text-destructive">{error}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={captureImage} 
                className="flex-1 gap-2"
                disabled={!!error}
              >
                <Camera className="h-4 w-4" /> Capture
              </Button>
              <Button 
                onClick={stopCamera} 
                variant="outline" 
                className="gap-2"
              >
                <X className="h-4 w-4" /> Cancel
              </Button>
            </div>
            {error && (
              <Button 
                onClick={startCamera} 
                variant="outline" 
                className="w-full gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Retry Camera
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative w-full aspect-video rounded-lg bg-muted border border-border overflow-hidden">
              <Image
                src={capturedImage}
                alt="Captured"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={useCapturedImage} 
                className="flex-1 gap-2"
              >
                <Check className="h-4 w-4" /> Use Photo
              </Button>
              <Button 
                onClick={retakePhoto} 
                variant="outline" 
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" /> Retake
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
