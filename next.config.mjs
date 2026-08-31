/** @type {import('next').NextConfig} */

// Deploy-Ziel wird über Umgebungsvariablen gesteuert:
//   - GitHub Pages (Standard): SITE_ORIGIN + BASE_PATH in .github/workflows/deploy.yml
//   - eigene Domain (Go-Live): SITE_ORIGIN=https://fahrschule-ch.ch, BASE_PATH="" (siehe HANDOVER.md 6)
// Lokal ohne Variablen => GitHub-Pages-Default (aktuelle Live-URL).
const BASE_PATH = process.env.BASE_PATH ?? "/fahschule-ch_demo";
const SITE_ORIGIN =
  process.env.SITE_ORIGIN ?? "https://nick8952.github.io";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH || undefined,
  assetPrefix: BASE_PATH || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_SITE_URL: SITE_ORIGIN + BASE_PATH,
  },
};

export default nextConfig;
