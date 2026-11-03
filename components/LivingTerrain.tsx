'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motionTokens } from '@/lib/motion';
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion';

/**
 * Living Terrain — the signature abstract purple/magenta flowing landscape.
 *
 * ASSET STATUS: no original artwork image existed in the repo (empty workspace).
 * Per the brief, when the artwork is unavailable it is recreated in the
 * established palette (deep purple, magenta, pink) as layered, translucent,
 * organic flowing light — never green/blue, no heavy video, no WebGL.
 *
 * If the real artwork is later added at `public/images/living-terrain.*`, set
 * `imageSrc` below (or pass it as a prop) and it will be used instead of the
 * procedural recreation, with the ambient layers acting as an atmospheric wash.
 */
const imageSrc: string | null = null; // e.g. '/images/living-terrain.png'

interface LayerConfig {
  gradientId: string;
  xRange: [number, number];
  yRange: [number, number];
  duration: number;
  blur: number;
  opacity: number;
}

const layers: LayerConfig[] = [
  { gradientId: 'lt-grad-a', xRange: [-18, 18], yRange: [-8, 8], duration: motionTokens.ambient, blur: 0, opacity: 0.95 },
  { gradientId: 'lt-grad-b', xRange: [16, -16], yRange: [6, -6], duration: motionTokens.ambient + 3, blur: 1, opacity: 0.7 },
  { gradientId: 'lt-grad-c', xRange: [-10, 10], yRange: [-5, 5], duration: motionTokens.ambient - 2, blur: 2, opacity: 0.55 },
];

export function LivingTerrain() {
  const prefersReduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const animate = mounted && !prefersReduced;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {imageSrc ? (
        <RealArtwork src={imageSrc} animate={animate} />
      ) : (
        <ProceduralTerrain layers={layers} animate={animate} />
      )}
      {/* Keep the artwork secondary: darken the left where the headline sits. */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark to-transparent" />
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
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="75vw"
        className="object-contain object-right-bottom"
      />
    </motion.div>
  );
}

function ProceduralTerrain({
  layers,
  animate,
}: {
  layers: LayerConfig[];
  animate: boolean;
}) {
  return (
    <svg
      className="absolute inset-y-0 right-0 h-full w-[85%] sm:w-[70%]"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <defs>
        <radialGradient id="lt-grad-a" cx="70%" cy="55%" r="65%">
          <stop offset="0%" stopColor="#ff28c8" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#f000b8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#240b35" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lt-grad-b" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#351b48" stopOpacity="0" />
          <stop offset="55%" stopColor="#f000b8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff6adf" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="lt-grad-c" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#ff28c8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#240b35" stopOpacity="0" />
        </linearGradient>
        <filter id="lt-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Layer C — deep atmospheric wash */}
      <AmbientLayer config={layers[2]} animate={animate}>
        <path
          d="M -50 420 C 150 320 320 500 520 360 C 650 270 760 360 880 280 L 880 650 L -50 650 Z"
          fill="url(#lt-grad-c)"
          filter="url(#lt-soft)"
        />
      </AmbientLayer>

      {/* Layer B — flowing ridge of light */}
      <AmbientLayer config={layers[1]} animate={animate}>
        <path
          d="M -60 470 C 140 390 300 540 470 420 C 620 320 720 420 880 330 L 880 650 L -60 650 Z"
          fill="url(#lt-grad-b)"
        />
        <path
          d="M -60 470 C 140 390 300 540 470 420 C 620 320 720 420 880 330"
          fill="none"
          stroke="#ff8ae6"
          strokeOpacity="0.5"
          strokeWidth="2"
          filter="url(#lt-soft)"
        />
      </AmbientLayer>

      {/* Layer A — bright magenta core glow */}
      <AmbientLayer config={layers[0]} animate={animate}>
        <ellipse cx="560" cy="320" rx="300" ry="220" fill="url(#lt-grad-a)" />
      </AmbientLayer>
    </svg>
  );
}

function AmbientLayer({
  config,
  animate,
  children,
}: {
  config: LayerConfig;
  animate: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      style={{ opacity: config.opacity }}
      animate={
        animate
          ? {
              x: [config.xRange[0], config.xRange[1], config.xRange[0]],
              y: [config.yRange[0], config.yRange[1], config.yRange[0]],
            }
          : undefined
      }
      transition={
        animate
          ? { duration: config.duration, ease: 'easeInOut', repeat: Infinity }
          : undefined
      }
    >
      {children}
    </motion.g>
  );
}
