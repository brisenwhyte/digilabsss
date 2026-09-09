"use client";

import type { Variants } from "framer-motion";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Check, Gauge, Sparkles, Zap } from "lucide-react";

type BrowserMockupProps = {
  mode?: "premium" | "dated" | "performance" | "integration";
  className?: string;
  compact?: boolean;
};

export function BrowserMockup({ mode = "premium", className = "", compact = false }: BrowserMockupProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 22 });

  return (
    <motion.div
      className={`relative rounded-[26px] border border-white/12 bg-white/[0.075] p-2 shadow-[0_40px_140px_rgba(0,0,0,0.48)] backdrop-blur-xl ${className}`}
      style={{ rotateX: reduceMotion ? 0 : rotateX, rotateY: reduceMotion ? 0 : rotateY, transformStyle: "preserve-3d" }}
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
      }}
      onPointerLeave={() => {
        pointerX.set(0);
        pointerY.set(0);
      }}
    >
      <div className="overflow-hidden rounded-[20px] border border-white/10 bg-[#0d0d0d]">
        <div className="flex h-10 items-center justify-between border-b border-white/10 bg-white/[0.06] px-4">
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff695f]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd45]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#65d572]" />
          </div>
          <div className="hidden h-5 w-48 rounded-full bg-black/35 text-[10px] text-white/35 md:flex md:items-center md:justify-center">
            digilabss.com/growth-engine
          </div>
          <div className="h-2 w-12 rounded-full bg-white/10" />
        </div>
        <div className={`${compact ? "min-h-[14rem] sm:min-h-[21rem]" : "min-h-[20rem] sm:min-h-[30rem] lg:min-h-[34rem]"} relative overflow-hidden bg-[#f6f2ea] text-[#111]`}>
          {mode === "dated" ? <DatedInterface /> : null}
          {mode === "premium" ? <PremiumInterface /> : null}
          {mode === "performance" ? <PerformanceInterface /> : null}
          {mode === "integration" ? <IntegrationInterface /> : null}
        </div>
      </div>
    </motion.div>
  );
}

