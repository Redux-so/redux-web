import Image from "next/image";

import {
  SHOWCASE_CANVAS_ALT,
  SHOWCASE_CANVAS_HEIGHT,
  SHOWCASE_CANVAS_IMAGE,
  SHOWCASE_CANVAS_WIDTH,
} from "./showcase-data";

type ShowcaseCanvasProps = {
  imageFilter?: string;
};

export default function ShowcaseCanvas({ imageFilter }: ShowcaseCanvasProps) {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden bg-[#161616] p-8">
      <Image
        src={SHOWCASE_CANVAS_IMAGE}
        alt={SHOWCASE_CANVAS_ALT}
        width={SHOWCASE_CANVAS_WIDTH}
        height={SHOWCASE_CANVAS_HEIGHT}
        unoptimized
        className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-[0_0_1px_rgba(0,0,0,0.6)] drop-shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        style={imageFilter ? { filter: imageFilter } : undefined}
        sizes="(max-width: 768px) 100vw, 448px"
        draggable={false}
      />
    </div>
  );
}
