"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Code2, Database, LineChart, Mail, ServerCog, Sparkles, X } from "lucide-react";
import { BrowserMockup, DatedInterface, PremiumInterface } from "./BrowserMockup";
import { Reveal } from "./MotionPrimitives";
import { capabilities, processSteps, testimonials } from "@/data/landing";

export function ProblemSection() {
  return (
    <section className="relative px-4 py-12 sm:px-6 lg:py-20">
      <Reveal className="mx-auto max-w-5xl text-center">
        <p className="mb-5 text-sm uppercase tracking-[0.28em] text-white/40">The problem</p>
        <h2 className="text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
          Your marketing is costing you opportunities.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-xl text-white/58">Make every touchpoint work harder.</p>
      </Reveal>
    </section>
  );
}

export function ProductSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const existOpacity = useTransform(scrollYProgress, [0.25, 0.45], [1, reduceMotion ? 1 : 0.25]);
  const workScale = useTransform(scrollYProgress, [0.32, 0.62], [0.9, reduceMotion ? 0.9 : 1]);

  return (
    <section id="work" ref={ref} className="relative px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
        <div>
          <p className="mb-5 text-sm uppercase tracking-[0.28em] text-white/40">Marketing as system</p>
          <h2 className="text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-7xl">
            Marketing shouldn&apos;t just <motion.span style={{ opacity: existOpacity }} className="text-white/70">post.</motion.span>
            <br />
            <motion.span style={{ scale: workScale }} className="inline-block origin-left text-[#f5efe1]">It should work.</motion.span>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">Creative, ads, website conversion, tracking, and follow-up are treated as one engine.</p>
        </div>
        <Reveal>
          <BrowserMockup mode="performance" compact />
        </Reveal>
      </div>
    </section>
  );
}

