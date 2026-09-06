/** Shared editor side-panel header chrome (adjustment section + chat). */

/** Header row : fixed height with bottom divider. */
export const PANEL_HEADER =
  "flex items-center shrink-0 h-12 border-b border-[#262626]";

/** Section title label (Chat, Light, Color, …). */
export const PANEL_TITLE =
  "text-[14px] font-semibold text-white select-none";

/** Portaled popovers from the chat footer : matches input/toolbar surfaces. */
export const CHAT_POPOVER_CHROME = "border border-[#262626] bg-[#1d1d1d]";

/** Secondary button in chat changes bar (Undo all). */
export const CHAT_BTN_SECONDARY =
  "inline-flex items-center justify-center h-8 px-3.5 rounded-md border border-[#262626] bg-[#1d1d1d] text-[12px] font-semibold text-white/90 hover:border-[#2e2e2e] transition-colors cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed";

/** Toolbar chip shell in chat input footer. */
export const CHAT_TOOLBAR_CHIP =
  "rounded-md border border-[#262626] bg-[#1d1d1d] shadow-[0_1px_2px_rgba(0,0,0,0.26),0_2px_5px_rgba(0,0,0,0.12)]";

/** Chat input composite shadow. */
export const CHAT_SURFACE_SHADOW =
  "shadow-[0_1px_3px_rgba(0,0,0,0.32),0_2px_8px_rgba(0,0,0,0.14)]";

/** Assistant message bubble. */
export const CHAT_ASSISTANT_BUBBLE =
  "rounded-lg px-3 py-2.5 text-[14px] bg-[#1d1d1d] text-[#e5e5e5]";

/** User message plain text (no bubble). */
export const CHAT_USER_MESSAGE_TEXT =
  "min-w-0 whitespace-pre-wrap break-words text-[14px] font-normal leading-snug text-white";

/** Avatar shell for chat rows. */
export const CHAT_AVATAR_SHELL =
  "flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#1d1d1d] border border-[#262626]";

/** Send button when input is empty/disabled. */
export const CHAT_SEND_BTN_DISABLED =
  "pointer-events-none shrink-0 flex items-center justify-center w-8 h-8 rounded-md bg-white/[0.08] text-[#666666] opacity-50 cursor-not-allowed";
