import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { courses } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import { InfoCard, Callout } from "@/components/ui";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm, html } = getPage<FM>("theoriekurs");
const t = courses.theoriekurs;

export const metadata: Metadata = { title: fm.seoTitle, description: fm.seoDescription };

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Theoriekurs" />
      <section className="section">
        <div className="wrap-eng">
          <Reveal>
            <Prose html={html} />
            <div className="my-8 grid gap-4 sm:grid-cols-3">
              <InfoCard big={t.fee} title="Kursgebühr">
                {t.voucher}
              </InfoCard>
              <InfoCard title="Wann?">
                {t.times.map((x) => (
                  <span key={x} className="block">
                    {x}
                  </span>
                ))}
              </InfoCard>
              <InfoCard title="Wo?">{t.location}</InfoCard>
            </div>
            <Callout>
              <strong>Gut zu wissen:</strong> {t.note}
            </Callout>
            <p className="mt-6">
              <Link href="/kontakt" className="btn btn-primary">
                Zur Anmeldung
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
