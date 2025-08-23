import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Send, StopCircle, Camera } from "lucide-react";

type ChatInputProps = {
  input: string;
  setInput: (v: string) => void;
  files?: FileList;
  setFiles: (v: FileList | undefined) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onStartCamera: () => void;
  isLoading: boolean;
  stop: () => void;
  status: string;
  disabled?: boolean;
};

export function ChatInput({
  input,
  setInput,
  files,
  setFiles,
  fileInputRef,
  onSubmit,
  onStartCamera,
  isLoading,
  stop,
  status,
  disabled = false,
}: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Quick Actions */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onStartCamera}
          className="gap-2 text-xs border-border"
          disabled={disabled}
        >
          <Camera className="h-3 w-3" />
          Quick Photo
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-2 text-xs border-border"
          disabled={disabled}
        >
          <Paperclip className="h-3 w-3" />
          {files?.length
            ? `${files.length} file${files.length > 1 ? "s" : ""} attached`
            : "Attach files"}
        </Button>

        {files?.length && (
          <Badge variant="secondary" className="text-xs">
            {Array.from(files)
              .map((file) => file.name)
              .join(", ")}
          </Badge>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(event) => {
            if (event.target.files) setFiles(event.target.files);
          }}
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={disabled ? "Daily message limit reached" : "Ask me anything"}
          className="min-h-[40px] resize-none bg-background border-border"
          disabled={disabled}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e as any);
            }
          }}
        />

        {isLoading ? (
          <Button
            type="button"
            onClick={stop}
            size="lg"
            variant="destructive"
            disabled={disabled}
            className="gap-2 shrink-0"
          >
            <StopCircle className="h-4 w-4" />
            Stop
          </Button>
        ) : (
          <Button
            type="submit"
            size="lg"
            disabled={!input.trim() || disabled}
            className="gap-2 bg-border text-primary shrink-0"
          >
            <Send className="h-4 w-4 text-primary" />
            Send
          </Button>
        )}
      </div>
    </form>
  );
}
