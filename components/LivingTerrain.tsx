'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motionTokens } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

/**
 * Living Terrain — the signature animated abstract purple/magenta landscape.
 *
 * Core visual feature (not a static background): layered flowing ribbons and
 * organic surfaces in the brand palette (deep purple, magenta, pink), with
 * translucent gradients, moving highlights, and atmospheric depth.
 *
 * Motion: multiple layers drift horizontally/vertically at different speeds on
 * 12–20s cycles, with gentle opacity "breathing" and animated gradient
 * positions for shifting light. All transform/opacity based — no WebGL, video,
 * or cursor tracking. Loops are seamless (each keyframe array returns to its
 * start value, easeInOut) so there are no visible jumps. `prefers-reduced-
 * motion` freezes everything to a static, still-attractive composition.
 *
 * ASSET STATUS: no original artwork image existed, so this is a procedural
 * recreation. If real artwork is added at `public/images/living-terrain.*`,
 * set `imageSrc` and it replaces the procedural base while the layers stay as
 * an atmospheric wash.
 */
const imageSrc: string | null = null; // e.g. '/images/living-terrain.png'

export function LivingTerrain() {
  const prefersReduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const animate = mounted && !prefersReduced;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {imageSrc ? (
        <RealArtwork src={imageSrc} animate={animate} />
      ) : (
        <ProceduralTerrain animate={animate} />
      )}
      {/* Keep the artwork secondary: darken the left where the headline sits. */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
      {/* Flat bottom edge: fade to the solid hero background. */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-purple-deep to-transparent" />
    </div>
  );
}

function RealArtwork({ src, animate }: { src: string; animate: boolean }) {
  return (
    <motion.div
      className="absolute inset-y-0 right-0 h-full w-[75%]"
      animate={animate ? { x: ['-1.5%', '1.5%', '-1.5%'], y: ['-1%', '1%', '-1%'] } : undefined}
      transition={
        animate
          ? { duration: motionTokens.ambient, ease: 'easeInOut', repeat: Infinity }
          : undefined
      }
    >
      <Image src={src} alt="" fill priority sizes="75vw" className="object-contain object-right-bottom" />
    </motion.div>
  );
}

function ProceduralTerrain({ animate }: { animate: boolean }) {
  return (
    <svg
      className="absolute inset-y-0 right-0 h-full w-full sm:w-[82%]"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <defs>
        {/* Core glow — radial, bright magenta heart of the terrain. */}
        <radialGradient id="lt-core" cx="68%" cy="52%" r="60%">
          <stop offset="0%" stopColor="#ff28c8" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#f000b8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#240b35" stopOpacity="0" />
        </radialGradient>

        {/* Ribbon gradients. */}
        <linearGradient id="lt-ribbon-1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#351b48" stopOpacity="0" />
          <stop offset="55%" stopColor="#f000b8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff6adf" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="lt-ribbon-2" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#ff28c8" stopOpacity="0.7" />
          <stop offset="70%" stopColor="#6d1f59" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#240b35" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lt-ribbon-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8a2be2" stopOpacity="0" />
          <stop offset="60%" stopColor="#c01e9b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff8ae6" stopOpacity="0.6" />
        </linearGradient>

        {/* Soft drifting highlight blooms. */}
        <radialGradient id="lt-bloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9ceb" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff28c8" stopOpacity="0" />
        </radialGradient>

        <filter id="lt-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="lt-soft-lg" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
      </defs>

      {/* Deep atmospheric wash — slowest, widest drift. */}
      <AmbientLayer
        animate={animate}
        x={[-14, 14]}
        y={[-6, 6]}
        duration={19}
        opacity={[0.45, 0.6, 0.45]}
      >
        <path
          d="M -80 430 C 140 330 320 500 520 360 C 660 265 770 360 900 275 L 900 680 L -80 680 Z"
          fill="url(#lt-ribbon-2)"
          filter="url(#lt-soft-lg)"
        />
      </AmbientLayer>

      {/* Lower ribbon — mid speed, opposite direction. */}
      <AmbientLayer
        animate={animate}
        x={[16, -16]}
        y={[5, -5]}
        duration={16}
        opacity={[0.65, 0.8, 0.65]}
      >
        <path
          d="M -90 485 C 150 400 300 545 480 425 C 630 320 735 420 900 335 L 900 680 L -90 680 Z"
          fill="url(#lt-ribbon-1)"
        />
        <path
          d="M -90 485 C 150 400 300 545 480 425 C 630 320 735 420 900 335"
          fill="none"
          stroke="#ff8ae6"
          strokeOpacity="0.5"
          strokeWidth="2.5"
          filter="url(#lt-soft)"
        />
      </AmbientLayer>

      {/* Upper ribbon — crosses the field for depth. */}
      <AmbientLayer
        animate={animate}
        x={[-10, 12]}
        y={[8, -8]}
        duration={22}
        opacity={[0.3, 0.5, 0.3]}
      >
        <path
          d="M -80 300 C 160 250 320 360 520 250 C 650 180 780 250 900 200 L 900 120 L -80 120 Z"
          fill="url(#lt-ribbon-3)"
          filter="url(#lt-soft)"
        />
        <path
          d="M -80 300 C 160 250 320 360 520 250 C 650 180 780 250 900 200"
          fill="none"
          stroke="#c76bff"
          strokeOpacity="0.35"
          strokeWidth="2"
          filter="url(#lt-soft)"
        />
      </AmbientLayer>

      {/* Core magenta glow — gentle breathing + slight drift. */}
      <AmbientLayer
        animate={animate}
        x={[6, -6]}
        y={[-5, 5]}
        duration={14}
        opacity={[0.85, 1, 0.85]}
        scale={[1, 1.06, 1]}
      >
        <ellipse cx="545" cy="315" rx="300" ry="225" fill="url(#lt-core)" />
      </AmbientLayer>

      {/* Drifting highlight blooms — the "shifting light". */}
      <AmbientLayer animate={animate} x={[30, -30]} y={[-18, 18]} duration={17} opacity={[0.4, 0.75, 0.4]}>
        <circle cx="620" cy="250" r="90" fill="url(#lt-bloom)" />
      </AmbientLayer>
      <AmbientLayer animate={animate} x={[-26, 26]} y={[16, -16]} duration={20} opacity={[0.25, 0.55, 0.25]}>
        <circle cx="470" cy="410" r="70" fill="url(#lt-bloom)" />
      </AmbientLayer>
    </svg>
  );
}

function AmbientLayer({
  animate,
  x,
  y,
  duration,
  opacity,
  scale,
  children,
}: {
  animate: boolean;
  x: [number, number];
  y: [number, number];
  duration: number;
  /** Opacity keyframes; first and last should match for a seamless loop. */
  opacity: [number, number, number];
  /** Optional scale keyframes (subtle breathing). */
  scale?: [number, number, number];
  children: React.ReactNode;
}) {
  if (!animate) {
    // Static but composed: hold the mid values so it still looks intentional.
    return <g style={{ opacity: opacity[1] }}>{children}</g>;
  }

  return (
    <motion.g
      initial={{ opacity: opacity[0] }}
      animate={{
        x: [x[0], x[1], x[0]],
        y: [y[0], y[1], y[0]],
        opacity,
        ...(scale ? { scale } : {}),
      }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity }}
      style={{ transformOrigin: 'center' }}
    >
      {children}
    </motion.g>
  );
}
