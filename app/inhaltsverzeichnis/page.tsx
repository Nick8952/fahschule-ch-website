import type { Metadata } from "next";
import Link from "next/link";
import { getPage } from "@/lib/content";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

type FM = { seoTitle: string; seoDescription: string; hero: { eyebrow: string; title: string; lead: string } };
const { frontmatter: fm } = getPage<FM>("inhaltsverzeichnis");

export const metadata: Metadata = { title: fm.seoTitle, description: fm.seoDescription };

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

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Inhaltsverzeichnis" />
      <section className="section">
        <div className="wrap-eng">
          <Reveal>
            <ul className="grid gap-2 text-step-1">
              {tree.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-pine underline underline-offset-4 hover:text-signal">
                    {t.label}
                  </Link>
                  {t.children && (
                    <ul className="ml-5 mt-2 grid gap-2 text-step-0">
                      {t.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="text-pine underline underline-offset-4 hover:text-signal"
                          >
                            {c.label}
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
