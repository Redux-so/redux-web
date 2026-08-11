"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import {
  SHOWCASE_LIBRARY_FILLER,
  SHOWCASE_SEARCH_ERASE_MS,
  SHOWCASE_SEARCH_HOLD_MS,
  SHOWCASE_SEARCH_IDLE_DELAY_MS,
  SHOWCASE_SEARCH_QUERY,
  SHOWCASE_SEARCH_RESULTS_DELAY_MS,
  SHOWCASE_SEARCH_START_DELAY_MS,
  SHOWCASE_SEARCH_TYPE_MS,
  SHOWCASE_SKYLINE_RESULTS,
  type LibrarySearchDemoPhase,
} from "./library-showcase-data";
import LibraryShowcaseHeader from "./LibraryShowcaseHeader";
import LibraryShowcasePhotoGrid from "./LibraryShowcasePhotoGrid";
import LibraryShowcaseSidebar from "./LibraryShowcaseSidebar";

type LibraryShowcaseProps = {
  demoMode?: boolean;
  animationActive?: boolean;
};

function useSmartSearchDemo(active: boolean) {
  const prefersReducedMotion = useReducedMotion();
  const [searchValue, setSearchValue] = useState("");
  const [phase, setPhase] = useState<LibrarySearchDemoPhase>("idle");
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
      setSearchValue("");
      setPhase("idle");
      return clearAll;
    }

    if (prefersReducedMotion) {
      setSearchValue(SHOWCASE_SEARCH_QUERY);
      setPhase("results");
      return clearAll;
    }

    const query = SHOWCASE_SEARCH_QUERY;
    const typeDuration = query.length * SHOWCASE_SEARCH_TYPE_MS;
    const eraseDuration = query.length * SHOWCASE_SEARCH_ERASE_MS;

    const runCycle = (cycleStartDelay = SHOWCASE_SEARCH_START_DELAY_MS) => {
      setSearchValue("");
      setPhase("idle");

      schedule(() => {
        setPhase("typing");

        query.split("").forEach((_, index) => {
          schedule(() => {
            setSearchValue(query.slice(0, index + 1));
          }, index * SHOWCASE_SEARCH_TYPE_MS);
        });

        schedule(() => {
          setPhase("results");
        }, typeDuration + SHOWCASE_SEARCH_RESULTS_DELAY_MS);

        schedule(() => {
          setPhase("erasing");

          for (let index = query.length; index >= 0; index -= 1) {
            schedule(() => {
              setSearchValue(query.slice(0, index));
            }, (query.length - index) * SHOWCASE_SEARCH_ERASE_MS);
          }

          schedule(() => {
            setPhase("idle");
            runCycle(SHOWCASE_SEARCH_IDLE_DELAY_MS);
          }, eraseDuration);
        }, typeDuration + SHOWCASE_SEARCH_RESULTS_DELAY_MS + SHOWCASE_SEARCH_HOLD_MS);
      }, cycleStartDelay);
    };

    runCycle();
    return clearAll;
  }, [active, prefersReducedMotion]);

  return { searchValue, phase };
}

export default function LibraryShowcase({
  demoMode = false,
  animationActive = false,
}: LibraryShowcaseProps) {
  const { searchValue, phase } = useSmartSearchDemo(animationActive);

  return (
    <div className="library-showcase flex h-full min-h-0 overflow-hidden bg-[#161616] text-[13px] leading-normal antialiased select-none">
      <LibraryShowcaseSidebar demoMode={demoMode} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#161616]">
        <LibraryShowcaseHeader searchValue={searchValue} demoMode={demoMode} />
        <div className="min-h-0 flex-1 overflow-hidden">
          <LibraryShowcasePhotoGrid
            phase={phase}
            fillerImages={SHOWCASE_LIBRARY_FILLER}
            resultImages={SHOWCASE_SKYLINE_RESULTS}
          />
        </div>
      </div>
    </div>
  );
}
