import { BLUEPRINT_FRAME, BLUEPRINT_MAX_WIDTH } from "@/lib/blueprint-grid";
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
        "mx-auto w-full border-x border-b",
        BLUEPRINT_MAX_WIDTH,
        BLUEPRINT_FRAME,
        className,
      )}
    >
      {children}
    </div>
  );
}
