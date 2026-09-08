"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";

import { Icon } from "@/components/shared/Icon";
import BlankImagePlaceholder from "@/components/shared/BlankImagePlaceholder";
import { BTN_PRIMARY_COMPACT } from "@/lib/button-styles";
import { isBlankImageSrc } from "@/lib/blank-image";
import {
  CHAT_ASSISTANT_BUBBLE,
  CHAT_AVATAR_SHELL,
  CHAT_BTN_SECONDARY,
  CHAT_SURFACE_SHADOW,
  CHAT_USER_MESSAGE_TEXT,
  PANEL_HEADER,
  PANEL_TITLE,
} from "@/lib/panel-chrome";
import { SURFACE_BG_PANEL, SURFACE_BORDER } from "@/lib/surface-colors";

import {
  SHOWCASE_CHAT_MESSAGES,
  SHOWCASE_PENDING_CHANGES,
  type ShowcaseChatMessage,
  type ShowcasePendingChange,
} from "./showcase-data";
import ShowcaseChatInput from "./ShowcaseChatInput";
import { SHOWCASE_CHAT_PANEL_WIDTH } from "./showcase-layout";

const CHAT_PANEL_GUTTER_CLASS = "px-8";
const CHAT_PANEL_GUTTER_MARGIN_CLASS = "mx-8";
const CHAT_AVATAR_LOGO_PX = 38;
const CHAT_MESSAGE_ATTACHMENT_MAX_WIDTH_PX = 164;

function ShowcaseChatAvatar({ role }: { role: "user" | "assistant" }) {
  if (role === "assistant") {
    return (
      <div className={CHAT_AVATAR_SHELL} aria-hidden>
        <Image
          src="/r-logo.png"
          alt=""
          width={CHAT_AVATAR_LOGO_PX}
          height={CHAT_AVATAR_LOGO_PX}
          className="shrink-0"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      className={`${CHAT_AVATAR_SHELL} text-[13px] font-medium uppercase text-white`}
      aria-hidden
    >
      JD
    </div>
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
  /** Short decorative thumb : matches the original ~32% track height. */
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
        `rounded-l-2xl border-l ${SURFACE_BORDER} ${SURFACE_BG_PANEL}`,
      ].join(" ")}
      style={{
        width: collapsed ? 44 : SHOWCASE_CHAT_PANEL_WIDTH,
      }}
    >
      <div
        className={[
          PANEL_HEADER,
          "relative",
          collapsed ? "justify-center px-0" : CHAT_PANEL_GUTTER_CLASS,
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
        ) : demoMode ? (
          <>
            <span
              className="absolute left-[18px] top-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2 text-[#888888]"
              aria-hidden
            >
              <Icon name="ChevronRight" size={16} />
            </span>
            <span className={PANEL_TITLE}>Chat</span>
          </>
        ) : (
          <>
            <button
              type="button"
              aria-label="Collapse chat panel"
              onClick={onToggleCollapse}
              className="absolute left-[18px] top-1/2 shrink-0 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-[#888888] transition-colors hover:text-white"
            >
              <Icon name="ChevronRight" size={16} aria-hidden />
            </button>
            <span className={PANEL_TITLE}>Chat</span>
          </>
        )}
      </div>

      {!collapsed ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div ref={messagesContainerRef} className="relative min-h-0 flex-1 overflow-hidden">
            <div
              ref={messagesViewportRef}
              className={`showcase-chat-messages h-full overflow-hidden py-5 ${CHAT_PANEL_GUTTER_CLASS}`}
            >
              <motion.div
                ref={messagesListRef}
                className="flex flex-col gap-10"
                style={{ y: messageScrollY }}
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex w-full flex-col items-start gap-[4px]"
                  >
                    <div className="flex w-full items-start gap-5">
                      <ShowcaseChatAvatar role={msg.role} />
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        {msg.imagePreview ? (
                          <div>
                            {isBlankImageSrc(msg.imagePreview) ? (
                              <BlankImagePlaceholder
                                className="rounded-lg"
                                iconSize={20}
                                style={{
                                  width: CHAT_MESSAGE_ATTACHMENT_MAX_WIDTH_PX,
                                  height: 100,
                                  maxWidth: CHAT_MESSAGE_ATTACHMENT_MAX_WIDTH_PX,
                                }}
                              />
                            ) : (
                              <Image
                                src={msg.imagePreview}
                                alt=""
                                width={CHAT_MESSAGE_ATTACHMENT_MAX_WIDTH_PX}
                                height={100}
                                unoptimized
                                className="max-h-[100px] rounded-lg border border-[#212121] object-cover"
                                style={{
                                  maxWidth: CHAT_MESSAGE_ATTACHMENT_MAX_WIDTH_PX,
                                }}
                              />
                            )}
                          </div>
                        ) : null}
                        <div
                          className={
                            msg.role === "user"
                              ? CHAT_USER_MESSAGE_TEXT
                              : `min-w-0 whitespace-pre-wrap break-words leading-relaxed ${CHAT_ASSISTANT_BUBBLE}`
                          }
                        >
                          {msg.content}
                        </div>
                      </div>
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
            className={`${CHAT_PANEL_GUTTER_MARGIN_CLASS} mb-2 shrink-0 overflow-hidden rounded-md border ${SURFACE_BORDER} bg-white/[0.04] ${CHAT_SURFACE_SHADOW}`}
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
                  className={CHAT_BTN_SECONDARY}
                  tabIndex={demoMode ? -1 : undefined}
                  aria-hidden={demoMode}
                >
                  Undo all
                </button>
                <button
                  type="button"
                  className={BTN_PRIMARY_COMPACT}
                  tabIndex={demoMode ? -1 : undefined}
                  aria-hidden={demoMode}
                >
                  Keep all
                </button>
              </div>
            </div>

            {!demoMode && changesExpanded ? (
              <div className={`space-y-1.5 border-t ${SURFACE_BORDER} px-3 py-2`}>
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

          <div className={`shrink-0 pb-4 pt-2 ${CHAT_PANEL_GUTTER_CLASS}`}>
            <ShowcaseChatInput value="" demoMode={demoMode} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
