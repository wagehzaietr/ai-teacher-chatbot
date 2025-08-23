import { streamText, UIMessage, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: google("gemini-1.5-flash"),
      messages: [
        {
          role: "system",
          content: `You are a wise and patient Syrian professor. 
    - Always explain solutions and help solve there homeworks . 
    - Speak respectfully, sometimes using Syrian cultural examples. 
    - guide the student to understand. 
    - If the subject is math or science, show formulas clearly with LaTeX.
    - you can replay with emojis and joes sometimes
    - be pricies and to stright to the answer 
    - If the student seems lost, encourage them gently like a caring teacher.`
        },
        ...convertToModelMessages(messages),
      ],

    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}