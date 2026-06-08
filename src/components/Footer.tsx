"use client";

import Image from "next/image";
import type { LucideProps } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ScrollReveal,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { SECTION_DIVIDE } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

function InstagramIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon({ className, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...props}
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

const socialLinks = [
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
    label: "X",
    href: "https://x.com/tryredux",
    icon: XIcon,
    external: true,
  },
  {
    label: "Discord",
    href: "https://discord.gg/gzHrud9nee",
    icon: DiscordIcon,
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
          <ScrollRevealItem className="flex max-w-sm flex-col gap-5">
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
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  asChild
                  className="border-white/[0.08] bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
                >
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={"external" in social && social.external ? "_blank" : undefined}
                    rel={
                      "external" in social && social.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    <social.icon className="size-4" />
                  </a>
                </Button>
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
              © Redux 2025. All rights reserved.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
