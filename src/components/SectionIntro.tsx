"use client";

import { ScrollReveal } from "@/lib/scroll-motion";
import { SECTION_LABEL } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
  children: string;
  className?: string;
};

export default function SectionIntro({ children, className }: SectionIntroProps) {
  return (
    <ScrollReveal variant="fadeIn">
      <p className={cn("m-0", SECTION_LABEL, className)}>{children}</p>
    </ScrollReveal>
  );
}
