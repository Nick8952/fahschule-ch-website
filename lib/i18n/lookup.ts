import type { Lang } from "./lang";
import { translations } from "./translations";

export function getTranslation(
  path: string | string[],
  lang: Lang,
  de: string,
): string {
  if (lang === "de") return de;

  const parts = Array.isArray(path) ? path : path.split(".");
  let node: unknown = translations[lang];
  for (const part of parts) {
    if (typeof node !== "object" || node === null) return de;
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string" ? node : de;
}
