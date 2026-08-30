"use client";

import { Menu01, XClose } from "@untitledui/icons";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";

import { DiscordIcon } from "@/lib/brand-social-icons";

import {
  BTN_OUTLINE_BLOCK,
} from "@/lib/button-styles";
import { PAGE_GRID_ALIGNED_FRAME } from "@/lib/section-styles";
import { EASE_OUT } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const NAV_GRID_FRAME = cn(PAGE_GRID_ALIGNED_FRAME, "px-2 sm:px-3");

const NAV_CONTAINER = cn(
  NAV_GRID_FRAME,
  "grid h-[3.75rem] min-w-0 grid-cols-[1fr_auto] items-center gap-2 overflow-visible sm:h-16 sm:grid-cols-[1fr_auto_1fr] sm:gap-4",
);

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Scroll margin for in-page anchor targets below the fixed nav bar. */
export const NAV_SCROLL_OFFSET_CLASS = "scroll-mt-[3.75rem] sm:scroll-mt-16";

/** Reserves space for the fixed nav bar. */
export const NAV_SPACER_CLASS = "h-[3.75rem] shrink-0 sm:h-16";

const NAV_FIXED = cn(
  "fixed inset-x-0 top-0 z-50 overflow-visible",
  "bg-brand-bg/90 backdrop-blur-md backdrop-saturate-150",
);

const NAV_LOGO_HEIGHT_CLASS = "h-5 sm:h-6";
const NAV_LOGO_INTRINSIC_WIDTH = 471;
const NAV_LOGO_INTRINSIC_HEIGHT = 117;

const NAV_WAITLIST_CTA = cn(
  "hero-pill-cta hero-pill-cta--purple hero-pill-cta--nav inline-flex items-center justify-center shrink-0 no-underline",
);

const PANEL_TRANSITION = { duration: 0.3, ease: EASE_OUT };
const ICON_TRANSITION = { duration: 0.18, ease: EASE_OUT };
const ITEM_TRANSITION = { duration: 0.28, ease: EASE_OUT };

const menuPanelVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const menuPanelReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const menuListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const menuListReducedVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: ITEM_TRANSITION,
  },
};

const menuItemReducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.15 },
  },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const closeMobileMenu = () => setMobileOpen(false);

  const scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", "#home");
    closeMobileMenu();
  };

  const panelVariants = prefersReducedMotion
    ? menuPanelReducedVariants
    : menuPanelVariants;
  const itemVariants = prefersReducedMotion
    ? menuItemReducedVariants
    : menuItemVariants;
  const panelTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : PANEL_TRANSITION;

  return (
    <header className={NAV_FIXED}>
      <div className={cn(NAV_CONTAINER)}>
        <a
          href="#home"
          onClick={scrollToTop}
          className="group relative z-10 inline-flex h-[34px] shrink-0 items-center justify-self-start rounded-md"
          aria-label="Back to top"
        >
          <Image
            src="/redux-logo-text.png"
            alt="Redux"
            width={NAV_LOGO_INTRINSIC_WIDTH}
            height={NAV_LOGO_INTRINSIC_HEIGHT}
            className={cn(
              NAV_LOGO_HEIGHT_CLASS,
              "w-auto shrink-0 origin-left object-contain object-left transition-[filter] duration-200 group-hover:brightness-75",
            )}
            priority
          />
        </a>

        <nav
          className="hidden items-center justify-self-center gap-6 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-white/55 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-4">
          <a
            href="https://discord.gg/gzHrud9nee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="hidden shrink-0 text-white transition-colors hover:text-white/80 md:inline-flex md:items-center md:justify-center"
          >
            <DiscordIcon className="size-5 shrink-0" />
          </a>
          <a
            href="#waitlist"
            className={NAV_WAITLIST_CTA}
          >
            Join Waitlist
          </a>
          <button
            type="button"
            className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  className="absolute inset-0 inline-flex items-center justify-center"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, rotate: -90 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, rotate: 0 }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, rotate: 90 }
                  }
                  transition={ICON_TRANSITION}
                >
                  <XClose className="size-[18px]" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  className="absolute inset-0 inline-flex items-center justify-center"
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, rotate: 90 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { opacity: 1, rotate: 0 }
                  }
                  exit={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, rotate: -90 }
                  }
                  transition={ICON_TRANSITION}
                >
                  <Menu01 className="size-[18px]" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            key="mobile-menu"
            className="overflow-hidden border-t border-white/10 md:hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={panelTransition}
          >
            <motion.div
              className={cn(NAV_GRID_FRAME, "py-3.5")}
              variants={
                prefersReducedMotion ? menuListReducedVariants : menuListVariants
              }
              initial="hidden"
              animate="visible"
            >
              <nav
                className="flex flex-col gap-1"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <a
                      href={link.href}
                      className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-white/55 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-3">
                <motion.div variants={itemVariants}>
                  <a
                    href="https://discord.gg/gzHrud9nee"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className={`${BTN_OUTLINE_BLOCK} inline-flex w-full items-center justify-center gap-1.5`}
                  >
                    <DiscordIcon className="size-4 shrink-0" />
                    Discord
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
