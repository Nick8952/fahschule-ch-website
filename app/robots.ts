import type { MetadataRoute } from "next";
import { getSite } from "@/lib/data";
import { absUrl } from "@/lib/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSite();
  if (site.demo) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absUrl("/sitemap.xml"),
  };
}
