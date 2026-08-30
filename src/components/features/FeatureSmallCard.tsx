import { Icon, type IconName } from "@/components/shared/Icon";
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
        "flex h-full items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-brand-surface-card p-5 sm:gap-6 sm:p-6",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="m-0 font-display text-base font-semibold tracking-tight text-white sm:text-lg">
          {headline}
        </h3>
        <p className="m-0 text-sm leading-relaxed text-white/55">
          {description}
        </p>
      </div>

      <div
        className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-brand-purple/25 bg-brand-purple/10 sm:size-14 sm:rounded-2xl"
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
