"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const NUMBER_RE = /^(\d+(?:[.,]\d+)?)(.*)$/;

/** Zählt eine Kennzahl beim ersten Erscheinen im Viewport von 0 hoch.
 *  Werte ohne führende Ziffer (z. B. „—") werden unverändert dargestellt. */
export default function CountUp({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const match = value.match(NUMBER_RE);

  useEffect(() => {
    if (!match || !inView || !ref.current) return;
    const el = ref.current;
    const [, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(",", "."));
    const decimals = numStr.includes(",") || numStr.includes(".") ? 1 : 0;

    if (reduceMotion) {
      el.textContent = value;
      return;
    }

    const controls = animate(0, target, {
      duration: 1.2,
      delay: 0.1 + delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = (decimals ? v.toFixed(decimals).replace(".", ",") : String(Math.round(v))) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, match, delay]);

  return <span ref={ref}>{value}</span>;
}
