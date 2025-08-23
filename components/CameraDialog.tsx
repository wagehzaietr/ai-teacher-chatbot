import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, X, RotateCcw, Check } from "lucide-react";

export function CameraDialog({ isOpen, capturedImage, stopCamera, captureImage, useCapturedImage, retakePhoto, videoRef, canvasRef }: any) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && stopCamera()}>
      <DialogContent className="max-w-md border-border bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-primary">
            <Camera className="h-5 w-5" />
            {capturedImage ? "Photo Captured" : "Take a Photo"}
          </DialogTitle>
        </DialogHeader>

        {!capturedImage ? (
          <>
            <video ref={videoRef} autoPlay playsInline className="w-full aspect-video rounded-lg bg-muted border border-border" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-2">
              <Button onClick={captureImage} className="flex-1 gap-2">
                <Camera className="h-4 w-4" /> Capture
              </Button>
              <Button onClick={stopCamera} variant="outline" className="gap-2">
                <X className="h-4 w-4" /> Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <img src={capturedImage} alt="Captured" className="w-full aspect-video rounded-lg object-cover border border-border" />
            <div className="flex gap-2">
              <Button onClick={useCapturedImage} className="flex-1 gap-2">
                <Check className="h-4 w-4" /> Use Photo
              </Button>
              <Button onClick={retakePhoto} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" /> Retake
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
