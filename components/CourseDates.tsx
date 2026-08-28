import { courses } from "@/lib/data";

export default function CourseDates() {
  const { dates, datesNote } = courses.vkuEnglish;
  return (
    <div>
      <div className="rounded border-l-2 border-signal bg-signal/5 px-4 py-3 text-[0.9rem] text-ink-soft">
        {datesNote}
      </div>
      <div className="mt-4 grid gap-2.5">
        {dates.map((d) => (
          <div
            key={d.label}
            className="grid gap-1 rounded border border-line bg-white px-4 py-3 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-4"
          >
            <span className="font-mono text-[0.78rem] uppercase tracking-[0.06em] text-pine">
              {d.label}
            </span>
            <span className="text-[0.94rem] text-ink-soft">
              <b className="font-display text-ink">{d.friday}</b> · <b className="font-display text-ink">{d.saturday}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
