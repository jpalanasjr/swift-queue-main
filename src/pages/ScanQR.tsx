import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, QrCode } from "lucide-react";
import { generateQueueNumber } from "@/lib/queueStore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";

const ScanQR = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        setError("");
      }
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleScanComplete = () => {
    stopCamera();
    const queueNumber = generateQueueNumber(false);
    
    toast({
      title: "Queue Number Generated",
      description: `Your number is ${queueNumber}`,
    });

    navigate("/ticket", {
      state: {
        queueNumber,
        transactionType: "QR Code Transaction",
        isPriority: false,
      },
    });
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => {
            stopCamera();
            navigate("/");
          }}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Main Menu
        </Button>

        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Scan QR Code
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Position the QR code within the camera frame
          </p>
        </header>

        <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20">
          {!isCameraActive ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg shadow-primary/20">
                  <Camera className="w-24 h-24 text-primary" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  Ready to Scan
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Click the button below to activate your camera and start scanning
                </p>
              </div>

              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              <Button
                onClick={startCamera}
                size="lg"
                className="w-full max-w-xs mx-auto"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Camera
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-4 border-primary/50 rounded-lg pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-primary rounded-2xl"></div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleScanComplete}
                  size="lg"
                  className="flex-1"
                >
                  Scan Complete
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Click "Scan Complete" after the QR code is scanned
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ScanQR;
