import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMeta } from "@/lib/seo";
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

export const metadata: Metadata = pageMeta("/", {
  title: fm.seoTitle,
  description: fm.seoDescription,
  ogImage: fm.ogImage ?? "/img/hero-2.webp",
});

export default function HomePage() {
  return (
    <>
      <DrivingSchoolJsonLd />

      {/* Hero — hell, Grosstypo */}
      <section className="block-light">
        <div className="wrap grid items-end gap-8 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-5">{fm.hero.eyebrow}</p>
            <h1 className="text-step-5 font-extrabold uppercase tracking-tightest">
              <span className="line-mask">
                <span style={{ animationDelay: "0.05s" }}>Ruhig ans</span>
              </span>
              <span className="line-mask">
                <span style={{ animationDelay: "0.15s" }}>Steuer.</span>
              </span>
              <span className="line-mask text-signal">
                <span style={{ animationDelay: "0.25s" }}>Sicher zur</span>
              </span>
              <span className="line-mask text-signal">
                <span style={{ animationDelay: "0.35s" }}>Prüfung.</span>
              </span>
            </h1>
            <Reveal delay={200}>
              <p className="mt-6 max-w-[50ch] text-step-1 text-ink-soft">{fm.hero.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/kontakt" className="btn btn-signal">
                  Probelektion buchen · CHF 50
                </Link>
                <Link href="/angebot-preise" className="btn btn-ghost">
                  Preise
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <Image
              src={asset("/img/hero-2.webp")}
              alt={`${site.instructor}, Fahrlehrer bei Fahrschule CH`}
              width={1400}
              height={933}
              priority
              unoptimized
              className="aspect-[4/3.6] w-full object-cover"
            />
            <span className="absolute -bottom-3 left-0 bg-midnight px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-white">
              {site.instructor}
            </span>
          </Reveal>
        </div>

        {/* Kennzahlen-Zeile */}
        <div className="border-y-2 border-signal">
          <div className="wrap flex flex-wrap items-center gap-x-10 gap-y-2 py-4 font-mono text-[0.8rem] uppercase tracking-[0.06em] text-ink-soft">
            {[
              [site.stats.students, site.stats.studentsLabel],
              [site.stats.firstTryPass, site.stats.firstTryPassLabel],
              ["4", "Unterrichtssprachen"],
              ...reasons.trustStrip.slice(0, 1).map((t) => ["—", t]),
            ].map(([n, l]) => (
              <span key={String(l)} className="flex items-baseline gap-2">
                <b className="font-display text-step-1 font-extrabold text-signal">{n}</b>
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE — Preismodell auf Dunkel */}
      <section className="section block-dark">
        <div className="wrap">
          <PriceModel />
        </div>
      </section>

      {/* Warum — hell */}
      <section className="section block-light">
        <div className="wrap">
          <SectionHead eyebrow="Warum Fahrschule CH?" title={p.sections.warum} num="01 / 04" />
          <ReasonGrid items={reasons.warum} />
        </div>
      </section>

      {/* Module — dunkel */}
      <section className="section block-dark">
        <div className="wrap">
          <ModuleLadder />
        </div>
      </section>

      {/* Leistungen — hell */}
      <section className="section block-light">
        <div className="wrap">
          <SectionHead eyebrow="Alles aus einer Hand" title={p.sections.leistungen} num="02 / 04" />
          <div className="grid gap-16">
            {p.services.map((sv, i) => (
              <ServiceRow key={sv.title} {...sv} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Vorteile — dunkel */}
      <section className="section block-dark">
        <div className="wrap">
          <Reveal className="mb-10 max-w-[52ch]">
            <div className="flex items-baseline justify-between gap-4">
              <p className="eyebrow">Deine Vorteile</p>
              <span className="seam-num">03 / 04</span>
            </div>
            <h2 className="mt-4 text-step-3 font-extrabold text-white">{p.sections.vorteile}</h2>
          </Reveal>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {reasons.vorteile.map((v) => (
              <li key={v} className="flex gap-3 border-t border-steel pt-4">
                <span className="font-mono text-go-soft">→</span>
                {v}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn btn-signal">
              Anmelden
            </Link>
            <Link href="/angebot-preise" className="btn btn-ghost text-white">
              Preise ansehen
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials — hell */}
      <section className="section block-light">
        <div className="wrap">
          <SectionHead
            eyebrow="Prüfung bestanden – Happy Schüler:innen"
            title={p.sections.testimonials}
            num="04 / 04"
            intro="Die Zufriedenheit meiner Fahrschüler:innen motiviert mich jeden Tag. Ihr Vertrauen ist die Basis meines Erfolges – vielen Dank dafür!"
          />
          <Testimonials />
        </div>
      </section>
    </>
  );
}
