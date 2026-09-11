import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const bodyClassName = "text-base leading-relaxed text-white/70";
const linkClassName =
  "text-brand-link underline-offset-2 hover:text-brand-link-hover hover:underline";

export function LegalDocument({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("legal-document mt-8 max-w-none", className)}>
      {children}
    </article>
  );
}

export function LegalLastUpdated({ date }: { date: string }) {
  return <p className="text-sm text-white/45">Last updated: {date}</p>;
}

export function LegalIntro({ children }: { children: ReactNode }) {
  return <p className={cn("mt-6", bodyClassName)}>{children}</p>;
}

export function LegalSection({
  title,
  children,
  isFirst = false,
}: {
  title: string;
  children: ReactNode;
  isFirst?: boolean;
}) {
  return (
    <section className={cn(isFirst ? "mt-8" : "mt-10")}>
      <h2 className="font-display text-xl font-medium tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function LegalSubsection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-base font-medium text-white/90">{title}</h3>
      <p className={cn("mt-2", bodyClassName)}>{children}</p>
    </div>
  );
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p className={bodyClassName}>{children}</p>;
}

export function LegalContactBlock({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-1", bodyClassName)}>
      {children}
    </div>
  );
}

export function LegalEmailLink({ email }: { email: string }) {
  return (
    <a href={`mailto:${email}`} className={linkClassName}>
      {email}
    </a>
  );
}

export function LegalCopyright({ children }: { children: ReactNode }) {
  return (
    <p className={cn("mt-6 text-sm text-white/45", bodyClassName)}>
      {children}
    </p>
  );
}
