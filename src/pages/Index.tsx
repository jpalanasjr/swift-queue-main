import { useNavigate } from "react-router-dom";
import { Banknote, QrCode, Accessibility, HelpCircle } from "lucide-react";
import { generateQueueNumber } from "@/lib/queueStore";
import TransactionButton from "@/components/TransactionButton";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phTime, setPhTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setPhTime(now.toLocaleTimeString("en-US", options));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTransaction = (type: string, isPriority: boolean = false) => {
    if (type === "Cash/Check Transaction" || type === "Priority Service") {
      navigate("/transaction-options", { state: { isPriority } });
    } else if (type === "QR Code Transaction") {
      navigate("/scan-qr");
    } else if (type === "General Assistance") {
      navigate("/other-transactions");
    }
  };

  const transactions = [
    {
      icon: Banknote,
      title: "Cash/Check Transaction",
      description: "Deposit, withdraw cash or process check transactions",
      type: "Cash/Check Transaction",
      isPriority: false,
    },
    {
      icon: QrCode,
      title: "Scan QR",
      description: "Quick payment or verification using QR code",
      type: "QR Code Transaction",
      isPriority: false,
    },
    {
      icon: Accessibility,
      title: "Priority Lane",
      description: "Express service for senior citizens, PWD, and pregnant women",
      type: "Priority Service",
      isPriority: true,
    },
    {
      icon: HelpCircle,
      title: "Other Transactions",
      description: "Account inquiries, assistance and other banking services",
      type: "General Assistance",
      isPriority: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            Queue Management System
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Please select your transaction type to get a queue number
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left side - Cash/Check Transaction */}
          <div className="h-full">
            <TransactionButton
              key={transactions[0].type}
              icon={transactions[0].icon}
              title={transactions[0].title}
              description={transactions[0].description}
              onClick={() => handleTransaction(transactions[0].type, transactions[0].isPriority)}
              isPriority={transactions[0].isPriority}
            />
          </div>

          {/* Right side - Other Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {transactions.slice(1).map((transaction) => (
              <TransactionButton
                key={transaction.type}
                icon={transaction.icon}
                title={transaction.title}
                description={transaction.description}
                onClick={() => handleTransaction(transaction.type, transaction.isPriority)}
                isPriority={transaction.isPriority}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1 flex justify-center sm:justify-start">
            <div className="inline-block p-6 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50">
              <p className="text-sm text-muted-foreground mb-3">Queue System Status</p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-queue-regular rounded-full animate-pulse shadow-[0_0_8px_var(--queue-regular)]"></div>
                  <span className="text-sm font-medium text-foreground">Regular</span>
                </div>
                <div className="w-px h-6 bg-border"></div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-queue-priority rounded-full animate-pulse shadow-[0_0_8px_var(--queue-priority)]"></div>
                  <span className="text-sm font-medium text-foreground">Priority</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 px-6 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Philippine Time</p>
            <p className="text-2xl font-bold text-foreground tabular-nums">{phTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
