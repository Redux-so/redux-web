"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
  SHOWCASE_CONVO_EDITING_PROMPTS,
  SHOWCASE_CONVO_ERASE_MS,
  SHOWCASE_CONVO_HOLD_MS,
  SHOWCASE_CONVO_IDLE_DELAY_MS,
  SHOWCASE_CONVO_START_DELAY_MS,
  SHOWCASE_CONVO_TYPE_MS,
  type ConversationalEditingDemoPhase,
} from "./conversational-editing-demo-data";

export function useConversationalEditingPromptDemo(active: boolean) {
  const prefersReducedMotion = useReducedMotion();
  const [promptValue, setPromptValue] = useState("");
  const [phase, setPhase] = useState<ConversationalEditingDemoPhase>("idle");
  const [promptIndex, setPromptIndex] = useState(0);
  const promptIndexRef = useRef(0);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const clearAll = () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
    };

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timeoutsRef.current.push(id);
    };

    clearAll();

    if (!active) {
      setPromptValue("");
      setPhase("idle");
      setPromptIndex(0);
      promptIndexRef.current = 0;
      return clearAll;
    }

    if (prefersReducedMotion) {
      setPromptValue(SHOWCASE_CONVO_EDITING_PROMPTS[0].prompt);
      setPromptIndex(0);
      promptIndexRef.current = 0;
      setPhase("hold");
      return clearAll;
    }

    const runCycle = (cycleStartDelay = SHOWCASE_CONVO_START_DELAY_MS) => {
      const currentIndex = promptIndexRef.current;
      const scenario = SHOWCASE_CONVO_EDITING_PROMPTS[currentIndex];
      const prompt = scenario.prompt;
      const typeDuration = prompt.length * SHOWCASE_CONVO_TYPE_MS;
      const eraseDuration = prompt.length * SHOWCASE_CONVO_ERASE_MS;

      setPromptIndex(currentIndex);
      setPromptValue("");
      setPhase("idle");

      schedule(() => {
        setPhase("typing");

        prompt.split("").forEach((_, index) => {
          schedule(() => {
            setPromptValue(prompt.slice(0, index + 1));
          }, index * SHOWCASE_CONVO_TYPE_MS);
        });

        schedule(() => {
          setPhase("hold");
        }, typeDuration);

        schedule(() => {
          setPhase("erasing");

          for (let index = prompt.length; index >= 0; index -= 1) {
            schedule(() => {
              setPromptValue(prompt.slice(0, index));
            }, (prompt.length - index) * SHOWCASE_CONVO_ERASE_MS);
          }

          schedule(() => {
            setPhase("idle");
            promptIndexRef.current =
              (currentIndex + 1) % SHOWCASE_CONVO_EDITING_PROMPTS.length;
            runCycle(SHOWCASE_CONVO_IDLE_DELAY_MS);
          }, eraseDuration);
        }, typeDuration + SHOWCASE_CONVO_HOLD_MS);
      }, cycleStartDelay);
    };

    promptIndexRef.current = 0;
    setPromptIndex(0);
    runCycle();
    return clearAll;
  }, [active, prefersReducedMotion]);

  const activePrompt = SHOWCASE_CONVO_EDITING_PROMPTS[promptIndex];

  return {
    promptValue,
    phase,
    promptKey: activePrompt.id,
  };
}
