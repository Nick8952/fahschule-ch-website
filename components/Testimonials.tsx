import { testimonials } from "@/lib/data";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {testimonials.items.map((t, i) => (
        <Reveal
          key={t.name}
          delay={(i % 3) * 80}
          className="mb-5 break-inside-avoid rounded-lg border border-line bg-white p-5"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="tracking-[2px] text-signal">★★★★★</span>
            {t.lang === "en" && (
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-faint">
                EN
              </span>
            )}
          </div>
          <p className="text-[0.94rem] leading-relaxed text-ink-soft">„{t.text}"</p>
          <p className="mt-3 font-display text-[1.05rem]">{t.name}</p>
        </Reveal>
      ))}
    </div>
  );
}
