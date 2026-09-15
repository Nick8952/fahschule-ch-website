"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`grid w-[5.25rem] shrink-0 grid-cols-2 rounded-pill border border-steel bg-midnight-2/80 p-0.5 ${className}`}
      role="group"
      aria-label="Sprache / Language"
    >
      <button
        type="button"
        onClick={() => setLang("de")}
        aria-label="Auf Deutsch wechseln"
        aria-pressed={lang === "de"}
        className={`grid h-8 w-10 place-items-center rounded-pill font-mono text-[0.7rem] font-medium tracking-[0.05em] transition-colors ${
          lang === "de" ? "bg-white text-midnight shadow-sm" : "text-on-dark-soft hover:text-white"
        }`}
      >
        DE
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-label="Switch to English"
        aria-pressed={lang === "en"}
        className={`grid h-8 w-10 place-items-center rounded-pill font-mono text-[0.7rem] font-medium tracking-[0.05em] transition-colors ${
          lang === "en" ? "bg-white text-midnight shadow-sm" : "text-on-dark-soft hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
