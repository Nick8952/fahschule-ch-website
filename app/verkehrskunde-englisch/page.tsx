import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getPage } from "@/lib/content";
import { getCourses } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import CourseDates from "@/components/CourseDates";
import VkuRegistrationForm from "@/components/VkuRegistrationForm";
import { InfoCard } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("verkehrskunde-englisch");
  return pageMeta("/verkehrskunde-englisch", { title: fm.seoTitle, description: fm.seoDescription });
}

export default async function Page() {
  const [{ frontmatter: fm, body }, courses] = await Promise.all([
    getPage("verkehrskunde-englisch"),
    getCourses(),
  ]);
  const v = courses.vkuEnglish;
  return (
    <>
      <PageHero
        eyebrow={fm.hero.eyebrow}
        title={fm.hero.title}
        lead={fm.hero.lead}
        crumb="Verkehrskunde Englisch"
      />
      <section className="section block-light">
        <div className="wrap-eng">
          <Reveal>
            <Prose body={body} />
            <div className="my-8 grid gap-4 sm:grid-cols-3">
              <InfoCard big={v.fee} title="Course fee (cash)">
                {v.feeNote}
              </InfoCard>
              <InfoCard title="Requirements">{v.requirements}</InfoCard>
              <InfoCard title="Bring along">{v.bring}</InfoCard>
            </div>
            <h2 className="font-display text-step-2">Course location</h2>
            <p className="prose mt-2">{v.location}</p>
            <h2 className="mt-8 font-display text-step-2">
              Overview of VKU English in Zurich / Albisriederplatz
            </h2>
          </Reveal>
          <Reveal className="mt-4">
            <CourseDates />
          </Reveal>
          <Reveal className="mt-10">
            <h2 className="font-display text-step-2">Register for the VKU English course</h2>
            <p className="mt-1 text-ink-soft">
              You will receive a confirmation by e-mail within 24&nbsp;h.
            </p>
            <div className="mt-5">
              <VkuRegistrationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
