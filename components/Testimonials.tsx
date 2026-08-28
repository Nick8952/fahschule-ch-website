import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {testimonials.items.map((t, i) => (
        <Reveal key={t.name} delay={(i % 3) * 80} className="card mb-4 break-inside-avoid">
          <div className="mb-2 flex items-center justify-between">
            <span className="tracking-[2px] text-signal">★★★★★</span>
            {t.lang === "en" && (
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink-soft/60">
                EN
              </span>
            )}
          </div>
          <p className="text-[0.93rem] leading-relaxed">„{t.text}"</p>
          <p className="mt-3 font-display text-[1.15rem] font-bold text-ink">{t.name}</p>
        </Reveal>
      ))}
    </div>
  );
}
