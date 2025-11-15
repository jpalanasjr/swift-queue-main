import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  isPriority?: boolean;
}

const TransactionButton = ({
  icon: Icon,
  title,
  description,
  onClick,
  isPriority = false,
}: TransactionButtonProps) => {
  return (
    <Card
      className={cn(
        "group relative p-8 h-full cursor-pointer transition-all duration-500 overflow-hidden",
        "hover:scale-[1.03] active:scale-[0.98]",
        "border-2 backdrop-blur-sm",
        isPriority 
          ? "border-queue-priority/20 hover:border-queue-priority hover:shadow-[0_20px_60px_-15px_hsl(var(--queue-priority)/0.4)] bg-gradient-to-br from-queue-priority/10 via-queue-priority/5 to-transparent" 
          : "border-primary/20 hover:border-primary hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.4)] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
      )}
      onClick={onClick}
    >
      {/* Glow effect on hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        isPriority 
          ? "bg-gradient-to-br from-queue-priority/5 to-transparent" 
          : "bg-gradient-to-br from-primary/5 to-transparent"
      )} />
      
      <div className="relative flex flex-col items-center text-center gap-6 h-full justify-center">
        <div className={cn(
          "p-6 rounded-3xl transition-all duration-500 group-hover:scale-110",
          isPriority 
            ? "bg-gradient-to-br from-queue-priority/20 to-queue-priority/10 shadow-lg shadow-queue-priority/20" 
            : "bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg shadow-primary/20"
        )}>
          <Icon className={cn(
            "w-12 h-12 transition-all duration-500",
            isPriority ? "text-queue-priority group-hover:scale-110" : "text-primary group-hover:scale-110"
          )} />
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-foreground transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TransactionButton;
