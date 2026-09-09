"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > Math.min(760, window.innerHeight * 0.72));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const hero = document.getElementById("top");
    const quote = document.getElementById("quote");
    const heroObserver = hero
      ? new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0.08 })
      : null;
    const quoteObserver = quote
      ? new IntersectionObserver(([entry]) => setQuoteVisible(entry.isIntersecting), { threshold: 0.18 })
      : null;
    if (hero && heroObserver) heroObserver.observe(hero);
    if (quote && quoteObserver) quoteObserver.observe(quote);

    return () => {
      window.removeEventListener("scroll", onScroll);
      heroObserver?.disconnect();
      quoteObserver?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !heroVisible && !quoteVisible ? (
        <motion.a
          href="#quote"
          className="group fixed bottom-4 right-4 z-40 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 bg-white px-4 text-sm font-semibold text-black shadow-[0_18px_60px_rgba(0,0,0,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#63d7ff] sm:bottom-6 sm:h-12 sm:px-5"
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.96 }}
          whileHover={{ scale: 1.035, paddingLeft: 24, paddingRight: 24 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 420, damping: 28 }}
        >
          <span className="sm:hidden">Call</span>
          <span className="hidden sm:inline">Book Strategy Call</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}