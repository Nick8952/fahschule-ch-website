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
    <section className="border-b border-line bg-panel">
      <div className="wrap pb-10 pt-12 sm:pb-14 sm:pt-16">
        <Reveal>
          <nav className="mb-4 flex flex-wrap gap-2 font-mono text-[0.74rem] uppercase tracking-[0.1em] text-ink-faint">
            <Link href="/" className="hover:text-pine">
              Start
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink-soft">{crumb ?? title}</span>
          </nav>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="max-w-[20ch] text-step-4">{title}</h1>
          {lead && <p className="mt-4 max-w-[58ch] text-step-1 text-ink-soft">{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}
