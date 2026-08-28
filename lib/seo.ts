import type { Metadata } from "next";
import { absUrl } from "./site";

/** Baut Metadaten inkl. canonical + og:url für eine Seite. `path` ohne Domain, z. B. "/kurse". */
export function pageMeta(
  path: string,
  o: {
    title: string;
    description?: string;
    ogImage?: string;
    ogLocale?: string;
    noindex?: boolean;
  },
): Metadata {
  const clean = path === "/" ? "/" : "/" + path.replace(/^\/|\/$/g, "") + "/";
  const url = absUrl(clean);
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: o.title,
      description: o.description,
      ...(o.ogImage ? { images: [o.ogImage] } : {}),
      ...(o.ogLocale ? { locale: o.ogLocale } : {}),
    },
    ...(o.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
