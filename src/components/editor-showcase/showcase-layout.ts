/** Fixed design canvas for the editor showcase scaler and crops. */
export const SHOWCASE_DESIGN_WIDTH = 1400;
export const SHOWCASE_DESIGN_HEIGHT = 820;

/** Main editor toolbar height in the showcase layout. */
export const SHOWCASE_TOOLBAR_HEIGHT = 64;

/** Expanded chat panel width inside the showcase. */
export const SHOWCASE_CHAT_PANEL_WIDTH = 360;

/** Chat panel + canvas context when cropping the feature preview. */
export const SHOWCASE_CHAT_CROP_WIDTH = SHOWCASE_CHAT_PANEL_WIDTH + 320;

/** Chat column height below the toolbar. */
export const SHOWCASE_CHAT_CROP_HEIGHT =
  SHOWCASE_DESIGN_HEIGHT - SHOWCASE_TOOLBAR_HEIGHT;

/** Left edge of the chat crop region in design coordinates. */
export const SHOWCASE_CHAT_CROP_LEFT =
  SHOWCASE_DESIGN_WIDTH - SHOWCASE_CHAT_CROP_WIDTH;
