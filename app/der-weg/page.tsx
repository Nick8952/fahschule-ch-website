import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { getSteps } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PathSteps from "@/components/PathSteps";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("der-weg");
  return pageMeta("/der-weg", { title: fm.seoTitle, description: fm.seoDescription });
}

export default async function Page() {
  const [{ frontmatter: fm }, steps] = await Promise.all([getPage("der-weg"), getSteps()]);
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Der Weg" />
      <section className="section block-light">
        <div className="wrap">
          <PathSteps steps={steps} />
          <Reveal className="mt-10">
            <Link href="/kontakt" className="btn btn-signal">
              Fragen? Jetzt Kontakt aufnehmen
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
