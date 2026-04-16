import { useHabits } from "@/lib/store";
import { currentStreak, longestStreak, generateHeatmapData } from "@/lib/streaks";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import { Link, useLocation, useParams } from "wouter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function HabitDetail() {
  const { id } = useParams<{ id: string }>();
  const { habits, deleteHabit } = useHabits();
  const [, setLocation] = useLocation();
  
  const habit = habits.find(h => h.id === id);
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  if (!habit) {
    return (
      <div className="pt-12 px-6 text-center">
        <p>Habit not found.</p>
        <Link href="/habits" className="text-primary mt-4 inline-block">Go back</Link>
      </div>
    );
  }

  const cStreak = currentStreak(habit, todayStr);
  const lStreak = longestStreak(habit);
  const heatmap = generateHeatmapData(habit, 16);

  // Group heatmap by weeks for GitHub style rendering
  const weeks: typeof heatmap[] = [];
  for (let i = 0; i < heatmap.length; i += 7) {
    weeks.push(heatmap.slice(i, i + 7));
  }

  const handleDelete = () => {
    deleteHabit(habit.id);
    setLocation("/habits");
  };

  const intensityColors = [
    "bg-card border border-border/50", // 0: Not due / future
    "bg-primary/20 border-transparent", // 1: Due but not completed
    "bg-primary/40 border-transparent", // 2: Completed (light)
    "bg-primary/70 border-transparent", // 3: Completed (medium)
    "bg-primary border-transparent"     // 4: Completed (full)
  ];

  return (
    <div className="pt-6 pb-24 px-6 max-w-md mx-auto min-h-screen">
      <header className="mb-8 flex items-center justify-between">
        <Link href="/habits" className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => setLocation(`/habits/${habit.id}/edit`)} className="rounded-full text-muted-foreground hover:text-foreground">
            <Edit2 className="w-4 h-4" />
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-[2rem] p-6 max-w-[340px] mx-auto text-center border-border">
              <AlertDialogHeader>
                <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trash2 className="w-5 h-5" />
                </div>
                <AlertDialogTitle className="text-xl font-serif text-center">Delete this habit?</AlertDialogTitle>
                <AlertDialogDescription className="text-center text-base">
                  This will remove your entire history for "{habit.name}". This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="sm:justify-center gap-3 mt-6 flex-col-reverse sm:flex-col-reverse">
                <AlertDialogCancel className="mt-0 w-full rounded-full border-border">Keep it</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full rounded-full">
                  Yes, delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="text-6xl mb-4">{habit.emoji}</div>
        <h1 className="text-3xl font-serif mb-2">{habit.name}</h1>
        <p className="text-muted-foreground">
          {habit.frequency.type === 'daily' ? 'Every day' : `${habit.frequency.days.length} days a week`}
          {habit.target && ` • ${habit.target}`}
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-3xl p-6 text-center shadow-sm"
        >
          <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Current</p>
          <div className="text-5xl font-serif flex items-center justify-center gap-2">
            {cStreak > 0 && <span className="text-3xl text-orange-500">🔥</span>}
            {cStreak}
          </div>
          <p className="text-xs text-muted-foreground mt-2">days in a row</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-3xl p-6 text-center shadow-sm"
        >
          <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-medium">Longest</p>
          <div className="text-5xl font-serif text-foreground/80 flex items-center justify-center gap-2">
            <span className="text-3xl text-yellow-500 opacity-50">🌟</span>
            {lStreak}
          </div>
          <p className="text-xs text-muted-foreground mt-2">personal best</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden"
      >
        <h3 className="font-serif text-xl mb-6">History</h3>
        
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1.5 flex-shrink-0">
              {week.map((day, j) => (
                <div 
                  key={j} 
                  className={`w-3 h-3 rounded-sm transition-colors ${intensityColors[day.intensity]}`}
                  title={`${day.dateStr}${day.isCompleted ? ' (Completed)' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 text-xs text-muted-foreground flex justify-between">
          <span>16 weeks ago</span>
          <span>Today</span>
        </div>
      </motion.div>
    </div>
  );
}