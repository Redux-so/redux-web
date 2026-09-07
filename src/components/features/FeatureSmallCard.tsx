import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/shared/Icon";
import { UI_CARD, UI_CHIP_ACCENT } from "@/lib/ui-surface-styles";
import { cn } from "@/lib/utils";

type FeatureSmallCardProps = {
  headline: string;
  description: string;
  icon?: IconName;
  trailing?: ReactNode;
  topRightLabel?: string;
  className?: string;
};

export default function FeatureSmallCard({
  headline,
  description,
  icon,
  trailing,
  topRightLabel,
  className,
}: FeatureSmallCardProps) {
  return (
    <article
      className={cn(
        "flex h-full min-w-0 flex-col items-start justify-between gap-4 overflow-hidden p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6",
        UI_CARD,
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
          <h3 className="m-0 font-display text-base font-semibold tracking-tight text-balance text-white sm:text-lg">
            {headline}
          </h3>
          {topRightLabel ? (
            <span className="shrink-0 text-xs text-neutral-500">{topRightLabel}</span>
          ) : null}
        </div>
        <p className="m-0 text-sm leading-relaxed text-white/55">
          {description}
        </p>
      </div>

      {trailing ?? (
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center sm:size-14",
            UI_CHIP_ACCENT,
          )}
          aria-hidden
        >
          {icon ? (
            <Icon
              name={icon}
              size={24}
              strokeWidth={1.75}
              className="text-brand-purple"
            />
          ) : null}
        </div>
      )}
    </article>
  );
}
