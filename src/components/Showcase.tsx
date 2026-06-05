"use client";

import { motion } from "framer-motion";
import { Brush, Crop, Layers, Search, Sliders, Wand } from "lucide-react";

const sidebarTools = [
  { label: "Crop", icon: Crop },
  { label: "Brush", icon: Brush },
  { label: "Layers", icon: Layers },
  { label: "Sliders", icon: Sliders },
  { label: "Wand", icon: Wand },
  { label: "Search", icon: Search },
] as const;

const sliders = [
  { label: "Exposure", value: 62 },
  { label: "Contrast", value: 48 },
  { label: "Saturation", value: 71 },
  { label: "Highlights", value: 35 },
] as const;

export default function Showcase() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-brand-surface shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/[0.08] bg-brand-surface2 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-auto w-full max-w-md rounded-md border border-white/[0.08] bg-[#111111] px-4 py-1.5 text-center text-sm text-white/50">
              app.redux.photo
            </div>
          </div>

          <div
            className="relative"
            style={{ overflowY: "scroll", maxHeight: "520px" }}
          >
            <div className="flex min-h-[640px] bg-[#111111]">
              <aside className="flex w-14 shrink-0 flex-col items-center gap-3 border-r border-white/[0.08] bg-brand-surface py-4">
                {sidebarTools.map((tool) => (
                  <button
                    key={tool.label}
                    type="button"
                    aria-label={tool.label}
                    className="flex size-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <tool.icon className="size-4" />
                  </button>
                ))}
              </aside>

              <div className="flex min-w-0 flex-1 flex-col p-6">
                <div className="flex flex-1 items-center justify-center rounded-lg border border-white/[0.08] bg-brand-surface2 p-8">
                  <div className="aspect-[4/3] w-full max-w-2xl rounded-md bg-[#3a3a3a]" />
                </div>
                <div className="mt-6 h-48 rounded-lg border border-dashed border-white/[0.08] bg-brand-surface/50" />
              </div>

              <aside className="w-56 shrink-0 border-l border-white/[0.08] bg-brand-surface p-4">
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/50">
                  Adjustments
                </p>
                <div className="space-y-5">
                  {sliders.map((slider) => (
                    <div key={slider.label}>
                      <div className="mb-2 flex items-center justify-between text-xs text-white/70">
                        <span>{slider.label}</span>
                        <span>{slider.value}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={slider.value}
                        readOnly
                        tabIndex={-1}
                        className="h-1 w-full cursor-default appearance-none rounded-full bg-white/10 accent-brand-purple"
                      />
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "auto",
                zIndex: 10,
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
