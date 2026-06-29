import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { GavelCursor } from "@/components/gavel-cursor";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Consultation from "@/pages/consultation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/consultation" component={Consultation} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <SmoothScrollProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
        <GavelCursor />
      </SmoothScrollProvider>
    </TooltipProvider>
  );
}

export default App;
