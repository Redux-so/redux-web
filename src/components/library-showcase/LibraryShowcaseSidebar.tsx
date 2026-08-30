"use client";

import Image from "next/image";
import Link from "next/link";

import { Icon, type IconName } from "@/components/shared/Icon";
import { DiscordIcon, GithubIcon } from "@/lib/brand-social-icons";
import { SURFACE_BG_PANEL, SURFACE_BORDER } from "@/lib/surface-colors";

import {
  SHOWCASE_LIBRARY_ALBUMS,
  type LibraryShowcaseImage,
} from "./library-showcase-data";
import { LIBRARY_SHOWCASE_SIDEBAR_WIDTH } from "./library-showcase-layout";

const SECTION_LABEL =
  "text-xs font-semibold uppercase tracking-wide text-[#888888]";

const QUICK_FILTERS: { id: string; label: string; icon: IconName }[] = [
  { id: "all", label: "All Photos", icon: "Grid01" },
  { id: "recent", label: "Recently Added", icon: "Clock" },
  { id: "favorites", label: "Favorites", icon: "Heart" },
];

const SIDEBAR_BTN_ROW =
  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-[13px] font-medium border border-[#101010] transition-colors";
const SIDEBAR_BTN_IDLE =
  "text-[#888888] hover:bg-[#1a1a1a] hover:text-white";
const SIDEBAR_BTN_ACTIVE =
  "bg-[#1a1a1a] !border-[#2a2a2a] text-white";

type LibraryShowcaseSidebarProps = {
  demoMode?: boolean;
};

export default function LibraryShowcaseSidebar({
  demoMode = false,
}: LibraryShowcaseSidebarProps) {
  return (
    <aside
      className={`flex h-full shrink-0 flex-col overflow-hidden rounded-r-2xl border-r ${SURFACE_BORDER} ${SURFACE_BG_PANEL}`}
      style={{ width: LIBRARY_SHOWCASE_SIDEBAR_WIDTH }}
    >
      <div className="shrink-0">
        <div className="flex items-center px-5 pt-4 pb-0">
          {demoMode ? (
            <span className="inline-flex items-center">
              <Image
                src="/redux-logo.png"
                alt="Redux"
                width={88}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </span>
          ) : (
            <Link href="/library" className="inline-flex items-center no-underline">
              <Image
                src="/redux-logo.png"
                alt="Redux"
                width={88}
                height={24}
                className="h-6 w-auto"
                priority
              />
            </Link>
          )}
        </div>

        <p className={`mt-3 mb-3 px-5 ${SECTION_LABEL}`}>Library</p>

        <nav
          aria-label="Library quick filters"
          className="flex flex-col gap-0.5 px-3"
        >
          {QUICK_FILTERS.map((option) => {
            const isActive = option.id === "all";
            return (
              <span
                key={option.id}
                className={[
                  SIDEBAR_BTN_ROW,
                  isActive ? SIDEBAR_BTN_ACTIVE : SIDEBAR_BTN_IDLE,
                ].join(" ")}
              >
                <Icon
                  name={option.icon}
                  size={16}
                  className={isActive ? "text-white" : "text-[#888888]"}
                  aria-hidden
                />
                {option.label}
              </span>
            );
          })}
        </nav>

        <p className={`mt-5 mb-2 px-5 ${SECTION_LABEL}`}>Albums</p>
        <div className="flex flex-col gap-0.5 px-3">
          {SHOWCASE_LIBRARY_ALBUMS.map((album) => (
            <span
              key={album.id}
              className={[SIDEBAR_BTN_ROW, SIDEBAR_BTN_IDLE].join(" ")}
            >
              <Icon name="Folder" size={16} className="text-[#888888]" aria-hidden />
              {album.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto shrink-0 px-4 pb-4 pt-6">
        <div className="flex flex-col gap-0.5">
          <span className={[SIDEBAR_BTN_ROW, SIDEBAR_BTN_IDLE].join(" ")}>
            <GithubIcon className="h-4 w-4 shrink-0" />
            GitHub
          </span>
          <span className={[SIDEBAR_BTN_ROW, SIDEBAR_BTN_IDLE].join(" ")}>
            <DiscordIcon className="h-4 w-4 shrink-0" />
            Discord
          </span>
        </div>

        <div className="mt-3 flex min-w-0 items-center gap-2.5 rounded-lg border border-[#101010] px-1.5 py-1.5">
          <div className="h-8 w-8 shrink-0 rounded-md border border-[#2a2a2a] bg-[#1a1a1a]" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-white">Levi</p>
            <p className="truncate text-[11px] text-[#888888]">levi@redux.so</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
