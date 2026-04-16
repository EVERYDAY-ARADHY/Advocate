import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { format, subDays } from 'date-fns';

export type Habit = {
  id: string;
  name: string;
  emoji: string;
  frequency: { type: 'daily' } | { type: 'weekly'; days: number[] };
  target?: string;
  reminderTime?: string;
  createdAt: string;
  completions: string[];
};

const STORAGE_KEY = 'habits.v1';
const SEED_FLAG_KEY = 'habits.seeded.v1';

function getInitialHabits(): Habit[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse stored habits', e);
  }

  // Check if we already seeded
  if (localStorage.getItem(SEED_FLAG_KEY)) {
    return [];
  }

  // Seed initial data
  const today = new Date();
  const seedHabits: Habit[] = [
    {
      id: nanoid(),
      name: 'Read',
      emoji: '📚',
      frequency: { type: 'daily' },
      target: '15 pages',
      createdAt: format(subDays(today, 30), 'yyyy-MM-dd'),
      completions: Array.from({ length: 20 }, (_, i) => format(subDays(today, i + 2), 'yyyy-MM-dd'))
    },
    {
      id: nanoid(),
      name: 'Walk',
      emoji: '🚶',
      frequency: { type: 'daily' },
      target: '30 mins',
      createdAt: format(subDays(today, 15), 'yyyy-MM-dd'),
      completions: Array.from({ length: 14 }, (_, i) => format(subDays(today, i + 1), 'yyyy-MM-dd'))
    },
    {
      id: nanoid(),
      name: 'Morning pages',
      emoji: '✍️',
      frequency: { type: 'weekly', days: [1, 2, 3, 4, 5] },
      createdAt: format(subDays(today, 60), 'yyyy-MM-dd'),
      completions: Array.from({ length: 30 }, (_, i) => format(subDays(today, i * 2 + 1), 'yyyy-MM-dd'))
    }
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedHabits));
  localStorage.setItem(SEED_FLAG_KEY, 'true');
  return seedHabits;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(getInitialHabits);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'completions'>) => {
    const newHabit: Habit = {
      ...habit,
      id: nanoid(),
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      completions: []
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Omit<Habit, 'id' | 'createdAt' | 'completions'>>) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const toggleCompletion = (habitId: string, dateStr: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id !== habitId) return h;
      
      const isCompleted = h.completions.includes(dateStr);
      const newCompletions = isCompleted
        ? h.completions.filter(d => d !== dateStr)
        : [...h.completions, dateStr];
        
      return { ...h, completions: newCompletions };
    }));
  };

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion
  };
}