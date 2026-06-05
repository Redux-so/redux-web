"use client";

import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";

const features = [
  {
    headline: "Conversational Editing",
    description:
      "Describe your edits, and our AI applies professional changes instantly. Review and refine in real-time until your photo is perfect.",
    cta: "Ask AI",
  },
  {
    headline: "Style Match",
    description:
      "Recreate any style instantly. Upload a reference image, and our AI applies its aesthetic to your photo.",
    cta: "Match a Style",
  },
  {
    headline: "Smart Search",
    description:
      "Find any photo by describing its content. Search by keywords and instantly surface matching images.",
    cta: "Search Now",
  },
] as const;

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
          className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
            <motion.article
              key={feature.headline}
              variants={fadeInUp}
              className="overflow-hidden rounded-xl border border-white/[0.08] bg-brand-surface2"
            >
              <div
                className="h-[200px] bg-[#1a1a1a]"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-4 p-6">
                <h3 className="font-display text-xl font-semibold text-white">
                  {feature.headline}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-white/70">
                  {feature.description}
                </p>
                <Button
                  variant="ghost"
                  asChild
                  className="w-fit text-white hover:bg-white/5 hover:text-white"
                >
                  <a href="#waitlist">{feature.cta}</a>
                </Button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
