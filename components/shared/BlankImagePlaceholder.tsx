import type { CSSProperties } from "react";

import { Icon } from "@/components/shared/Icon";
import { cn } from "@/lib/utils";

type BlankImagePlaceholderProps = {
  className?: string;
  iconSize?: 16 | 20 | 24 | 48;
  style?: CSSProperties;
};

export default function BlankImagePlaceholder({
  className,
  iconSize = 20,
  style,
}: BlankImagePlaceholderProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center justify-center border border-white/[0.08] bg-[#2a2a2a]",
        className,
      )}
      style={style}
    >
      <Icon
        name="Image01"
        size={iconSize}
        strokeWidth={1.5}
        className="shrink-0 text-white/35"
      />
    </div>
  );
}
