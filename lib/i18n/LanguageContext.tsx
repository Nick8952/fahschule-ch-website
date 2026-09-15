"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LANGUAGES, type Lang } from "./lang";
import { getTranslation } from "./lookup";

export { LANGUAGES, type Lang } from "./lang";

const STORAGE_KEY = "fahrschule-ch-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string | string[], de: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // German is deliberately used for SSR and the first browser render. The saved
  // preference is applied after mount so React never hydrates different text.
  const [lang, setLangState] = useState<Lang>("de");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (LANGUAGES.includes(saved as Lang)) setLangState(saved as Lang);
    } catch {
      // Storage can be unavailable in hardened/private browsing contexts.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "de" ? "de-CH" : "en";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The in-memory preference still works for the current visit.
    }
  }, []);

  const t = useCallback(
    (path: string | string[], de: string) => getTranslation(path, lang, de),
    [lang],
  );
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage() must be used inside LanguageProvider");
  return value;
}

export function useT() {
  return useLanguage().t;
}
