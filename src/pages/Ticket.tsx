import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Home } from "lucide-react";

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { queueNumber, transactionType, isPriority } = location.state || {};
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!queueNumber) {
      navigate("/");
      return;
    }
    // Animate content in
    setTimeout(() => setShowContent(true), 100);
  }, [queueNumber, navigate]);

  if (!queueNumber) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className={`w-full max-w-md transition-all duration-500 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <Card className="p-8 text-center shadow-[var(--shadow-card)]">
          <div className="mb-6">
            <CheckCircle2 className={`w-16 h-16 mx-auto ${isPriority ? 'text-queue-priority' : 'text-queue-regular'}`} />
          </div>
          
          <h1 className="text-xl font-semibold text-foreground mb-2">Your Queue Number</h1>
          
          <div className={`my-8 p-8 rounded-2xl ${isPriority ? 'bg-gradient-to-br from-queue-priority/10 to-queue-priority/5 border-2 border-queue-priority/30' : 'bg-gradient-to-br from-queue-regular/10 to-queue-regular/5 border-2 border-queue-regular/30'}`}>
            <div className={`text-6xl font-bold ${isPriority ? 'text-queue-priority' : 'text-queue-regular'} tracking-wider`}>
              {queueNumber}
            </div>
            {isPriority && (
              <div className="mt-3 text-sm font-semibold text-queue-priority">
                PRIORITY LANE
              </div>
            )}
          </div>

          <div className="mb-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Transaction Type</p>
            <p className="font-semibold text-foreground">{transactionType}</p>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Please wait for your number to be called.
          </p>

          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Ticket;
