"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FormEvent, useState } from "react";

import HeroParticleBackground from "@/src/components/HeroParticleBackground";
import { NAV_SCROLL_OFFSET_CLASS } from "@/src/components/Navbar";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import { PAGE_CONTAINER } from "@/lib/section-styles";
import {
  EASE_OUT,
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_LOADING_MS = 600;

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

  const overlayTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.25, ease: EASE_OUT };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setFormState("loading");

    const startedAt = Date.now();

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_LOADING_MS) {
        await wait(MIN_LOADING_MS - elapsed);
      }

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
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
    <section
      id="waitlist"
      className={cn(
        NAV_SCROLL_OFFSET_CLASS,
        "relative overflow-hidden bg-waitlist-spotlight",
      )}
    >
      <HeroParticleBackground />
      <div
        className={cn(
          PAGE_CONTAINER,
          "relative z-[1] py-16 sm:py-20 lg:py-24",
        )}
      >
        <ScrollRevealGroup
          className="mx-auto max-w-2xl text-center"
          stagger={0.12}
        >
        <ScrollRevealItem>
          <h2 className="font-display text-3xl font-normal tracking-tight text-white sm:text-4xl">
            Join the Waitlist
          </h2>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <p className="mt-4 text-base leading-relaxed text-white/70">
            Get early access when we launch, plus join our founding community
            today.
          </p>
        </ScrollRevealItem>

        <div className="relative mt-8">
          <form
            onSubmit={handleSubmit}
            aria-hidden={formState !== "idle"}
            className={cn(
              "flex flex-col gap-3 sm:flex-row sm:items-start",
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
            <div className="flex-1">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                tabIndex={formState === "idle" ? 0 : -1}
                className="h-10 w-full rounded-lg border border-brand-border bg-brand-surface px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30"
              />
              {error ? (
                <p className="mt-2 text-left text-sm text-red-400">{error}</p>
              ) : null}
            </div>
            <button
              type="submit"
              tabIndex={formState === "idle" ? 0 : -1}
              className={`${BTN_PRIMARY_SOLID} shrink-0`}
            >
              Join
            </button>
          </form>

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
              <p className="text-xl font-medium text-white">
                You&apos;re on the list!
              </p>
            </motion.div>
          ) : null}
        </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
