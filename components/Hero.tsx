'use client';

import { motion, type Variants } from 'framer-motion';
import { LivingTerrain } from './LivingTerrain';
import { motionTokens } from '@/lib/motion';

const lineVariants: Variants = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: {
      duration: 0.7,
      ease: motionTokens.ease,
      delay: i * 0.12,
    },
  }),
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: motionTokens.ease, delay: 0.35 + 3 * 0.12 },
  },
};

const identifierVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: motionTokens.ease, delay: 0.55 + 3 * 0.12 },
  },
};

const headlineLines = [
  { text: 'I turn complex problems', accent: false },
  { text: 'into clear, useful', accent: false },
  { text: 'digital products', accent: true },
];

/**
 * Hero — dark purple, left-aligned headline, description below, Living Terrain
 * artwork toward the right/lower portion. Flat bottom edge (no wave / curve).
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-purple-deep"
      aria-labelledby="hero-heading"
    >
      <LivingTerrain />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-content flex-col justify-center px-6 pb-20 pt-40 sm:px-10 sm:pb-28 sm:pt-48 lg:min-h-[90vh]">
        <h1
          id="hero-heading"
          className="max-w-[18ch] text-[clamp(2.5rem,7vw,4.75rem)] font-black leading-[1.02] tracking-tight"
        >
          {headlineLines.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className={`block ${line.accent ? 'text-magenta' : 'text-white'}`}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={descriptionVariants}
          initial="hidden"
          animate="visible"
          className="mt-7 max-w-[42ch] text-base text-white/75 sm:text-lg"
        >
          Connecting product thinking, experience design, AI systems, and
          technology.
        </motion.p>

        <motion.p
          variants={identifierVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-sm"
        >
          <span aria-hidden className="font-black text-magenta">
            /
          </span>
          Senior Product Designer · AI Products &amp; UX Engineering
        </motion.p>
      </div>
    </section>
  );
}
