"use client";

import EditorShowcaseScaler from "@/src/components/editor-showcase/EditorShowcaseScaler";
import ShowcaseScrollReveal from "@/src/components/ShowcaseScrollReveal";
import SectionShell from "@/src/components/SectionShell";

export default function Showcase() {
  return (
    <SectionShell>
      <ShowcaseScrollReveal>
        <EditorShowcaseScaler />
      </ShowcaseScrollReveal>
    </SectionShell>
  );
}
