import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  "/",
  "/angebot-preise",
  "/agb",
  "/ueber-mich",
  "/kurse",
  "/theoriekurs",
  "/verkehrskunde",
  "/verkehrskunde-englisch",
  "/kontrollfahrt",
  "/der-weg",
  "/kontakt",
  "/driving-school",
  "/impressum",
  "/datenschutz",
  "/inhaltsverzeichnis",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: absUrl(r === "/" ? "/" : r + "/"),
    changeFrequency: "monthly",
    priority: r === "/" ? 1 : 0.7,
  }));
}
