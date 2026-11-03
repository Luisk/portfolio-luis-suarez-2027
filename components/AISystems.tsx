'use client';

import { motion } from 'framer-motion';
import { aiProjects } from '@/lib/ai-projects';
import { AIProjectCard } from './AIProjectCard';
import { softRevealVariants, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * AI Systems in Practice — dark section signalling experimentation and
 * technical understanding. Three compact AI project cards reveal progressively.
 */
export function AISystems() {
  return (
    <section
      id="ai-systems"
      aria-labelledby="ai-systems-heading"
      className="bg-dark text-white"
    >
      <div className="mx-auto max-w-content px-6 py-20 sm:px-10 sm:py-28">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <motion.p
            variants={softRevealVariants}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-white/60"
          >
            <span aria-hidden className="font-black text-magenta">
              /
            </span>
            AI Systems in Practice
          </motion.p>
          <motion.h2
            id="ai-systems-heading"
            variants={softRevealVariants}
            className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.03] tracking-tight"
          >
            Exploring what&rsquo;s possible with AI.
          </motion.h2>
          <motion.p
            variants={softRevealVariants}
            className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg"
          >
            From intelligent business advisors to autonomous design workflows, I
            explore how models, agents, and human-centered experiences can work
            together to solve real problems.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3"
        >
          {aiProjects.map((project) => (
            <AIProjectCard key={project.number} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
