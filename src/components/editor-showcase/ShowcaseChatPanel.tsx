"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/shared/Icon";
import { CHAT_USER_BUBBLE_CLASS } from "@/lib/brand-colors";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import { PANEL_HEADER, PANEL_TITLE } from "@/lib/panel-chrome";

import {
  SHOWCASE_CHAT_MESSAGES,
  SHOWCASE_PENDING_CHANGES,
} from "./showcase-data";

const CHAT_SURFACE_SHADOW =
  "shadow-[0_1px_3px_rgba(0,0,0,0.32),0_2px_8px_rgba(0,0,0,0.14)]";
const TOOLBAR_CHIP_H = "h-8";
const TOOLBAR_CHIP =
  "rounded-md border border-[#2e2e2e] bg-[#1d1d1d] shadow-[0_1px_2px_rgba(0,0,0,0.26),0_2px_5px_rgba(0,0,0,0.12)]";
const BTN_SECONDARY =
  "inline-flex items-center justify-center h-8 px-3.5 rounded-md border border-[#2e2e2e] bg-[#1d1d1d] text-[12px] font-semibold text-white/90 hover:border-[#3a3a3a] transition-colors cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed";

const RING_RADIUS = 7.5;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
/** Demo: 12 of 20 free messages remaining */
const SHOWCASE_USAGE_PROGRESS = 12 / 20;

function ringOffsetForProgress(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  return RING_CIRCUMFERENCE * (1 - clamped);
}

