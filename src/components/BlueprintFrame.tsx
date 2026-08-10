import { BLUEPRINT_FRAME } from "@/lib/blueprint-grid";
import { cn } from "@/lib/utils";

type BlueprintFrameProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BlueprintFrame({
  children,
  className,
}: BlueprintFrameProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-6xl border",
        BLUEPRINT_FRAME,
        className,
      )}
    >
      {children}
    </div>
  );
}
