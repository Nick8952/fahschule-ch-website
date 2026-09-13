import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

/**
 * Null, solange kein Sanity-Projekt konfiguriert ist. Alle Aufrufer gehen ueber
 * sanityFetch() und bekommen dort automatisch die Inhalte aus data/ und content/.
 * Dadurch laeuft die Website auch dann, wenn Sanity noch nicht eingerichtet ist.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