function ShowcaseUsageRing() {
  const targetOffset = ringOffsetForProgress(SHOWCASE_USAGE_PROGRESS);
  const [displayOffset, setDisplayOffset] = useState<number | null>(null);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      setDisplayOffset(RING_CIRCUMFERENCE);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setDisplayOffset(targetOffset);
        });
      });
      return () => cancelAnimationFrame(frame);
    }

    setDisplayOffset(targetOffset);
  }, [targetOffset]);

  const strokeTransition = transitionEnabled
    ? "stroke-dashoffset 600ms ease-out"
    : "none";

  return (
    <button
      type="button"
      aria-label="12 free messages remaining"
      className="relative inline-flex shrink-0 items-center justify-center rounded-md p-0.5 text-[#888888] transition-colors cursor-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" aria-hidden>
        <g transform="rotate(-90 10 10)">
          <circle
            cx="10"
            cy="10"
            r={RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#444444]"
          />
          <circle
            cx="10"
            cy="10"
            r={RING_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={displayOffset ?? RING_CIRCUMFERENCE}
            style={{ transition: strokeTransition }}
            className="text-[#888888]"
          />
        </g>
      </svg>
    </button>
  );
}


type ShowcaseChatPanelProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export default function ShowcaseChatPanel({
  collapsed,
  onToggleCollapse,
}: ShowcaseChatPanelProps) {
  const [changesExpanded, setChangesExpanded] = useState(false);
  const pendingCount = SHOWCASE_PENDING_CHANGES.length;

  return (
    <div
      className={[
        "flex h-full min-w-0 shrink-0 flex-col overflow-hidden transition-[width] duration-200 ease-out",
        "border-l border-[#2e2e2e] bg-[#121212]",
        collapsed ? "w-[44px]" : "w-[360px]",
      ].join(" ")}
    >
      <div
        className={[
          PANEL_HEADER,
          collapsed ? "justify-center px-0" : "px-4",
        ].join(" ")}
      >
        {collapsed ? (
          <button
            type="button"
            aria-label="Expand chat panel"
            onClick={onToggleCollapse}
            className="shrink-0 cursor-pointer text-[#888888] transition-colors hover:text-white"
          >
            <Icon name="ChevronLeft" size={16} aria-hidden />
          </button>
        ) : (
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              aria-label="Collapse chat panel"
              onClick={onToggleCollapse}
              className="shrink-0 cursor-pointer text-[#888888] transition-colors hover:text-white"
            >
              <Icon name="ChevronRight" size={16} aria-hidden />
            </button>
            <span className={PANEL_TITLE}>Chat</span>
          </div>
        )}
      </div>

      {!collapsed ? (
        <div className="flex flex-1 min-h-0 min-w-0 flex-col overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
            {SHOWCASE_CHAT_MESSAGES.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[320px] whitespace-pre-wrap break-words leading-relaxed ${
                    msg.role === "user"
                      ? CHAT_USER_BUBBLE_CLASS
                      : "rounded-lg border border-[#2e2e2e] bg-[#1d1d1d] px-3 py-2.5 text-[14px] text-[#e5e5e5]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mx-6 mb-2 shrink-0 overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.04] ${CHAT_SURFACE_SHADOW}`}
          >
            <div className="flex min-w-0 items-center gap-2 px-3 py-2">
              <button
                type="button"
                aria-expanded={changesExpanded}
                aria-label={changesExpanded ? "Collapse changes" : "Expand changes"}
                onClick={() => setChangesExpanded((prev) => !prev)}
                className="shrink-0 cursor-pointer text-[#888888] transition-colors hover:text-white"
              >
                <Icon
                  name="ChevronRight"
                  size={16}
                  className={[
                    "transition-transform duration-150",
                    changesExpanded ? "rotate-90" : "",
                  ].join(" ")}
                  aria-hidden
                />
              </button>

              <span className="min-w-0 truncate text-[13px] font-medium text-[#888888]">
                {pendingCount} Changes
              </span>

              <div className="ml-auto flex shrink-0 items-center gap-2">
                <button type="button" className={BTN_SECONDARY}>
                  Undo all
                </button>
                <button
                  type="button"
                  className={`${BTN_PRIMARY_SOLID} !h-8 !px-3.5 !text-[12px] !font-semibold !rounded-md`}
                >
                  Keep all
                </button>
              </div>
            </div>

            {changesExpanded ? (
              <div className="space-y-1.5 border-t border-white/[0.06] px-3 py-2">
                {SHOWCASE_PENDING_CHANGES.map((change) => (
                  <div
                    key={change.key}
                    className="text-[12px] font-medium leading-snug text-[#888888]"
                  >
                    {change.label}: {change.from} → {change.to}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="shrink-0 px-6 pb-4 pt-2">
            <div
              className={`overflow-hidden rounded-xl border border-[#2e2e2e] bg-[#1d1d1d] ${CHAT_SURFACE_SHADOW}`}
            >
              <div className="flex min-h-[76px] items-start px-4 pb-3 pt-3">
                <div className="flex w-full items-center gap-3.5">
                  <Image
                    src="/r-logo.png"
                    alt=""
                    width={42}
                    height={42}
                    className="shrink-0 rounded"
                    aria-hidden
                  />
                  <textarea
                    readOnly
                    disabled
                    rows={1}
                    placeholder="Describe the edit you want..."
                    className="min-h-[24px] w-full resize-none bg-transparent pt-0 text-[15px] font-normal leading-snug text-white outline-none placeholder:text-[#666666] disabled:cursor-default disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-[#2e2e2e] px-4 pb-3 pt-3">
                <div className="flex min-w-0 shrink-0 items-center gap-1.5">
                  <div
                    className={`${TOOLBAR_CHIP} flex ${TOOLBAR_CHIP_H} w-8 items-center justify-center opacity-50`}
                  >
                    <Icon name="Paperclip" size={16} aria-hidden />
                  </div>

                  <div
                    className={`${TOOLBAR_CHIP} flex ${TOOLBAR_CHIP_H} cursor-default items-center gap-1 px-2`}
                  >
                    <span className="truncate text-[12px] font-semibold text-white/90">
                      Claude Sonnet 4.5
                    </span>
                    <Icon name="ChevronDown" size={16} className="text-[#888888]" aria-hidden />
                  </div>

                  <ShowcaseUsageRing />
                </div>

                <button
                  type="button"
                  disabled
                  title="Send"
                  className="flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-md bg-white/[0.08] text-[#666666] opacity-50"
                >
                  <Icon name="Send01" size={16} aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
