import { EDIT_SHOWCASE_TOP_ROW } from "@/src/components/edit-showcase/edit-showcase-data";

export default function EditShowcasePreload() {
  return (
    <>
      {EDIT_SHOWCASE_TOP_ROW.slice(0, 3).map((photo) => (
        <link
          key={photo.src}
          rel="preload"
          as="image"
          href={photo.src}
          type="image/webp"
        />
      ))}
    </>
  );
}
