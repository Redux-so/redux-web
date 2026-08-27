import type { ReactNode } from "react";

import {
  PAGE_CONTAINER,
  SECTION_LAYOUT,
} from "@/lib/section-styles";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  children: ReactNode;
  className?: string;
  /** When false, children span full width (e.g. edit showcase marquees). */
  container?: boolean;
  intro?: ReactNode;
};

export default function SectionShell({
  children,
  className,
  container = true,
  intro,
}: SectionShellProps) {
  return (
    <div
      className={cn(
        container && PAGE_CONTAINER,
        SECTION_LAYOUT,
        className,
      )}
    >
      {intro}
      {children}
    </div>
  );
}
