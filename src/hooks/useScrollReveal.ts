import { useRef } from 'react';
import { useInView, type Variants } from 'framer-motion';

// ─── Shared easing curve ───────────────────────────────────────────────────
export const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Hook: useScrollReveal ─────────────────────────────────────────────────
// Returns a ref and a boolean. Attach the ref to a container,
// and the boolean tells you when it's entered the viewport.
export function useScrollReveal(options?: { once?: boolean; margin?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options?.once ?? true,
    margin: options?.margin ?? '-80px',
    amount: options?.amount ?? 0.15,
  });
  return { ref, isInView };
}

// ─── Reusable animation variants ───────────────────────────────────────────

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: smoothEase } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smoothEase } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: smoothEase } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: smoothEase } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// ─── Page transition wrapper variant ───────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: smoothEase } },
};
