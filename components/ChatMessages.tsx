import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { CodeBlock } from "@/components/ai-elements/code-block";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import MatrixText from './ui/matex-text';



export function ChatMessages({ messages, isLoading }: { messages: any[]; isLoading: boolean }) {
  const inputRef = useRef<HTMLDivElement | null>(null);
  
  const scrollIntoView = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() =>{
    scrollIntoView();
  },[messages])
  return (
    <Conversation >
      <ConversationContent>
        {messages.map((message) => (
          <Message from={message.role} key={message.id}>
            <MessageContent>
              {message.parts.map((part: any, i: number) => {
                if (part.type === "text") {
                  // Check if the text contains code blocks
                  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/g;
                  const parts = [];
                  let lastIndex = 0;
                  let match;

                  // Process the text to find and render code blocks
                  while ((match = codeBlockRegex.exec(part.text)) !== null) {
                    const [fullMatch, language, code] = match;
                    // Add text before the code block
                    if (match.index > lastIndex) {
                      parts.push(
                        <Response key={`${message.id}-${i}-text-${lastIndex}`}>
                          {part.text.substring(lastIndex, match.index)}
                        </Response>
                      );
                    }
                    // Add the code block
                    parts.push(
                      <div key={`${message.id}-${i}-code-${match.index}`} className="my-2">
                        <CodeBlock 
                          code={code.trim()} 
                          language={language || 'text'}
                          showLineNumbers={true}
                        />
                      </div>
                    );
                    lastIndex = match.index + fullMatch.length;
                  }
                  // Add any remaining text after the last code block
                  if (lastIndex < part.text.length) {
                    parts.push(
                      <Response key={`${message.id}-${i}-text-end`}>
                        {part.text.substring(lastIndex)}
                      </Response>
                    );
                  }
                  return parts.length > 0 ? parts : <Response key={`${message.id}-${i}`}>{part.text}</Response>;
                }
                if (part.type === "file" && part.mediaType?.startsWith("image/")) {
                  return (
                    <div key={`${message.id}-${i}`} className="mt-3">
                      <Card className="overflow-hidden border-border bg-background max-w-sm">
                        <CardContent className="p-2">
                          <Image src={part.url} alt={part.filename ?? `attachment-${i}`} width={400} height={300} className="rounded-md object-cover w-full h-auto max-h-64" />
                        </CardContent>
                      </Card>
                    </div>
                  );
                }
                return null;
              })}
            </MessageContent>
          </Message>
        ))}
        <div ref={inputRef} />

        {isLoading && (
          <Message from="assistant">
            <MessageContent>
              <div className="flex items-center gap-2 text-muted-foreground py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
<MatrixText text="StudyBot is analyzing..."/>
              </div>
            </MessageContent>
          </Message>
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
}
