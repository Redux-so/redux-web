"use client";

import type { ReactNode } from "react";

import { ScrollReveal } from "@/lib/scroll-motion";
import { SECTION_HEADLINE, SECTION_LABEL } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: "label" | "headline";
};

export default function SectionIntro({
  children,
  className,
  id,
  variant = "label",
}: SectionIntroProps) {
  const Tag = variant === "headline" ? "h2" : "p";

  return (
    <ScrollReveal variant="fadeIn">
      <Tag
        id={id}
        className={cn(
          "m-0",
          variant === "headline" ? SECTION_HEADLINE : SECTION_LABEL,
          className,
        )}
      >
        {children}
      </Tag>
    </ScrollReveal>
  );
}
