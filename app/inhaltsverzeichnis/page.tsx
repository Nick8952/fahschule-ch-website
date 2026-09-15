import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { getPage } from "@/lib/content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import TranslatedText from "@/components/TranslatedText";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("inhaltsverzeichnis");
  return pageMeta("/inhaltsverzeichnis", { title: fm.seoTitle, description: fm.seoDescription });
}

const tree: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: "Start", href: "/" },
  {
    label: "Angebote / Preise",
    href: "/angebot-preise",
    children: [{ label: "AGB", href: "/agb" }],
  },
  { label: "Über mich", href: "/ueber-mich" },
  {
    label: "Kurse",
    href: "/kurse",
    children: [
      { label: "Theoriekurs", href: "/theoriekurs" },
      { label: "Verkehrskunde Deutsch", href: "/verkehrskunde" },
      { label: "Verkehrskunde Englisch", href: "/verkehrskunde-englisch" },
    ],
  },
  { label: "Kontrollfahrt", href: "/kontrollfahrt" },
  { label: "Der Weg", href: "/der-weg" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Driving School Zürich", href: "/driving-school" },
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];

export default async function Page() {
  const { frontmatter: fm } = await getPage("inhaltsverzeichnis");
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Inhaltsverzeichnis" i18nKey="sitemap" />
      <section className="section block-light">
        <div className="wrap-eng">
          <Reveal>
            <ul className="grid gap-2 text-step-1">
              {tree.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-signal underline underline-offset-4 hover:text-signal-600">
                    <TranslatedText path={["nav", t.label]} de={t.label} />
                  </Link>
                  {t.children && (
                    <ul className="ml-5 mt-2 grid gap-2 text-step-0">
                      {t.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="text-signal underline underline-offset-4 hover:text-signal-600"
                          >
                            <TranslatedText path={["nav", c.label]} de={c.label} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
