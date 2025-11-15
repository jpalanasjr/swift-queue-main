import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Wallet, CreditCard, Banknote, Receipt } from "lucide-react";
import { generateQueueNumber } from "@/lib/queueStore";
import TransactionButton from "@/components/TransactionButton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const TransactionOptions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isPriority = location.state?.isPriority || false;

  const handleOptionSelect = (optionType: string) => {
    const queueNumber = generateQueueNumber(isPriority);
    
    toast({
      title: "Queue Number Generated",
      description: `Your number is ${queueNumber}`,
    });

    navigate("/ticket", {
      state: {
        queueNumber,
        transactionType: optionType,
        isPriority,
      },
    });
  };

  const options = [
    {
      icon: Wallet,
      title: "Deposit",
      description: "Deposit cash or check to your account",
      type: "Deposit",
    },
    {
      icon: CreditCard,
      title: "Withdraw",
      description: "Withdraw cash from your account",
      type: "Withdraw",
    },
    {
      icon: Banknote,
      title: "Encash",
      description: "Encash your check",
      type: "Encash Check",
    },
    {
      icon: Receipt,
      title: "Pay Bills",
      description: "Pay your utility bills and more",
      type: "Bill Payment",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Main Menu
        </Button>

        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {isPriority ? "Priority Lane - " : ""}Select Transaction Type
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose the service you need
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {options.map((option) => (
            <TransactionButton
              key={option.type}
              icon={option.icon}
              title={option.title}
              description={option.description}
              onClick={() => handleOptionSelect(option.type)}
              isPriority={isPriority}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionOptions;
