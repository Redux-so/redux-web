"use client";

import Image from "next/image";

import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XSocialIcon,
} from "@/lib/brand-social-icons";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { SECTION_DIVIDE } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    label: "X",
    href: "https://x.com/tryredux",
    icon: XSocialIcon,
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tryredux/",
    icon: InstagramIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tryredux",
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "Discord",
    href: "https://discord.gg/gzHrud9nee",
    icon: DiscordIcon,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/Redux-so",
    icon: GithubIcon,
    external: true,
  },
] as const;

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "mailto:admin@redux.so" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
] as const;

export default function Footer() {
  return (
    <footer className={cn(SECTION_DIVIDE, "bg-[#050505]")}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <ScrollRevealGroup
          className="flex flex-col gap-10 lg:flex-row lg:justify-between"
          stagger={0.1}
        >
          <ScrollRevealItem className="flex max-w-sm flex-col items-start gap-5">
            <Image
              src="/redux-logo.png"
              alt="Redux"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <p className="text-sm leading-relaxed text-white/60">
              Organize, edit, and export photos, all from your browser
            </p>
            <div className="flex items-center justify-start gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={"external" in social && social.external ? "_blank" : undefined}
                  rel={
                    "external" in social && social.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-white/50 transition-colors hover:text-white"
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
          </ScrollRevealItem>

          <ScrollRevealItem>
            <div className="flex gap-16 sm:gap-24">
              <div>
                <p className="text-sm font-medium text-white">Navigation</p>
                <ul className="mt-4 space-y-3">
                  {navigationLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-white">Legal</p>
                <ul className="mt-4 space-y-3">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollRevealItem>
        </ScrollRevealGroup>
      </div>

      <ScrollReveal variant="fadeIn">
        <div className="border-t border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-sm text-white/50">
              © Redux 2026. All rights reserved.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
