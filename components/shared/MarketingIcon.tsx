import {
  MARKETING_ICON_REGISTRY,
  type MarketingIconName,
} from "@/components/shared/marketing-icon-registry";

interface MarketingIconProps {
  name: MarketingIconName;
  size?: 16 | 20 | 24 | 48;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

export type { MarketingIconName };

export function MarketingIcon({
  name,
  size = 20,
  strokeWidth = 1.5,
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: MarketingIconProps) {
  const IconComponent = MARKETING_ICON_REGISTRY[name];

  if (!IconComponent) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[MarketingIcon] "${name}" not found in marketing icon registry`);
    }
    return null;
  }

  return (
    <IconComponent
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    />
  );
}
