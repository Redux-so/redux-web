import Image from "next/image";

import BlankImagePlaceholder from "@/components/shared/BlankImagePlaceholder";
import { cn } from "@/lib/utils";

const TILE_RADIUS_PX = 6;

const ORBIT_TILE_SIZES =
  "(max-width: 640px) 104px, 120px";

type HeroOrbitTileProps = {
  className?: string;
  src?: string | null;
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
        className,
      )}
      style={{ borderRadius: TILE_RADIUS_PX }}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          aria-hidden
          width={tileSize}
          height={tileSize}
          className="size-full object-cover"
          style={{ borderRadius: TILE_RADIUS_PX }}
          sizes={ORBIT_TILE_SIZES}
          draggable={false}
        />
      ) : (
        <BlankImagePlaceholder
          className="size-full"
          iconSize={16}
          style={{ borderRadius: TILE_RADIUS_PX }}
        />
      )}
    </div>
  );
}
