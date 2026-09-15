import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { getPage } from "@/lib/content";
import { getPageContent, getSite } from "@/lib/data";
import { asset } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ModuleLadder from "@/components/ModuleLadder";
import { SectionHead, ReasonGrid, InfoCard } from "@/components/ui";
import TranslatedText from "@/components/TranslatedText";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("ueber-mich");
  return pageMeta("/ueber-mich", { title: fm.seoTitle, description: fm.seoDescription });
}

export default async function Page() {
  const [{ frontmatter: fm }, site, pages] = await Promise.all([
    getPage("ueber-mich"),
    getSite(),
    getPageContent(),
  ]);
  const p = pages.ueberMich;

  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Über mich" i18nKey="about" />

      <section className="section block-light">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-lg">
            <Image
              src={asset("/img/hero-3.webp")}
              alt={`${site.instructor} — Zürichsee`}
              width={1400}
              height={933}
              unoptimized
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <Reveal>
            <p className="eyebrow mb-3"><TranslatedText de="Willkommen" /></p>
            <h2 className="text-step-2"><TranslatedText de={p.sections.intro} /></h2>
            <p className="mt-3 text-ink-soft"><TranslatedText de={p.introBody} /></p>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {[
                [site.stats.sinceYear, site.stats.sinceYearLabel],
                [site.stats.students, "Fahrschüler:innen in 9 Jahren"],
                [site.stats.firstTryPass, site.stats.firstTryPassLabel],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-step-2 text-signal">{n}</dt>
                  <dd className="font-mono text-[0.76rem] uppercase tracking-[0.04em] text-ink-soft/60">
                    <TranslatedText de={l} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap">
          <SectionHead eyebrow="Mein Unterrichtskonzept" title={p.sections.konzept} />
          <ReasonGrid items={p.konzeptPunkte} />
        </div>
      </section>

      <section className="section block-dark">
        <div className="wrap">
          <ModuleLadder />
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap">
          <SectionHead eyebrow="Was mich auszeichnet" title={p.sections.auszeichnet} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.auszeichnetPunkte.map((x) => (
              <InfoCard key={x.title} title={x.title}>
                <TranslatedText de={x.body} />
              </InfoCard>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link href="/kontakt" className="btn btn-signal w-full sm:w-[17rem]">
              <TranslatedText de="Probelektion vereinbaren" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
