import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import { getPage } from "@/lib/content";
import { getPageContent, getPrices, getReasons, getSite } from "@/lib/data";
import { asset } from "@/lib/site";
import { DrivingSchoolJsonLd } from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import PriceModel from "@/components/PriceModel";
import ModuleLadder from "@/components/ModuleLadder";
import Testimonials from "@/components/Testimonials";
import { SectionHead, ReasonGrid, ServiceRow } from "@/components/ui";
import TranslatedText from "@/components/TranslatedText";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("home");
  return pageMeta("/", {
    title: fm.seoTitle,
    description: fm.seoDescription,
    ogImage: fm.ogImage ?? "/img/hero-2.webp",
  });
}

export default async function HomePage() {
  const [{ frontmatter: fm }, site, reasons, pages, prices] = await Promise.all([
    getPage("home"),
    getSite(),
    getReasons(),
    getPageContent(),
    getPrices(),
  ]);
  const p = pages.home;

  return (
    <>
      <DrivingSchoolJsonLd />

      {/* Hero — hell, Grosstypo */}
      <section className="block-light">
        <div className="wrap grid items-end gap-8 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-5"><TranslatedText path="pages.home.eyebrow" de={fm.hero.eyebrow} /></p>
            <h1 className="min-h-[4em] text-step-5 font-extrabold uppercase tracking-tightest sm:min-h-[3em] lg:min-h-[4em]">
              <span className="line-mask">
                <span style={{ animationDelay: "0.05s" }}><TranslatedText de="Ruhig ans" /></span>
              </span>
              <span className="line-mask">
                <span style={{ animationDelay: "0.15s" }}><TranslatedText de="Steuer." /></span>
              </span>
              <span className="line-mask text-signal">
                <span style={{ animationDelay: "0.25s" }}><TranslatedText de="Sicher zur" /></span>
              </span>
              <span className="line-mask text-signal">
                <span style={{ animationDelay: "0.35s" }}><TranslatedText de="Prüfung." /></span>
              </span>
            </h1>
            <Reveal delay={200}>
              <p className="mt-6 min-h-[7.5rem] max-w-[50ch] text-step-1 text-ink-soft sm:min-h-[6rem] lg:min-h-[7.5rem]"><TranslatedText path="pages.home.lead" de={fm.hero.lead} /></p>
              <div className="mt-7 grid items-center gap-3 sm:flex sm:flex-wrap">
                <Link href="/kontakt" className="btn btn-signal w-full whitespace-nowrap sm:w-auto">
                  <TranslatedText de="Probelektion buchen · CHF 50" />
                </Link>
                <Link href="/angebot-preise" className="btn btn-ghost w-full whitespace-nowrap sm:w-auto">
                  <TranslatedText de="Preise" />
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
        <div className="stat-strip border-y-2 border-signal">
          <div className="wrap flex flex-wrap items-center gap-x-10 gap-y-2 py-4 font-mono text-[0.8rem] uppercase tracking-[0.06em] text-ink-soft">
            {[
              [site.stats.students, site.stats.studentsLabel],
              [site.stats.firstTryPass, site.stats.firstTryPassLabel],
              ["4", "Unterrichtssprachen"],
              ...reasons.trustStrip.slice(0, 1).map((t) => ["—", t]),
            ].map(([n, l], i) => (
              <span key={String(l)} className="flex items-baseline gap-2">
                <b className="font-display text-step-1 font-extrabold tabular-nums text-signal">
                  <CountUp value={n} delay={i * 0.12} />
                </b>
                <TranslatedText de={String(l)} />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE — Preismodell auf Dunkel */}
      <section className="section block-dark">
        <div className="wrap">
          <PriceModel prices={prices} />
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
              <p className="eyebrow"><TranslatedText de="Deine Vorteile" /></p>
              <span className="seam-num">03 / 04</span>
            </div>
            <h2 className="mt-4 text-step-3 font-extrabold text-white"><TranslatedText de={p.sections.vorteile} /></h2>
          </Reveal>
          <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {reasons.vorteile.map((v) => (
              <li key={v} className="flex gap-3 border-t border-steel pt-4">
                <span className="font-mono text-go-soft">→</span>
                <TranslatedText de={v} />
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Link href="/kontakt" className="btn btn-signal w-full sm:w-[10rem]">
              <TranslatedText de="Anmelden" />
            </Link>
            <Link href="/angebot-preise" className="btn btn-ghost w-full text-white sm:w-[12rem]">
              <TranslatedText de="Preise ansehen" />
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
