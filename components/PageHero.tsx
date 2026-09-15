import Link from "next/link";
import Reveal from "./Reveal";
import TranslatedText from "./TranslatedText";

export default function PageHero({
  eyebrow,
  title,
  lead,
  crumb,
  i18nKey,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumb?: string;
  i18nKey?: string;
}) {
  return (
    <section className="block-light">
      <div className="wrap pb-12 pt-14 sm:pb-16 sm:pt-20">
        <Reveal>
          <nav className="mb-5 flex flex-wrap gap-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-soft/70">
            <Link href="/" className="hover:text-signal">
              <TranslatedText path="ui.home" de="Start" />
            </Link>
            <span aria-hidden>/</span>
            <span className="text-ink">
              <TranslatedText path={i18nKey ? `pages.${i18nKey}.crumb` : undefined} de={crumb ?? title} />
            </span>
          </nav>
          {eyebrow && <p className="eyebrow mb-4"><TranslatedText path={i18nKey ? `pages.${i18nKey}.eyebrow` : undefined} de={eyebrow} /></p>}
          <h1 className="max-w-[16ch] text-step-4 font-extrabold"><TranslatedText path={i18nKey ? `pages.${i18nKey}.title` : undefined} de={title} /></h1>
          {lead && (
            <p className="mt-5 max-w-[56ch] text-step-1 text-ink-soft"><TranslatedText path={i18nKey ? `pages.${i18nKey}.lead` : undefined} de={lead} /></p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
