/** @type {import('next').NextConfig} */

/*
 * Deploy-Ziel: Vercel.
 *
 * Kein `output: "export"` mehr. Grund: die Inhalte liegen jetzt in Sanity, nicht
 * im Repository. Bei einem statischen Export wuerde eine Aenderung im Studio
 * erst sichtbar, wenn jemand die Seite neu baut. So werden die Seiten
 * vorgerendert und im Hintergrund erneuert (ISR, 60 Sekunden) — und der
 * Sanity-Webhook auf /api/revalidate macht sie sofort sichtbar.
 *
 * SITE_ORIGIN kommt aus der Umgebung, damit die Adresse nicht im Code steht.
 * Auf Vercel setzt du dafuer NEXT_PUBLIC_SITE_URL auf die echte Domain.
 */
const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Bilder aus Sanity kommen von deren CDN und muessen ausdruecklich
    // erlaubt sein, sonst weigert sich next/image sie zu laden.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
    NEXT_PUBLIC_SITE_URL: SITE_ORIGIN,
  },
};

export default nextConfig;
