/** Primary brand blue — CTAs, toasts, links, accents (matches redux-app). */

export const PRIMARY_BRAND_HEX = "#3A6FFF";
export const PRIMARY_BRAND_HOVER_HEX = "#5285FF";

/** Lighter tints for links on dark backgrounds. */
export const PRIMARY_BRAND_LINK_HEX = "#7CA8FF";
export const PRIMARY_BRAND_LINK_HOVER_HEX = "#96BBFF";

/** RGB tuple for rgba() shadows and glows. */
export const PRIMARY_BRAND_RGB = "58, 111, 255";

/** User chat bubble — brand blue, slightly darker than primary CTA. */
export const CHAT_USER_BUBBLE_BG_HEX = "#2E55CC";

/** Tailwind class fragments (static strings for JIT). */
export const BRAND_BG_CLASS = "bg-[#3A6FFF]";
export const BRAND_BG_HOVER_CLASS = "hover:bg-[#5285FF]";
export const BRAND_TEXT_CLASS = "text-[#3A6FFF]";
export const BRAND_TEXT_HOVER_CLASS = "hover:text-[#5285FF]";
export const BRAND_LINK_TEXT_CLASS = "text-[#7CA8FF]";
export const BRAND_LINK_TEXT_HOVER_CLASS = "hover:text-[#96BBFF]";
export const BRAND_BORDER_CLASS = "border-[#3A6FFF]";
export const BRAND_FOCUS_RING_CLASS = "focus:border-[#3A6FFF]/60";
export const BRAND_ACCENT_CLASS = "accent-[#3A6FFF]";

export const EMPTY_STATE_ICON_CLASS = "text-[#3A6FFF]";

/** @deprecated Use PRIMARY_* / BRAND_* — kept for mockup imports. */
export const PRODUCT_BRAND_HEX = PRIMARY_BRAND_HEX;
export const PRODUCT_BRAND_HOVER_HEX = PRIMARY_BRAND_HOVER_HEX;
export const PRODUCT_BRAND_LINK_HEX = PRIMARY_BRAND_LINK_HEX;
export const PRODUCT_BRAND_LINK_HOVER_HEX = PRIMARY_BRAND_LINK_HOVER_HEX;
export const PRODUCT_BRAND_RGB = PRIMARY_BRAND_RGB;
export const PRODUCT_CHAT_USER_BUBBLE_BG_HEX = CHAT_USER_BUBBLE_BG_HEX;
export const PRODUCT_BRAND_BG_CLASS = BRAND_BG_CLASS;
export const PRODUCT_BRAND_FOCUS_RING_CLASS = BRAND_FOCUS_RING_CLASS;
export const PRODUCT_BRAND_ACCENT_CLASS = BRAND_ACCENT_CLASS;
export const PRODUCT_BRAND_BORDER_FOCUS_CLASS = BRAND_BORDER_CLASS;

/** Primary CTA shell — nav, hero, waitlist, feature cards, toasts. */
export const BTN_PRIMARY_VISUAL = [
  "rounded-md border border-white/20 bg-[#3A6FFF] shadow-btn-primary",
  "transition-[background-color,box-shadow,transform] duration-200",
  "hover:bg-[#5285FF] hover:shadow-btn-primary-hover",
  "active:scale-[0.98] active:shadow-btn-primary-active",
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
].join(" ");

/** Alias — same chrome as primary CTAs in redux-app. */
export const BTN_BRAND_VISUAL = BTN_PRIMARY_VISUAL;

export const CHAT_USER_BUBBLE_CLASS =
  "rounded-xl bg-[#2E55CC] text-[13px] font-medium text-white py-2.5 px-4";
