'use client';

import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { motionTokens, viewportOnce } from '@/lib/motion';

/**
 * Compact editorial footer on the light surface.
 * Left: name + role. Middle: location. Right: website.
 */
export function Footer() {
  const { name, role, location, website } = siteConfig;

  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: motionTokens.ease }}
      className="bg-light-surface text-text-dark"
    >
      <div className="mx-auto max-w-content px-6 py-10 sm:px-10 sm:py-12">
        <div className="flex flex-col gap-8 border-t border-border-light/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-bold uppercase tracking-[0.14em]">
              {name}
            </p>
            <p className="mt-1 text-sm text-text-dark/60">{role}</p>
          </div>

          <p className="flex items-center gap-2 text-sm text-text-dark/70">
            <MapPin aria-hidden className="h-4 w-4 text-magenta" />
            {location}
          </p>

          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-dark transition-colors duration-200 ease-cinematic hover:text-magenta"
          >
            <Globe
              aria-hidden
              className="h-4 w-4 text-text-dark/60 transition-colors duration-200 ease-cinematic group-hover:text-magenta"
            />
            {website.label}
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
