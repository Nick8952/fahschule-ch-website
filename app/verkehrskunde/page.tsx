import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { getPage } from "@/lib/content";
import { getCourses } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import VkuCalendar from "@/components/VkuCalendar";
import { InfoCard } from "@/components/ui";
import TranslatedText from "@/components/TranslatedText";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("verkehrskunde");
  return pageMeta("/verkehrskunde", { title: fm.seoTitle, description: fm.seoDescription });
}

export default async function Page() {
  const [{ frontmatter: fm, body }, courses] = await Promise.all([
    getPage("verkehrskunde"),
    getCourses(),
  ]);
  const v = courses.vkuDeutsch;
  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Verkehrskunde Deutsch" i18nKey="vku" />
      <section className="section block-light">
        <div className="wrap-eng">
          <Reveal>
            <p className="prose"><TranslatedText de={v.intro} /></p>
            <div className="my-8 grid gap-4 sm:grid-cols-3">
              <InfoCard big={v.fee} title="VKU Deutsch">
                VKU English: {v.feeEnglish}.
              </InfoCard>
              <InfoCard title="Inklusive"><TranslatedText de={v.includes} /></InfoCard>
              <InfoCard title="Mitbringen"><TranslatedText de={v.bring} /></InfoCard>
            </div>
            <h2 className="font-display text-step-2"><TranslatedText de="Wo findet der Kurs statt?" /></h2>
            <p className="prose mt-2"><TranslatedText de={v.location} /></p>
            <h2 className="mt-8 font-display text-step-2"><TranslatedText de="Buche deinen VKU-Kurs" /></h2>
            <div className="prose mt-2">
              <Prose body={body} />
            </div>
          </Reveal>
          <Reveal className="mt-6">
            <VkuCalendar src={v.iframeUrl} />
            <p className="mt-4">
              <Link href="/kontakt" className="btn btn-ghost w-full sm:w-[15rem]">
                <TranslatedText de="Oder frag mich direkt" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
