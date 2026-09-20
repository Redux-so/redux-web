import type { FC, SVGProps } from "react";
import {
  ArrowNarrowDown,
  ArrowNarrowRight,
  ArrowUpRight,
  Image01,
  Menu01,
  Minus,
  Plus,
  XClose,
} from "@untitledui/icons";

type UntitledIconComponent = FC<
  SVGProps<SVGSVGElement> & { color?: string; size?: number }
>;

export const MARKETING_ICON_REGISTRY = {
  ArrowNarrowDown,
  ArrowNarrowRight,
  ArrowUpRight,
  Image01,
  Menu01,
  Minus,
  Plus,
  XClose,
} satisfies Record<string, UntitledIconComponent>;

export type MarketingIconName = keyof typeof MARKETING_ICON_REGISTRY;
