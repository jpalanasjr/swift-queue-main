import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServingQueue {
  regular: string[];
  priority: string[];
}

const DisplayBoard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [servingNow, setServingNow] = useState<ServingQueue>({
    regular: ["R001", "R002", "R003"],
    priority: ["P001", "P002"],
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setCurrentTime(now.toLocaleTimeString("en-US", timeOptions));
      setCurrentDate(now.toLocaleDateString("en-US", dateOptions));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate queue updates (in production, this would come from backend)
  useEffect(() => {
    const interval = setInterval(() => {
      // This is a demo - in real app, fetch from backend
      console.log("Queue update simulation");
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 p-8">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-7xl md:text-8xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Queue Display Board
          </h1>
          <div className="space-y-2">
            <p className="text-3xl text-muted-foreground font-medium">{currentDate}</p>
            <p className="text-5xl font-bold text-foreground tabular-nums">{currentTime}</p>
          </div>
        </div>

        {/* Now Serving Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Regular Queue */}
          <Card className="p-12 bg-card/80 backdrop-blur-sm border-4 border-primary/30 shadow-2xl animate-scale-in">
            <div className="space-y-8">
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 h-8 bg-queue-regular rounded-full animate-pulse shadow-[0_0_20px_var(--queue-regular)]"></div>
                <h2 className="text-5xl font-bold text-foreground">Regular Queue</h2>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-3xl text-muted-foreground font-semibold">Now Serving</p>
                <div className="space-y-6">
                  {servingNow.regular.map((number, index) => (
                    <div
                      key={number}
                      className={cn(
                        "p-8 rounded-3xl bg-gradient-to-r from-primary/20 to-primary/10 border-4 border-primary/40",
                        "transform transition-all duration-500 hover:scale-105",
                        "animate-fade-in shadow-lg shadow-primary/20"
                      )}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-4xl text-muted-foreground font-semibold">
                          Counter {index + 1}
                        </span>
                        <span className="text-8xl font-bold text-primary tabular-nums">
                          {number}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Priority Queue */}
          <Card className="p-12 bg-card/80 backdrop-blur-sm border-4 border-queue-priority/30 shadow-2xl animate-scale-in">
            <div className="space-y-8">
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 h-8 bg-queue-priority rounded-full animate-pulse shadow-[0_0_20px_var(--queue-priority)]"></div>
                <h2 className="text-5xl font-bold text-foreground">Priority Queue</h2>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-3xl text-muted-foreground font-semibold">Now Serving</p>
                <div className="space-y-6">
                  {servingNow.priority.map((number, index) => (
                    <div
                      key={number}
                      className={cn(
                        "p-8 rounded-3xl bg-gradient-to-r from-queue-priority/20 to-queue-priority/10 border-4 border-queue-priority/40",
                        "transform transition-all duration-500 hover:scale-105",
                        "animate-fade-in shadow-lg shadow-queue-priority/20"
                      )}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-4xl text-muted-foreground font-semibold">
                          Counter {index + 4}
                        </span>
                        <span className="text-8xl font-bold text-queue-priority tabular-nums">
                          {number}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer Status */}
        <Card className="p-8 bg-card/60 backdrop-blur-sm border-2 border-border/50 animate-fade-in">
          <div className="flex items-center justify-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-3xl font-semibold text-foreground">System Online</span>
            </div>
            <div className="w-px h-12 bg-border"></div>
            <div className="text-center">
              <p className="text-xl text-muted-foreground">Total Serving</p>
              <p className="text-4xl font-bold text-foreground">
                {servingNow.regular.length + servingNow.priority.length} Counters
              </p>
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className="text-2xl text-muted-foreground">
            Please proceed to your assigned counter when your number is called
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayBoard;
