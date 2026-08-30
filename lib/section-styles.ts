export const SECTION_DIVIDE = "";

/** Horizontal padding — aligns section content with the navbar. */
export const SECTION_PADDING_X = "px-4 sm:px-8 lg:px-12";

/** Shared max-width and horizontal padding — aligns with navbar content edges. */
export const SITE_CONTAINER =
  `mx-auto w-full max-w-7xl ${SECTION_PADDING_X}`;

export const PAGE_CONTAINER = SITE_CONTAINER;

/** Break out of PAGE_CONTAINER to full viewport width (marquees, full-bleed strips). */
export const SECTION_BLEED =
  "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip";

/** Uppercase section label — Features, FAQ, Edit showcase intros. */
export const SECTION_LABEL =
  "text-[13px] font-semibold uppercase tracking-wide text-[#727272]";

/** Equal vertical padding for every home page section — shared section rhythm. */
export const SECTION_VERTICAL_PADDING =
  "py-16 sm:py-20 lg:py-28";

/** Gap between a section intro label and its body content. */
export const SECTION_STACK_GAP = "gap-8 sm:gap-10";

/** Vertical stack for repeated items inside a section (e.g. feature cards). */
export const SECTION_INNER_STACK = "flex flex-col gap-10 sm:gap-12 lg:gap-14";

/** Section shell — container + internal intro/content rhythm (no section margins). */
export const SECTION_LAYOUT = [
  "flex w-full min-w-0 flex-col",
  SECTION_STACK_GAP,
].join(" ");
