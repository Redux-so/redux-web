export type ConversationalEditingPromptScenario = {
  id: string;
  prompt: string;
};

export const SHOWCASE_CONVO_EDITING_PROMPTS: ConversationalEditingPromptScenario[] =
  [
    {
      id: "background-sky",
      prompt: "Remove the background and add a soft sunset sky",
    },
    {
      id: "brighten-face",
      prompt: "Brighten the subject's face and reduce shadows",
    },
    {
      id: "warm-contrast",
      prompt: "Make the colors warmer and increase contrast slightly",
    },
    {
      id: "portrait-blur",
      prompt: "Blur the background for a portrait effect",
    },
    {
      id: "teeth-whiten",
      prompt: "Whiten teeth and smooth skin while keeping it natural",
    },
  ];

export const SHOWCASE_CONVO_TYPE_MS = 48;
export const SHOWCASE_CONVO_ERASE_MS = 26;
export const SHOWCASE_CONVO_START_DELAY_MS = 400;
export const SHOWCASE_CONVO_HOLD_MS = 2800;
export const SHOWCASE_CONVO_IDLE_DELAY_MS = 320;

export type ConversationalEditingDemoPhase =
  | "idle"
  | "typing"
  | "hold"
  | "erasing";
