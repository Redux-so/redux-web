"use client";

import Image from "next/image";

import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XSocialIcon,
} from "@/lib/brand-social-icons";
import { blueprintCol } from "@/lib/blueprint-grid";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
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
    <footer>
      <ScrollRevealGroup
        className="grid grid-cols-1 lg:grid-cols-4"
        stagger={0.1}
      >
        <ScrollRevealItem
          className={cn(blueprintCol, "flex flex-col items-start gap-5 px-6 py-10 sm:px-8 lg:px-10")}
        >
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
        </ScrollRevealItem>

        <ScrollRevealItem
          className={cn(blueprintCol, "px-6 py-10 sm:px-8 lg:px-10")}
        >
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
        </ScrollRevealItem>

        <ScrollRevealItem
          className={cn(blueprintCol, "px-6 py-10 sm:px-8 lg:px-10")}
        >
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
        </ScrollRevealItem>

        <ScrollRevealItem
          className={cn(blueprintCol, "px-6 py-10 sm:px-8 lg:px-10")}
        >
          <p className="text-sm font-medium text-white">Social</p>
          <div className="mt-4 flex flex-wrap items-center gap-5">
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
      </ScrollRevealGroup>

      <ScrollReveal variant="fadeIn">
        <div className="border-t border-brand-border/45">
          <div className="px-6 py-6 sm:px-8 lg:px-10">
            <p className="text-sm text-white/50">
              © Redux 2026. All rights reserved.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
