import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getPage } from "@/lib/content";
import { site } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { InfoCard } from "@/components/ui";

type FM = {
  seoTitle: string;
  seoDescription: string;
  hero: { eyebrow: string; title: string; lead: string };
};
const { frontmatter: fm } = getPage<FM>("kontakt");

export const metadata: Metadata = pageMeta("/kontakt", { title: fm.seoTitle, description: fm.seoDescription });

export default function Page() {
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Kontakt" />
      <section className="section">
        <div className="wrap grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={100} className="grid gap-4">
            <InfoCard title="So erreichst du mich">
              <strong className="text-ink">
                {site.name} – {site.instructor}
              </strong>
              <br />
              {site.address.center}
              <br />
              {site.address.street}, {site.address.zip} {site.address.city}
              <br />
              Tel.:{" "}
              <a href={`tel:${site.phone.tel}`} className="text-pine">
                +41 78 843 91 76
              </a>
              <br />
              E-Mail:{" "}
              <a href={`mailto:${site.email}`} className="text-pine">
                {site.email}
              </a>
            </InfoCard>
            <InfoCard title="Wie erreichst du uns?">
              Tram oder Bus bis Haltestelle Albisriederplatz:
              <br />
              {site.transit}
            </InfoCard>
            <MapEmbed />
          </Reveal>
        </div>
      </section>
    </>
  );
}
