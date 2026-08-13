"use client";

import { motion, useReducedMotion } from "framer-motion";

import type {
  LibrarySearchDemoPhase,
  LibraryShowcaseImage,
} from "./library-showcase-data";
import LibraryShowcasePhotoCard from "./LibraryShowcasePhotoCard";

type LibraryShowcasePhotoGridProps = {
  phase: LibrarySearchDemoPhase;
  scenarioKey: string;
  fillerImages: readonly LibraryShowcaseImage[];
  resultImages: readonly LibraryShowcaseImage[];
};

function AnimatedGrid({ images }: { images: readonly LibraryShowcaseImage[] }) {
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? 0 : 0.25;
  const stagger = prefersReducedMotion ? 0 : 0.035;

  return (
    <motion.div
      className="grid grid-cols-5 gap-3"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {images.map((image) => (
        <motion.div
          key={image.id}
          variants={{
            hidden: {
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : 8,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration, ease: "easeOut" },
            },
          }}
        >
          <LibraryShowcasePhotoCard image={image} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function LibraryShowcasePhotoGrid({
  phase,
  scenarioKey,
  fillerImages,
  resultImages,
}: LibraryShowcasePhotoGridProps) {
  const images = phase === "results" ? resultImages : fillerImages;
  const gridKey = phase === "results" ? `results-${scenarioKey}` : "filler";

  return (
    <div className="flex flex-col gap-5 px-6 py-5">
      {phase === "results" ? (
        <p className="mb-0 text-[12px] font-semibold text-[#888888]">
          SEARCH RESULTS
        </p>
      ) : (
        <p className="mb-0 text-[12px] font-semibold text-[#888888]">RECENT</p>
      )}
      <AnimatedGrid images={images} key={gridKey} />
    </div>
  );
}
