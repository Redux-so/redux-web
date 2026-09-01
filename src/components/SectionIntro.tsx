"use client";

import { ScrollReveal } from "@/lib/scroll-motion";
import { SECTION_HEADLINE, SECTION_LABEL } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
  children: string;
  className?: string;
  variant?: "label" | "headline";
};

export default function SectionIntro({
  children,
  className,
  variant = "label",
}: SectionIntroProps) {
  const Tag = variant === "headline" ? "h2" : "p";

  return (
    <ScrollReveal variant="fadeIn">
      <Tag
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
