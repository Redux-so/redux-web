import Image from "next/image";

import type { LibraryShowcaseImage } from "./library-showcase-data";

type LibraryShowcasePhotoCardProps = {
  image: LibraryShowcaseImage;
};

export default function LibraryShowcasePhotoCard({
  image,
}: LibraryShowcasePhotoCardProps) {
  return (
    <div className="relative aspect-square w-full min-w-0 overflow-hidden rounded-xl bg-white/[0.03]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        unoptimized
        sizes="160px"
        className="object-cover"
      />
    </div>
  );
}
