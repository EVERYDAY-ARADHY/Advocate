import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const consultationsTable = pgTable(
  "consultations",
  {
    id: serial("id").primaryKey(),
    fullName: varchar("full_name", { length: 120 }).notNull(),
    phone: varchar("phone", { length: 40 }).notNull(),
    email: varchar("email", { length: 200 }),
    city: varchar("city", { length: 120 }),
    practiceArea: varchar("practice_area", { length: 80 }),
    matter: text("matter").notNull(),
    preferredContact: varchar("preferred_contact", { length: 20 }),
    status: varchar("status", { length: 20 }).default("new").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    createdIdx: index("consultations_created_idx").on(t.createdAt),
  }),
);

export const insertConsultationSchema = createInsertSchema(consultationsTable, {
  fullName: (s) => s.min(2).max(120),
  phone: (s) => s.min(7).max(40),
  email: (s) => s.email().optional().or(z.literal("")),
  matter: (s) => s.min(10).max(4000),
}).omit({ id: true, status: true, createdAt: true });

export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultationsTable.$inferSelect;
