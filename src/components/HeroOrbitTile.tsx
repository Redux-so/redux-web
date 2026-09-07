import Image from "next/image";

import { Icon } from "@/components/shared/Icon";
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
        <div className="flex size-full items-center justify-center">
          <Icon
            name="Image01"
            size={16}
            strokeWidth={1.5}
            className="size-3 text-white/30"
            aria-hidden
          />
        </div>
      )}
    </div>
  );
}
