/** @type {import('next').NextConfig} */

// Die Seite läuft auf der GitLab-Pages-Unique-Domain (Root, kein Pfadpräfix):
//   https://fahrschule-ch-website-f63075.gitlab.io/
// Bei einer eigenen Domain (fahrschule-ch.ch) nur SITE_ORIGIN anpassen.
const BASE_PATH = "";
const SITE_ORIGIN = "https://fahrschule-ch-website-f63075.gitlab.io";

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
