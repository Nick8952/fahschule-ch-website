"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/lib/data";

export default function PathSteps() {
  const items = steps.items;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = refs.current.findIndex((el) => el === e.target);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <nav
        aria-label="Schritte"
        className="top-[calc(var(--header-h)+1rem)] flex gap-1 overflow-x-auto lg:sticky lg:h-max lg:flex-col lg:overflow-visible"
      >
        {items.map((s, i) => (
          <button
            key={s.n}
            type="button"
            onClick={() =>
              refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded px-3 py-2 text-left font-mono text-[0.82rem] transition-colors lg:grid lg:grid-cols-[24px_1fr] ${
              active === i ? "bg-pine-tint text-ink" : "text-ink-faint hover:text-ink"
            }`}
          >
            <b className="font-medium text-pine">{String(s.n).padStart(2, "0")}</b>
            <span className="hidden lg:inline">{s.title}</span>
          </button>
        ))}
      </nav>

      <ol className="grid gap-4">
        {items.map((s, i) => (
          <li
            key={s.n}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`schritt-${s.n}`}
            className="scroll-mt-[calc(var(--header-h)+1rem)] rounded-lg border border-line bg-white p-6 sm:p-7"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded bg-pine font-display text-lg text-white">
                {s.n}
              </span>
              <h3 className="font-display text-step-1">{s.title}</h3>
            </div>
            <p className="text-[0.96rem] leading-relaxed text-ink-soft">{s.body}</p>
            <span className="mt-3 inline-flex rounded-pill bg-pine-tint px-3 py-1 font-mono text-[0.74rem] text-pine">
              {s.badge}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
