export const SECTION_DIVIDE = "";

/** Tailwind max-width token for the shared page column (`max-w-7xl` = 80rem). */
export const PAGE_CONTAINER_MAX_WIDTH_CLASS = "max-w-7xl";

/** Outward offset from the page container edge for crop-guide vertical lines. */
export const PAGE_GRID_OFFSET_PX = 32;

/** Horizontal padding : aligns section content with the navbar. */
export const SECTION_PADDING_X = "px-4 sm:px-8 lg:px-12";

/** Shared max-width and horizontal padding : aligns with navbar content edges. */
export const SITE_CONTAINER =
  `mx-auto w-full ${PAGE_CONTAINER_MAX_WIDTH_CLASS} ${SECTION_PADDING_X}`;

export const PAGE_CONTAINER = SITE_CONTAINER;

/** Break out of PAGE_CONTAINER to full viewport width (marquees, full-bleed strips). */
export const SECTION_BLEED =
  "relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip";

/** Clip marquees to the crop-guide column (CSS vars published on `main` by PageGrid). */
export const PAGE_GRID_ALIGNED_FRAME =
  "relative max-w-[var(--page-grid-width,100%)] overflow-x-clip ml-[var(--page-grid-left,0px)] w-[var(--page-grid-width,100%)]";

/** Uppercase section label : Features, FAQ, Edit showcase intros. */
export const SECTION_LABEL =
  "text-[13px] font-semibold uppercase tracking-wide text-[#727272]";

/** Equal vertical padding for every home page section : shared section rhythm. */
export const SECTION_VERTICAL_PADDING =
  "py-16 sm:py-20 lg:py-28";

/** Gap between a section intro label and its body content. */
export const SECTION_STACK_GAP = "gap-8 sm:gap-10";

/** Vertical stack for repeated items inside a section (e.g. feature cards). */
export const SECTION_INNER_STACK = "flex flex-col gap-10 sm:gap-12 lg:gap-14";

/** Section shell : container + internal intro/content rhythm (no section margins). */
export const SECTION_LAYOUT = [
  "flex w-full min-w-0 flex-col",
  SECTION_STACK_GAP,
].join(" ");
