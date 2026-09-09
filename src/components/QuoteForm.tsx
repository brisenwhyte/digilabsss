"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { budgetRanges, projectTypes } from "@/data/landing";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: "",
  budget: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

export function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const nextErrors: Errors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.company.trim()) nextErrors.company = "Please enter your company.";
    if (!form.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Please enter a valid email address.";
    if (!form.projectType) nextErrors.projectType = "Please choose your primary need.";
    if (!form.budget) nextErrors.budget = "Please choose a monthly marketing budget.";
    return nextErrors;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Quote request failed");
      }

      const saved = JSON.parse(localStorage.getItem("digilabss_quote_submissions") || "[]") as FormState[];
      localStorage.setItem("digilabss_quote_submissions", JSON.stringify([{ ...form }, ...saved].slice(0, 10)));
      trackEvent("strategy_form_submit", { primary_need: form.projectType, monthly_budget: form.budget });
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      setErrors({ message: "Something went wrong. Please try again in a moment." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="quote" className="relative scroll-mt-28 px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-[2.5rem] border border-white/12 bg-white/[0.055] p-6 shadow-[0_40px_140px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="mb-5 text-sm uppercase tracking-[0.28em] text-white/40">Strategy session</p>
            <h2 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl">Ready to stop guessing?</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/55">Tell us about your business, current marketing, and what growth should look like next.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/28 p-5 text-sm leading-6 text-white/52">
            Enquiries are logged to the server console, stored in memory at <span className="font-mono text-white/75">/api/quote</span>, and mirrored to localStorage for inspection.
          </div>
        </div>
        <div className="relative min-h-[32rem]">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" className="grid min-h-[32rem] place-items-center rounded-[2rem] bg-white text-center text-black" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
                <div>
                  <motion.div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-black text-white" initial={{ scale: 0.5, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                    <Check className="h-7 w-7" />
                  </motion.div>
                  <h3 className="text-4xl font-semibold tracking-[-0.04em]">Request received.</h3>
                  <p className="mt-3 text-black/55">We&apos;ll be in touch soon.</p>
                  <button className="mt-8 rounded-full border border-black/10 px-5 py-3 text-sm font-medium" type="button" onClick={() => setSubmitted(false)}>Send another request</button>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" noValidate onSubmit={onSubmit} className="grid gap-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" value={form.name} error={errors.name} onChange={(value) => setForm({ ...form, name: value })} />
                  <Field label="Email" name="email" type="email" value={form.email} error={errors.email} onChange={(value) => setForm({ ...form, email: value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" name="phone" type="tel" value={form.phone} error={errors.phone} onChange={(value) => setForm({ ...form, phone: value })} />
                  <Field label="Company / Website URL" name="company" value={form.company} error={errors.company} onChange={(value) => setForm({ ...form, company: value })} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField label="Primary Need" name="projectType" value={form.projectType} error={errors.projectType} options={projectTypes} onChange={(value) => setForm({ ...form, projectType: value })} />
                  <SelectField label="Monthly Marketing Budget" name="budget" value={form.budget} error={errors.budget} options={budgetRanges} onChange={(value) => setForm({ ...form, budget: value })} />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-white/64" htmlFor="message">Goals / Message <span className="text-white/30">optional</span></label>
                  <textarea id="message" name="message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="min-h-36 w-full resize-y rounded-[1.35rem] border border-white/12 bg-black/30 px-4 py-4 text-white placeholder:text-white/24 transition-colors focus:border-[#63d7ff]" placeholder="Tell us about your business, current marketing challenges, and what you want to achieve." />
                  {errors.message ? <p className="mt-2 text-sm text-[#ffb7a8]">{errors.message}</p> : null}
                </div>
                <motion.button type="submit" disabled={submitting} className="group mt-2 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-[#f3efe6] disabled:cursor-wait disabled:opacity-70" whileHover={{ scale: submitting ? 1 : 1.02 }} whileTap={{ scale: submitting ? 1 : 0.98 }}>
                  {submitting ? "Sending enquiry..." : "Book Free Strategy Call"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, error, type = "text" }: { label: string; name: keyof FormState; value: string; onChange: (value: string) => void; error?: string; type?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/64" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} className="h-13 w-full rounded-full border border-white/12 bg-black/30 px-4 text-white placeholder:text-white/24 transition-colors focus:border-[#63d7ff]" />
      {error ? <p id={`${name}-error`} className="mt-2 text-sm text-[#ffb7a8]">{error}</p> : null}
    </div>
  );
}

function SelectField({ label, name, value, onChange, error, options }: { label: string; name: keyof FormState; value: string; onChange: (value: string) => void; error?: string; options: string[] }) {
  return (
    <div>
      <label className="mb-2 block text-sm text-white/64" htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} className="h-13 w-full rounded-full border border-white/12 bg-black/30 px-4 text-white transition-colors focus:border-[#63d7ff]">
        <option value="">Select one</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      {error ? <p id={`${name}-error`} className="mt-2 text-sm text-[#ffb7a8]">{error}</p> : null}
    </div>
  );
}