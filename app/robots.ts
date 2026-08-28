import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (site.demo) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absUrl("/sitemap.xml"),
  };
}
