import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { getPage } from "@/lib/content";
import TranslatedText from "@/components/TranslatedText";

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
        <p className="eyebrow mb-3 justify-center"><TranslatedText path="pages.thanks.eyebrow" de={fm.hero.eyebrow} /></p>
        <h1 className="text-step-4"><TranslatedText path="pages.thanks.title" de={fm.hero.title} /></h1>
        <p className="mx-auto mt-4 max-w-[48ch] text-step-1 text-ink-soft"><TranslatedText path="pages.thanks.lead" de={fm.hero.lead} /></p>
        <div className="mt-8 grid justify-center gap-3 sm:flex sm:flex-wrap">
          <Link href="/" className="btn btn-signal w-[13rem]">
            <TranslatedText de="Zur Startseite" />
          </Link>
          <Link href="/angebot-preise" className="btn btn-ghost w-[13rem]">
            <TranslatedText de="Preise ansehen" />
          </Link>
        </div>
      </div>
    </section>
  );
}
