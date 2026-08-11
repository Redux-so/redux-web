"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import ShowcaseCropFrame from "@/src/components/features/ShowcaseCropFrame";
import { fadeIn, SCROLL_VIEWPORT } from "@/lib/scroll-motion";

export default function ConversationalEditingShowcaseCrop() {
  const [autoScrollActive, setAutoScrollActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      onViewportEnter={() => setAutoScrollActive(true)}
      onViewportLeave={() => setAutoScrollActive(false)}
    >
      <ShowcaseCropFrame
        scenario="default"
        chatAutoScrollActive={autoScrollActive && !prefersReducedMotion}
        ariaLabel="Redux editor chat panel preview"
      />
    </motion.div>
  );
}
