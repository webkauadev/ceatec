import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PreCheckout from "./pages/PreCheckout";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import { usePageViewTracking } from "./hooks/usePageViewTracking";

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageViewTracking();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/pre-checkout/:slug" element={<PreCheckout />} />
      <Route path="/onboarding/:slug" element={<Onboarding />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
