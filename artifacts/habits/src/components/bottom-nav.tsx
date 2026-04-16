import { Link, useLocation } from "wouter";
import { CheckCircle2, ListTodo, BarChart3, Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function BottomNav() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md pb-safe">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${location === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
          <CheckCircle2 className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Today</span>
        </Link>
        <Link href="/habits" className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${location === '/habits' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
          <ListTodo className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Habits</span>
        </Link>
        <Link href="/week" className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${location === '/week' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
          <BarChart3 className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Week</span>
        </Link>
        <button onClick={toggleTheme} className="flex flex-col items-center justify-center w-16 h-full text-muted-foreground hover:text-foreground transition-colors">
          {theme === "light" ? <Moon className="h-5 w-5 mb-1" /> : <Sun className="h-5 w-5 mb-1" />}
          <span className="text-[10px] font-medium">Theme</span>
        </button>
      </div>
    </nav>
  );
}