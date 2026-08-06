import { BTN_PRIMARY_VISUAL } from "@/lib/brand-colors";

export const BTN_PRIMARY_TYPE =
  "text-[13px] font-medium text-white leading-none";

/** Shared outline CTA shell — pairs with primary buttons in nav/toolbars */
const BTN_OUTLINE_VISUAL =
  "rounded-md border border-white/[0.08] bg-transparent transition-colors hover:bg-white/5 hover:text-white";

/** Standalone outline CTA — matches BTN_PRIMARY_SOLID dimensions */
export const BTN_OUTLINE_SOLID = [
  "inline-flex items-center justify-center gap-1.5 h-9 px-4 whitespace-nowrap cursor-pointer select-none shrink-0",
  BTN_PRIMARY_TYPE,
  BTN_OUTLINE_VISUAL,
].join(" ");

/** Full-width outline CTA — matches BTN_PRIMARY_BLOCK dimensions */
export const BTN_OUTLINE_BLOCK = [
  "inline-flex w-full items-center justify-center gap-1.5 h-[34px] px-4 cursor-pointer select-none",
  BTN_PRIMARY_TYPE,
  BTN_OUTLINE_VISUAL,
].join(" ");

/** Standalone CTA — header, toolbar, modal footers (matches h-9 chrome controls) */
export const BTN_PRIMARY_SOLID = [
  "inline-flex items-center justify-center gap-1.5 h-9 px-4 whitespace-nowrap cursor-pointer select-none",
  BTN_PRIMARY_TYPE,
  BTN_PRIMARY_VISUAL,
].join(" ");

/** Panel row CTA — pairs with h-[34px] ghost Cancel buttons */
export const BTN_PRIMARY_PANEL = [
  "inline-flex flex-1 items-center justify-center gap-1.5 h-[34px] px-4 min-w-0 cursor-pointer select-none",
  BTN_PRIMARY_TYPE,
  BTN_PRIMARY_VISUAL,
].join(" ");

/** Full-width panel CTA */
export const BTN_PRIMARY_BLOCK = [
  "inline-flex w-full items-center justify-center gap-1.5 h-[34px] px-4 cursor-pointer select-none",
  BTN_PRIMARY_TYPE,
  BTN_PRIMARY_VISUAL,
].join(" ");

/** Compact icon-only primary (chat send) */
export const BTN_PRIMARY_ICON = [
  "inline-flex shrink-0 items-center justify-center w-8 h-8 cursor-pointer select-none",
  BTN_PRIMARY_TYPE,
  BTN_PRIMARY_VISUAL,
].join(" ");

/** Segmented control — selected format tab */
export const BTN_FORMAT_SELECTED = [
  "flex flex-1 items-center justify-center h-9 px-3 cursor-pointer select-none",
  BTN_PRIMARY_TYPE,
  BTN_PRIMARY_VISUAL,
].join(" ");

export const BTN_FORMAT_IDLE =
  "flex flex-1 items-center justify-center h-9 px-3 rounded-md border border-white/[0.08] bg-white/[0.05] text-[13px] font-medium text-white/80 hover:bg-white/[0.09] hover:border-white/[0.15] transition-colors cursor-pointer select-none";
