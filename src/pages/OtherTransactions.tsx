import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, MessageSquare } from "lucide-react";
import { generateQueueNumber } from "@/lib/queueStore";
import TransactionButton from "@/components/TransactionButton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const OtherTransactions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOptionSelect = (optionType: string) => {
    const queueNumber = generateQueueNumber(false);
    
    toast({
      title: "Queue Number Generated",
      description: `Your number is ${queueNumber}`,
    });

    navigate("/ticket", {
      state: {
        queueNumber,
        transactionType: optionType,
        isPriority: false,
      },
    });
  };

  const options = [
    {
      icon: UserPlus,
      title: "Open an Account",
      description: "Start your banking journey with us",
      type: "Account Opening",
    },
    {
      icon: MessageSquare,
      title: "Talk to a Teller",
      description: "Get assistance for inquiries and other services",
      type: "General Assistance",
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
            Other Banking Services
          </h1>
          <p className="text-lg text-muted-foreground">
            How can we help you today?
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {options.map((option) => (
            <TransactionButton
              key={option.type}
              icon={option.icon}
              title={option.title}
              description={option.description}
              onClick={() => handleOptionSelect(option.type)}
              isPriority={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherTransactions;
