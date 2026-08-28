import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pageMeta } from "@/lib/seo";
import { getPage } from "@/lib/content";
import { site, pages } from "@/lib/data";
import { asset } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import { SectionHead, ReasonGrid } from "@/components/ui";

type FM = {
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm, html } = getPage<FM>("driving-school");
const p = pages.drivingSchool;

export const metadata: Metadata = pageMeta("/driving-school", {
  title: fm.seoTitle,
  description: fm.seoDescription,
  ogImage: fm.ogImage ?? "/img/hero-2.webp",
  ogLocale: "en_CH",
});

export default function Page() {
  return (
    <div lang="en">
      <div className="bg-signal/10">
        <div className="wrap flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-[0.88rem] text-ink-soft">
          <span>{p.langNote}</span>
          <Link href={p.langNoteLink.href} hrefLang="de" className="font-semibold text-signal">
            {p.langNoteLink.label}
          </Link>
        </div>
      </div>

      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="English" />

      <section className="section block-light">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-lg">
            <Image
              src={asset("/img/hero-2.webp")}
              alt={`${site.instructor}, driving instructor at Fahrschule CH`}
              width={1400}
              height={933}
              unoptimized
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <Reveal>
            <h2 className="text-step-2">{p.sections.intro}</h2>
            <p className="mt-3 text-ink-soft">{p.intro}</p>
          </Reveal>
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap">
          <SectionHead eyebrow="Why Fahrschule CH?" title={p.sections.reasonsTitle} />
          <ReasonGrid items={p.reasons} />
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap-eng">
          <Reveal>
            <Prose html={html} />
            <p className="mt-6 flex flex-wrap gap-3">
              <Link href="/kontakt" className="btn btn-signal">
                Book a trial lesson
              </Link>
              <Link href="/verkehrskunde-englisch" className="btn btn-ghost">
                VKU English
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
