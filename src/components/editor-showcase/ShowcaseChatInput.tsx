"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/shared/Icon";
import ShowcaseUsageRing from "@/src/components/editor-showcase/ShowcaseUsageRing";
import { PRODUCT_BRAND_BORDER_FOCUS_CLASS } from "@/lib/brand-colors";
import {
  CHAT_SEND_BTN_DISABLED,
  CHAT_SURFACE_SHADOW,
  CHAT_TOOLBAR_CHIP,
} from "@/lib/panel-chrome";
import { SURFACE_BORDER } from "@/lib/surface-colors";
import { UI_CARD_BORDER } from "@/lib/ui-surface-styles";
import { cn } from "@/lib/utils";

const TOOLBAR_CHIP_H = "h-8";
const CHAT_INPUT_LOGO_PX = 46;

type ShowcaseChatInputBorderVariant = "editor" | "bento";

type ShowcaseChatInputProps = {
  value: string;
  demoMode?: boolean;
  focused?: boolean;
  borderVariant?: ShowcaseChatInputBorderVariant;
  placeholder?: string;
  className?: string;
};

export default function ShowcaseChatInput({
  value,
  demoMode = false,
  focused: focusedProp,
  borderVariant = "editor",
  placeholder = "Describe the edit you want...",
  className,
}: ShowcaseChatInputProps) {
  const [focusedInternal, setFocusedInternal] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const focused = focusedProp ?? focusedInternal;
  const showPlaceholder = value.length === 0 && !focused;
  const isBentoShell = borderVariant === "bento";
  const isBentoDemo = isBentoShell && demoMode;

  useEffect(() => {
    if (!isBentoDemo) return;
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.scrollTop = 0;
    textarea.scrollLeft = 0;
  }, [isBentoDemo, value]);

  const shellClassName =
    borderVariant === "bento"
      ? cn(
          UI_CARD_BORDER,
          "overflow-hidden bg-[#1d1d1d] transition-[border-color,box-shadow] duration-200",
          focused && PRODUCT_BRAND_BORDER_FOCUS_CLASS,
        )
      : cn(
          "overflow-hidden rounded-xl border-2 bg-[#1d1d1d] transition-colors",
          CHAT_SURFACE_SHADOW,
          focused ? PRODUCT_BRAND_BORDER_FOCUS_CLASS : "border-[#262626]",
        );

  return (
    <div className={cn(shellClassName, className)}>
      <div
        className={cn(
          "flex items-start px-4 pb-3 pt-3",
          isBentoShell ? "min-h-[92px]" : "min-h-[76px]",
        )}
      >
        <div className="flex w-full min-w-0 items-center gap-3.5 overflow-hidden">
          <Image
            src="/r-logo.png"
            alt=""
            width={CHAT_INPUT_LOGO_PX}
            height={CHAT_INPUT_LOGO_PX}
            className={cn(
              "shrink-0 rounded",
              isBentoShell ? "-translate-y-0.5" : "-translate-y-1",
            )}
            aria-hidden
          />
          <textarea
            ref={textareaRef}
            readOnly
            rows={1}
            wrap={isBentoDemo ? "off" : "soft"}
            value={value}
            placeholder={showPlaceholder ? placeholder : undefined}
            tabIndex={demoMode ? -1 : undefined}
            onFocus={() => setFocusedInternal(true)}
            onBlur={() => setFocusedInternal(false)}
            className={cn(
              "min-h-[24px] w-full min-w-0 resize-none bg-transparent pt-0 text-[15px] font-normal leading-snug text-white outline-none placeholder:text-[#666666]",
              isBentoDemo &&
                "overflow-hidden whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            )}
          />
        </div>
      </div>

      <div
        className={`flex items-center justify-between gap-2 border-t ${SURFACE_BORDER} px-4 pb-3 pt-3`}
      >
        <div className="flex min-w-0 shrink-0 items-center gap-1.5">
          <div
            className={`${CHAT_TOOLBAR_CHIP} flex ${TOOLBAR_CHIP_H} w-8 items-center justify-center opacity-50`}
          >
            <Icon name="Paperclip" size={16} aria-hidden />
          </div>

          <div
            className={`${CHAT_TOOLBAR_CHIP} flex ${TOOLBAR_CHIP_H} cursor-default items-center gap-0.5 px-1.5`}
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
          title="Send"
          tabIndex={-1}
          aria-disabled
          className={CHAT_SEND_BTN_DISABLED}
        >
          <Icon name="Send01" size={16} strokeWidth={2} aria-hidden />
        </button>
      </div>
    </div>
  );
}
