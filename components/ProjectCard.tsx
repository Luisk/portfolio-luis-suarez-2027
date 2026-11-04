'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/lib/projects';
import { revealVariants } from '@/lib/motion';

interface ProjectCardProps {
  project: Project;
  /** full-width cards go taller; half-width a touch shorter. */
  priority?: boolean;
}

/**
 * Project card. The entire card is the primary CTA and opens the case-study PDF
 * in a new tab. No inner buttons. Text stays stationary on hover; the image
 * scales subtly and the arrow nudges right with a restrained magenta glow.
 */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFull = project.span === 'full';

  const href = project.pdfUrl ?? '#';
  const hasPdf = project.pdfUrl !== null;

  // Show a brief "opening" state when the card is clicked, since large PDFs
  // take a moment to open in the new tab. Auto-clears so a returning user
  // doesn't see a stuck spinner.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (!hasPdf) return;
    setLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setLoading(false), 2500);
  };

  return (
    <motion.a
      variants={revealVariants}
      href={href}
      onClick={handleClick}
      aria-busy={loading}
      target={hasPdf ? '_blank' : undefined}
      rel={hasPdf ? 'noopener noreferrer' : undefined}
      aria-label={`${project.title} — ${project.description}${hasPdf ? ' (opens case study PDF in a new tab)' : ''}`}
      className={[
        'group relative isolate block overflow-hidden rounded-2xl bg-dark-secondary',
        'ring-1 ring-white/5 transition-[box-shadow] duration-[350ms] ease-cinematic',
        'hover:ring-magenta/30 hover:shadow-[0_0_0_1px_rgba(255,40,200,0.25),0_30px_80px_-30px_rgba(255,40,200,0.45)]',
        isFull ? 'min-h-[300px] sm:min-h-[340px]' : 'min-h-[260px] sm:min-h-[300px]',
      ].join(' ')}
    >
      {/* PDF loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-dark/70 backdrop-blur-sm"
            role="status"
            aria-live="polite"
          >
            <Loader2 className="h-8 w-8 animate-spin text-magenta" aria-hidden />
            <span className="text-sm font-medium text-white/90">
              Opening case study…
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background image (or brand-palette fallback if asset missing) */}
      <div className="absolute inset-0 -z-10">
        {!imageError ? (
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            sizes={isFull ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
            onError={() => setImageError(true)}
            className={[
              'object-cover transition-transform duration-500 ease-cinematic',
              'group-hover:scale-[1.04]',
              project.imagePosition ?? 'object-center',
            ].join(' ')}
          />
        ) : (
          <MissingImageFallback title={project.title} />
        )}
      </div>

      {/* Dark gradient behind the text (left-weighted) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-dark via-dark/85 to-dark/10" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-magenta">
            Case Study
          </p>
          <h3
            className={[
              'mt-3 font-black leading-none text-white',
              isFull ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-4xl',
            ].join(' ')}
          >
            {project.title}
          </h3>
          <p className="mt-3 max-w-[26ch] text-sm text-white/75 sm:text-base">
            {project.description}
          </p>
        </div>

        <ArrowUpRight
          aria-hidden
          className="h-7 w-7 text-magenta transition-transform duration-300 ease-cinematic group-hover:translate-x-1.5 group-hover:-translate-y-1"
        />
      </div>
    </motion.a>
  );
}

/**
 * Shown only if the real image asset is missing. Keeps the card usable and on
 * palette instead of substituting unrelated stock imagery.
 */
function MissingImageFallback({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-end bg-[radial-gradient(120%_120%_at_80%_40%,#f000b8_0%,#351b48_45%,#100416_100%)]">
      <span className="mr-8 select-none text-right text-5xl font-black uppercase tracking-tight text-white/10 sm:text-7xl">
        {title}
      </span>
    </div>
  );
}
