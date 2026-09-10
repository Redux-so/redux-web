import type { ReactNode } from "react";

import MarketingPageShell from "@/src/components/MarketingPageShell";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <MarketingPageShell showTopGlow={false}>{children}</MarketingPageShell>
  );
}
