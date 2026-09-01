import {
  SURFACE_BG_PANEL,
  SURFACE_BORDER,
  SURFACE_BTN_ACTIVE,
  SURFACE_BTN_IDLE,
  SURFACE_BTN_ROW as SURFACE_NAV_ROW,
  SURFACE_ICON_BTN,
} from "@/lib/surface-colors";

/** Library left panel shell (sidebar uses border-r on top of this). */
export const LIBRARY_PANEL_SURFACE = `${SURFACE_BG_PANEL} ${SURFACE_BORDER}`;

/** Library popovers : full 1px border matching the sidebar edge. */
export const LIBRARY_PANEL_POPOVER = `${SURFACE_BG_PANEL} border border-solid ${SURFACE_BORDER}`;

/** Library left panel width : keep sidebar shell and profile popover in sync. */
export const LIBRARY_SIDEBAR_WIDTH_PX = 260;

/** Horizontal padding on the sidebar footer (matches Tailwind `px-4`). */
export const LIBRARY_SIDEBAR_FOOTER_PADDING_X_PX = 16;

/** Footer content width (sidebar minus horizontal padding). */
export const LIBRARY_SIDEBAR_CONTENT_WIDTH_PX =
  LIBRARY_SIDEBAR_WIDTH_PX - LIBRARY_SIDEBAR_FOOTER_PADDING_X_PX * 2;

/** Profile popover : inset from content edges so it clears overflow-hidden clip. */
export const LIBRARY_PROFILE_POPOVER_WIDTH_PX =
  LIBRARY_SIDEBAR_CONTENT_WIDTH_PX - 8;

/** Shared hover/active treatment for library sidebar controls. */
export const LIBRARY_SIDEBAR_BTN_ROW = [
  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium",
  SURFACE_NAV_ROW,
].join(" ");

export const LIBRARY_SIDEBAR_BTN_IDLE = SURFACE_BTN_IDLE;
export const LIBRARY_SIDEBAR_BTN_ACTIVE = SURFACE_BTN_ACTIVE;
export const LIBRARY_SIDEBAR_ICON_BTN = SURFACE_ICON_BTN;

export const LIBRARY_SIDEBAR_LINK_ROW = [
  "group",
  LIBRARY_SIDEBAR_BTN_ROW,
  LIBRARY_SIDEBAR_BTN_IDLE,
].join(" ");

export const LIBRARY_SIDEBAR_PROFILE_BTN =
  "flex min-w-0 items-center gap-2.5 w-full rounded-lg px-1.5 py-1.5 -mx-1 border border-[#121212] transition-colors cursor-pointer hover:bg-[#1d1d1d]";

export const LIBRARY_SIDEBAR_PROFILE_BTN_OPEN = "bg-[#1d1d1d] !border-[#2e2e2e]";
