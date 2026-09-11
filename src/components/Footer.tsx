import Image from "next/image";
import Link from "next/link";
import { Alata } from "next/font/google";

import FooterPageGrid from "@/src/components/FooterPageGrid";
import FooterWatermark from "@/src/components/FooterWatermark";
import {
  legalLinks,
  navigationLinks,
  SITE_MOTTO,
  socialLinks,
} from "@/lib/footer-content";
import { PAGE_CONTAINER } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const FOOTER_LOGO_WIDTH = 471;
const FOOTER_LOGO_HEIGHT = 117;
const FOOTER_LOGO_HEIGHT_CLASS = "h-5 sm:h-6";

const footerWordmarkFont = Alata({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const footerLinkClassName =
  "text-sm text-white/45 transition-colors hover:text-white";

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={footerLinkClassName}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={footerLinkClassName}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer-bottom-glow relative sticky bottom-0 z-0 bg-[#040404] text-white">
      <FooterPageGrid />
      <div className="relative z-[1]">
        <div className={cn(PAGE_CONTAINER, "relative z-10")}>
        <div className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16 lg:py-16">
          <div className="flex flex-col items-start gap-5">
            <Image
              src="/redux-logo-text.png"
              alt="Redux"
              width={FOOTER_LOGO_WIDTH}
              height={FOOTER_LOGO_HEIGHT}
              className={cn(
                FOOTER_LOGO_HEIGHT_CLASS,
                "block w-auto object-contain object-left",
              )}
            />
            <p className="max-w-xs text-sm leading-snug text-white/45">
              {SITE_MOTTO}
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-12 sm:gap-16">
            <nav aria-label="Footer navigation">
              <p className="text-sm font-medium text-white">Navigation</p>
              <ul className="mt-4 space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal">
              <p className="text-sm font-medium text-white">Legal</p>
              <ul className="mt-4 space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div data-footer-grid-divider className="relative">
          <div className="flex flex-col gap-4 pt-6 pb-3 sm:flex-row sm:items-center sm:justify-between sm:pb-4">
            <p className="text-sm text-white/36">
              © 2026 Redux
            </p>
            <div className="flex shrink-0 items-center gap-4 sm:gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={
                    "external" in social && social.external ? "_blank" : undefined
                  }
                  rel={
                    "external" in social && social.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-white/36 transition-colors hover:text-white"
                >
                  <social.icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        </div>

        <FooterWatermark fontClassName={footerWordmarkFont.className} />
      </div>
    </footer>
  );
}
