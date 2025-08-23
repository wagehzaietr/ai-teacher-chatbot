"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { CameraDialog } from "./CameraDialog";
import { useCamera } from "./hooks/useCamera";
// Toast notifications replaced with browser alerts for simplicity

// Custom hook to manage daily message count
const useDailyMessageLimit = (maxMessages = 15) => {
  const [messageCount, setMessageCount] = useState(0);
  const [lastResetDate, setLastResetDate] = useState<string>("");

  useEffect(() => {
    // Initialize or reset counter if it's a new day
    const today = new Date().toDateString();
    const savedData = localStorage.getItem('chatMessageData');
    
    if (savedData) {
      const { count, date } = JSON.parse(savedData);
      if (date === today) {
        setMessageCount(count);
      } else {
        // Reset counter for new day
        setMessageCount(0);
        localStorage.setItem('chatMessageData', JSON.stringify({ count: 0, date: today }));
      }
      setLastResetDate(date);
    } else {
      // First time user
      localStorage.setItem('chatMessageData', JSON.stringify({ count: 0, date: today }));
      setLastResetDate(today);
    }
  }, []);

  const incrementMessageCount = () => {
    const today = new Date().toDateString();
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    localStorage.setItem('chatMessageData', JSON.stringify({ count: newCount, date: today }));
    return newCount;
  };

  const hasReachedLimit = messageCount >= maxMessages && new Date().toDateString() === lastResetDate;

  return { messageCount, incrementMessageCount, hasReachedLimit, maxMessages };
};

export default function MultiModalChatPage() {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const { incrementMessageCount, hasReachedLimit, messageCount, maxMessages } = useDailyMessageLimit();

  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/multi-modal-chat" }),
  });

  const {
    isCameraOpen,
    capturedImage,
    startCamera,
    stopCamera,
    captureImage,
    setCapturedImage,
    videoRef,
    canvasRef,
  } = useCamera();

  // Handle captured image → file
  const useCapturedImage = () => {
    if (!capturedImage) return;
    const file = dataURLtoFile(capturedImage, "camera-capture.jpg");
    const dt = new DataTransfer();
    dt.items.add(file);
    setFiles(dt.files);
    setInput("Please help me solve this problem from the image.");
    stopCamera();
  };

  const retakePhoto = () => setCapturedImage(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (hasReachedLimit) {
      alert(`Daily limit of ${maxMessages} messages reached. Please try again tomorrow.`);
      return;
    }
    
    const newCount = incrementMessageCount();
    sendMessage({ text: input, files });
    setInput("");
    setFiles(undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
    
    if (newCount >= maxMessages) {
      alert(`You've reached your daily limit of ${maxMessages} messages.`);
    }
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="flex flex-col flex-1 w-full bg-background">
      <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto">
        {error && (
          <Card className="mx-4 mt-4 border-border bg-background">
            <CardContent className="pt-4">
              <div className="text-destructive text-sm font-medium">
                {error.message}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex-1 px-4  overflow-y-auto  max-h-[calc(100vh-250px)]">
          {messages.length === 0 ? (
            <QuickActions />
          ) : (
            <ChatMessages messages={messages} isLoading={isLoading} />
          )}
        </div>



        <CameraDialog
          isOpen={isCameraOpen}
          capturedImage={capturedImage}
          stopCamera={stopCamera}
          captureImage={captureImage}
          useCapturedImage={useCapturedImage}
          retakePhoto={retakePhoto}
          videoRef={videoRef}
          canvasRef={canvasRef}
        />

        <Card className="m-4 mt-0 border-border bg-background">
          <CardContent className="p-4">
            <ChatInput
              input={input}
              setInput={setInput}
              files={files}
              setFiles={setFiles}
              fileInputRef={fileInputRef}
              onSubmit={handleSubmit}
              onStartCamera={startCamera}
              isLoading={isLoading || hasReachedLimit}
              stop={stop}
              status={hasReachedLimit ? 'limit_reached' : status}
              disabled={hasReachedLimit}
            />
            {hasReachedLimit && (
              <div className="text-sm text-muted-foreground text-center mt-2">
                You've used {messageCount}/{maxMessages} messages today. The limit resets at midnight.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// util: convert dataURL to File
function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
}
