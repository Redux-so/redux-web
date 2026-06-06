"use client";

import { motion } from "framer-motion";

import EditorShowcase from "@/src/components/editor-showcase/EditorShowcase";

export default function Showcase() {
  return (
    <div className="px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-8 lg:px-8">
      <motion.section
        className="relative mx-auto w-full max-w-[1400px]"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="h-[min(820px,75vh)] min-h-[720px] overflow-hidden rounded-2xl border border-white/[0.1] shadow-2xl">
          <EditorShowcase />
        </div>
      </motion.section>
    </div>
  );
}
