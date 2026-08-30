"use client";

import { useState } from "react";

import ShowcaseAdjustmentPanel from "./ShowcaseAdjustmentPanel";
import ShowcaseCanvas from "./ShowcaseCanvas";
import ShowcaseChatPanel from "./ShowcaseChatPanel";
import ShowcaseToolbar from "./ShowcaseToolbar";
import {
  SHOWCASE_ADJUSTMENTS,
  SHOWCASE_STYLE_MATCH_ADJUSTMENTS,
  SHOWCASE_STYLE_MATCH_CANVAS_FILTER,
  SHOWCASE_STYLE_MATCH_CHAT_MESSAGES,
  SHOWCASE_STYLE_MATCH_PENDING_CHANGES,
  type AdjustmentKey,
  type ShowcaseAdjustments,
} from "./showcase-data";

export type EditorShowcaseScenario = "default" | "styleMatch";

type EditorShowcaseProps = {
  demoMode?: boolean;
  chatAutoScrollActive?: boolean;
  scenario?: EditorShowcaseScenario;
};

export default function EditorShowcase({
  demoMode = false,
  chatAutoScrollActive = false,
  scenario = "default",
}: EditorShowcaseProps) {
  const isStyleMatch = scenario === "styleMatch";
  const [adjustments, setAdjustments] = useState<ShowcaseAdjustments>(() =>
    isStyleMatch
      ? { ...SHOWCASE_STYLE_MATCH_ADJUSTMENTS }
      : { ...SHOWCASE_ADJUSTMENTS },
  );
  const [chatCollapsed, setChatCollapsed] = useState(false);

  const isChatCollapsed = demoMode ? false : chatCollapsed;

  const handlePreview = (key: AdjustmentKey, value: number) => {
    setAdjustments((current) => ({ ...current, [key]: value }));
  };

  const handleCommit = (key: AdjustmentKey, value: number) => {
    setAdjustments((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="editor-showcase flex h-full min-h-0 flex-col overflow-hidden bg-[#141414] text-[13px] leading-normal antialiased select-none">
      <ShowcaseToolbar />
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <ShowcaseAdjustmentPanel
          adjustments={adjustments}
          onPreview={handlePreview}
          onCommit={handleCommit}
        />
        <ShowcaseCanvas
          imageFilter={
            isStyleMatch ? SHOWCASE_STYLE_MATCH_CANVAS_FILTER : undefined
          }
        />
        <ShowcaseChatPanel
          collapsed={isChatCollapsed}
          onToggleCollapse={() => setChatCollapsed((v) => !v)}
          demoMode={demoMode}
          autoScrollActive={chatAutoScrollActive}
          messages={
            isStyleMatch ? SHOWCASE_STYLE_MATCH_CHAT_MESSAGES : undefined
          }
          pendingChanges={
            isStyleMatch ? SHOWCASE_STYLE_MATCH_PENDING_CHANGES : undefined
          }
        />
      </div>
    </div>
  );
}
