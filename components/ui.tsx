import Link from "next/link";
import Image from "next/image";
import { asset } from "@/lib/site";
import Reveal from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  intro,
  num,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  num?: string;
}) {
  return (
    <Reveal className="mb-10 max-w-[52ch]">
      <div className="flex items-baseline justify-between gap-4">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {num && <span className="seam-num">{num}</span>}
      </div>
      <h2 className="mt-4 text-step-3 font-extrabold">{title}</h2>
      {intro && <p className="mt-3">{intro}</p>}
    </Reveal>
  );
}

export function ReasonGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r, i) => (
        <Reveal key={r.title} delay={(i % 3) * 60} className="card card-hover">
          <span className="font-mono text-[0.78rem] text-signal">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-display text-step-1 font-bold">{r.title}</h3>
          <p className="mt-1.5 text-[0.93rem] leading-relaxed">{r.body}</p>
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
    <Reveal className="grid items-center gap-6 sm:gap-12 lg:grid-cols-2">
      <div className={`relative overflow-hidden ${flip ? "lg:order-2" : ""}`}>
        <Image
          src={asset(image)}
          alt={title}
          width={1200}
          height={800}
          className="aspect-[16/11] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
          unoptimized
        />
        <span className="absolute bottom-0 left-0 bg-signal px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-white">
          {tag}
        </span>
      </div>
      <div>
        <h3 className="text-step-2 font-extrabold">{title}</h3>
        <p className="mt-3">{body}</p>
        {price && <p className="mt-3 font-mono text-[0.9rem] text-signal">{price}</p>}
        <Link href={href} className="btn btn-ghost mt-6">
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
    <div className="card">
      {big && <span className="font-display text-step-3 font-extrabold text-signal">{big}</span>}
      <h3 className="mt-1 font-display text-step-1 font-bold">{title}</h3>
      <div className="mt-1.5 text-[0.93rem] leading-relaxed">{children}</div>
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-signal bg-signal/[0.07] px-5 py-4">{children}</div>
  );
}
