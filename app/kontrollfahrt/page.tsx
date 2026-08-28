import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { pages } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Callout } from "@/components/ui";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm, html } = getPage<FM>("kontrollfahrt");
const p = pages.kontrollfahrt;

export const metadata: Metadata = pageMeta("/kontrollfahrt", { title: fm.seoTitle, description: fm.seoDescription });

export default function Page() {
  const [head, ...rest] = p.callout.split("! ");
  return (
    <>
      <PageHero
        eyebrow={fm.hero.eyebrow}
        title={fm.hero.title}
        lead={fm.hero.lead}
        crumb="Kontrollfahrt"
      />
      <section className="section">
        <div className="wrap-eng">
          <Reveal>
            <Callout>
              <strong>{head}!</strong> {rest.join("! ")}
            </Callout>
            <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: html }} />
            <h2 className="mt-8 font-display text-step-2">Gut zu wissen</h2>
            <ul className="prose mt-3">
              {p.gutZuWissen.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/kontakt" className="btn btn-primary">
                Jetzt für die Kontrollfahrt anmelden
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
