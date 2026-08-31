import { Icon, type IconName } from "@/components/shared/Icon";
import { UI_CARD, UI_CHIP_ACCENT } from "@/lib/ui-surface-styles";
import { cn } from "@/lib/utils";

type FeatureSmallCardProps = {
  headline: string;
  description: string;
  icon: IconName;
  className?: string;
};

export default function FeatureSmallCard({
  headline,
  description,
  icon,
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
        <h3 className="m-0 font-display text-base font-semibold tracking-tight text-balance text-white sm:text-lg">
          {headline}
        </h3>
        <p className="m-0 text-sm leading-relaxed text-white/55">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center sm:size-14",
          UI_CHIP_ACCENT,
        )}
        aria-hidden
      >
        <Icon
          name={icon}
          size={24}
          strokeWidth={1.75}
          className="text-brand-purple"
        />
      </div>
    </article>
  );
}
