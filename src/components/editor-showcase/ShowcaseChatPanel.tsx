"use client";

import {
  ArrowUp,
  Attachment01,
  ChevronLeft,
  ChevronRight,
  MessageCircle01,
} from "@untitledui/icons";

import { cn } from "@/lib/utils";

import { SHOWCASE_CHAT_MESSAGES } from "./showcase-data";
import { SHOWCASE_TYPE } from "./showcase-typography";

type ShowcaseChatPanelProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
};

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function ShowcaseChatPanel({
  collapsed,
  onToggleCollapse,
}: ShowcaseChatPanelProps) {
  return (
    <aside
      className={cn(
        "flex h-full min-w-0 shrink-0 flex-col overflow-hidden border-l border-brand-border bg-black/50 backdrop-blur-xl transition-[width] duration-200 ease-out",
        collapsed ? "w-[44px]" : "w-[400px]",
      )}
    >
      <div className="flex h-[52px] shrink-0 items-center gap-2 border-b border-brand-border px-6">
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand chat panel" : "Collapse chat panel"}
          className="text-[#555555] transition-colors hover:text-[#888888]"
        >
          {collapsed ? (
            <ChevronLeft size={14} />
          ) : (
            <ChevronRight size={14} />
          )}
        </button>
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <MessageCircle01
              size={14}
              className="text-[#888888]"
            />
            <span className={SHOWCASE_TYPE.panelHeader}>Chat</span>
          </div>
        ) : null}
      </div>

      {!collapsed ? (
        <>
          <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-5">
            {SHOWCASE_CHAT_MESSAGES.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col gap-1",
                    isUser ? "items-end" : "items-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[88%] rounded-xl px-3.5 py-2.5",
                      isUser
                        ? "rounded-br-sm bg-brand-purple/25 text-[#e5e5e5]"
                        : "rounded-bl-sm border border-brand-border bg-white/[0.04] text-[#d4d4d4]",
                    )}
                  >
                    <p className={SHOWCASE_TYPE.bodyPrimary}>{message.content}</p>
                  </div>
                  <span className={cn("px-1", SHOWCASE_TYPE.meta)}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="shrink-0 px-6 pb-6 pt-3">
            <div className="flex flex-col gap-1 rounded-lg border border-brand-border bg-brand-surface-card px-3 py-2">
              <textarea
                readOnly
                disabled
                rows={1}
                placeholder="Describe the edits you want or ask for help..."
                className={cn(
                  "h-5 w-full resize-none overflow-hidden bg-transparent leading-5 text-white outline-none placeholder:text-[#555555] disabled:cursor-default",
                  SHOWCASE_TYPE.body,
                )}
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  disabled
                  className="text-[#555555]"
                  aria-label="Attach file"
                >
                  <Attachment01 size={16} />
                </button>
                <button
                  type="button"
                  disabled
                  className="flex h-7 w-7 shrink-0 cursor-not-allowed items-center justify-center rounded-lg bg-brand-surface text-[#555555] opacity-50"
                  aria-label="Send message"
                >
                  <ArrowUp size={14} />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </aside>
  );
}
