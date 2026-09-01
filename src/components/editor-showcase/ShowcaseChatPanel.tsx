"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";

import { Icon } from "@/components/shared/Icon";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import { PANEL_HEADER, PANEL_TITLE } from "@/lib/panel-chrome";

import {
  SHOWCASE_CHAT_MESSAGES,
  SHOWCASE_PENDING_CHANGES,
  type ShowcaseChatMessage,
  type ShowcasePendingChange,
} from "./showcase-data";

const CHAT_SURFACE_SHADOW =
  "shadow-[0_1px_3px_rgba(0,0,0,0.32),0_2px_8px_rgba(0,0,0,0.14)]";
const TOOLBAR_CHIP_H = "h-8";
const TOOLBAR_CHIP =
  "rounded-md border border-[#2e2e2e] bg-[#1d1d1d] shadow-[0_1px_2px_rgba(0,0,0,0.26),0_2px_5px_rgba(0,0,0,0.12)]";
const BTN_SECONDARY =
  "inline-flex items-center justify-center h-8 px-3.5 rounded-md border border-[#2e2e2e] bg-[#1d1d1d] text-[12px] font-semibold text-white/90 hover:border-[#3a3a3a] transition-colors cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed";
const ASSISTANT_BUBBLE =
  "rounded-lg px-3 py-2.5 text-[14px] bg-[#1d1d1d] text-[#e5e5e5]";
const SHOWCASE_USER_BUBBLE =
  "rounded-xl bg-[#3a2270] text-[13px] font-medium text-white py-2.5 px-4";

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
  demoMode?: boolean;
  autoScrollActive?: boolean;
  messages?: readonly ShowcaseChatMessage[];
  pendingChanges?: readonly ShowcasePendingChange[];
};

export default function ShowcaseChatPanel({
  collapsed,
  onToggleCollapse,
  demoMode = false,
  autoScrollActive = false,
  messages = SHOWCASE_CHAT_MESSAGES,
  pendingChanges = SHOWCASE_PENDING_CHANGES,
}: ShowcaseChatPanelProps) {
  const [changesExpanded, setChangesExpanded] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesViewportRef = useRef<HTMLDivElement>(null);
  const messagesListRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const messageScrollY = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const pendingCount = pendingChanges.length;
  const shouldAutoScroll =
    demoMode && autoScrollActive && !prefersReducedMotion && scrollDistance > 0;

  const trackHeight = Math.max(0, viewportHeight - 40);
  /** Short decorative thumb — matches the original ~32% track height. */
  const thumbHeight = Math.max(24, trackHeight * 0.32);
  const maxThumbTop = Math.max(0, trackHeight - thumbHeight);

  const thumbTop = useTransform(messageScrollY, (latestY) => {
    if (scrollDistance <= 0) return 0;
    const progress = Math.min(1, Math.max(0, -latestY / scrollDistance));
    return progress * maxThumbTop;
  });

  useEffect(() => {
    if (!demoMode) return;

    const container = messagesContainerRef.current;
    const viewport = messagesViewportRef.current;
    const list = messagesListRef.current;
    if (!container || !viewport || !list) return;

    const updateScrollDistance = () => {
      setViewportHeight(container.clientHeight);
      setScrollDistance(
        Math.max(0, list.scrollHeight - viewport.clientHeight),
      );
    };

    updateScrollDistance();

    const observer = new ResizeObserver(() => {
      updateScrollDistance();
    });

    observer.observe(container);
    observer.observe(viewport);
    observer.observe(list);

    return () => observer.disconnect();
  }, [demoMode]);

  useEffect(() => {
    if (!shouldAutoScroll || scrollDistance <= 0) {
      messageScrollY.set(0);
      return;
    }

    const controls = animate(messageScrollY, [0, -scrollDistance, 0], {
      duration: 22,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
    });

    return () => controls.stop();
  }, [shouldAutoScroll, scrollDistance, messageScrollY]);

  return (
    <div
      className={[
        "flex h-full min-w-0 shrink-0 flex-col overflow-hidden transition-[width] duration-200 ease-out",
        "rounded-l-2xl border-l border-[#2e2e2e] bg-[#121212]",
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
            {demoMode ? (
              <span className="shrink-0 text-[#888888]" aria-hidden>
                <Icon name="ChevronRight" size={16} />
              </span>
            ) : (
              <button
                type="button"
                aria-label="Collapse chat panel"
                onClick={onToggleCollapse}
                className="shrink-0 cursor-pointer text-[#888888] transition-colors hover:text-white"
              >
                <Icon name="ChevronRight" size={16} aria-hidden />
              </button>
            )}
            <span className={PANEL_TITLE}>Chat</span>
          </div>
        )}
      </div>

      {!collapsed ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div ref={messagesContainerRef} className="relative min-h-0 flex-1 overflow-hidden">
            <div
              ref={messagesViewportRef}
              className="showcase-chat-messages h-full overflow-hidden px-6 py-5 pr-7"
            >
              <motion.div
                ref={messagesListRef}
                className="flex flex-col gap-3"
                style={{ y: messageScrollY }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}
                  >
                    {msg.imagePreview ? (
                      <div className="mb-1">
                        <Image
                          src={msg.imagePreview}
                          alt=""
                          width={140}
                          height={100}
                          unoptimized
                          className="max-h-[100px] max-w-[140px] rounded-lg border border-white/[0.08] object-cover"
                        />
                      </div>
                    ) : null}
                    <div
                      className={`max-w-[320px] whitespace-pre-wrap break-words leading-relaxed ${
                        msg.role === "user"
                          ? SHOWCASE_USER_BUBBLE
                          : ASSISTANT_BUBBLE
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            {scrollDistance > 0 ? (
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-5 right-0 top-5 w-[5px]"
              >
                <motion.div
                  className="absolute left-0 w-full rounded-full bg-[var(--scrollbar-thumb)]"
                  style={{ height: thumbHeight, top: thumbTop }}
                />
              </div>
            ) : null}
          </div>

          <div
            className={`mx-6 mb-2 shrink-0 overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.04] ${CHAT_SURFACE_SHADOW}`}
          >
            <div className="flex min-w-0 items-center gap-2 px-3 py-2">
              {demoMode ? (
                <span className="shrink-0 text-[#888888]" aria-hidden>
                  <Icon name="ChevronRight" size={16} />
                </span>
              ) : (
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
              )}

              <span className="min-w-0 truncate text-[13px] font-medium text-[#888888]">
                {pendingCount} Changes
              </span>

              <div className="ml-auto flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  className={BTN_SECONDARY}
                  tabIndex={demoMode ? -1 : undefined}
                  aria-hidden={demoMode}
                >
                  Undo all
                </button>
                <button
                  type="button"
                  className={`${BTN_PRIMARY_SOLID} !h-8 !px-3.5 !text-[12px] !font-semibold !rounded-md`}
                  tabIndex={demoMode ? -1 : undefined}
                  aria-hidden={demoMode}
                >
                  Keep all
                </button>
              </div>
            </div>

            {!demoMode && changesExpanded ? (
              <div className="space-y-1.5 border-t border-white/[0.06] px-3 py-2">
                {pendingChanges.map((change) => (
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
              className={`overflow-hidden rounded-xl border border-[#2e2e2e] bg-[#1d1d1d] transition-colors focus-within:border-[#3a3a3a] ${CHAT_SURFACE_SHADOW}`}
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
                    className={`${TOOLBAR_CHIP} flex ${TOOLBAR_CHIP_H} cursor-default items-center gap-0.5 px-1.5`}
                  >
                    <span className="truncate whitespace-nowrap text-[12px] font-semibold text-[#888888]">
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
