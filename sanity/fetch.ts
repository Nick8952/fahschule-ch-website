import { client } from "./client";

/**
 * Zentraler Lesezugriff.
 *
 * Die Website darf aus drei Gruenden nicht kaputtgehen: kein Sanity-Projekt
 * konfiguriert, das Dokument noch nicht angelegt, oder die API gerade nicht
 * erreichbar. In allen drei Faellen kommt der uebergebene Rueckfall-Inhalt
 * zurueck (die Dateien in data/ und content/).
 *
 * Der Fehlerfall wird protokolliert statt verschluckt - sonst sucht man spaeter
 * lange nach einer Seite, die "einfach die falschen Texte zeigt".
 *
 * revalidate: 60 heisst, dass eine Aenderung im Studio spaetestens nach einer
 * Minute sichtbar ist. Sofort sichtbar wird sie ueber den Sanity-Webhook auf
 * /api/revalidate.
 */
export async function sanityFetch<T>(
  query: string,
  fallback: T | (() => T),
  params: Record<string, unknown> = {},
): Promise<T> {
  // Der Rueckfall wird als Funktion uebergeben und erst ausgewertet, wenn er
  // wirklich gebraucht wird. Sonst wuerde bei jedem Aufruf die Markdown-Datei
  // vom Dateisystem gelesen - auch dann, wenn Sanity laengst antwortet.
  const resolve = () => (typeof fallback === "function" ? (fallback as () => T)() : fallback);

  if (!client) return resolve();

  try {
    const result = await client.fetch<T | null>(query, params, {
      next: { revalidate: 60, tags: ["sanity"] },
    });

    if (result === null || result === undefined) return resolve();
    if (Array.isArray(result) && result.length === 0) return resolve();

    return result;
  } catch (error) {
    console.error(`[sanity] Abfrage fehlgeschlagen, nutze Rueckfall-Inhalt.\n${query}\n`, error);
    return resolve();
  }
}
