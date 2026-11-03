'use client';

import { motion } from 'framer-motion';
import { capabilities } from '@/lib/ai-capabilities';
import { CapabilityCard } from './CapabilityCard';
import { softRevealVariants, staggerContainer, viewportOnce } from '@/lib/motion';

/**
 * AI Product Capabilities — light editorial section, same design system as
 * Selected Work. Heading reveals first, then the four pillars progressively.
 */
export function AICapabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="bg-light-surface text-text-dark"
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
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-text-dark/70"
          >
            <span aria-hidden className="font-black text-magenta">
              /
            </span>
            AI Product Capabilities
          </motion.p>
          <motion.h2
            id="capabilities-heading"
            variants={softRevealVariants}
            className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[1.03] tracking-tight"
          >
            From intelligent concepts to working products.
          </motion.h2>
          <motion.p
            variants={softRevealVariants}
            className="mt-5 text-base leading-relaxed text-text-dark/70 sm:text-lg"
          >
            I bring together product thinking, AI architecture, interaction
            design, and hands-on implementation to turn emerging AI capabilities
            into useful products.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2"
        >
          {capabilities.map((capability) => (
            <CapabilityCard key={capability.number} capability={capability} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
