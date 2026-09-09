"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070707]">
      <motion.div
        className="absolute left-[-12%] top-[-20%] h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(99,215,255,0.20),transparent_65%)] blur-2xl"
        animate={reduceMotion ? undefined : { x: [0, 48, 8], y: [0, 28, -12], scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-24%] right-[-10%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle,rgba(215,177,109,0.15),transparent_68%)] blur-2xl"
        animate={reduceMotion ? undefined : { x: [0, -38, 0], y: [0, -24, 12], scale: [1, 1.05, 0.98] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.07),transparent_28%,rgba(255,255,255,0.03)_54%,transparent_75%)]" />
      <div className="noise" />
    </div>
  );
}