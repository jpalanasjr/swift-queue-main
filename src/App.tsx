import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Ticket from "./pages/Ticket";
import NotFound from "./pages/NotFound";
import TransactionOptions from "./pages/TransactionOptions";
import ScanQR from "./pages/ScanQR";
import OtherTransactions from "./pages/OtherTransactions";
import DisplayBoard from "./pages/DisplayBoard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/transaction-options" element={<TransactionOptions />} />
          <Route path="/scan-qr" element={<ScanQR />} />
          <Route path="/other-transactions" element={<OtherTransactions />} />
          <Route path="/display-board" element={<DisplayBoard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
