import { useState, useEffect } from "react";
import { useHabits, Habit } from "@/lib/store";
import { useLocation, useParams, Link } from "wouter";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const habitSchema = z.object({
  name: z.string().min(1, "What do you want to call this habit?"),
  emoji: z.string().min(1, "Pick an emoji").max(5),
  frequencyType: z.enum(["daily", "weekly"]),
  weeklyDays: z.array(z.number()).default([1, 2, 3, 4, 5]),
  target: z.string().optional(),
});

type HabitFormValues = z.infer<typeof habitSchema>;

const DAYS = [
  { value: 0, label: "S" },
  { value: 1, label: "M" },
  { value: 2, label: "T" },
  { value: 3, label: "W" },
  { value: 4, label: "T" },
  { value: 5, label: "F" },
  { value: 6, label: "S" },
];

export default function HabitForm() {
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== "new";
  const { habits, addHabit, updateHabit } = useHabits();
  const [, setLocation] = useLocation();

  const existingHabit = isEditing ? habits.find((h) => h.id === id) : null;

  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: existingHabit?.name || "",
      emoji: existingHabit?.emoji || "🌱",
      frequencyType: existingHabit?.frequency.type || "daily",
      weeklyDays: existingHabit?.frequency.type === "weekly" ? existingHabit.frequency.days : [1, 2, 3, 4, 5],
      target: existingHabit?.target || "",
    },
  });

  const frequencyType = form.watch("frequencyType");
  const weeklyDays = form.watch("weeklyDays");

  const onSubmit = (data: HabitFormValues) => {
    const frequency =
      data.frequencyType === "daily"
        ? { type: "daily" as const }
        : { type: "weekly" as const, days: data.weeklyDays };

    if (isEditing && id) {
      updateHabit(id, {
        name: data.name,
        emoji: data.emoji,
        frequency,
        target: data.target,
      });
      setLocation(`/habits/${id}`);
    } else {
      addHabit({
        name: data.name,
        emoji: data.emoji,
        frequency,
        target: data.target,
      });
      setLocation("/");
    }
  };

  const toggleDay = (day: number) => {
    const current = new Set(weeklyDays);
    if (current.has(day)) {
      current.delete(day);
    } else {
      current.add(day);
    }
    form.setValue("weeklyDays", Array.from(current).sort());
  };

  return (
    <div className="pt-6 pb-24 px-6 max-w-md mx-auto min-h-screen bg-background">
      <header className="mb-8 flex items-center justify-between">
        <Link
          href={isEditing ? `/habits/${id}` : "/habits"}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-serif">{isEditing ? "Edit Habit" : "New Habit"}</h1>
        <div className="w-10 h-10" />
      </header>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="w-20 space-y-2">
              <Label className="text-muted-foreground pl-1">Icon</Label>
              <Input
                {...form.register("emoji")}
                className="text-center text-2xl h-14 bg-card border-border rounded-xl focus-visible:ring-primary/50"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label className="text-muted-foreground pl-1">Habit Name</Label>
              <Input
                {...form.register("name")}
                placeholder="e.g. Read, Walk, Meditate"
                className="h-14 bg-card border-border rounded-xl px-4 text-lg focus-visible:ring-primary/50"
                autoFocus={!isEditing}
              />
            </div>
          </div>
          {form.formState.errors.name && (
            <p className="text-sm text-destructive px-1">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <Label className="text-muted-foreground pl-1">How often?</Label>
          <Controller
            control={form.control}
            name="frequencyType"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem
                    value="daily"
                    id="daily"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="daily"
                    className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer h-16 transition-colors"
                  >
                    Every day
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="weekly"
                    id="weekly"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="weekly"
                    className="flex flex-col items-center justify-center rounded-xl border-2 border-border bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer h-16 transition-colors"
                  >
                    Specific days
                  </Label>
                </div>
              </RadioGroup>
            )}
          />

          {frequencyType === "weekly" && (
            <div className="pt-4 flex justify-between bg-card p-4 rounded-xl border border-border">
              {DAYS.map((day) => (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleDay(day.value)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${
                    weeklyDays.includes(day.value)
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-muted-foreground pl-1">Daily Target (Optional)</Label>
          <Input
            {...form.register("target")}
            placeholder="e.g. 15 pages, 30 mins"
            className="h-14 bg-card border-border rounded-xl px-4 focus-visible:ring-primary/50"
          />
        </div>

        <div className="pt-6 border-t border-border">
          <Button
            type="submit"
            className="w-full h-14 rounded-full text-lg shadow-sm"
          >
            {isEditing ? "Save Changes" : "Create Habit"}
          </Button>
        </div>
      </form>
    </div>
  );
}