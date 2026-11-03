'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/projects';
import { ProjectCard } from './ProjectCard';
import {
  softRevealVariants,
  staggerContainer,
  viewportOnce,
} from '@/lib/motion';

/**
 * Selected Work — light editorial section.
 * Grid:  NASCAR (full) / Shark Tank + Phocas (shared row) / Visa (full).
 * Reveal order on viewport entry: eyebrow -> heading+description ->
 * NASCAR -> Shark Tank & Phocas (staggered) -> Visa.
 */
export function SelectedWork() {
  const [nascar, sharkTank, phocas, visa] = projects;

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-light text-text-dark"
    >
      <div className="mx-auto max-w-content px-6 py-20 sm:px-10 sm:py-28">
        {/* Header block */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-6 border-b border-border-light/50 pb-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={softRevealVariants}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-text-dark/70"
            >
              <span aria-hidden className="font-black text-magenta">
                /
              </span>
              Selected Work
            </motion.p>
            <motion.h2
              id="work-heading"
              variants={softRevealVariants}
              className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-black leading-[1.02] tracking-tight"
            >
              Ideas into experiences.
            </motion.h2>
          </div>

          <motion.p
            variants={softRevealVariants}
            className="max-w-sm border-l-2 border-magenta pl-4 text-sm leading-relaxed text-text-dark/70 sm:text-base"
          >
            A selection of product work that turns strategy into real impact —
            for users, businesses and global brands.
          </motion.p>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2"
        >
          {/* NASCAR — full width */}
          <div className="md:col-span-2">
            <ProjectCard project={nascar} priority />
          </div>

          {/* Shark Tank + Phocas — share a row */}
          <ProjectCard project={sharkTank} />
          <ProjectCard project={phocas} />

          {/* Visa — full width */}
          <div className="md:col-span-2">
            <ProjectCard project={visa} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
