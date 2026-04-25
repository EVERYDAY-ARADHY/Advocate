import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import {
  db,
  consultationsTable,
  insertConsultationSchema,
} from "@workspace/db";
import { logger } from "../lib/logger";

const router: IRouter = Router();

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

    logger.info(
      { consultationId: row?.id, name: parsed.data.fullName },
      "New consultation request received",
    );

    return res.status(201).json({
      id: row?.id,
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
