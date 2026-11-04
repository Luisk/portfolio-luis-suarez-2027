'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import { motionTokens } from '@/lib/motion';

/**
 * Minimal horizontal header.
 * Left: magenta slash + LUIS SUAREZ wordmark.
 * Right (desktop): LinkedIn, Contact, Download CV.
 * Right (mobile): a hamburger that opens a full-screen modal with the links.
 */
export function Header() {
  const { name, links } = siteConfig;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock body scroll + Esc to close + focus management while the modal is open.
  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    // Move focus into the dialog.
    firstLinkRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      // Return focus to the toggle that opened the menu.
      toggleRef.current?.focus();
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: motionTokens.ease }}
      className="absolute inset-x-0 top-0 z-30"
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-6 sm:px-10 sm:py-8">
        <a href="#top" className="group flex items-center gap-2" aria-label={`${name}, home`}>
          <span aria-hidden className="text-2xl font-black leading-none text-magenta">
            /
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-white sm:text-base">
            {name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-5 sm:flex sm:gap-10">
          <HeaderLink href={links.linkedin} label="LinkedIn" />
          <HeaderLink href={links.contact} label="Contact" />
          <HeaderLink href={links.cv} label="Download CV" download />
        </nav>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:text-magenta sm:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden />
        </button>
      </div>

      {/* Mobile modal menu */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu
            id={menuId}
            name={name}
            links={links}
            firstLinkRef={firstLinkRef}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MobileMenu({
  id,
  name,
  links,
  firstLinkRef,
  onClose,
}: {
  id: string;
  name: string;
  links: typeof siteConfig.links;
  firstLinkRef: React.RefObject<HTMLAnchorElement | null>;
  onClose: () => void;
}) {
  return (
    <motion.div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: motionTokens.fast, ease: motionTokens.ease }}
      className="fixed inset-0 z-40 flex flex-col bg-purple-deep/98 backdrop-blur-md sm:hidden"
    >
      <div className="flex items-center justify-between px-6 py-6">
        <span className="flex items-center gap-2">
          <span aria-hidden className="text-2xl font-black leading-none text-magenta">
            /
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-white">
            {name}
          </span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:text-magenta"
        >
          <X className="h-6 w-6" aria-hidden />
        </button>
      </div>

      <motion.nav
        aria-label="Primary"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }}
        className="flex flex-1 flex-col justify-center gap-2 px-6 pb-24"
      >
        <MobileLink href={links.linkedin} label="LinkedIn" onClick={onClose} innerRef={firstLinkRef} />
        <MobileLink href={links.contact} label="Contact" onClick={onClose} />
        <MobileLink href={links.cv} label="Download CV" download onClick={onClose} />
      </motion.nav>
    </motion.div>
  );
}

function MobileLink({
  href,
  label,
  download = false,
  onClick,
  innerRef,
}: {
  href: string;
  label: string;
  download?: boolean;
  onClick: () => void;
  innerRef?: React.RefObject<HTMLAnchorElement | null>;
}) {
  const isExternal = href.startsWith('http');
  return (
    <motion.a
      ref={innerRef}
      href={href}
      onClick={onClick}
      target={isExternal || download ? '_blank' : undefined}
      rel={isExternal || download ? 'noopener noreferrer' : undefined}
      download={download || undefined}
      variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
      className="group flex items-center justify-between border-b border-white/10 py-5 text-2xl font-bold text-white transition-colors duration-200 hover:text-magenta"
    >
      {label}
      {download ? (
        <Download className="h-6 w-6 text-white/60 group-hover:text-magenta" aria-hidden />
      ) : (
        <ArrowUpRight className="h-6 w-6 text-white/60 group-hover:text-magenta" aria-hidden />
      )}
    </motion.a>
  );
}

function HeaderLink({
  href,
  label,
  download = false,
}: {
  href: string;
  label: string;
  download?: boolean;
}) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal || download ? '_blank' : undefined}
      rel={isExternal || download ? 'noopener noreferrer' : undefined}
      download={download || undefined}
      className="group inline-flex items-center gap-1 text-sm font-medium text-white/90 transition-colors duration-200 ease-cinematic hover:text-white sm:text-base"
    >
      {label}
      {download ? (
        <Download
          aria-hidden
          className="h-4 w-4 text-white/70 transition-transform duration-200 ease-cinematic group-hover:translate-y-0.5 group-hover:text-magenta"
        />
      ) : (
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 text-white/70 transition-transform duration-200 ease-cinematic group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-magenta"
        />
      )}
    </a>
  );
}
