import { cn } from "@/lib/utils";

type DotGridBackgroundProps = {
  className?: string;
  /** Full tile field, or radial fade like the FAQ heading dots. */
  variant?: "full" | "spotlight";
};

export default function DotGridBackground({
  className,
  variant = "full",
}: DotGridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "dot-grid-texture pointer-events-none",
        variant === "spotlight" && "dot-grid-texture--spotlight",
        className,
      )}
    />
  );
}
