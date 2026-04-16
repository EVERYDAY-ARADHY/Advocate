import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/home";
import HabitsList from "@/pages/habits";
import HabitDetail from "@/pages/habit-detail";
import HabitForm from "@/pages/habit-form";
import WeekSummary from "@/pages/week";

// Components
import { BottomNav } from "@/components/bottom-nav";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen bg-background relative">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/habits" component={HabitsList} />
        <Route path="/habits/new" component={HabitForm} />
        <Route path="/habits/:id/edit" component={HabitForm} />
        <Route path="/habits/:id" component={HabitDetail} />
        <Route path="/week" component={WeekSummary} />
        <Route component={NotFound} />
      </Switch>
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="habits-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;