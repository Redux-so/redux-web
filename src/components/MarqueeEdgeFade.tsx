import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Same 10% / 90% zones as the original hero photo marquee mask. */
const EDGE_FADE_WIDTH =
  "w-[10%] min-w-[2.5rem] max-w-[5rem]";

type MarqueeEdgeFadeProps = {
  children: ReactNode;
  className?: string;
};

export default function MarqueeEdgeFade({
  children,
  className,
}: MarqueeEdgeFadeProps) {
  return (
    <div className={cn("relative isolate w-full", className)}>
      <div className="overflow-x-clip">{children}</div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 h-full",
          EDGE_FADE_WIDTH,
          "bg-gradient-to-r from-brand-bg to-transparent",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 h-full",
          EDGE_FADE_WIDTH,
          "bg-gradient-to-l from-brand-bg to-transparent",
        )}
      />
    </div>
  );
}