export function TransformationSection() {
  const rows = [
    ["Turnaround time", "2-4 weeks per asset batch", "3-5 days, every batch"],
    ["Production model", "Manual, junior-staffed, bottlenecked", "AI-assisted pipeline with senior review"],
    ["Pricing", "Hourly retainers and surprise fees", "Flat monthly rate, published deliverables"],
    ["System integration", "Ads run separate from CRM", "Ads, site, and CRM wired as one engine"],
    ["Reporting", "Vanity metrics slide decks", "Leads, cost-per-lead, and booked revenue"],
  ] as const;

  return (
    <section className="relative px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-10 max-w-4xl">
          <p className="mb-5 text-sm uppercase tracking-[0.28em] text-[#63d7ff]">Why DigiLabss</p>
          <h2 className="text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl">The difference between a legacy retainer and an AI-first engine.</h2>
        </Reveal>
        <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.045] shadow-[0_35px_120px_rgba(0,0,0,0.34)] backdrop-blur">
          <div className="hidden grid-cols-[1fr_1.18fr_1.35fr] border-b border-white/10 px-6 py-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/45 md:grid">
            <span />
            <span>Legacy Marketing Agency</span>
            <span className="text-[#63d7ff]">DigiLabss AI-First Engine</span>
          </div>
          {rows.map(([label, legacy, digilabss], index) => (
            <Reveal key={label} delay={index * 0.04}>
              <div className="grid gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 md:grid-cols-[1fr_1.18fr_1.35fr] md:items-center md:px-6">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-white">{label}</h3>
                <div className="flex items-start gap-3 text-white/52">
                  <X className="mt-1 h-4 w-4 shrink-0 text-[#ff6b64]" aria-hidden="true" />
                  <span><span className="mb-1 block text-xs uppercase tracking-[0.18em] text-white/28 md:hidden">Legacy</span>{legacy}</span>
                </div>
                <div className="flex items-start gap-3 font-medium text-white">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#26f0c7]" aria-hidden="true" />
                  <span><span className="mb-1 block text-xs uppercase tracking-[0.18em] text-[#63d7ff] md:hidden">DigiLabss</span>{digilabss}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PerformanceSection() {
  const metrics = [
    { value: "5/5", label: "Verified client rating" },
    { value: "240+", label: "Campaigns launched" },
    { value: "18,000+", label: "Qualified leads generated" },
  ];

  return (
    <section className="relative px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <h2 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-7xl">Beautiful is the baseline.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/58">Fast creative cycles, responsive lead capture, and real-world follow-up backed by measurable marketing activity.</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {metrics.map((metric, index) => <MetricCard key={metric.label} {...metric} delay={index * 0.12} />)}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div className="rounded-[2rem] border border-white/12 bg-white/[0.055] p-6 backdrop-blur" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay, duration: 0.65 }}>
      <div className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">{value}</div>
      <div className="mt-3 text-sm text-white/48">{label}</div>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  const icons = [Sparkles, Code2, LineChart, Database, ArrowRight];

  return (
    <section id="capabilities" className="relative px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14 max-w-4xl">
          <p className="mb-5 text-sm uppercase tracking-[0.28em] text-white/40">Capabilities</p>
          <h2 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-7xl">Everything your growth engine needs. Nothing it doesn&apos;t.</h2>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-4">
            {capabilities.map((capability, index) => {
              const Icon = icons[index];
              return (
                <Reveal key={capability.label} delay={index * 0.05}>
                  <div className="group grid gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 transition-transform hover:scale-[1.01] hover:bg-white/[0.07] sm:grid-cols-[2.5rem_1fr]">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white text-black"><Icon className="h-4 w-4" /></div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#63d7ff]">{capability.label}</p>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white sm:text-2xl">{capability.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/48">{capability.detail}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <BrowserMockup mode="integration" compact />
          </div>
        </div>
      </div>
    </section>
  );
}

export function BeforeAfterSection() {
  const [slider, setSlider] = useState(58);

  return (
    <section className="relative px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-3xl">
          <p className="mb-5 text-sm uppercase tracking-[0.28em] text-white/40">Before / after</p>
          <h2 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-7xl">Drag the line. Feel the difference.</h2>
        </Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06] p-2 shadow-[0_35px_120px_rgba(0,0,0,0.42)]">
          <div className="relative h-[26rem] overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#eee6d7] sm:h-[31rem]">
            <div className="absolute inset-0"><DatedInterface /></div>
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}><PremiumInterface /></div>
            <div className="absolute bottom-5 left-5 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">Before</div>
            <div className="absolute bottom-5 right-5 rounded-full bg-white px-3 py-1 text-xs text-black">After</div>
            <div className="absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_30px_rgba(99,215,255,0.7)]" style={{ left: `${slider}%` }} />
          </div>
          <label className="sr-only" htmlFor="before-after-slider">Compare before and after marketing system</label>
          <input id="before-after-slider" aria-label="Compare before and after marketing system" className="absolute inset-x-6 bottom-6 z-20 h-8 cursor-ew-resize accent-[#63d7ff]" min="16" max="84" value={slider} type="range" onChange={(event) => setSlider(Number(event.target.value))} />
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-16">
          <p className="mb-5 text-sm uppercase tracking-[0.28em] text-white/40">Process</p>
          <h2 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-7xl">Simple from day one.</h2>
        </Reveal>
        <div className="relative pl-8 sm:pl-12">
          <div className="absolute bottom-0 left-2 top-0 w-px bg-white/12 sm:left-4" />
          <motion.div className="absolute left-2 top-0 w-px origin-top bg-[#63d7ff] sm:left-4" style={{ height }} />
          <div className="space-y-10">
            {processSteps.map(([number, title, copy], index) => (
              <Reveal key={title} delay={index * 0.05}>
                <div className="relative grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:grid-cols-[8rem_1fr]">
                  <span className="absolute -left-[2.15rem] top-7 h-4 w-4 rounded-full border border-[#63d7ff] bg-[#070707] shadow-[0_0_0_7px_rgba(99,215,255,0.08)] sm:-left-[2.65rem]" />
                  <div className="font-mono text-sm text-[#63d7ff]">{number}</div>
                  <div>
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] text-white">{title}</h3>
                    <p className="mt-2 max-w-2xl text-white/52">{copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % testimonials.length), 4200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-8 text-sm uppercase tracking-[0.28em] text-white/40">Proof, presented as demo content</p>
        <div className="relative min-h-[18rem]">
          <AnimatePresence mode="wait">
            <motion.figure key={testimonials[index].quote} initial={{ opacity: 0, y: 18, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -18, filter: "blur(10px)" }} transition={{ duration: 0.65 }}>
              <blockquote className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">&ldquo;{testimonials[index].quote}&rdquo;</blockquote>
              <figcaption className="mt-8 text-sm uppercase tracking-[0.2em] text-white/42">{testimonials[index].attribution}</figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function TechnologySection() {
  return (
    <section className="relative px-4 py-12 sm:px-6 lg:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="mb-5 text-sm uppercase tracking-[0.28em] text-white/40">The stack</p>
          <h2 className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-7xl">Everything connects.</h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">Content, ads, site, CRM, analytics, automation, and APIs are planned as one operating system for growth.</p>
        </Reveal>
        <div className="relative min-h-[34rem] rounded-[2rem] border border-white/12 bg-white/[0.045] p-6">
          <div className="absolute left-1/2 top-1/2 z-10 w-48 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-white p-5 text-center text-black shadow-2xl">
            <ServerCog className="mx-auto mb-3 h-6 w-6" />
            <p className="font-medium">Growth engine</p>
            <p className="mt-1 text-xs text-black/45">creative, traffic, follow-up</p>
          </div>
          {[Mail, Database, LineChart, Code2, Sparkles, Check].map((Icon, index) => {
            const labels = ["Video", "CRM", "Reporting", "Website", "Automation", "Meta Ads"];
            const positions = ["left-6 top-8", "right-8 top-12", "left-10 bottom-12", "right-10 bottom-14", "left-1/2 top-6 -translate-x-1/2", "left-1/2 bottom-6 -translate-x-1/2"];
            return (
              <motion.div key={labels[index]} className={`absolute ${positions[index]} rounded-full border border-white/12 bg-black/60 px-4 py-3 text-sm text-white/70 backdrop-blur`} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <span className="inline-flex items-center gap-2"><Icon className="h-4 w-4 text-[#63d7ff]" />{labels[index]}</span>
              </motion.div>
            );
          })}
          <motion.div aria-hidden="true" className="absolute inset-12 rounded-full border border-dashed border-white/12" animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} />
          <motion.div aria-hidden="true" className="absolute inset-24 rounded-full border border-dashed border-[#d7b16d]/18" animate={{ rotate: -360 }} transition={{ duration: 42, repeat: Infinity, ease: "linear" }} />
        </div>
      </div>
    </section>
  );
}

export function FinalStatement() {
  return (
    <section className="relative grid min-h-[46svh] place-items-center overflow-hidden px-4 py-12 text-center sm:px-6 lg:py-20">
      <div className="absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(99,215,255,0.18),transparent_70%)]" aria-hidden="true" />
      <Reveal className="relative z-10 mx-auto max-w-6xl">
        <h2 className="text-balance text-6xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-8xl lg:text-[8.5rem]">Your marketing should feel like an unfair advantage.</h2>
      </Reveal>
    </section>
  );
}