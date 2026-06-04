import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import {
  db,
  consultationsTable,
  insertConsultationSchema,
} from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

async function fireWebhook(data: {
  id: number;
  fullName: string;
  phone: string;
  city?: string;
  practiceArea?: string;
  matter?: string;
  preferredContact?: string;
}) {
  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const body = JSON.stringify({
      id: data.id,
      name: data.fullName,
      phone: data.phone,
      city: data.city ?? "",
      practice_area: data.practiceArea ?? "",
      matter: data.matter ?? "",
      preferred_contact: data.preferredContact ?? "",
      submitted_at: new Date().toISOString(),
      message: `New consultation request from ${data.fullName} (${data.phone})${data.city ? ` in ${data.city}` : ""}. Preferred contact: ${data.preferredContact ?? "phone"}.${data.matter ? ` Matter: ${data.matter}` : ""}`,
    });

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      logger.warn({ status: res.status }, "Webhook responded with non-2xx");
    } else {
      logger.info({ consultationId: data.id }, "Webhook notification sent");
    }
  } catch (err) {
    logger.warn({ err }, "Webhook notification failed (non-fatal)");
  }
}

router.post("/consultations", async (req, res) => {
  const parsed = insertConsultationSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message:
        parsed.error.issues[0]?.message ?? "Invalid consultation request",
    });
  }

  try {
    const [row] = await db
      .insert(consultationsTable)
      .values(parsed.data)
      .returning({ id: consultationsTable.id });

    const id = row?.id ?? 0;

    logger.info(
      { consultationId: id, name: parsed.data.fullName },
      "New consultation request received",
    );

    fireWebhook({ id, ...parsed.data }).catch(() => {});

    return res.status(201).json({
      id,
      message:
        "Consultation request received. We will contact you shortly.",
    });
  } catch (err) {
    logger.error({ err }, "Failed to insert consultation");
    return res
      .status(500)
      .json({ message: "Could not submit request. Please try again." });
  }
});

router.get("/admin/consultations", async (req, res) => {
  const adminToken = process.env.ADVOCATE_ADMIN_TOKEN;
  if (!adminToken) {
    return res
      .status(500)
      .json({ message: "Admin access not configured on the server." });
  }

  const provided =
    req.header("x-admin-token") ||
    (req.query.token as string | undefined) ||
    "";

  if (provided !== adminToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const items = await db
      .select()
      .from(consultationsTable)
      .orderBy(desc(consultationsTable.createdAt));
    return res.json({ items });
  } catch (err) {
    logger.error({ err }, "Failed to list consultations");
    return res.status(500).json({ message: "Could not load consultations." });
  }
});

export default router;
