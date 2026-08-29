import { modules } from "@/lib/data";
import { RevealLi } from "./Reveal";

/* 2. Signature: die 8-Modul-Kompetenzleiter mit Taxonomiestufen. */
export default function ModuleLadder() {
  const items = modules.items;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div>
        <p className="eyebrow mb-4">Unterrichtskonzept</p>
        <h2 className="max-w-[16ch] text-step-3 font-extrabold text-white">{modules.heading}</h2>
        <p className="mt-3 max-w-[44ch]">{modules.intro}</p>
        <div className="mt-6 flex items-center gap-3 font-mono text-[0.74rem] uppercase tracking-[0.1em] text-on-dark-faint">
          <span>Taxonomie</span>
          <span className="flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((l) => (
              <span key={l} className="grid h-6 w-6 place-items-center border border-steel">
                {l}
              </span>
            ))}
          </span>
        </div>
      </div>

      <ol className="relative border-l-2 border-steel pl-6">
        {items.map((m, i) => (
          <RevealLi key={m.range} delay={i * 70} className="relative pb-8 last:pb-0">
            <span className="absolute -left-[calc(1.5rem+7px)] top-1.5 h-3 w-3 rounded-full border-2 border-go bg-midnight" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[0.78rem] text-signal-soft">Modul {m.range}</span>
              <span className="border border-steel px-1.5 py-0.5 font-mono text-[0.7rem] text-on-dark-soft">
                Stufe {m.level}
              </span>
            </div>
            <h3 className="mt-1.5 font-display text-step-1 font-bold text-white">{m.title}</h3>
            <p className="mt-1 text-[0.93rem]">{m.body}</p>
          </RevealLi>
        ))}
      </ol>
    </div>
  );
}
