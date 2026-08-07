import Image from "next/image";

export default function ShowcaseCanvas() {
  return (
    <div className="relative flex min-h-0 min-w-0 flex-1 items-center justify-center overflow-hidden bg-brand-bg p-8">
      <Image
        src="/showcase/mount-fuji.jpg"
        alt="Mount Fuji at twilight reflected in a lake with silhouetted reeds in the foreground"
        width={2788}
        height={3717}
        priority
        className="max-h-full max-w-full object-contain drop-shadow-[0_0_1px_rgba(0,0,0,0.6)] drop-shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      />
    </div>
  );
}
