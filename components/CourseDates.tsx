import { courses } from "@/lib/data";

export default function CourseDates() {
  const { dates, datesNote } = courses.vkuEnglish;
  return (
    <div>
      <div className="border-l-2 border-signal bg-signal/[0.07] px-4 py-3 text-[0.9rem]">
        {datesNote}
      </div>
      <div className="mt-4 grid gap-2">
        {dates.map((d) => (
          <div
            key={d.label}
            className="card grid gap-1 !p-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-4"
          >
            <span className="font-mono text-[0.76rem] uppercase tracking-[0.06em] text-signal">
              {d.label}
            </span>
            <span className="text-[0.93rem]">
              <b className="font-display font-bold text-ink">{d.friday}</b> ·{" "}
              <b className="font-display font-bold text-ink">{d.saturday}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
