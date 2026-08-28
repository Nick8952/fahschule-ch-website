import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { prices } from "@/lib/data";
import PageHero from "@/components/PageHero";
import PriceModel from "@/components/PriceModel";
import PriceTable from "@/components/PriceTable";
import Reveal from "@/components/Reveal";
import { SectionHead, InfoCard } from "@/components/ui";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm } = getPage<FM>("angebot-preise");

export const metadata: Metadata = pageMeta("/angebot-preise", { title: fm.seoTitle, description: fm.seoDescription });

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow={fm.hero.eyebrow}
        title={fm.hero.title}
        lead={fm.hero.lead}
        crumb="Angebote & Preise"
      />

      <section className="section block-light">
        <div className="wrap">
          <SectionHead
            eyebrow="Aktuelles Angebot"
            title="Probelektion nur CHF 50 – oder 1 Fahrstunde gratis"
            intro={prices.offer}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoCard big="CHF 50" title="Probelektion">
              Unverbindlich kennenlernen – Automat oder geschaltet.
            </InfoCard>
            <InfoCard big="Gratis" title="1 Fahrstunde nach VKU">
              Bei Besuch des VKU bei Fahrschule CH.
            </InfoCard>
            <InfoCard title="Lektionslängen">
              {prices.lessonLengths.single}
              <br />
              {prices.lessonLengths.onehalf}
              <br />
              {prices.lessonLengths.double}
            </InfoCard>
          </div>
        </div>
      </section>

      <section className="section block-dark">
        <div className="wrap">
          <PriceModel />
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap">
          <SectionHead
            eyebrow="Pakete"
            title="Full Drive · Boost · Basic"
            intro="Alle Pakete beinhalten Doppellektionen (100 Minuten), keine Vorauszahlung und die Abrechnung Ende Monat. Fahrzeug wahlweise Automat oder geschaltet."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {prices.tiers.map((t) => (
              <Reveal key={t.key} className="card !p-6">
                <span className="font-display text-step-3 text-signal">CHF {t.automat}</span>
                <h3 className="mt-1 font-display text-step-1">«{t.name}»</h3>
                <p className="mt-1 text-[0.92rem] text-ink-soft">
                  {t.cond}.<br />
                  Geschaltet: CHF {t.geschaltet}.
                </p>
                <Link href="/kontakt" className="btn btn-signal mt-4 w-full">
                  Anmelden
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap">
          <SectionHead eyebrow="Vollständige Preisliste" title="Alle Preise auf einen Blick" />
          <Reveal>
            <PriceTable />
          </Reveal>
        </div>
      </section>
    </>
  );
}
