import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { GavelCursor } from "@/components/gavel-cursor";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Consultation from "@/pages/consultation";
import Disclaimer from "@/pages/disclaimer";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
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
