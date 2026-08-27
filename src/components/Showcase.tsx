"use client";

import EditorShowcaseScaler from "@/src/components/editor-showcase/EditorShowcaseScaler";
import { ScrollReveal } from "@/lib/scroll-motion";
import { PAGE_CONTAINER } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

export default function Showcase() {
  return (
    <ScrollReveal
      className={cn(PAGE_CONTAINER, "relative py-6 sm:py-8")}
    >
      <EditorShowcaseScaler />
    </ScrollReveal>
  );
}
