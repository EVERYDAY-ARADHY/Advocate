import { format, isSameDay, isBefore, addDays, subDays, parseISO, startOfWeek, endOfWeek, eachDayOfInterval, differenceInDays, startOfDay, getDay } from 'date-fns';
import { Habit } from './store';

export function isDueOn(habit: Habit, dateStr: string): boolean {
  const date = parseISO(dateStr);
  const created = parseISO(habit.createdAt);
  
  // Not due before it was created
  if (isBefore(startOfDay(date), startOfDay(created))) {
    return false;
  }

  if (habit.frequency.type === 'daily') {
    return true;
  }
  
  const dayOfWeek = getDay(date);
  return habit.frequency.days.includes(dayOfWeek);
}

export function isCompletedOn(habit: Habit, dateStr: string): boolean {
  return habit.completions.includes(dateStr);
}

export function currentStreak(habit: Habit, todayStr: string): number {
  let streak = 0;
  let currentDate = parseISO(todayStr);
  
  // If today is due but not completed, we don't count it as a broken streak yet
  // We check yesterday backwards
  if (isDueOn(habit, todayStr) && isCompletedOn(habit, todayStr)) {
    streak++;
  }
  
  let checkDate = subDays(currentDate, 1);
  const createdDate = startOfDay(parseISO(habit.createdAt));
  
  // Go backwards until we find a broken day or hit creation
  while (!isBefore(startOfDay(checkDate), createdDate)) {
    const dateStr = format(checkDate, 'yyyy-MM-dd');
    
    if (isDueOn(habit, dateStr)) {
      if (isCompletedOn(habit, dateStr)) {
        streak++;
      } else {
        break; // Streak broken
      }
    }
    // If not due, just skip to previous day
    
    checkDate = subDays(checkDate, 1);
  }
  
  return streak;
}

export function longestStreak(habit: Habit): number {
  let longest = 0;
  let current = 0;
  
  const sortedCompletions = [...habit.completions].sort();
  if (sortedCompletions.length === 0) return 0;
  
  const createdDate = startOfDay(parseISO(habit.createdAt));
  // Use today to bound our search
  const todayDate = startOfDay(new Date());
  
  let checkDate = createdDate;
  
  while (!isBefore(todayDate, startOfDay(checkDate))) {
    const dateStr = format(checkDate, 'yyyy-MM-dd');
    
    if (isDueOn(habit, dateStr)) {
      if (isCompletedOn(habit, dateStr)) {
        current++;
        longest = Math.max(longest, current);
      } else if (!isSameDay(checkDate, todayDate)) {
        // Streak broken (ignore today being uncompleted)
        current = 0;
      }
    }
    
    checkDate = addDays(checkDate, 1);
  }
  
  return longest;
}

export function completionRateForRange(habit: Habit, startStr: string, endStr: string): { completed: number, due: number, rate: number } {
  let completed = 0;
  let due = 0;
  
  const start = parseISO(startStr);
  const end = parseISO(endStr);
  const interval = eachDayOfInterval({ start, end });
  
  interval.forEach(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (isDueOn(habit, dateStr)) {
      due++;
      if (isCompletedOn(habit, dateStr)) {
        completed++;
      }
    }
  });
  
  return {
    completed,
    due,
    rate: due > 0 ? completed / due : 0
  };
}

export function generateHeatmapData(habit: Habit, weeks: number = 16) {
  const today = new Date();
  // Start from Sunday of `weeks` ago
  const startDate = startOfWeek(subDays(today, (weeks - 1) * 7));
  const endDate = endOfWeek(today);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  return days.map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const isDue = isDueOn(habit, dateStr);
    const isCompleted = isCompletedOn(habit, dateStr);
    const isFuture = isBefore(today, startOfDay(date));
    
    return {
      date,
      dateStr,
      isDue,
      isCompleted,
      isFuture,
      // Intensity 0-4
      intensity: !isDue ? 0 : (isCompleted ? 4 : (isFuture ? 0 : 1))
    };
  });
}
