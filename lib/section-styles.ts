export const SECTION_DIVIDE = "";

/** Shared max-width and horizontal padding — aligns with navbar content edges. */
export const SITE_CONTAINER =
  "mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-12";

export const PAGE_CONTAINER = SITE_CONTAINER;

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
  "flex w-full flex-col",
  SECTION_STACK_GAP,
].join(" ");
