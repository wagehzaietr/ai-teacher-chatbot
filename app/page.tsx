import MultiModalChatPage from "@/components/ai-analysis";



export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col">
        <MultiModalChatPage/>
      </div>
    </main>
  );
}
