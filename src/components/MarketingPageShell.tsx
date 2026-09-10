import type { ReactNode } from "react";

import Footer from "@/src/components/Footer";
import Navbar, {
  NAV_SCROLL_OFFSET_CLASS,
  NAV_SPACER_CLASS,
} from "@/src/components/Navbar";
import PageGridColumnPublisher from "@/src/components/page-grid/PageGridColumnPublisher";
import { cn } from "@/lib/utils";

const PAGE_GRID_ROOT_CLASS =
  "relative z-10 overflow-x-clip overflow-hidden rounded-b-[2.5rem] bg-brand-bg text-white sm:rounded-b-[3.25rem] lg:rounded-b-[4rem] xl:rounded-b-[5rem]";

type MarketingPageShellProps = {
  children: ReactNode;
  showTopGlow?: boolean;
};

export default function MarketingPageShell({
  children,
  showTopGlow = true,
}: MarketingPageShellProps) {
  return (
    <div
      className="marketing-resize-smooth min-h-full bg-[#040404]"
      data-page-grid-shell
    >
      <Navbar />

      {/*
        Sticky footer reveal: this layer scrolls over the footer (z-10 + solid bg).
        Footer is a sibling with sticky bottom-0 z-0 so it is uncovered at scroll end.
      */}
      <div data-page-grid-root className={PAGE_GRID_ROOT_CLASS}>
        <div aria-hidden className={NAV_SPACER_CLASS} />

        <main className="relative flex min-w-0 flex-col overflow-x-clip">
          <PageGridColumnPublisher />
          {showTopGlow ? (
            <div aria-hidden className="hero-top-glow pointer-events-none" />
          ) : null}
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export function LegalPageSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        NAV_SCROLL_OFFSET_CLASS,
        "relative z-[1] min-h-[calc(100dvh-4rem)] py-16 sm:py-20 lg:py-28",
        className,
      )}
    >
      <div aria-hidden className="hero-top-glow pointer-events-none" />
      {children}
    </section>
  );
}
