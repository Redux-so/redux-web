"use client";

import EditorShowcaseScaler from "@/src/components/editor-showcase/EditorShowcaseScaler";
import SectionShell from "@/src/components/SectionShell";

export default function Showcase() {
  return (
    <SectionShell>
      <EditorShowcaseScaler scrollReveal />
    </SectionShell>
  );
}
