import { BTN_BRAND_VISUAL, BTN_PRIMARY_VISUAL } from "@/lib/brand-colors";
import { SURFACE_SECONDARY_BTN } from "@/lib/surface-colors";

export const BTN_PRIMARY_TYPE =
  "text-[13px] font-medium text-white leading-none";

/** Dark grey for soft-white product CTA label + icons (editor/library mockups). */
export const BTN_SOFT_FG_HEX = "#2a2a2a";

export const BTN_SOFT_FG =
  "text-[#2a2a2a] [&_svg]:text-[#2a2a2a] [&_svg]:stroke-current";

/** Soft white product CTA label : dark grey on light button chrome */
export const BTN_SOFT_PRIMARY_TYPE =
  `text-[13px] font-medium leading-none ${BTN_SOFT_FG}`;

/** Soft white product CTA shell : matches redux-app primary buttons */
export const BTN_SOFT_VISUAL =
  "rounded-md border border-[#ffffff]/10 bg-[#ededed] shadow-none transition-[background-color,transform] duration-200 hover:bg-[#e0e0e0] active:scale-[0.98] active:bg-[#d4d4d4] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100";

/** Standalone product CTA : toolbar Export (does not affect marketing waitlist) */
export const BTN_SOFT_SOLID = [
  "inline-flex items-center justify-center gap-1.5 h-9 px-4 whitespace-nowrap cursor-pointer select-none",
  BTN_SOFT_PRIMARY_TYPE,
  BTN_SOFT_VISUAL,
].join(" ");

/** Compact product CTA : pairs with h-8 secondary buttons (chat Keep all) */
export const BTN_PRIMARY_COMPACT = [
  "inline-flex items-center justify-center h-8 px-3.5 whitespace-nowrap cursor-pointer select-none",
  "text-[12px] font-semibold leading-none",
  BTN_SOFT_FG,
  BTN_SOFT_VISUAL,
].join(" ");

/** Panel row product CTA : pairs with h-[34px] ghost Cancel buttons */
export const BTN_SOFT_PANEL = [
  "inline-flex flex-1 items-center justify-center gap-1.5 h-[34px] px-4 min-w-0 cursor-pointer select-none",
  BTN_SOFT_PRIMARY_TYPE,
  BTN_SOFT_VISUAL,
].join(" ");

/** Full-width panel product CTA */
export const BTN_SOFT_BLOCK = [
  "inline-flex w-full items-center justify-center gap-1.5 h-[34px] px-4 cursor-pointer select-none",
  BTN_SOFT_PRIMARY_TYPE,
  BTN_SOFT_VISUAL,
].join(" ");

/** Brand CTA label + icon weight — white on blue chrome (mockups). */
export const BTN_BRAND_TYPE =
  "text-[14px] font-semibold text-white leading-none [&_svg]:shrink-0 [&_svg]:!size-5 [&_svg]:stroke-[2]";

/** Brand blue compact icon-only (chat send when active) */
export const BTN_BRAND_ICON = [
  "inline-flex shrink-0 items-center justify-center w-8 h-8 cursor-pointer select-none",
  BTN_BRAND_TYPE,
  BTN_BRAND_VISUAL,
].join(" ");

/** Brand blue standalone CTA (showcase Export, etc.) */
export const BTN_BRAND_SOLID = [
  "inline-flex items-center justify-center gap-1.5 h-9 px-4 whitespace-nowrap cursor-pointer select-none",
  BTN_BRAND_TYPE,
  BTN_BRAND_VISUAL,
].join(" ");

/** Brand blue panel row CTA */
export const BTN_BRAND_PANEL = [
  "inline-flex flex-1 items-center justify-center gap-1.5 h-[34px] px-4 min-w-0 cursor-pointer select-none",
  BTN_BRAND_TYPE,
  BTN_BRAND_VISUAL,
].join(" ");

/** Shared outline CTA shell : pairs with primary buttons in nav/toolbars */
const BTN_OUTLINE_VISUAL =
  "rounded-md border border-brand-border bg-transparent transition-colors hover:bg-white/5 hover:text-white";

/** Standalone outline CTA : matches BTN_PRIMARY_SOLID dimensions */
export const BTN_OUTLINE_SOLID = [
  "inline-flex items-center justify-center gap-1.5 h-9 px-4 whitespace-nowrap cursor-pointer select-none shrink-0",
  BTN_PRIMARY_TYPE,
  BTN_OUTLINE_VISUAL,
].join(" ");

/** Full-width outline CTA : matches BTN_PRIMARY_BLOCK dimensions */
export const BTN_OUTLINE_BLOCK = [
  "inline-flex w-full items-center justify-center gap-1.5 h-[34px] px-4 cursor-pointer select-none",
  BTN_PRIMARY_TYPE,
  BTN_OUTLINE_VISUAL,
].join(" ");

/** Standalone CTA : header, toolbar, modal footers (matches h-9 chrome controls) */
export const BTN_PRIMARY_SOLID = [
  "inline-flex items-center justify-center gap-1.5 h-9 px-4 whitespace-nowrap cursor-pointer select-none",
  BTN_PRIMARY_TYPE,
  BTN_PRIMARY_VISUAL,
].join(" ");

/** Panel row CTA : pairs with h-[34px] ghost Cancel buttons */
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

/** Segmented control : selected format tab */
export const BTN_FORMAT_SELECTED = [
  "flex flex-1 items-center justify-center h-9 px-3 cursor-pointer select-none",
  BTN_PRIMARY_TYPE,
  BTN_PRIMARY_VISUAL,
].join(" ");

export const BTN_FORMAT_IDLE =
  `flex flex-1 items-center justify-center h-9 px-3 rounded-md text-[13px] font-medium text-white/80 ${SURFACE_SECONDARY_BTN} select-none`;
