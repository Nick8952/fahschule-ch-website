/* Zugangsdaten fuer Sanity. Alle Werte kommen aus Umgebungsvariablen, damit
   nichts davon im Repository landet (siehe .env.example). */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2024-10-01";
export const readToken = process.env.SANITY_API_READ_TOKEN?.trim() ?? "";

/**
 * Sanity akzeptiert als Projekt-ID nur Kleinbuchstaben, Ziffern und Bindestriche.
 * Die Pruefung hier verhindert, dass ein falsch kopierter Wert erst tief im
 * Client-Konstruktor als kryptischer Fehler auftaucht.
 */
export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);

/**
 * Platzhalter fuer sanity.config.ts: Die Studio-Konfiguration muss sich auch
 * definieren lassen, solange noch kein Projekt existiert. Gerendert wird das
 * Studio in dem Fall ohnehin nicht (siehe app/studio).
 */
export const studioProjectId = isSanityConfigured ? projectId : "nicht-konfiguriert";
