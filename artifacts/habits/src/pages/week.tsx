import { useHabits } from "@/lib/store";
import { completionRateForRange } from "@/lib/streaks";
import { format, startOfWeek, endOfWeek, subWeeks } from "date-fns";
import { motion } from "framer-motion";

export default function WeekSummary() {
  const { habits } = useHabits();
  const today = new Date();
  const currentWeekStart = startOfWeek(today);
  const currentWeekEnd = endOfWeek(today);
  const lastWeekStart = startOfWeek(subWeeks(today, 1));
  const lastWeekEnd = endOfWeek(subWeeks(today, 1));

  const currentStr = `${format(currentWeekStart, 'yyyy-MM-dd')} to ${format(currentWeekEnd, 'yyyy-MM-dd')}`;

  const habitStats = habits.map(habit => {
    const current = completionRateForRange(habit, format(currentWeekStart, 'yyyy-MM-dd'), format(currentWeekEnd, 'yyyy-MM-dd'));
    const last = completionRateForRange(habit, format(lastWeekStart, 'yyyy-MM-dd'), format(lastWeekEnd, 'yyyy-MM-dd'));
    
    return {
      habit,
      current,
      last,
      trend: current.rate - last.rate
    };
  });

  const totalCurrentDue = habitStats.reduce((sum, stat) => sum + stat.current.due, 0);
  const totalCurrentCompleted = habitStats.reduce((sum, stat) => sum + stat.current.completed, 0);
  const overallRate = totalCurrentDue > 0 ? totalCurrentCompleted / totalCurrentDue : 0;
  const overallPercentage = Math.round(overallRate * 100);

  let message = "A quiet week. Whenever you're ready, pick one thing to focus on.";
  if (totalCurrentDue > 0) {
    if (overallPercentage >= 80) message = "A beautifully consistent week. Take a moment to appreciate this.";
    else if (overallPercentage >= 50) message = "Showing up steadily. You're doing great.";
    else if (overallPercentage > 0) message = "You made time for yourself this week. That matters.";
    else message = "Rest is important too. Next week is a gentle new start.";
  }

  return (
    <div className="pt-12 pb-24 px-6 max-w-md mx-auto min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-serif mb-2">This Week</h1>
        <p className="text-muted-foreground">{format(currentWeekStart, 'MMM d')} – {format(currentWeekEnd, 'MMM d')}</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="text-6xl font-serif mb-4 text-primary">{overallPercentage}%</div>
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-4">Overall Completion</p>
        <p className="text-foreground/90 font-serif text-lg leading-relaxed max-w-[250px] mx-auto">
          "{message}"
        </p>
      </motion.div>

      {habits.length > 0 && (
        <div>
          <h3 className="font-serif text-xl mb-4 px-2">Breakdown</h3>
          <div className="space-y-3">
            {habitStats.map((stat, index) => (
              <motion.div
                key={stat.habit.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{stat.habit.emoji}</span>
                    <span className="font-medium text-foreground">{stat.habit.name}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {stat.current.completed} <span className="text-muted-foreground font-normal">/ {stat.current.due}</span>
                  </div>
                </div>
                
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.round(stat.current.rate * 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 + (index * 0.1) }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}