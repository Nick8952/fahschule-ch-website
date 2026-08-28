import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/site";
import Reveal from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-10 max-w-[54ch] ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow mb-3 ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <h2 className="text-step-3">{title}</h2>
      {intro && <p className="mt-3 text-ink-soft">{intro}</p>}
    </Reveal>
  );
}

export function ReasonGrid({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
      {items.map((r, i) => (
        <Reveal
          key={r.title}
          delay={(i % 2) * 60}
          className="bg-white p-6 transition-colors hover:bg-panel/60 sm:p-7"
        >
          <span className="font-mono text-[0.8rem] text-signal">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-display text-step-1">{r.title}</h3>
          <p className="mt-1.5 text-[0.94rem] leading-relaxed text-ink-soft">{r.body}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function ServiceRow({
  tag,
  title,
  body,
  price,
  href,
  image,
  flip,
}: {
  tag: string;
  title: string;
  body: string;
  price?: string;
  href: string;
  image: string;
  flip?: boolean;
}) {
  return (
    <Reveal className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2">
      <div className={`relative overflow-hidden rounded-lg shadow-m ${flip ? "lg:order-2" : ""}`}>
        <Image
          src={asset(image)}
          alt={title}
          width={1200}
          height={800}
          className="aspect-[16/11] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
          unoptimized
        />
        <span className="absolute bottom-3 left-3 rounded-pill bg-ink/80 px-3 py-1 font-mono text-[0.72rem] uppercase tracking-[0.06em] text-white backdrop-blur">
          {tag}
        </span>
      </div>
      <div>
        <h3 className="text-step-2">{title}</h3>
        <p className="mt-3 text-ink-soft">{body}</p>
        {price && <p className="mt-3 font-mono text-[0.9rem] font-medium text-pine">{price}</p>}
        <Link href={href} className="btn btn-ghost mt-5">
          Mehr Informationen
        </Link>
      </div>
    </Reveal>
  );
}

export function InfoCard({
  big,
  title,
  children,
}: {
  big?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-line bg-white p-6">
      {big && <span className="font-display text-step-3 text-pine">{big}</span>}
      <h3 className="mt-1 font-display text-step-1">{title}</h3>
      <div className="mt-1.5 text-[0.94rem] leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded border-l-2 border-signal bg-signal/[0.06] px-5 py-4 text-ink-soft">
      {children}
    </div>
  );
}
