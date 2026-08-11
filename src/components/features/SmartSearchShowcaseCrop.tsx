"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import LibraryShowcaseCropFrame from "@/src/components/features/LibraryShowcaseCropFrame";
import { fadeIn, SCROLL_VIEWPORT } from "@/lib/scroll-motion";

export default function SmartSearchShowcaseCrop() {
  const [animationActive, setAnimationActive] = useState(false);

  return (
    <motion.div
      className="absolute inset-0"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      onViewportEnter={() => setAnimationActive(true)}
      onViewportLeave={() => setAnimationActive(false)}
    >
      <LibraryShowcaseCropFrame
        animationActive={animationActive}
        ariaLabel="Redux library Smart Search preview"
      />
    </motion.div>
  );
}
