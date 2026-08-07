"use client";

import { useState } from "react";

import ShowcaseAdjustmentPanel from "./ShowcaseAdjustmentPanel";
import ShowcaseCanvas from "./ShowcaseCanvas";
import ShowcaseChatPanel from "./ShowcaseChatPanel";
import ShowcaseToolbar from "./ShowcaseToolbar";
import {
  SHOWCASE_ADJUSTMENTS,
  type AdjustmentKey,
  type ShowcaseAdjustments,
} from "./showcase-data";

export default function EditorShowcase() {
  const [adjustments, setAdjustments] =
    useState<ShowcaseAdjustments>({ ...SHOWCASE_ADJUSTMENTS });
  const [chatCollapsed, setChatCollapsed] = useState(false);

  const handlePreview = (key: AdjustmentKey, value: number) => {
    setAdjustments((current) => ({ ...current, [key]: value }));
  };

  const handleCommit = (key: AdjustmentKey, value: number) => {
    setAdjustments((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="editor-showcase flex h-full min-h-0 flex-col overflow-hidden bg-[#161616] text-[13px] leading-normal antialiased select-none">
      <ShowcaseToolbar />
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <ShowcaseAdjustmentPanel
          adjustments={adjustments}
          onPreview={handlePreview}
          onCommit={handleCommit}
        />
        <ShowcaseCanvas />
        <ShowcaseChatPanel
          collapsed={chatCollapsed}
          onToggleCollapse={() => setChatCollapsed((v) => !v)}
        />
      </div>
    </div>
  );
}
