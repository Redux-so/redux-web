"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import {
  SHOWCASE_LIBRARY_FILLER,
  SHOWCASE_SEARCH_ERASE_MS,
  SHOWCASE_SEARCH_HOLD_MS,
  SHOWCASE_SEARCH_IDLE_DELAY_MS,
  SHOWCASE_SEARCH_RESULTS_DELAY_MS,
  SHOWCASE_SEARCH_SCENARIOS,
  SHOWCASE_SEARCH_START_DELAY_MS,
  SHOWCASE_SEARCH_TYPE_MS,
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
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenarioIndexRef = useRef(0);
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
      setScenarioIndex(0);
      scenarioIndexRef.current = 0;
      return clearAll;
    }

    if (prefersReducedMotion) {
      const firstScenario = SHOWCASE_SEARCH_SCENARIOS[0];
      setSearchValue(firstScenario.query);
      setScenarioIndex(0);
      scenarioIndexRef.current = 0;
      setPhase("results");
      return clearAll;
    }

    const runCycle = (cycleStartDelay = SHOWCASE_SEARCH_START_DELAY_MS) => {
      const currentIndex = scenarioIndexRef.current;
      const scenario = SHOWCASE_SEARCH_SCENARIOS[currentIndex];
      const query = scenario.query;
      const typeDuration = query.length * SHOWCASE_SEARCH_TYPE_MS;
      const eraseDuration = query.length * SHOWCASE_SEARCH_ERASE_MS;

      setScenarioIndex(currentIndex);
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
            scenarioIndexRef.current =
              (currentIndex + 1) % SHOWCASE_SEARCH_SCENARIOS.length;
            runCycle(SHOWCASE_SEARCH_IDLE_DELAY_MS);
          }, eraseDuration);
        }, typeDuration + SHOWCASE_SEARCH_RESULTS_DELAY_MS + SHOWCASE_SEARCH_HOLD_MS);
      }, cycleStartDelay);
    };

    scenarioIndexRef.current = 0;
    setScenarioIndex(0);
    runCycle();
    return clearAll;
  }, [active, prefersReducedMotion]);

  const activeScenario = SHOWCASE_SEARCH_SCENARIOS[scenarioIndex];

  return {
    searchValue,
    phase,
    resultImages: activeScenario.results,
    scenarioKey: activeScenario.id,
  };
}

export default function LibraryShowcase({
  demoMode = false,
  animationActive = false,
}: LibraryShowcaseProps) {
  const { searchValue, phase, resultImages, scenarioKey } =
    useSmartSearchDemo(animationActive);

  return (
    <div className="library-showcase flex h-full min-h-0 overflow-hidden bg-[#161616] text-[13px] leading-normal antialiased select-none">
      <LibraryShowcaseSidebar demoMode={demoMode} />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#161616]">
        <LibraryShowcaseHeader searchValue={searchValue} demoMode={demoMode} />
        <div className="min-h-0 flex-1 overflow-hidden">
          <LibraryShowcasePhotoGrid
            phase={phase}
            scenarioKey={scenarioKey}
            fillerImages={SHOWCASE_LIBRARY_FILLER}
            resultImages={resultImages}
          />
        </div>
      </div>
    </div>
  );
}
