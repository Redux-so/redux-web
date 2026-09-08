"use client";

import ShowcaseChatInput from "@/src/components/editor-showcase/ShowcaseChatInput";

export default function ConversationalEditingShowcaseCrop() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-[27rem] sm:max-w-[29rem]">
        <div className="feature-convo-chat-glow" aria-hidden />
        <ShowcaseChatInput
          value=""
          demoMode
          borderVariant="bento"
          className="relative z-[1] w-full"
        />
      </div>
    </div>
  );
}
