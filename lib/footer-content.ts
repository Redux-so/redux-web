import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XSocialIcon,
} from "@/lib/brand-social-icons";

export const SITE_MOTTO =
  "Organize, edit, and export photos, all from your browser";

export const socialLinks = [
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

export const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "mailto:admin@redux.so" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
] as const;
