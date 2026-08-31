/** @type {import('next').NextConfig} */

// Deploy-Ziel wird über Umgebungsvariablen gesteuert (in der jeweiligen CI gesetzt):
//   - GitHub Pages / eigene Domain:  SITE_ORIGIN=https://fahrschule-ch.ch          (BASE_PATH="")
//   - GitLab-Pages-Unique-Domain:    Default unten (Root, kein Pfadpräfix)
// Lokal ohne Variablen => GitLab-Default.
const BASE_PATH = process.env.BASE_PATH ?? "";
const SITE_ORIGIN =
  process.env.SITE_ORIGIN ?? "https://fahrschule-ch-website-f63075.gitlab.io";

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
