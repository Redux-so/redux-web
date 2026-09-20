"use client";

import type { ReactNode } from "react";

import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";

type FeaturesScrollRevealProps = {
  children: ReactNode;
};

export default function FeaturesScrollReveal({
  children,
}: FeaturesScrollRevealProps) {
  return (
    <ScrollRevealGroup
      className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2"
      stagger={0.1}
    >
      {children}
    </ScrollRevealGroup>
  );
}

export function FeaturesScrollRevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <ScrollRevealItem className={className}>{children}</ScrollRevealItem>;
}
