import { cn } from "@/lib/utils";
import { UI_CARD, SHOWCASE_FRAME } from "@/lib/ui-surface-styles";
import { PAGE_CONTAINER, SECTION_LAYOUT } from "@/lib/section-styles";

const PLACEHOLDER_SURFACE = cn(
  UI_CARD,
  "animate-pulse bg-[linear-gradient(180deg,#131313_0%,#0c0c0c_100%)]",
);

/** Editor showcase scaler shell (matches bento large showcase min-heights). */
export function EditorShowcaseSectionPlaceholder() {
  return (
    <div className={cn(PAGE_CONTAINER, SECTION_LAYOUT)}>
      <div
        className={cn(
          PLACEHOLDER_SURFACE,
          "min-h-[280px] w-full sm:min-h-[360px] lg:min-h-[420px]",
          SHOWCASE_FRAME,
        )}
        aria-hidden
      />
    </div>
  );
}

type BentoShowcasePlaceholderProps = {
  size: "large" | "medium";
};

export function BentoShowcasePlaceholder({ size }: BentoShowcasePlaceholderProps) {
  return (
    <div
      className={cn(
        PLACEHOLDER_SURFACE,
        SHOWCASE_FRAME,
        size === "large"
          ? "min-h-[200px] w-full sm:min-h-[280px] lg:min-h-[320px]"
          : "min-h-[180px] w-full sm:min-h-[220px] lg:min-h-[240px]",
      )}
      aria-hidden
    />
  );
}

/** Auto enhance slider footprint in FeatureSmallCard. */
export function AutoEnhancePlaceholder() {
  return (
    <div
      className={cn(
        PLACEHOLDER_SURFACE,
        "h-[5.75rem] w-[9.25rem] shrink-0 rounded-2xl sm:h-[6rem] sm:w-[10rem] md:w-[10.5rem]",
      )}
      aria-hidden
    />
  );
}

/** Conversational editing chat demo (medium bento, bare showcase). */
export function ConversationalEditingPlaceholder() {
  return (
    <div
      className={cn(
        PLACEHOLDER_SURFACE,
        "mx-auto min-h-[6.5rem] w-full max-w-[min(100%,29rem)] rounded-md",
      )}
      aria-hidden
    />
  );
}

/** Edit showcase dual marquee rows. */
export function EditShowcaseMarqueePlaceholder() {
  return (
    <div className="flex w-full flex-col gap-3 sm:gap-4" aria-hidden>
      <div className={cn(PLACEHOLDER_SURFACE, "h-[11.5rem] w-full sm:h-[13rem]")} />
      <div className={cn(PLACEHOLDER_SURFACE, "h-[11.5rem] w-full sm:h-[13rem]")} />
    </div>
  );
}

/** Toolkit marquee lane beside headline. */
export function ToolkitMarqueePlaceholder() {
  return (
    <div
      className={cn(PLACEHOLDER_SURFACE, "min-h-[12rem] w-full lg:min-h-[14rem]")}
      aria-hidden
    />
  );
}
