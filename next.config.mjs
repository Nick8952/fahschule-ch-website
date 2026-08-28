/** @type {import('next').NextConfig} */

// Die Seite liegt auf GitLab Pages unter einem Pfad-Präfix:
//   https://nick-tbz.gitlab.io/fahrschule-ch-website/
// Bei einer eigenen Domain (fahrschule-ch.ch) auf "" setzen und die
// absoluten URLs in lib/site.ts sowie in der Sveltia-Config anpassen.
const BASE_PATH = "/fahrschule-ch-website";
const SITE_ORIGIN = "https://nick-tbz.gitlab.io";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  images: { unoptimized: true },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
    NEXT_PUBLIC_SITE_URL: SITE_ORIGIN + BASE_PATH,
  },
};

export default nextConfig;
