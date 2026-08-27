"use client";

import EditorShowcaseScaler from "@/src/components/editor-showcase/EditorShowcaseScaler";
import SectionShell from "@/src/components/SectionShell";
import { ScrollReveal } from "@/lib/scroll-motion";

export default function Showcase() {
  return (
    <SectionShell>
      <ScrollReveal className="relative w-full">
        <EditorShowcaseScaler />
      </ScrollReveal>
    </SectionShell>
  );
}
