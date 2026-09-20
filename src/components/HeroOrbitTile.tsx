import Image from "next/image";

import BlankImagePlaceholder from "@/components/shared/BlankImagePlaceholder";
import type { AppImageSrc } from "@/lib/image-src";
import { cn } from "@/lib/utils";

const ORBIT_TILE_RADIUS_CLASS = "rounded-[6px]";

const ORBIT_TILE_SIZES =
  "(max-width: 640px) 104px, 120px";

type HeroOrbitTileProps = {
  className?: string;
  src?: AppImageSrc | null;
  /** Rendered tile edge length in CSS pixels (matches orbit iconSize). */
  tileSize: number;
};

export default function HeroOrbitTile({
  className,
  src,
  tileSize,
}: HeroOrbitTileProps) {
  return (
    <div
      className={cn(
        "relative size-full overflow-hidden bg-brand-surface-card",
        ORBIT_TILE_RADIUS_CLASS,
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          aria-hidden
          width={tileSize}
          height={tileSize}
          className={cn("size-full object-cover", ORBIT_TILE_RADIUS_CLASS)}
          sizes={ORBIT_TILE_SIZES}
          draggable={false}
        />
      ) : (
        <BlankImagePlaceholder
          className={cn("size-full", ORBIT_TILE_RADIUS_CLASS)}
          iconSize={16}
        />
      )}
    </div>
  );
}
