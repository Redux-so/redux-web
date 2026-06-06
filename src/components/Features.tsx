"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

type Feature = {
  headline: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
};

const features: Feature[] = [
  {
    headline: "Conversational Editing",
    description:
      "Describe your edits, and our AI applies professional changes instantly. Review and refine in real-time until your photo is perfect.",
    cta: "Ask AI",
    image: "/features/conversational-editing.png",
    imageAlt:
      "Redux photo editor with AI chat panel for conversational editing",
    imagePosition: "left",
  },
  {
    headline: "Style Match",
    description:
      "Recreate any style instantly. Upload a reference image, and our AI applies its aesthetic to your photo.",
    cta: "Match a Style",
    image: "/features/style-match.png",
    imageAlt:
      "Style Match interface showing a reference photo and styled result",
    imagePosition: "right",
  },
  {
    headline: "Smart Search",
    description:
      "Find any photo by describing its content. Search by keywords and instantly surface matching images.",
    cta: "Search Now",
    image: "/features/smart-search.png",
    imageAlt:
      "Library search interface with natural language query and photo results",
    imagePosition: "left",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Features() {
  return (
    <div className="px-4 pb-12 pt-20 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Built for how you actually work
        </h2>

        <motion.div
          className="mt-8 flex flex-col gap-8 sm:mt-10 sm:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.headline}
              variants={fadeInUp}
              className="overflow-hidden rounded-2xl border border-white/[0.08] bg-brand-surface"
            >
              <div
                className={cn(
                  "flex flex-col lg:flex-row lg:items-stretch lg:gap-8 xl:gap-10",
                  feature.imagePosition === "right" && "lg:flex-row-reverse",
                )}
              >
                <div
                  className={cn(
                    "relative min-h-[260px] w-full overflow-hidden rounded-xl bg-[#0a0a0a] sm:min-h-[300px]",
                    "mx-4 mt-4 sm:mx-5 sm:mt-5 lg:mb-5 lg:min-h-[380px] lg:flex-[1.3] lg:shrink-0 xl:min-h-[420px]",
                    feature.imagePosition === "left"
                      ? "lg:ml-5 lg:mt-5"
                      : "lg:mr-5 lg:mt-5",
                  )}
                >
                  <Image
                    src={feature.image}
                    alt={feature.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-top"
                  />
                </div>

                <div
                  className={cn(
                    "flex flex-1 flex-col justify-center gap-4 px-4 pb-4 pt-6 sm:px-5 sm:pb-5 sm:pt-8",
                    "lg:flex-[0.9] lg:py-10 lg:pt-10",
                    feature.imagePosition === "left"
                      ? "lg:pr-10"
                      : "lg:pl-10 lg:pr-10",
                  )}
                >
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {feature.headline}
                  </h3>
                  <p className="text-base leading-relaxed text-white/70">
                    {feature.description}
                  </p>
                  <Button asChild className={cn(BTN_PRIMARY_SOLID, "w-fit shrink-0")}>
                    <a href="#waitlist">{feature.cta}</a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
