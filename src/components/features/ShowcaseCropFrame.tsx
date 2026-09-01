"use client";

import { useEffect, useRef, useState } from "react";

import EditorShowcase, {
  type EditorShowcaseScenario,
} from "@/src/components/editor-showcase/EditorShowcase";
import {
  computeChatCropLayout,
  type CropVerticalAnchor,
  type ShowcaseCropLayout,
} from "@/src/components/editor-showcase/showcase-crop-layout";
import {
  SHOWCASE_DESIGN_HEIGHT,
  SHOWCASE_DESIGN_WIDTH,
} from "@/src/components/editor-showcase/showcase-layout";

type ShowcaseCropFrameProps = {
  scenario?: EditorShowcaseScenario;
  chatAutoScrollActive?: boolean;
  verticalAnchor?: CropVerticalAnchor;
  ariaLabel: string;
};

export default function ShowcaseCropFrame({
  scenario = "default",
  chatAutoScrollActive = false,
  verticalAnchor = "center",
  ariaLabel,
}: ShowcaseCropFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState<ShowcaseCropLayout>(() =>
    computeChatCropLayout(0, 0, { verticalAnchor }),
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;

    const updateLayout = () => {
      const { width, height } = container.getBoundingClientRect();
      setLayout(computeChatCropLayout(width, height, { verticalAnchor }));
    };

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateLayout);
    });

    observer.observe(container);
    updateLayout();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [verticalAnchor]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-[#161616]"
      aria-label={ariaLabel}
    >
      <div className="pointer-events-none relative h-full w-full overflow-hidden">
        <div
          className="absolute overflow-hidden"
          style={{
            width: layout.scaledWidth,
            height: layout.scaledHeight,
            left: layout.offsetX,
            top: layout.offsetY,
          }}
        >
          <div
            className="origin-top-left will-change-transform"
            style={{
              width: SHOWCASE_DESIGN_WIDTH,
              height: SHOWCASE_DESIGN_HEIGHT,
              transform: `scale(${layout.scale})`,
            }}
          >
            <EditorShowcase
              demoMode
              scenario={scenario}
              chatAutoScrollActive={chatAutoScrollActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
