import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getPage } from "@/lib/content";
import { getSite } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import { InfoCard } from "@/components/ui";
import TranslatedText from "@/components/TranslatedText";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("kontakt");
  return pageMeta("/kontakt", { title: fm.seoTitle, description: fm.seoDescription });
}

export default async function Page() {
  const [{ frontmatter: fm }, site] = await Promise.all([getPage("kontakt"), getSite()]);
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Kontakt" i18nKey="contact" />
      <section className="section block-light">
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
              <TranslatedText path="ui.phone" de="Tel." />:{" "}
              <a href={`tel:${site.phone.tel}`} className="text-signal">
                +41 78 843 91 76
              </a>
              <br />
              <TranslatedText path="ui.email" de="E-Mail" />:{" "}
              <a href={`mailto:${site.email}`} className="text-signal">
                {site.email}
              </a>
            </InfoCard>
            <InfoCard title="Wie erreichst du uns?">
              <TranslatedText de="Tram oder Bus bis Haltestelle Albisriederplatz:" />
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
