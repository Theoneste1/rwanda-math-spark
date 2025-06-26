import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster as HotToaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Impact from "./pages/Impact";
import Team from "./pages/Team";
import TeamMember from "./pages/TeamMember";
import Campers from "./pages/Campers";
import CompetitionResults from "./pages/CompetitionResults";
import Competition from "./pages/Competition";
import Auth from "./pages/Auth";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HotToaster position="top-right" />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team/:memberName" element={<TeamMember />} />
              <Route path="/competitions/campers" element={<Campers />} />
              <Route path="/competitions/results" element={<CompetitionResults />} />
              <Route path="/competition" element={<Competition />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
