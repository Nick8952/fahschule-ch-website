"use client";

import { useT } from "@/lib/i18n/LanguageContext";

export default function TranslatedText({
  path,
  de,
}: {
  path?: string | string[];
  de: string;
}) {
  const t = useT();
  return <>{t(path ?? ["copy", de], de)}</>;
}
