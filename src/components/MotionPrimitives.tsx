"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.16, y: 34, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({ children, href, variant = "primary", className = "" }: { children: ReactNode; href: string; variant?: "primary" | "secondary"; className?: string }) {
  const styles =
    variant === "primary"
      ? "bg-white text-black shadow-[0_18px_60px_rgba(255,255,255,0.18)] hover:bg-[#f3efe6]"
      : "border border-white/15 bg-white/5 text-white backdrop-blur hover:bg-white/10";

  return (
    <motion.a
      href={href}
      className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#63d7ff] ${styles} ${className}`}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    >
      {children}
    </motion.a>
  );
}