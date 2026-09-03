/** Primary brand purple : CTAs, toasts, links, accents. */

export const PRIMARY_BRAND_HEX = "#794ADE";
export const PRIMARY_BRAND_HOVER_HEX = "#9168eb";

/** Lighter tints for links on dark backgrounds. */
export const PRIMARY_BRAND_LINK_HEX = "#A688F0";
export const PRIMARY_BRAND_LINK_HOVER_HEX = "#BBA0F5";

/** RGB tuple for rgba() shadows and glows. */
export const PRIMARY_BRAND_RGB = "121, 74, 222";

/** Dark tint for chat user message bubbles. */
export const CHAT_USER_BUBBLE_BG_HEX = "#5C38A8";

/** Tailwind class fragments (static strings for JIT). */
export const BRAND_BG_CLASS = "bg-[#794ADE]";
export const BRAND_BG_HOVER_CLASS = "hover:bg-[#9168eb]";
export const BRAND_TEXT_CLASS = "text-[#794ADE]";
export const BRAND_TEXT_HOVER_CLASS = "hover:text-[#9168eb]";
export const BRAND_LINK_TEXT_CLASS = "text-[#A688F0]";
export const BRAND_LINK_TEXT_HOVER_CLASS = "hover:text-[#BBA0F5]";
export const BRAND_BORDER_CLASS = "border-[#794ADE]";
export const BRAND_FOCUS_RING_CLASS = "focus:border-[#794ADE]/60";
export const BRAND_ACCENT_CLASS = "accent-[#794ADE]";

export const EMPTY_STATE_ICON_CLASS = "text-[#794ADE]";

/** Primary CTA shell shared by marketing waitlist / outline pairings. */
export const BTN_PRIMARY_VISUAL = [
  "rounded-md border border-white/20 bg-[#794ADE] shadow-btn-primary",
  "transition-[background-color,box-shadow,transform] duration-200",
  "hover:bg-[#9168eb] hover:shadow-btn-primary-hover",
  "active:scale-[0.98] active:shadow-btn-primary-active",
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
].join(" ");

/** Brand purple CTA shell : product mockup exceptions (Export, chat send). */
export const BTN_BRAND_VISUAL = [
  "rounded-md border border-white/20 bg-[#794ADE] shadow-btn-primary",
  "transition-[background-color,box-shadow,transform] duration-200",
  "hover:bg-[#9168eb] hover:shadow-btn-primary-hover",
  "active:scale-[0.98] active:shadow-btn-primary-active",
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
].join(" ");

export const CHAT_USER_BUBBLE_CLASS =
  "rounded-xl bg-[#5C38A8] text-[13px] font-medium text-white py-2.5 px-4";
