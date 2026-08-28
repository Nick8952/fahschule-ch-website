import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { courses } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import VkuCalendar from "@/components/VkuCalendar";
import { InfoCard } from "@/components/ui";

type FM = { seoTitle: string; seoDescription: string; hero: { eyebrow: string; title: string; lead: string } };
const { frontmatter: fm, html } = getPage<FM>("verkehrskunde");
const v = courses.vkuDeutsch;

export const metadata: Metadata = { title: fm.seoTitle, description: fm.seoDescription };

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Verkehrskunde Deutsch" />
      <section className="section">
        <div className="wrap-eng">
          <Reveal>
            <p className="prose">{v.intro}</p>
            <div className="my-8 grid gap-4 sm:grid-cols-3">
              <InfoCard big={v.fee} title="VKU Deutsch">
                VKU Englisch: {v.feeEnglish}.
              </InfoCard>
              <InfoCard title="Inklusive">{v.includes}</InfoCard>
              <InfoCard title="Mitbringen">{v.bring}</InfoCard>
            </div>
            <h2 className="font-display text-step-2">Wo findet der Kurs statt?</h2>
            <p className="prose mt-2">{v.location}</p>
            <h2 className="mt-8 font-display text-step-2">Buche deinen VKU-Kurs</h2>
            <div className="prose mt-2">
              <Prose html={html} />
            </div>
          </Reveal>
          <Reveal className="mt-6">
            <VkuCalendar />
            <p className="mt-4">
              <Link href="/kontakt" className="btn btn-ghost">
                Oder frag mich direkt
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
