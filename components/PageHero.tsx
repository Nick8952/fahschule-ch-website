import Link from "next/link";
import Reveal from "./Reveal";

export default function PageHero({
  eyebrow,
  title,
  lead,
  crumb,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumb?: string;
}) {
  return (
    <section className="block-light border-b-2 border-signal">
      <div className="wrap pb-12 pt-14 sm:pb-16 sm:pt-20">
        <Reveal>
          <nav className="mb-5 flex flex-wrap gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-soft/70">
            <Link href="/" className="hover:text-signal">
              Start
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink">{crumb ?? title}</span>
          </nav>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="max-w-[16ch] text-step-4 font-extrabold">{title}</h1>
          {lead && (
            <p className="mt-5 max-w-[56ch] text-step-1 text-ink-soft">{lead}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
