"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section className="pt-16 pb-10">
      <div className="mx-auto max-w-[1480px] px-5">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(237,230,211,0.45)] mb-6"
        >
          // Projects &middot; 5 Entries
        </motion.div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-serif text-[clamp(3.5rem,9vw,5.5rem)] font-normal tracking-[-0.035em] leading-[0.92] text-foreground"
        >
          The&nbsp;builds<span className="text-signal italic">.</span>
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-4 font-serif italic text-[1.2rem] leading-[1.32] tracking-[-0.012em] text-foreground-2 max-w-[768px]"
        >
          Each entry is a working system I shipped — the problem, the decisions, the
          architecture, and what I learned building it.
        </motion.p>
      </div>
    </section>
  );
}
