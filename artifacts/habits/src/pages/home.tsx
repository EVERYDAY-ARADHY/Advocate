import { useHabits } from "@/lib/store";
import { currentStreak, isDueOn, isCompletedOn } from "@/lib/streaks";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Today() {
  const { habits, toggleCompletion } = useHabits();
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  const dueHabits = habits.filter(h => isDueOn(h, todayStr));

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="text-3xl font-serif text-foreground">What's one thing you want to do more of?</h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Start small. A tiny habit done consistently is better than a huge goal done once.
          </p>
          <Link href="/habits/new" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            Add a habit
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-12 pb-24 px-6 max-w-md mx-auto min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-serif mb-2">Today</h1>
        <p className="text-muted-foreground">{format(new Date(), 'EEEE, MMMM d')}</p>
      </header>

      {dueHabits.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No habits due today. Enjoy the rest!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {dueHabits.map((habit, index) => {
              const isCompleted = isCompletedOn(habit, todayStr);
              const streak = currentStreak(habit, todayStr);
              
              return (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    isCompleted 
                      ? 'bg-primary/5 border-primary/20' 
                      : 'bg-card border-border hover:border-primary/30 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleCompletion(habit.id, todayStr)}
                      className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isCompleted 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'border-muted-foreground/30 hover:border-primary'
                      }`}
                    >
                      <AnimatePresence>
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {/* Check burst animation */}
                      {isCompleted && (
                        <motion.div
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-primary rounded-full"
                        />
                      )}
                    </button>
                    
                    <div>
                      <h3 className={`font-medium transition-colors ${isCompleted ? 'text-primary opacity-80' : 'text-foreground'}`}>
                        {habit.emoji} {habit.name}
                      </h3>
                      {habit.target && (
                        <p className="text-xs text-muted-foreground mt-0.5">{habit.target}</p>
                      )}
                    </div>
                  </div>
                  
                  {streak > 0 && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background border border-border/50 text-xs font-medium text-muted-foreground shadow-sm">
                      <span className="text-orange-500">🔥</span>
                      {streak}
                    </div>
                  )}
                  
                  {/* Invisible link overlay for details */}
                  <Link href={`/habits/${habit.id}`} className="absolute inset-0" aria-label={`View ${habit.name} details`} />
                  {/* Keep the check button interactive above the link */}
                  <div className="absolute left-4 w-8 h-8 z-10" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => {
                    e.preventDefault();
                    toggleCompletion(habit.id, todayStr);
                  }} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}