"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { handleMarketingNavClick } from "@/lib/nav-scroll";
import { cn } from "@/lib/utils";

type MarketingNavLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children" | "onClick">;

export default function MarketingNavLink({
  href,
  className,
  children,
  onNavigate,
  ...rest
}: MarketingNavLinkProps) {
  const prefersReducedMotion = useReducedMotion();

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    handleMarketingNavClick(event, href, {
      prefersReducedMotion: !!prefersReducedMotion,
      onAfterScroll: onNavigate,
    });
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cn(className)} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={cn(className)} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
