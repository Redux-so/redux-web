"use client";

import { motion } from "framer-motion";

import EditorShowcaseScaler from "@/src/components/editor-showcase/EditorShowcaseScaler";

export default function Showcase() {
  return (
    <div className="overflow-x-hidden px-4 pb-10 pt-4 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
      <motion.section
        className="relative mx-auto w-full max-w-[1400px]"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="overflow-hidden rounded-2xl border border-white/[0.1] shadow-2xl">
          <EditorShowcaseScaler />
        </div>
      </motion.section>
    </div>
  );
}
