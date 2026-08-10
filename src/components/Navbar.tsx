"use client";

import { Menu01, XClose } from "@untitledui/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";

import { DiscordIcon } from "@/lib/brand-social-icons";

import {
  BTN_OUTLINE_BLOCK,
  BTN_OUTLINE_SOLID,
  BTN_PRIMARY_SOLID,
} from "@/lib/button-styles";
import { BLUEPRINT_FRAME, BLUEPRINT_MAX_WIDTH, BLUEPRINT_PAGE_INSET } from "@/lib/blueprint-grid";
import { EASE_OUT } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Scroll margin for in-page anchor targets below the fixed nav bar. */
export const NAV_SCROLL_OFFSET_CLASS = "scroll-mt-[3.75rem] sm:scroll-mt-16";

/** Reserves space for the fixed nav bar row inside the blueprint frame. */
export const NAV_SPACER_CLASS = "h-[3.75rem] shrink-0 sm:h-16";

/** Matches `main` horizontal inset so the bar aligns with BlueprintFrame. */
const NAV_FIXED_INSET = cn(
  "fixed inset-x-0 top-0 z-50",
  BLUEPRINT_PAGE_INSET,
);

const NAV_SHELL_SOLID = "bg-[#161616]";
const NAV_SHELL_GLASS = "bg-[#161616]/75 backdrop-blur-md";
const NAV_SHELL_TRANSITION =
  "transition-[background-color,backdrop-filter] duration-200";

/** Shared action button height in the desktop nav bar. */
const NAV_ACTION_HEIGHT =
  "!h-[34px] !min-h-[34px] !max-h-[34px] shrink-0 leading-none";

/** Square icon button — width matches height exactly. */
const NAV_ICON_BUTTON_SIZE =
  "!size-[34px] !min-h-[34px] !min-w-[34px] !max-h-[34px] !max-w-[34px] shrink-0";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 0);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const navShellClass = isScrolled ? NAV_SHELL_GLASS : NAV_SHELL_SOLID;

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
    <header className={NAV_FIXED_INSET}>
      <div
        className={cn(
          "mx-auto w-full border",
          BLUEPRINT_MAX_WIDTH,
          BLUEPRINT_FRAME,
          NAV_SHELL_TRANSITION,
          navShellClass,
        )}
      >
      <div className="relative flex w-full items-center justify-between gap-4 px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
        <a
          href="#home"
          onClick={scrollToTop}
          className="group inline-flex shrink-0 items-center rounded-md"
          aria-label="Back to top"
        >
          <Image
            src="/redux-logo.png"
            alt="Redux"
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 object-contain transition-[filter] duration-200 group-hover:brightness-75"
            priority
          />
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href="https://discord.gg/gzHrud9nee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className={cn(
              BTN_OUTLINE_SOLID,
              NAV_ICON_BUTTON_SIZE,
              "hidden !p-0 md:inline-flex",
            )}
          >
            <DiscordIcon className="size-[18px] shrink-0" />
          </a>
          <a
            href="#waitlist"
            className={cn(
              BTN_PRIMARY_SOLID,
              NAV_ACTION_HEIGHT,
              "px-3.5 text-sm",
            )}
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
            className={cn(
              "overflow-hidden border-t border-[#2e2e2e] md:hidden",
              NAV_SHELL_TRANSITION,
              navShellClass,
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={panelTransition}
          >
            <motion.div
              className="px-4 py-3.5 sm:px-6"
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
                      className="block rounded-lg px-3 py-2.5 text-[15px] text-white/70 transition-colors hover:bg-white/5 hover:text-white"
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
      </div>
    </header>
  );
}
