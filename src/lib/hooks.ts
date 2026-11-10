"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/** Cycles 0..count-1 every `ms`, but only while the element is on screen. */
export function useCycle<T extends HTMLElement>(count: number, ms: number) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => clearInterval(id);
  }, [inView, count, ms]);

  return { ref, index, inView };
}

/**
 * Reveals items one by one (0 → total), pauses, then starts again.
 * Drives the "messages appear one after another" chat animations.
 */
export function useSequence<T extends HTMLElement>(total: number, stepMs = 1400, pauseMs = 2600) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const done = shown >= total;
    const id = setTimeout(() => setShown(done ? 0 : shown + 1), done ? pauseMs : shown === 0 ? 500 : stepMs);
    return () => clearTimeout(id);
  }, [inView, shown, total, stepMs, pauseMs]);

  return { ref, shown, inView };
}

/** Counts up to `to` once the element enters the screen. */
export function useCountUp<T extends HTMLElement>(to: number, durationMs = 1600) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, durationMs]);

  return { ref, value };
}
