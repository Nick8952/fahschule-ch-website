import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { getPage } from "@/lib/content";
import { getPageContent } from "@/lib/data";
import PageHero from "@/components/PageHero";
import Prose from "@/components/Prose";
import Reveal from "@/components/Reveal";
import { SectionHead, ServiceRow } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter: fm } = await getPage("kurse");
  return pageMeta("/kurse", { title: fm.seoTitle, description: fm.seoDescription });
}

export default async function Page() {
  const [{ frontmatter: fm, body }, pages] = await Promise.all([getPage("kurse"), getPageContent()]);

  return (
    <>
      <PageHero eyebrow={fm.hero.eyebrow} title={fm.hero.title} lead={fm.hero.lead} crumb="Kurse" />

      <section className="section block-light">
        <div className="wrap">
          <SectionHead eyebrow="Kursübersicht" title="Buche jetzt deinen nächsten Schritt" />
          <div className="grid gap-16">
            {pages.kurse.cards.map((c, i) => (
              <div key={c.title}>
                <ServiceRow
                  tag={c.tag}
                  title={c.title}
                  body={c.body}
                  price={c.price}
                  href={c.href}
                  image={c.image}
                  flip={i % 2 === 1}
                />
                {c.points && c.points.length > 0 && (
                  <ul className="mt-4 grid gap-1.5 pl-1 text-[0.92rem] text-ink-soft lg:pl-[calc(50%+2.5rem)]">
                    {c.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="text-signal">–</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section block-light">
        <div className="wrap-eng">
          <Reveal>
            <Prose body={body} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
