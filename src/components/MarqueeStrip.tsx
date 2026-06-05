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
    <section className="border-y border-white/[0.08] bg-brand-surface py-9 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm text-white/70 sm:mb-10 sm:text-base">
          Inspired by workflows from
        </p>

        <div className="w-full overflow-hidden">
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
