"use client";

import EditorShowcaseScaler from "@/src/components/editor-showcase/EditorShowcaseScaler";
import { ScrollReveal } from "@/lib/scroll-motion";

export default function Showcase() {
  return (
    <div className="overflow-x-hidden px-4 pb-10 pt-4 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
      <ScrollReveal className="relative mx-auto w-full max-w-[1400px]">
        <div className="overflow-hidden rounded-2xl border border-white/[0.1] shadow-2xl">
          <EditorShowcaseScaler />
        </div>
      </ScrollReveal>
    </div>
  );
}
