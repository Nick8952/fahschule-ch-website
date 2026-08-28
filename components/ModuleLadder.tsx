import { modules } from "@/lib/data";
import { RevealLi } from "./Reveal";

/* 2. Signature: die 8-Modul-Kompetenzleiter. Jede Sprosse ein Modul mit
   Taxonomiestufe 1–6 → der Bogen "von einfach zu schwierig". */
export default function ModuleLadder() {
  const items = modules.items;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div>
        <p className="eyebrow mb-3">Unterrichtskonzept</p>
        <h2 className="text-step-2">{modules.heading}</h2>
        <p className="mt-3 max-w-[46ch] text-ink-soft">{modules.intro}</p>
        <div className="mt-6 flex items-center gap-3 font-mono text-[0.78rem] uppercase tracking-[0.1em] text-ink-faint">
          <span>Taxonomie</span>
          <span className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((l) => (
              <span
                key={l}
                className="grid h-6 w-6 place-items-center rounded-sm border border-line text-ink-soft"
              >
                {l}
              </span>
            ))}
          </span>
        </div>
      </div>

      <ol className="relative border-l-2 border-line pl-6">
        {items.map((m, i) => (
          <RevealLi key={m.range} delay={i * 70} className="relative pb-7 last:pb-0">
            <span className="absolute -left-[calc(1.5rem+7px)] top-1.5 h-3 w-3 rounded-full border-2 border-pine bg-paper" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[0.8rem] font-medium text-signal">
                Modul {m.range}
              </span>
              <span className="rounded-sm bg-pine-tint px-1.5 py-0.5 font-mono text-[0.72rem] text-pine">
                Stufe {m.level}
              </span>
            </div>
            <h3 className="mt-1 font-display text-step-1">{m.title}</h3>
            <p className="mt-1 text-[0.94rem] text-ink-soft">{m.body}</p>
          </RevealLi>
        ))}
      </ol>
    </div>
  );
}
