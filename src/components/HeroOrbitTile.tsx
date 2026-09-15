import Image from "next/image";

import BlankImagePlaceholder from "@/components/shared/BlankImagePlaceholder";
import { cn } from "@/lib/utils";

const TILE_RADIUS_PX = 6;

type HeroOrbitTileProps = {
  alt?: string;
  className?: string;
  src?: string | null;
};

export default function HeroOrbitTile({
  alt = "",
  className,
  src,
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
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          style={{ borderRadius: TILE_RADIUS_PX }}
          sizes="(max-width: 640px) 96px, 120px"
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
