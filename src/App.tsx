
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EmailProvider } from "@/contexts/EmailContext";
import { AIProvider } from "@/contexts/AIContext";
import { AppLayout } from "@/components/layout/AppLayout";

import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Inbox from "./pages/Inbox";
import Sent from "./pages/Sent";
import Scheduled from "./pages/Scheduled";
import Compose from "./pages/Compose";
import EmailView from "./pages/EmailView";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <EmailProvider>
        <AIProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route path="/inbox" element={<AppLayout><Inbox /></AppLayout>} />
                <Route path="/sent" element={<AppLayout><Sent /></AppLayout>} />
                <Route path="/scheduled" element={<AppLayout><Scheduled /></AppLayout>} />
                <Route path="/compose" element={<AppLayout><Compose /></AppLayout>} />
                <Route path="/email/:id" element={<AppLayout><EmailView /></AppLayout>} />
                <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AIProvider>
      </EmailProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
