"use client";

import { FormEvent, useState } from "react";

import HeroParticleBackground from "@/src/components/HeroParticleBackground";
import { Button } from "@/components/ui/button";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from "@/lib/scroll-motion";
import { SECTION_DIVIDE } from "@/lib/section-styles";
import { cn } from "@/lib/utils";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = "idle" | "loading" | "success";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setFormState("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

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
        SECTION_DIVIDE,
        "relative overflow-hidden bg-waitlist-spotlight px-4 py-20 sm:px-6 sm:py-24 lg:px-8",
      )}
    >
      <HeroParticleBackground />
      <ScrollRevealGroup
        className="relative z-[1] mx-auto max-w-2xl text-center"
        stagger={0.12}
      >
        <ScrollRevealItem>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Join the Waitlist
          </h2>
        </ScrollRevealItem>

        <ScrollRevealItem>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Get early access when we launch, plus join our founding community
            today.
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem className="mt-8">
          {formState === "success" ? (
            <p className="text-xl font-medium text-white">
              You&apos;re on the list!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={formState === "loading"}
                  className="h-10 w-full rounded-lg border border-white/[0.08] bg-brand-surface px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/30 disabled:opacity-50"
                />
                {error ? (
                  <p className="mt-2 text-left text-sm text-red-400">{error}</p>
                ) : null}
              </div>
              <Button
                type="submit"
                disabled={formState === "loading"}
                className={cn(BTN_PRIMARY_SOLID, "shrink-0")}
              >
                {formState === "loading" ? "Joining..." : "Join"}
              </Button>
            </form>
          )}
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </section>
  );
}
