import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { getPage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("danke");
  return pageMeta("/danke", {
    title: fm.seoTitle,
    description: fm.seoDescription,
    noindex: true,
  });
}

export default async function Page() {
  const { frontmatter: fm } = await getPage("danke");
  return (
    <section className="section block-light">
      <div className="wrap-eng text-center">
        <p className="eyebrow justify-center mb-3">{fm.hero.eyebrow}</p>
        <h1 className="text-step-4">{fm.hero.title}</h1>
        <p className="mx-auto mt-4 max-w-[48ch] text-step-1 text-ink-soft">{fm.hero.lead}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-signal">
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
