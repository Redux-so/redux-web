"use client";

import { Icon } from "@/components/shared/Icon";

import { SHOWCASE_LIBRARY_GREETING } from "./library-showcase-data";

type LibraryShowcaseHeaderProps = {
  searchValue: string;
  demoMode?: boolean;
};

export default function LibraryShowcaseHeader({
  searchValue,
  demoMode = false,
}: LibraryShowcaseHeaderProps) {
  return (
    <header className="flex shrink-0 flex-col gap-5 px-6 pt-8 pb-5">
      <div className="text-center">
        <h1 className="relative text-[32px] font-medium leading-tight tracking-tight text-white">
          {SHOWCASE_LIBRARY_GREETING}
        </h1>
      </div>

      <div className="relative w-full min-w-0">
        <form
          className="relative flex h-[52px] w-full items-center rounded-xl border border-[#2e2e2e] bg-[#1d1d1d] pl-12 pr-2 transition-colors focus-within:border-[#3a3a3a]"
          onSubmit={(event) => event.preventDefault()}
        >
          <Icon
            name="SearchMd"
            size={20}
            strokeWidth={1.5}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]"
            aria-hidden
          />
          <input
            type="text"
            role="searchbox"
            name="library-search"
            value={searchValue}
            readOnly
            tabIndex={demoMode ? -1 : undefined}
            aria-label="Search photos by keyword, color, scene, or mood"
            className="relative z-[2] min-w-0 flex-1 bg-transparent pr-2 text-[14px] text-white outline-none"
          />
          <span
            className="relative flex h-10 w-10 shrink-0 items-center justify-center text-[#888888]"
            aria-hidden
          >
            <Icon name="FilterFunnel02" size={20} strokeWidth={1.5} />
          </span>
        </form>
      </div>
    </header>
  );
}
