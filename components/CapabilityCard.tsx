'use client';

import { motion } from 'framer-motion';
import type { Capability } from '@/lib/ai-capabilities';
import { revealVariants } from '@/lib/motion';
import { SystemDiagram } from './SystemDiagram';

/**
 * One capability pillar. Editorial: magenta number, dark purple title, small
 * abstract system diagram, and a wrapped set of terminology chips.
 */
export function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <motion.article
      variants={revealVariants}
      className="group relative flex flex-col gap-5 rounded-2xl border border-border-light/40 bg-white/40 p-6 transition-colors duration-300 ease-cinematic hover:border-magenta/40 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-3xl font-black tabular-nums text-magenta sm:text-4xl">
          {capability.number}
        </span>
        <SystemDiagram
          variant={capability.diagram}
          tone="dark"
          className="h-14 w-20 opacity-70"
        />
      </div>

      <div>
        <h3 className="text-xl font-black leading-tight text-text-dark sm:text-2xl">
          {capability.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-text-dark/70">
          {capability.description}
        </p>
      </div>

      <ul className="mt-auto flex flex-wrap gap-2 pt-2">
        {capability.terms.map((term) => (
          <li
            key={term}
            className="rounded-full border border-border-light/60 bg-light-surface px-3 py-1 text-xs font-medium text-text-dark/75"
          >
            {term}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
