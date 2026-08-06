/**
 * Single icon wrapper for the entire app.
 *
 * Rules:
 *   - Nothing else imports from @untitledui/icons directly.
 *   - size is restricted to 16 | 20 | 24 — no other values.
 *   - strokeWidth defaults to 1.5 everywhere.
 *   - aria-hidden defaults to true (decorative); pass aria-hidden={false} on
 *     icon-only interactive controls that lack a separate visible label.
 */
import type { FC, SVGProps } from "react";
import * as UntitledIcons from "@untitledui/icons";

export type IconName = keyof typeof UntitledIcons;

type UntitledIconComponent = FC<
  SVGProps<SVGSVGElement> & { color?: string; size?: number }
>;

interface IconProps {
  name: IconName;
  /** 16 = dense/inline, 20 = standard (default), 24 = standalone/callout, 48 = empty state */
  size?: 16 | 20 | 24 | 48;
  strokeWidth?: number;
  className?: string;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  className,
  "aria-hidden": ariaHidden = true,
  "aria-label": ariaLabel,
}: IconProps) {
  const IconComponent = UntitledIcons[name] as UntitledIconComponent | undefined;

  if (!IconComponent) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Icon] "${name}" not found in @untitledui/icons`);
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
