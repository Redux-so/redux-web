"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";

import DotGridBackground from "@/src/components/DotGridBackground";
import SectionShell from "@/src/components/SectionShell";
import { Icon } from "@/components/shared/Icon";
import { BRAND_HEADLINE_ACCENT_CLASS } from "@/lib/brand-colors";
import {
  HERO_PILL_CONTROL_HEIGHT,
  HERO_PILL_CTA_BASE,
} from "@/lib/button-styles";
import {
  EASE_OUT,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { HERO_HEADLINE, PAGE_GRID_ALIGNED_FRAME } from "@/lib/section-styles";
import { WAITLIST_EMAIL_REGEX } from "@/lib/waitlist-validation";
import { cn } from "@/lib/utils";

const MIN_LOADING_MS = 600;

const WAITLIST_SUBMIT_CTA = cn(
  HERO_PILL_CTA_BASE,
  "hero-pill-cta--purple gap-2",
);

type FormState = "idle" | "loading" | "success";

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const formLoadedAtRef = useRef(Date.now());

  const overlayTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.25, ease: EASE_OUT };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!WAITLIST_EMAIL_REGEX.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setFormState("loading");

    const startedAt = Date.now();

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website,
          formLoadedAt: formLoadedAtRef.current,
        }),
      });

      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_LOADING_MS) {
        await wait(MIN_LOADING_MS - elapsed);
      }

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        if (response.status === 429) {
          throw new Error("Too many attempts. Please try again later.");
        }
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setFormState("success");
    } catch (submitError) {
      setFormState("idle");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <SectionShell container={false} className="relative z-[1]">
      <div className={cn(PAGE_GRID_ALIGNED_FRAME, "px-10 sm:px-12 lg:px-16")}>
        <div className="relative w-full overflow-hidden rounded-2xl border border-marketing-strong bg-[#04060E] px-8 py-20 sm:px-6 sm:py-24">
        <DotGridBackground className="absolute inset-0 z-0" />
        <div aria-hidden className="waitlist-card-spotlight absolute inset-0 z-10" />

        <ScrollRevealGroup
          className="relative z-20 mx-auto w-full max-w-xl text-center"
          stagger={0.12}
        >
          <ScrollRevealItem className="w-full">
            <h2 className={cn("m-0", HERO_HEADLINE)}>
              Join the <span className={BRAND_HEADLINE_ACCENT_CLASS}>Waitlist</span>
            </h2>
          </ScrollRevealItem>

          <ScrollRevealItem className="w-full">
            <p className="mt-5 text-pretty text-base leading-relaxed text-marketing-muted sm:text-lg lg:whitespace-nowrap">
              Get early access when we launch, plus join our founding community today.
            </p>
          </ScrollRevealItem>

          <ScrollRevealItem className="relative mt-10 flex w-full flex-col items-center">
            <div className="relative mx-auto w-full max-w-[16.75rem] sm:max-w-none sm:w-fit">
            <form
              onSubmit={handleSubmit}
              aria-hidden={formState !== "idle"}
              className={cn(
                "flex w-full flex-row flex-nowrap items-center justify-center gap-2 sm:w-fit sm:max-w-full sm:gap-4",
                formState !== "idle" && "pointer-events-none invisible",
              )}
            >
              <input
                type="text"
                name="website"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
              />
              <div className="min-w-0 flex-1 sm:w-[15rem] sm:flex-none sm:shrink-0">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  tabIndex={formState === "idle" ? 0 : -1}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "waitlist-error" : undefined}
                  className={cn("hero-pill-input w-full", HERO_PILL_CONTROL_HEIGHT)}
                />
              </div>
              <button
                type="submit"
                tabIndex={formState === "idle" ? 0 : -1}
                className={WAITLIST_SUBMIT_CTA}
              >
                <span className="leading-none">Join</span>
                <Icon
                  name="ArrowNarrowRight"
                  size={16}
                  strokeWidth={2}
                  className="shrink-0 text-white"
                  aria-hidden
                />
              </button>
            </form>
            {error ? (
              <p
                id="waitlist-error"
                role="alert"
                className="pointer-events-none absolute inset-x-0 top-full z-10 mt-2 text-center text-sm leading-snug text-red-400"
              >
                {error}
              </p>
            ) : null}
            </div>

            {formState === "loading" ? (
              <div
                className="absolute inset-0 flex items-center justify-center"
                role="status"
                aria-label="Joining waitlist"
              >
                <span
                  className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-brand-purple-hover"
                  aria-hidden="true"
                />
              </div>
            ) : null}

            {formState === "success" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={overlayTransition}
                className="absolute inset-0 flex items-center justify-center"
              >
                <p className="text-2xl font-medium text-white">
                  You&apos;re on the list!
                </p>
              </motion.div>
            ) : null}
          </ScrollRevealItem>
        </ScrollRevealGroup>
        </div>
      </div>
    </SectionShell>
  );
}
