import { Fragment } from "react";

const marqueeItems = [
  "Adobe Photoshop",
  "Adobe Lightroom",
  "Luminar Neo",
  "Canva",
  "Figma",
] as const;

const duplicatedItems = [...marqueeItems, ...marqueeItems];

export default function MarqueeStrip() {
  return (
    <section className="border-y border-white/[0.08] bg-brand-surface py-6">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <p className="shrink-0 text-sm text-white/70 sm:text-base">
          Inspired by workflows from
        </p>

        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className="animate-marquee flex items-center gap-8 whitespace-nowrap"
            style={{ width: "max-content" }}
          >
            {duplicatedItems.map((item, index) => (
              <Fragment key={`${item}-${index}`}>
                {index > 0 ? (
                  <span className="text-white/30" aria-hidden="true">
                    ·
                  </span>
                ) : null}
                <span className="text-sm text-white/90 sm:text-base">
                  {item}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
