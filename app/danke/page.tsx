import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";

type FM = { seoTitle: string; seoDescription: string; hero: { eyebrow: string; title: string; lead: string } };
const { frontmatter: fm } = getPage<FM>("danke");

export const metadata: Metadata = {
  title: fm.seoTitle,
  description: fm.seoDescription,
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <section className="section">
      <div className="wrap-eng text-center">
        <p className="eyebrow justify-center mb-3">{fm.hero.eyebrow}</p>
        <h1 className="text-step-4">{fm.hero.title}</h1>
        <p className="mx-auto mt-4 max-w-[48ch] text-step-1 text-ink-soft">{fm.hero.lead}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-pine">
            Zur Startseite
          </Link>
          <Link href="/angebot-preise" className="btn btn-ghost">
            Preise ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}
