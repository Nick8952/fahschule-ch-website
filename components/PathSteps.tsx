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
            onClick={() => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className={`flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-2 text-left font-mono text-[0.78rem] transition-colors lg:grid lg:grid-cols-[24px_1fr] ${
              active === i ? "bg-signal/10 text-ink" : "text-ink-soft/60 hover:text-ink"
            }`}
          >
            <b className="font-medium text-signal">{String(s.n).padStart(2, "0")}</b>
            <span className="hidden lg:inline">{s.title}</span>
          </button>
        ))}
      </nav>

      <ol className="grid gap-3">
        {items.map((s, i) => (
          <li
            key={s.n}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`schritt-${s.n}`}
            className="card scroll-mt-[calc(var(--header-h)+1rem)]"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center bg-signal font-display text-xl font-extrabold text-white">
                {s.n}
              </span>
              <h3 className="font-display text-step-1 font-bold text-ink">{s.title}</h3>
            </div>
            <p className="text-[0.95rem] leading-relaxed">{s.body}</p>
            <span className="mt-3 inline-flex border border-signal/40 bg-signal/5 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.04em] text-signal-600">
              {s.badge}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
