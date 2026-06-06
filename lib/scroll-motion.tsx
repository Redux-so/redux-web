"use client";

import {
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import type { ReactNode } from "react";

export const SCROLL_VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -48px 0px",
} as const;

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

export function staggerContainer(stagger = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  variant?: "fadeInUp" | "fadeIn";
};

export function ScrollReveal({
  children,
  className,
  variant = "fadeInUp",
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      variants={variant === "fadeIn" ? fadeIn : fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type ScrollRevealGroupProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
};

export function ScrollRevealGroup({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  ...props
}: ScrollRevealGroupProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type ScrollRevealItemProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  variant?: "fadeInUp" | "fadeIn";
};

export function ScrollRevealItem({
  children,
  className,
  variant = "fadeInUp",
  ...props
}: ScrollRevealItemProps) {
  return (
    <motion.div
      className={className}
      variants={variant === "fadeIn" ? fadeIn : fadeInUp}
      {...props}
    >
      {children}
    </motion.div>
  );
}
