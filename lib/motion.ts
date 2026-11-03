import type { Variants, Transition } from 'framer-motion';

/**
 * Shared motion tokens. Keep durations and easing consistent across components.
 */
export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as const,
  fast: 0.25,
  medium: 0.4,
  reveal: 0.65,
  ambient: 16,
};

export const easeCinematic = motionTokens.ease;

/** Standard "reveal from below" used by the Selected Work cards and footer. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.reveal, ease: motionTokens.ease },
  },
};

/** Lighter reveal for text eyebrows / small elements. */
export const softRevealVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.medium, ease: motionTokens.ease },
  },
};

/** Container that staggers its children. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const viewportOnce = { once: true, amount: 0.25 } as const;

export const headerEntrance: Transition = {
  duration: 0.5,
  ease: motionTokens.ease,
};
