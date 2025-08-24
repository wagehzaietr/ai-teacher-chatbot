import { Card } from "@/components/ui/card";
import { Camera, Lightbulb, FileText } from "lucide-react";


export function QuickActions() {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12 px-4 sm:px-6 lg:px-8 w-full">
      {/* Heading with responsive sizing */}
      <h2 className="font-bold text-3xl sm:text-4xl md:text-[3.75rem] leading-tight md:leading-[1.1] font-poly-sans text-text-headline text-balance text-center max-w-4xl mx-auto mb-8 md:mb-12 px-2">
        World&apos;s smartest AI techer
      </h2>

      {/* Cards container with improved responsive layout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mx-auto">
        {/* Quick Photo Card */}
        <Card className="p-5 sm:p-6 hover:bg-muted/50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] cursor-pointer border-border bg-background shadow-sm hover:shadow-md">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Camera className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-sm font-medium text-primary">
                Quick Photo
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground flex-grow">
              Snap homework for instant help with our AI-powered visual analysis
            </p>
          </div>
        </Card>

        {/* Explain Concepts Card */}
        <Card className="p-5 sm:p-6 hover:bg-muted/50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] cursor-pointer border-border bg-background shadow-sm hover:shadow-md">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-sm font-medium text-primary">
                Explain Concepts
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground flex-grow">
              Get clear, concise explanations for any topic from our expert AI
            </p>
          </div>
        </Card>

        {/* Solve Problems Card */}
        <Card className="p-5 sm:p-6 hover:bg-muted/50 transition-all duration-200 ease-in-out transform hover:scale-[1.02] cursor-pointer border-border bg-background shadow-sm hover:shadow-md">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-base sm:text-sm font-medium text-primary">
                Solve Problems
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground flex-grow">
              Step-by-step problem solving with detailed reasoning
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}