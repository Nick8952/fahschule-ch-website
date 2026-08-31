/* Pfad- und URL-Helfer. Standard-Deploy: GitHub Pages unter /fahschule-ch_demo.
   Die Werte kommen zur Build-Zeit aus next.config.mjs (env), gesetzt in der jeweiligen CI. */

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/fahschule-ch_demo";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nick8952.github.io/fahschule-ch_demo";

/** Für plain <img>/<video>/<source> und CSS-Hintergründe: stellt das Basispräfix voran.
 *  (next/link und next/image machen das automatisch – dort NICHT verwenden.) */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return BASE_PATH + (path.startsWith("/") ? path : "/" + path);
}

/** Absolute URL für canonical / og:url / JSON-LD / Formular-Redirects. */
export function absUrl(path = "/"): string {
  return SITE_URL.replace(/\/$/, "") + (path.startsWith("/") ? path : "/" + path);
}