function PremiumInterface() {
  const items = ["Strategy", "Build", "Launch"];

  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,215,255,0.22),transparent_28%),linear-gradient(145deg,#f8f4ec,#dcd5c7)] p-5 sm:p-7">
      <motion.div className="flex items-center justify-between" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.09 } } }}>
        <motion.div variants={staggerItem} className="font-mono text-xs uppercase text-black/45">DigiLabss</motion.div>
        <div className="hidden gap-4 text-xs text-black/45 sm:flex">
          {items.map((item) => (
            <motion.span key={item} variants={staggerItem}>{item}</motion.span>
          ))}
        </div>
        <motion.div variants={staggerItem} className="rounded-full bg-black px-3 py-1.5 text-xs text-white">Quote</motion.div>
      </motion.div>
      <div className="grid h-[calc(100%-2rem)] grid-cols-1 items-center gap-6 pt-10 md:grid-cols-[1fr_0.78fr]">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}>
          <motion.p variants={staggerItem} className="mb-4 text-xs uppercase tracking-[0.24em] text-black/45">AI marketing engine</motion.p>
          <motion.h3 variants={staggerItem} className="max-w-md text-3xl font-semibold leading-[0.94] tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
            Attention becomes booked revenue.
          </motion.h3>
          <motion.div variants={staggerItem} className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full bg-black px-4 py-2 text-sm text-white">Start project</span>
            <span className="rounded-full border border-black/10 bg-white/55 px-4 py-2 text-sm text-black/70">View work</span>
          </motion.div>
        </motion.div>
        <motion.div className="grid gap-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}>
          <motion.div variants={staggerItem} className="rounded-3xl bg-black p-5 text-white shadow-2xl">
            <div className="mb-8 h-28 rounded-2xl bg-[linear-gradient(135deg,#101010,#303030_55%,#63d7ff)]" />
            <div className="h-2 w-3/4 rounded-full bg-white/80" />
            <div className="mt-3 h-2 w-1/2 rounded-full bg-white/30" />
          </motion.div>
          <motion.div variants={staggerItem} className="grid grid-cols-3 gap-3 text-xs">
            {[["3-5d", "Asset sprints"], ["7d", "Ad launch"], ["24/7", "Follow-up"]].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-black/10 bg-white/55 p-3">
                <div className="text-xl font-semibold">{value}</div>
                <div className="mt-1 text-black/45">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function DatedInterface() {
  return (
    <div className="absolute inset-0 bg-[#eee6d7] p-4 text-[#2c241c]">
      <div className="flex items-center justify-between border-b-4 border-[#b47745] pb-3 font-serif text-sm">
        <strong>Business Marketing</strong>
        <div className="flex gap-2 text-[10px]"><span>Home</span><span>About</span><span>Services</span><span>Contact</span></div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[0.58fr_0.42fr]">
        <div>
          <div className="mb-3 inline-block bg-[#b47745] px-2 py-1 text-[10px] uppercase text-white">Welcome</div>
          <h3 className="font-serif text-2xl font-bold leading-none sm:text-4xl">Posts, ads, pages, and follow-up live in silos</h3>
          <p className="mt-4 max-w-sm text-sm leading-6 text-black/60">The message, traffic, website, and lead response all compete instead of compounding.</p>
          <button className="mt-6 border-2 border-[#2c241c] px-5 py-2 text-xs">Click Here</button>
        </div>
        <div className="grid gap-3">
          <div className="h-28 bg-[#d0b693]" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-20 bg-[#c8bea8]" />
            <div className="h-20 bg-[#aeb7aa]" />
          </div>
          <div className="space-y-2 rounded bg-white/45 p-3">
            <div className="h-2 w-full bg-black/25" />
            <div className="h-2 w-10/12 bg-black/20" />
            <div className="h-2 w-8/12 bg-black/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PerformanceInterface() {
  return (
    <div className="absolute inset-0 bg-[#090909] p-5 text-white">
      <div className="flex items-center justify-between text-xs text-white/45"><span>Core Web Vitals</span><Gauge className="h-4 w-4" /></div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {["LCP", "CLS", "INP"].map((metric, index) => (
          <motion.div key={metric} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
            <div className="mb-8 flex items-center justify-between"><span className="font-mono text-xs text-white/45">{metric}</span><Check className="h-4 w-4 text-[#63d7ff]" /></div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-[#63d7ff]" initial={{ width: "0%" }} whileInView={{ width: ["88%", "95%", "91%"][index] }} viewport={{ once: true }} transition={{ duration: 1.1, ease: "easeOut" }} /></div>
            <p className="mt-4 text-sm text-white/70">Built for excellent signals</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 rounded-[2rem] bg-[#f6f2ea] p-5 text-black">
        <div className="flex items-center gap-3"><Zap className="h-5 w-5 text-[#0c89bd]" /><span className="text-sm font-medium">Responsive media, stable layouts, fast interactions.</span></div>
      </div>
    </div>
  );
}

function IntegrationInterface() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#0b0b0b] p-5 text-white">
      <div className="relative h-[22rem] w-full max-w-lg">
        <div className="absolute left-1/2 top-1/2 z-10 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 text-center shadow-2xl backdrop-blur">
          <Sparkles className="mx-auto mb-3 h-5 w-5 text-[#d7b16d]" />
          <div className="text-sm font-medium">Growth engine</div>
          <div className="mt-1 text-xs text-white/45">content to revenue</div>
        </div>
        {["Video", "Meta Ads", "Website", "Analytics", "Automation", "CRM"].map((item, index) => {
          const positions = ["left-0 top-3", "right-2 top-10", "left-6 bottom-12", "right-4 bottom-7", "left-1/2 top-0 -translate-x-1/2", "left-1/2 bottom-0 -translate-x-1/2"];
          return (
            <motion.div key={item} className={`absolute ${positions[index]} rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs text-white/70`} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
              {item}
            </motion.div>
          );
        })}
        <div className="absolute inset-8 rounded-full border border-dashed border-white/12" />
        <div className="absolute inset-20 rounded-full border border-dashed border-[#63d7ff]/20" />
      </div>
    </div>
  );
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
};

export { DatedInterface, PremiumInterface };