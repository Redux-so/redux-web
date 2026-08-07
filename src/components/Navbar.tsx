"use client";

import { Menu01, XClose } from "@untitledui/icons";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";

import { DiscordIcon } from "@/lib/brand-social-icons";

import {
  BTN_OUTLINE_BLOCK,
  BTN_OUTLINE_SOLID,
  BTN_PRIMARY_BLOCK,
  BTN_PRIMARY_SOLID,
} from "@/lib/button-styles";
import { EASE_OUT } from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
] as const;

const PANEL_TRANSITION = { duration: 0.3, ease: EASE_OUT };
const ICON_TRANSITION = { duration: 0.18, ease: EASE_OUT };
const ITEM_TRANSITION = { duration: 0.28, ease: EASE_OUT };

const menuPanelVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/[0.08]",
        "bg-[#0a0a0a]/90 backdrop-blur-xl backdrop-saturate-125",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="inline-flex shrink-0 items-center">
          <Image
            src="/redux-logo.png"
            alt="Redux"
            width={28}
            height={28}
            className="h-7 w-7 shrink-0 object-contain"
            priority
          />
        </a>

        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://discord.gg/gzHrud9nee"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className={cn(BTN_OUTLINE_SOLID, "size-9 shrink-0 p-0 gap-0")}
          >
            <DiscordIcon className="size-[58%] shrink-0" />
          </a>
          <a href="#waitlist" className={`${BTN_PRIMARY_SOLID} shrink-0`}>
            Join Waitlist
          </a>
        </div>

        <button
          type="button"
          className="relative inline-flex size-9 items-center justify-center rounded-lg text-white md:hidden"
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
                <XClose className="size-5" />
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
                <Menu01 className="size-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            key="mobile-menu"
            className="overflow-hidden border-t border-white/[0.08] bg-[#0a0a0a]/90 px-4 pb-4 pt-2 backdrop-blur-xl backdrop-saturate-125 md:hidden"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={panelTransition}
          >
            <motion.div
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
                      className="block rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-3 flex flex-col gap-2">
                <motion.div variants={itemVariants}>
                  <a
                    href="https://discord.gg/gzHrud9nee"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className={`${BTN_OUTLINE_BLOCK} inline-flex items-center justify-center gap-1.5`}
                  >
                    <DiscordIcon className="size-3.5 shrink-0" />
                    Discord
                  </a>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <a href="#waitlist" onClick={closeMobileMenu} className={BTN_PRIMARY_BLOCK}>
                    Join Waitlist
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
