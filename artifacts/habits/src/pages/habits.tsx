import { useHabits } from "@/lib/store";
import { currentStreak, isDueOn } from "@/lib/streaks";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ChevronRight, Edit2 } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function HabitsList() {
  const { habits } = useHabits();
  const [, setLocation] = useLocation();
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="pt-12 pb-24 px-6 max-w-md mx-auto min-h-screen">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-serif mb-2">Habits</h1>
          <p className="text-muted-foreground">{habits.length} total habits</p>
        </div>
        <Button onClick={() => setLocation("/habits/new")} variant="default" size="icon" className="rounded-full w-12 h-12 shadow-sm">
          <Plus className="h-5 w-5" />
        </Button>
      </header>

      {habits.length === 0 ? (
        <div className="py-12 text-center bg-card rounded-3xl border border-border shadow-sm p-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📝</span>
          </div>
          <p className="text-foreground font-medium mb-1">Your journal is empty</p>
          <p className="text-sm text-muted-foreground mb-6">Let's add something you want to focus on.</p>
          <Button onClick={() => setLocation("/habits/new")} className="rounded-full">
            Add your first habit
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {habits.map((habit, index) => {
              const streak = currentStreak(habit, todayStr);
              const dueToday = isDueOn(habit, todayStr);
              
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/habits/${habit.id}`} className="group block relative p-4 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors shadow-sm hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-xl">
                          {habit.emoji}
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{habit.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {habit.frequency.type === 'daily' ? 'Daily' : `${habit.frequency.days.length} days/week`}
                            {habit.target && ` • ${habit.target}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {streak > 0 && <span className="text-orange-500 text-sm">🔥</span>}
                            <span className="font-serif font-medium text-lg">{streak}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">streak</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// Ensure Button is available
function Button({ className, variant, size, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string, size?: string }) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants: Record<string, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  const sizes: Record<string, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10"
  };
  
  const variantClass = variants[variant || "default"];
  const sizeClass = sizes[size || "default"];
  
  return (
    <button className={`${baseClasses} ${variantClass} ${sizeClass} ${className || ""}`} {...props} />
  );
}