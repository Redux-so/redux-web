import type { ReactNode } from "react";

import { Icon } from "@/components/shared/Icon";
import { UI_CARD, SHOWCASE_FRAME } from "@/lib/ui-surface-styles";
import { cn } from "@/lib/utils";

const FEATURE_PILL_CTA =
  "hero-pill-cta hero-pill-cta--purple hero-pill-cta--nav inline-flex items-center justify-center shrink-0 no-underline";

const BENTO_CARD_BASE = cn("flex h-full flex-col overflow-hidden", UI_CARD);

const SHOWCASE_AREA = cn("relative min-h-0 flex-1 overflow-hidden", SHOWCASE_FRAME);

const sizeClasses = {
  large: {
    card: "min-h-[420px] gap-6 p-5 sm:min-h-[480px] sm:p-6 lg:min-h-[560px] lg:p-8",
    showcase: "min-h-[200px] sm:min-h-[280px] lg:min-h-[320px]",
    headline: "text-xl font-semibold text-balance sm:text-2xl",
  },
  medium: {
    card: "min-h-[340px] gap-5 p-5 sm:min-h-[400px] sm:p-6 lg:min-h-[420px]",
    showcase: "min-h-[180px] sm:min-h-[220px] lg:min-h-[240px]",
    headline: "text-lg font-semibold text-balance sm:text-xl",
  },
} as const;

type FeatureBentoCardProps = {
  size: keyof typeof sizeClasses;
  headline: string;
  description: string;
  cta: string;
  children: ReactNode;
  className?: string;
};

export default function FeatureBentoCard({
  size,
  headline,
  description,
  cta,
  children,
  className,
}: FeatureBentoCardProps) {
  const styles = sizeClasses[size];

  return (
    <article className={cn(BENTO_CARD_BASE, styles.card, className)}>
      <div className="flex min-w-0 flex-col gap-2">
        <h3
          className={cn(
            "m-0 font-display tracking-tight text-white",
            styles.headline,
          )}
        >
          {headline}
        </h3>
        <p className="m-0 text-sm leading-relaxed text-white/55 sm:text-[15px]">
          {description}
        </p>
        <a
          href="#waitlist"
          className={cn(FEATURE_PILL_CTA, "mt-1 w-fit")}
        >
          <span className="leading-none">{cta}</span>
          <Icon
            name="ArrowUpRight"
            size={16}
            strokeWidth={2}
            className="shrink-0 text-white"
            aria-hidden
          />
        </a>
      </div>

      <div className={cn(SHOWCASE_AREA, styles.showcase)}>{children}</div>
    </article>
  );
}
