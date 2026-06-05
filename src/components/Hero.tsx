"use client";

import { motion, type Variants } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BTN_PRIMARY_SOLID } from "@/lib/button-styles";
import { cn } from "@/lib/utils";

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

export default function Hero() {
  return (
    <div className="flex flex-col items-center px-4 pb-12 pt-16 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeInUp}
          className="font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Your AI agent for professional photo editing
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-5 text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          Organize, edit, and export photos—all from your browser
        </motion.p>

        <motion.div variants={fadeInUp} className="mt-8">
          <Button
            asChild
            className={cn(BTN_PRIMARY_SOLID, "h-11 gap-2 px-6 text-sm")}
          >
            <a href="#waitlist" className="inline-flex items-center gap-2">
              Join Waitlist
              <SquareArrowOutUpRight className="size-4 shrink-0" strokeWidth={2} />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
