'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { motionTokens } from '@/lib/motion';

/**
 * Minimal horizontal header.
 * Left: magenta slash + LUIS SUAREZ wordmark.
 * Right: LinkedIn ↗ and Contact ↗ only. No other navigation.
 */
export function Header() {
  const { name, links } = siteConfig;

  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: motionTokens.ease }}
      className="absolute inset-x-0 top-0 z-20"
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <a
          href="#top"
          className="group flex items-center gap-2"
          aria-label={`${name}, home`}
        >
          <span aria-hidden className="text-2xl font-black leading-none text-magenta">
            /
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-white sm:text-base">
            {name}
          </span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-10">
          <HeaderLink href={links.linkedin} label="LinkedIn" />
          <HeaderLink href={links.contact} label="Contact" />
        </nav>
      </div>
    </motion.header>
  );
}

function HeaderLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group inline-flex items-center gap-1 text-sm font-medium text-white/90 transition-colors duration-200 ease-cinematic hover:text-white sm:text-base"
    >
      {label}
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 text-white/70 transition-transform duration-200 ease-cinematic group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-magenta"
      />
    </a>
  );
}
