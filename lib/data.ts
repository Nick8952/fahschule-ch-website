/* Zentraler, typisierter Zugriff auf die Inhalte.
   Quelle ist Sanity; Rueckfall sind die Dateien in data/*.json, die beim
   Umstieg als Ausgangsbestand dienten. sanityFetch() (siehe sanity/fetch.ts)
   kuemmert sich um Rueckfall + Fehlerbehandlung, hier steht nur die Form. */

import { sanityFetch } from "@/sanity/fetch";
import {
  coursesQuery,
  modulesQuery,
  navQuery,
  pageContentQuery,
  pricesQuery,
  reasonsQuery,
  siteQuery,
  stepsQuery,
  testimonialsQuery,
} from "@/sanity/queries";

import siteJson from "@/data/site.json";
import navJson from "@/data/nav.json";
import pricesJson from "@/data/prices.json";
import coursesJson from "@/data/courses.json";
import testimonialsJson from "@/data/testimonials.json";
import stepsJson from "@/data/steps.json";
import modulesJson from "@/data/modules.json";
import reasonsJson from "@/data/reasons.json";
import pagesJson from "@/data/pages.json";

export type PriceTier = {
  key: string;
  name: string;
  cond: string;
  minLessons: number;
  automat: number;
  geschaltet: number;
};

export type Gear = "automat" | "geschaltet";

export const getSite = () => sanityFetch(siteQuery, () => siteJson);
export const getNav = () => sanityFetch(navQuery, () => navJson);
export const getPrices = () => sanityFetch(pricesQuery, () => pricesJson);
export const getCourses = () => sanityFetch(coursesQuery, () => coursesJson);
export const getTestimonials = () => sanityFetch(testimonialsQuery, () => testimonialsJson);
export const getSteps = () => sanityFetch(stepsQuery, () => stepsJson);
export const getModules = () => sanityFetch(modulesQuery, () => modulesJson);
export const getReasons = () => sanityFetch(reasonsQuery, () => reasonsJson);
export const getPageContent = () => sanityFetch(pageContentQuery, () => pagesJson);

/** Passendes Paket für n Fahrstunden/Monat (n > 10 → Full Drive, n > 5 → Boost, sonst Basic). */
export function tierForLessons(prices: { tiers: PriceTier[] }, n: number): PriceTier {
  const tiers = prices.tiers;
  return (
    [...tiers].sort((a, b) => b.minLessons - a.minLessons).find((t) => n >= t.minLessons) ??
    tiers[tiers.length - 1]
  );
}

/** Vollständige Preistabelle: die 3 Paket-Zeilen + die übrigen Zeilen, in sinnvoller Reihenfolge. */
export function priceTableRows(prices: Awaited<ReturnType<typeof getPrices>>) {
  const tierRows = (prices.tiers as PriceTier[]).map((t) => ({
    label: `«${t.name}» (${t.cond})`,
    automat: `CHF ${t.automat}`,
    geschaltet: `CHF ${t.geschaltet}`,
    free: false as const,
  }));
  const extra = prices.extraRows as {
    label: string;
    automat: string;
    geschaltet: string;
    free?: boolean;
  }[];
  // Reihenfolge wie auf der bisherigen Seite: Probelektion, Gratis-Fahrstunde, dann Pakete, dann Rest.
  return [extra[0], extra[1], ...tierRows, ...extra.slice(2)];
}

export function bookableVkuDates(courses: Awaited<ReturnType<typeof getCourses>>) {
  return (
    courses.vkuEnglish.dates as {
      label: string;
      friday: string;
      saturday: string;
      bookable: boolean;
      value: string;
    }[]
  ).filter((d) => d.bookable);
}
