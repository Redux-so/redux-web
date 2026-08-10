"use client";

import EditorShowcaseScaler from "@/src/components/editor-showcase/EditorShowcaseScaler";
import { ScrollReveal } from "@/lib/scroll-motion";

export default function Showcase() {
  return (
    <div className="overflow-x-hidden px-6 py-6 sm:px-8 sm:py-8 lg:px-10">
      <ScrollReveal className="relative mx-auto w-full max-w-[1160px]">
        <EditorShowcaseScaler />
      </ScrollReveal>
    </div>
  );
}
