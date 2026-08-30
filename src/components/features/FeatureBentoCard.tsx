import type { ReactNode } from "react";

import { Icon } from "@/components/shared/Icon";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

const BENTO_CARD_BASE =
  "flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-brand-surface-card";

const SHOWCASE_FRAME =
  "relative min-h-0 flex-1 overflow-hidden rounded-xl border border-white/[0.06] bg-brand-bg";

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
          className={cn(
            BTN_PRIMARY_SOLID,
            "mt-1 w-fit shrink-0 gap-1 px-3.5 leading-none",
          )}
        >
          <span className="leading-none">{cta}</span>
          <Icon name="ArrowUpRight" size={16} className="shrink-0" aria-hidden />
        </a>
      </div>

      <div className={cn(SHOWCASE_FRAME, styles.showcase)}>{children}</div>
    </article>
  );
}
