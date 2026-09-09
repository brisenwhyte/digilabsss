"use client";

import type { Variants } from "framer-motion";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { BrowserMockup } from "./BrowserMockup";
import { MagneticButton } from "./MotionPrimitives";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.92]);

  return (
    <section id="top" ref={ref} className="relative grid min-h-[68svh] place-items-center overflow-hidden px-4 pb-0 pt-20 sm:px-6 lg:min-h-[78svh] lg:pt-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.13 } } }} className="relative z-10">
          <motion.p variants={heroItem} className="mb-5 text-sm uppercase tracking-[0.28em] text-white/48">
            AI-powered growth engine
          </motion.p>
          <motion.h1 variants={heroItem} className="text-balance text-[clamp(1.4rem,8vw,2.7rem)] font-semibold leading-[0.94] tracking-[-0.025em] text-white sm:text-7xl sm:leading-[0.9] sm:tracking-[-0.06em] lg:text-[7.5rem]">
            <span className="block sm:inline">Growth</span>{" "}
            <span className="block sm:inline">that converts.</span>
          </motion.h1>
          <motion.p variants={heroItem} className="mt-5 max-w-xl text-base leading-7 text-white/64 sm:mt-7 sm:text-xl sm:leading-8">
            Content, Meta ads, conversion websites, and automation built to turn attention into booked revenue.
          </motion.p>
          <motion.div variants={heroItem} className="mt-7 flex flex-col items-start gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <MagneticButton href="#quote">
              Book Strategy Call <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </MagneticButton>
            <MagneticButton href="#process" variant="secondary">See How It Works</MagneticButton>
          </motion.div>
        </motion.div>
        <motion.div className="relative z-10" style={{ y, scale }} initial={{ opacity: 0, y: 42, scale: 0.94, filter: "blur(18px)" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1.1, delay: 0.28, ease: "easeOut" }}>
          <BrowserMockup compact className="mx-auto max-w-2xl lg:max-w-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

const heroItem: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(14px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.82, ease: "easeOut" } },
};