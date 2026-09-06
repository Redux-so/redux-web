"use client";

import Image from "next/image";
import Link from "next/link";

import { Icon, type IconName } from "@/components/shared/Icon";
import { DiscordIcon, GithubIcon } from "@/lib/brand-social-icons";
import {
  LIBRARY_PANEL_SURFACE,
  LIBRARY_SIDEBAR_BTN_ACTIVE,
  LIBRARY_SIDEBAR_BTN_IDLE,
  LIBRARY_SIDEBAR_BTN_ROW,
  LIBRARY_SIDEBAR_LINK_ROW,
  LIBRARY_SIDEBAR_PROFILE_BTN,
} from "@/lib/library-sidebar";
import { SURFACE_BORDER } from "@/lib/surface-colors";

import {
  SHOWCASE_LIBRARY_ALBUMS,
} from "./library-showcase-data";
import { LIBRARY_SHOWCASE_SIDEBAR_WIDTH } from "./library-showcase-layout";

const SECTION_LABEL =
  "text-xs font-semibold uppercase tracking-wide text-[#888888]";

const QUICK_FILTERS: { id: string; label: string; icon: IconName }[] = [
  { id: "all", label: "All Photos", icon: "Grid01" },
  { id: "recent", label: "Recently Added", icon: "Clock" },
  { id: "favorites", label: "Favorites", icon: "Heart" },
];

type LibraryShowcaseSidebarProps = {
  demoMode?: boolean;
};

export default function LibraryShowcaseSidebar({
  demoMode = false,
}: LibraryShowcaseSidebarProps) {
  return (
    <aside
      className={`flex h-full shrink-0 flex-col overflow-hidden rounded-r-2xl border-r ${LIBRARY_PANEL_SURFACE}`}
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
                  LIBRARY_SIDEBAR_BTN_ROW,
                  isActive ? LIBRARY_SIDEBAR_BTN_ACTIVE : LIBRARY_SIDEBAR_BTN_IDLE,
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
          <span className={[LIBRARY_SIDEBAR_BTN_ROW, LIBRARY_SIDEBAR_BTN_IDLE].join(" ")}>
            <Icon name="Trash04" size={16} className="text-[#888888]" aria-hidden />
            Trash
          </span>
        </nav>

        <p className={`mt-5 mb-2 px-5 ${SECTION_LABEL}`}>Albums</p>
        <div className="flex flex-col gap-0.5 px-3">
          {SHOWCASE_LIBRARY_ALBUMS.map((album) => (
            <span
              key={album.id}
              className={[LIBRARY_SIDEBAR_BTN_ROW, LIBRARY_SIDEBAR_BTN_IDLE].join(" ")}
            >
              <Icon name="Folder" size={16} className="text-[#888888]" aria-hidden />
              {album.name}
            </span>
          ))}
        </div>
      </div>

      <div className={`mt-auto shrink-0 border-t ${SURFACE_BORDER} px-4 py-4`}>
        <nav className="flex flex-col gap-0.5">
          <span className={LIBRARY_SIDEBAR_LINK_ROW}>
            <GithubIcon className="h-4 w-4 shrink-0 text-[#888888] group-hover:text-white" />
            <span className="min-w-0 truncate">GitHub</span>
          </span>
          <span className={LIBRARY_SIDEBAR_LINK_ROW}>
            <DiscordIcon className="h-4 w-4 shrink-0 text-[#888888] group-hover:text-white" />
            <span className="min-w-0 truncate">Discord</span>
          </span>
        </nav>

        <div className={`mt-3 ${LIBRARY_SIDEBAR_PROFILE_BTN}`}>
          <div className={`h-[40px] w-[40px] shrink-0 rounded-full ${SURFACE_BORDER} bg-[#1d1d1d]`} />
          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-[14px] font-medium leading-[1.3] text-white">
              John
            </p>
            <p className="truncate text-[12px] leading-[1.3] text-[#888888]">
              levi@redux.so
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
