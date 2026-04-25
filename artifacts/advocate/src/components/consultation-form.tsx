import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, MessageCircle, Mail as MailIcon } from "lucide-react";
import {
  createConsultation,
  type CreateConsultationInput,
} from "@workspace/api-client-react";
import { practiceAreas } from "@/data/practice-areas";

const ADVOCATE_PHONE_DIGITS = "917827716643";
const ADVOCATE_EMAIL = "anilshukla.clc@gmail.com";

type FormState = CreateConsultationInput;

const initialState: FormState = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  practiceArea: "",
  matter: "",
  preferredContact: "phone",
};

export function ConsultationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ id: number; message: string } | null>(
    null,
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.fullName.trim().length < 2) return setError("Please enter your full name.");
    if (form.phone.trim().length < 7) return setError("Please enter a valid phone number.");
    if (form.matter.trim().length < 10)
      return setError("Please describe your matter in at least a few words.");

    setSubmitting(true);
    try {
      const res = await createConsultation({
        ...form,
        email: form.email?.trim() || undefined,
        city: form.city?.trim() || undefined,
        practiceArea: form.practiceArea?.trim() || undefined,
      });
      setSuccess({ id: res.id, message: res.message });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not submit. Please try again.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const buildSummaryMessage = () => {
    const lines = [
      `New consultation request from anilshuklaadvocate.in:`,
      ``,
      `Name: ${form.fullName}`,
      `Phone: ${form.phone}`,
    ];
    if (form.email) lines.push(`Email: ${form.email}`);
    if (form.city) lines.push(`City: ${form.city}`);
    if (form.practiceArea) lines.push(`Practice Area: ${form.practiceArea}`);
    lines.push(``, `Matter:`, form.matter);
    return lines.join("\n");
  };

  const whatsappLink = () =>
    `https://wa.me/${ADVOCATE_PHONE_DIGITS}?text=${encodeURIComponent(buildSummaryMessage())}`;

  const mailtoLink = () => {
    const subject = `Consultation Request — ${form.fullName}`;
    return `mailto:${ADVOCATE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildSummaryMessage())}`;
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-background/5 border border-secondary/40 p-10 md:p-12 text-center"
      >
        <CheckCircle2 size={56} className="text-secondary mx-auto mb-4" />
        <h3 className="text-2xl font-serif text-background mb-3">
          Thank you, your request has been received.
        </h3>
        <p className="text-background/80 max-w-xl mx-auto mb-8">
          {success.message} Your reference number is{" "}
          <span className="text-secondary font-bold">#{success.id}</span>.
        </p>
        <p className="text-sm text-background/70 mb-6">
          For an instant alert, you can also send a copy directly:
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-primary font-medium hover:bg-secondary/90 transition-colors"
          >
            <MessageCircle size={18} /> Send via WhatsApp
          </a>
          <a
            href={mailtoLink()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-background/30 text-background hover:bg-background/5 hover:border-secondary transition-colors"
          >
            <MailIcon size={18} /> Send via Email
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setForm(initialState);
            setSuccess(null);
          }}
          className="mt-8 text-xs tracking-widest uppercase text-background/60 hover:text-secondary transition-colors"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background/5 border border-background/15 p-8 md:p-10 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full Name" required>
          <input
            type="text"
            required
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={inputCls}
            placeholder="Your name"
            autoComplete="name"
          />
        </Field>
        <Field label="Phone" required>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputCls}
            placeholder="+91 ..."
            autoComplete="tel"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={form.email ?? ""}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </Field>
        <Field label="City">
          <input
            type="text"
            value={form.city ?? ""}
            onChange={(e) => update("city", e.target.value)}
            className={inputCls}
            placeholder="e.g. Delhi"
          />
        </Field>
      </div>

      <Field label="Practice Area">
        <select
          value={form.practiceArea ?? ""}
          onChange={(e) => update("practiceArea", e.target.value)}
          className={`${inputCls} appearance-none cursor-pointer`}
        >
          <option value="">Select an area (optional)</option>
          {practiceAreas.map((a) => (
            <option key={a.id} value={a.name} className="bg-primary text-background">
              {a.name}
            </option>
          ))}
          <option value="Other" className="bg-primary text-background">
            Other / Not sure
          </option>
        </select>
      </Field>

      <Field label="Briefly describe your matter" required>
        <textarea
          required
          rows={5}
          value={form.matter}
          onChange={(e) => update("matter", e.target.value)}
          className={`${inputCls} resize-none`}
          placeholder="Share a short summary — what happened, when, and what help you are looking for. Keep it concise; details are discussed at consultation."
        />
      </Field>

      <Field label="Preferred way to be contacted">
        <div className="flex flex-wrap gap-2">
          {(["phone", "whatsapp", "email"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => update("preferredContact", opt)}
              className={`px-4 py-2 text-sm tracking-wide uppercase border transition-colors ${
                form.preferredContact === opt
                  ? "border-secondary bg-secondary/15 text-secondary"
                  : "border-background/20 text-background/70 hover:border-secondary/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </Field>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-red-300 bg-red-500/10 border border-red-400/30 px-4 py-3"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-background/60 leading-relaxed max-w-md">
          Submitting this form does not create an attorney-client relationship.
          Information shared is treated in confidence.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-secondary text-primary font-bold tracking-wider uppercase text-sm hover:bg-secondary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors min-w-[200px]"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending
            </>
          ) : (
            <>Request Consultation</>
          )}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full bg-background/5 border border-background/20 text-background placeholder:text-background/40 px-4 py-3 outline-none focus:border-secondary focus:bg-background/10 transition-colors";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold tracking-widest uppercase text-background/70 mb-2">
        {label}
        {required && <span className="text-secondary"> *</span>}
      </span>
      {children}
    </label>
  );
}
