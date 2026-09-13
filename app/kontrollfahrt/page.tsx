import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { getPageContent } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import { Callout } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("kontrollfahrt");
  return pageMeta("/kontrollfahrt", { title: fm.seoTitle, description: fm.seoDescription });
}

export default async function Page() {
  const [{ frontmatter: fm, body }, pages] = await Promise.all([
    getPage("kontrollfahrt"),
    getPageContent(),
  ]);
  const p = pages.kontrollfahrt;
  const [head, ...rest] = p.callout.split("! ");
  return (
    <>
      <PageHero
        eyebrow={fm.hero.eyebrow}
        title={fm.hero.title}
        lead={fm.hero.lead}
        crumb="Kontrollfahrt"
      />
      <section className="section block-light">
        <div className="wrap-eng">
          <Reveal>
            <Callout>
              <strong>{head}!</strong> {rest.join("! ")}
            </Callout>
            <div className="mt-6">
              <Prose body={body} />
            </div>
            <h2 className="mt-8 font-display text-step-2">Gut zu wissen</h2>
            <ul className="prose mt-3">
              {p.gutZuWissen.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/kontakt" className="btn btn-signal">
                Jetzt für die Kontrollfahrt anmelden
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
