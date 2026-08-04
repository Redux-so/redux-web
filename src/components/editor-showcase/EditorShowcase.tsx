"use client";

import { useState } from "react";

import ShowcaseAdjustmentPanel from "./ShowcaseAdjustmentPanel";
import ShowcaseBottomNav from "./ShowcaseBottomNav";
import ShowcaseCanvas from "./ShowcaseCanvas";
import ShowcaseChatPanel from "./ShowcaseChatPanel";
import ShowcaseToolbar from "./ShowcaseToolbar";
import {
  SHOWCASE_ADJUSTMENTS,
  type ShowcaseAdjustments,
} from "./showcase-data";

export default function EditorShowcase() {
  const [adjustments, setAdjustments] =
    useState<ShowcaseAdjustments>(SHOWCASE_ADJUSTMENTS);
  const [adjustmentCollapsed, setAdjustmentCollapsed] = useState(false);
  const [chatCollapsed, setChatCollapsed] = useState(false);

  const handleAdjustmentChange = (
    key: keyof ShowcaseAdjustments,
    value: number,
  ) => {
    setAdjustments((current) => ({ ...current, [key]: value }));
  };

  return (
    <div
      className="editor-showcase flex h-full min-h-0 flex-col overflow-hidden bg-[#0a0a0a] antialiased select-none"
      style={{
        lineHeight: 1.4,
        color: "#ededed",
      }}
    >
      <ShowcaseToolbar />
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <ShowcaseAdjustmentPanel
          collapsed={adjustmentCollapsed}
          onToggleCollapse={() => setAdjustmentCollapsed((v) => !v)}
          adjustments={adjustments}
          onAdjustmentChange={handleAdjustmentChange}
        />
        <ShowcaseCanvas />
        <ShowcaseChatPanel
          collapsed={chatCollapsed}
          onToggleCollapse={() => setChatCollapsed((v) => !v)}
        />
      </div>
      <ShowcaseBottomNav />
    </div>
  );
}
