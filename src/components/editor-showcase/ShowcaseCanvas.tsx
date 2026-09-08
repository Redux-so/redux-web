import BlankImagePlaceholder from "@/components/shared/BlankImagePlaceholder";

type ShowcaseCanvasProps = {
  imageFilter?: string;
};

export default function ShowcaseCanvas({ imageFilter }: ShowcaseCanvasProps) {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden bg-[#161616] p-8">
      <BlankImagePlaceholder
        className="aspect-[4/3] max-h-full w-full max-w-md rounded-md drop-shadow-[0_0_1px_rgba(0,0,0,0.6)] drop-shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        iconSize={48}
        style={imageFilter ? { filter: imageFilter } : undefined}
      />
    </div>
  );
}
