import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPage } from "@/lib/content";
import { site, reasons, pages } from "@/lib/data";
import { asset } from "@/lib/site";
import { DrivingSchoolJsonLd } from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import PriceModel from "@/components/PriceModel";
import ModuleLadder from "@/components/ModuleLadder";
import Testimonials from "@/components/Testimonials";
import { SectionHead, ReasonGrid, ServiceRow } from "@/components/ui";

type Home = {
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  hero: { eyebrow: string; title: string; lead: string; badge: string };
};

const { frontmatter: fm } = getPage<Home>("home");
const p = pages.home;

export const metadata: Metadata = {
  title: fm.seoTitle,
  description: fm.seoDescription,
  openGraph: {
    title: fm.seoTitle,
    description: fm.seoDescription,
    images: [fm.ogImage ?? "/img/hero-2.webp"],
  },
};

export default function HomePage() {
  return (
    <>
      <DrivingSchoolJsonLd />

      <section className="relative overflow-hidden">
        <div className="wrap grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-pill bg-pine-tint px-3 py-1 font-mono text-[0.76rem] font-medium text-pine">
                {fm.hero.badge}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-step-4">{fm.hero.title}</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-[52ch] text-step-1 text-ink-soft">{fm.hero.lead}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/kontakt" className="btn btn-primary">
                  Probelektion buchen
                </Link>
                <Link href="/angebot-preise" className="btn btn-ghost">
                  Preise ansehen
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
                {[
                  [site.stats.students, site.stats.studentsLabel],
                  [site.stats.firstTryPass, site.stats.firstTryPassLabel],
                  ["4", "Unterrichtssprachen"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <dt className="font-display text-step-2 text-pine">{num}</dt>
                    <dd className="font-mono text-[0.78rem] uppercase tracking-[0.04em] text-ink-faint">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <div className="overflow-hidden rounded-lg shadow-l">
              <Image
                src={asset("/img/hero-2.webp")}
                alt={`${site.instructor}, Fahrlehrer bei Fahrschule CH`}
                width={1400}
                height={933}
                priority
                unoptimized
                className="aspect-[4/3.4] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded border-2 border-signal sm:block sm:h-24 sm:w-40" />
          </Reveal>
        </div>
      </section>

      <div className="border-y border-line bg-white">
        <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-2 py-4 text-[0.9rem]">
          {reasons.trustStrip.map((t) => (
            <span key={t} className="flex items-center gap-2 text-ink-soft">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-signal"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      <section className="section bg-paper">
        <div className="wrap">
          <PriceModel />
        </div>
      </section>

      <section className="section bg-panel">
        <div className="wrap">
          <SectionHead eyebrow="Warum Fahrschule CH?" title={p.sections.warum} />
          <ReasonGrid items={reasons.warum} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ModuleLadder />
        </div>
      </section>

      <section className="section bg-panel">
        <div className="wrap">
          <SectionHead eyebrow="Alles aus einer Hand" title={p.sections.leistungen} />
          <div className="grid gap-16">
            {p.services.map((sv, i) => (
              <ServiceRow key={sv.title} {...sv} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section on-dark bg-pine text-white">
        <div className="wrap">
          <Reveal className="mb-10 max-w-[54ch]">
            <p className="eyebrow mb-3 !text-white/70">Deine Vorteile</p>
            <h2 className="text-step-3 text-white">{p.sections.vorteile}</h2>
          </Reveal>
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {reasons.vorteile.map((v) => (
              <li key={v} className="flex gap-3 border-t border-white/15 pt-4 text-white/85">
                <span className="font-mono text-signal">✓</span>
                {v}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn btn-primary">
              Anmelden
            </Link>
            <Link href="/angebot-preise" className="btn btn-ghost">
              Preise ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-panel">
        <div className="wrap">
          <SectionHead
            eyebrow="Prüfung bestanden – Happy Schüler:innen"
            title={p.sections.testimonials}
            intro="Die Zufriedenheit meiner Fahrschüler:innen motiviert mich jeden Tag. Ihr Vertrauen ist die Basis meines Erfolges – vielen Dank dafür!"
          />
          <Testimonials />
        </div>
      </section>
    </>
  );
}
