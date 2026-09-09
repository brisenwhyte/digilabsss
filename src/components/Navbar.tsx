"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/data/landing";

export function Navbar() {
  const [active, setActive] = useState("work");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sectionIds = ["work", "process", "capabilities", "quote"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: 0.01 },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary navigation"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-3 backdrop-blur-xl transition-all duration-500 sm:px-4 ${
          scrolled ? "border-white/14 bg-black/54 shadow-[0_20px_80px_rgba(0,0,0,0.35)]" : "border-white/8 bg-black/18"
        }`}
      >
        <a href="#top" aria-label="DigiLabss home" className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#63d7ff] sm:text-xs sm:tracking-[0.22em]">
          <span aria-hidden="true" className="hidden min-[340px]:inline">DigiLabss</span>
          <span aria-hidden="true" className="min-[340px]:hidden">DL</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a key={item.href} href={item.href} className="relative rounded-full px-4 py-2 text-sm text-white/68 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#63d7ff]">
                {isActive ? <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10" /> : null}
                <span className="relative">{item.label}</span>
              </a>
            );
          })}
        </div>
        <a href="#quote" className="group hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#f3efe6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#63d7ff] md:flex">
          Strategy Call <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
        <button className="rounded-full border border-white/12 bg-white/5 p-2 text-white md:hidden" type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/12 bg-black/80 p-3 backdrop-blur-xl md:hidden" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {[...navItems, { label: "Strategy Call", href: "#quote" }].map((item) => (
              <a key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 text-sm text-white/80 hover:bg-white/8" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}