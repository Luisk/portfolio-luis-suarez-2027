'use client';

import { motion, type Variants } from 'framer-motion';
import { motionTokens } from '@/lib/motion';

/**
 * Abstract system diagrams (connected nodes / layered structures / flowing
 * forms). Deliberately NOT robots, brains, or chatbot imagery. Nodes/links
 * draw in once on viewport entry; nothing loops continuously.
 */

type Variant =
  | 'strategy'
  | 'agentic'
  | 'experience'
  | 'engineering'
  | 'mila'
  | 'design-agent'
  | 'copilot';

const nodeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: motionTokens.ease, delay: 0.1 + i * 0.08 },
  }),
};

const linkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 0.6,
    transition: { duration: 0.5, ease: motionTokens.ease, delay: 0.15 + i * 0.08 },
  }),
};

interface Spec {
  nodes: { cx: number; cy: number; r?: number; accent?: boolean }[];
  links: { d: string }[];
}

const specs: Record<Variant, Spec> = {
  strategy: {
    nodes: [
      { cx: 20, cy: 60, r: 7 },
      { cx: 60, cy: 30, r: 6 },
      { cx: 60, cy: 90, r: 6 },
      { cx: 110, cy: 60, r: 9, accent: true },
    ],
    links: [
      { d: 'M27 60 L54 33' },
      { d: 'M27 60 L54 87' },
      { d: 'M66 33 L103 58' },
      { d: 'M66 87 L103 62' },
    ],
  },
  agentic: {
    nodes: [
      { cx: 65, cy: 60, r: 10, accent: true },
      { cx: 20, cy: 25, r: 6 },
      { cx: 20, cy: 95, r: 6 },
      { cx: 110, cy: 25, r: 6 },
      { cx: 110, cy: 95, r: 6 },
    ],
    links: [
      { d: 'M56 54 L26 29' },
      { d: 'M56 66 L26 91' },
      { d: 'M74 54 L104 29' },
      { d: 'M74 66 L104 91' },
    ],
  },
  experience: {
    nodes: [
      { cx: 25, cy: 60, r: 8, accent: true },
      { cx: 70, cy: 35, r: 6 },
      { cx: 70, cy: 85, r: 6 },
      { cx: 110, cy: 60, r: 6 },
    ],
    links: [
      { d: 'M33 58 Q55 30 66 36' },
      { d: 'M33 62 Q55 90 66 84' },
      { d: 'M76 37 Q100 48 106 57' },
      { d: 'M76 83 Q100 72 106 63' },
    ],
  },
  engineering: {
    nodes: [
      { cx: 22, cy: 35, r: 6 },
      { cx: 22, cy: 85, r: 6 },
      { cx: 65, cy: 60, r: 9, accent: true },
      { cx: 110, cy: 35, r: 6 },
      { cx: 110, cy: 85, r: 6 },
    ],
    links: [
      { d: 'M28 37 L57 56' },
      { d: 'M28 83 L57 64' },
      { d: 'M73 56 L104 37' },
      { d: 'M73 64 L104 83' },
    ],
  },
  // AI project diagrams — simple pipeline / hub shapes.
  mila: {
    nodes: [
      { cx: 18, cy: 60, r: 6 },
      { cx: 55, cy: 60, r: 6 },
      { cx: 92, cy: 60, r: 6 },
      { cx: 122, cy: 60, r: 8, accent: true },
    ],
    links: [{ d: 'M24 60 L49 60' }, { d: 'M61 60 L86 60' }, { d: 'M98 60 L114 60' }],
  },
  'design-agent': {
    nodes: [
      { cx: 18, cy: 60, r: 6 },
      { cx: 50, cy: 60, r: 6 },
      { cx: 82, cy: 60, r: 6, accent: true },
      { cx: 114, cy: 60, r: 6 },
      { cx: 82, cy: 25, r: 5 },
    ],
    links: [
      { d: 'M24 60 L44 60' },
      { d: 'M56 60 L76 60' },
      { d: 'M88 60 L108 60' },
      { d: 'M82 54 L82 30' },
    ],
  },
  copilot: {
    nodes: [
      { cx: 65, cy: 60, r: 9, accent: true },
      { cx: 25, cy: 40, r: 5 },
      { cx: 25, cy: 80, r: 5 },
      { cx: 110, cy: 40, r: 5 },
      { cx: 110, cy: 80, r: 5 },
    ],
    links: [
      { d: 'M57 55 L30 42' },
      { d: 'M57 65 L30 78' },
      { d: 'M73 55 L105 42' },
      { d: 'M73 65 L105 78' },
    ],
  },
};

export function SystemDiagram({
  variant,
  className,
  tone = 'dark',
}: {
  variant: Variant;
  className?: string;
  /** dark = for light sections; light = for dark sections. */
  tone?: 'dark' | 'light';
}) {
  const spec = specs[variant];
  const line = tone === 'dark' ? '#351b48' : '#ffffff';
  const node = tone === 'dark' ? '#351b48' : '#f8f0f7';

  return (
    <motion.svg
      viewBox="0 0 140 120"
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      role="presentation"
      aria-hidden
    >
      {spec.links.map((link, i) => (
        <motion.path
          key={`l-${i}`}
          d={link.d}
          custom={i}
          variants={linkVariants}
          fill="none"
          stroke={line}
          strokeOpacity={0.4}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ))}
      {spec.nodes.map((n, i) => (
        <motion.circle
          key={`n-${i}`}
          cx={n.cx}
          cy={n.cy}
          r={n.r ?? 6}
          custom={i}
          variants={nodeVariants}
          fill={n.accent ? '#ff28c8' : node}
          fillOpacity={n.accent ? 1 : 0.35}
          stroke={n.accent ? '#ff28c8' : line}
          strokeOpacity={0.5}
          strokeWidth={1}
        />
      ))}
    </motion.svg>
  );
}
