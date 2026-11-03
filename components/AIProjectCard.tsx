'use client';

import { motion } from 'framer-motion';
import type { AIProject, ProjectStatus } from '@/lib/ai-projects';
import { revealVariants } from '@/lib/motion';
import { SystemDiagram } from './SystemDiagram';

/**
 * Compact AI project card for the dark "AI Systems in Practice" section.
 * Shows name, honest development status, one-line purpose, the product
 * question, main AI capabilities, and an abstract architecture diagram.
 * No external links or unsupported PDFs.
 */

const statusStyles: Record<ProjectStatus, string> = {
  Implemented: 'bg-magenta/20 text-magenta border-magenta/40',
  'Functional Prototype': 'bg-magenta/15 text-magenta border-magenta/35',
  'In Development': 'bg-white/10 text-white/80 border-white/25',
  Concept: 'bg-white/5 text-white/70 border-white/20',
  Exploration: 'bg-white/5 text-white/60 border-white/15',
};

export function AIProjectCard({ project }: { project: AIProject }) {
  return (
    <motion.article
      variants={revealVariants}
      className="group flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-dark-secondary/80 p-6 transition-colors duration-300 ease-cinematic hover:border-magenta/30 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-sm font-black tabular-nums text-magenta">
          {project.number}
        </span>
        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>
      </div>

      <SystemDiagram
        variant={project.diagram}
        tone="light"
        className="h-16 w-full opacity-80"
      />

      <div>
        <h3 className="text-xl font-black leading-tight text-white sm:text-2xl">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/75">
          {project.purpose}
        </p>
      </div>

      <p className="border-l-2 border-magenta/60 pl-4 text-sm italic leading-relaxed text-white/60">
        {project.question}
      </p>

      <ul className="mt-auto flex flex-wrap gap-2 pt-1">
        {project.capabilities.map((cap) => (
          <li
            key={cap}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
          >
            {cap}
          </li>
        ))}
      </ul>

      <p className="text-[11px] font-medium uppercase tracking-wide text-white/40">
        {project.providerNote}
      </p>
    </motion.article>
  );
}
