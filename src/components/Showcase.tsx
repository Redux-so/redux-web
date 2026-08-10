"use client";

import EditorShowcaseScaler from "@/src/components/editor-showcase/EditorShowcaseScaler";
import { ScrollReveal } from "@/lib/scroll-motion";

export default function Showcase() {
  return (
    <ScrollReveal className="relative w-full">
      <EditorShowcaseScaler />
    </ScrollReveal>
  );
}
