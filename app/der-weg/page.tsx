import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { getPage } from "@/lib/content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PathSteps from "@/components/PathSteps";

type FM = { seoTitle: string; seoDescription: string; hero: { eyebrow: string; title: string; lead: string } };
const { frontmatter: fm } = getPage<FM>("der-weg");

export const metadata: Metadata = pageMeta("/der-weg", { title: fm.seoTitle, description: fm.seoDescription });

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Der Weg" />
      <section className="section">
        <div className="wrap">
          <PathSteps />
          <Reveal className="mt-10">
            <Link href="/kontakt" className="btn btn-primary">
              Fragen? Jetzt Kontakt aufnehmen
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
