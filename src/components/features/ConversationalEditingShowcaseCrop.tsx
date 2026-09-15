"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import ShowcaseChatInput from "@/src/components/editor-showcase/ShowcaseChatInput";
import { useConversationalEditingPromptDemo } from "@/src/components/features/useConversationalEditingPromptDemo";
import { fadeIn, SCROLL_VIEWPORT } from "@/lib/scroll-motion";

export default function ConversationalEditingShowcaseCrop() {
  const [animationActive, setAnimationActive] = useState(false);
  const { promptValue } = useConversationalEditingPromptDemo(animationActive);

  return (
    <motion.div
      className="flex w-full flex-col items-center"
      data-scroll-motion=""
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={SCROLL_VIEWPORT}
      onViewportEnter={() => setAnimationActive(true)}
    >
      <div className="relative w-full max-w-[27rem] sm:max-w-[29rem]">
        <div className="feature-convo-chat-glow" aria-hidden />
        <ShowcaseChatInput
          value={promptValue}
          demoMode
          borderVariant="bento"
          className="relative z-[1] w-full"
        />
      </div>
    </motion.div>
  );
}
