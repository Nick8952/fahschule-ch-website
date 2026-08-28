/* Zentraler, typisierter Zugriff auf die CMS-Inhalte in data/*.json.
   Alles wird zur Build-Zeit eingelesen (statischer Export). */

import site from "@/data/site.json";
import nav from "@/data/nav.json";
import prices from "@/data/prices.json";
import courses from "@/data/courses.json";
import testimonials from "@/data/testimonials.json";
import steps from "@/data/steps.json";
import modules from "@/data/modules.json";
import reasons from "@/data/reasons.json";
import pages from "@/data/pages.json";

export { site, nav, prices, courses, testimonials, steps, modules, reasons, pages };

export type PriceTier = {
  key: string;
  name: string;
  cond: string;
  minLessons: number;
  automat: number;
  geschaltet: number;
};

export type Gear = "automat" | "geschaltet";

/** Passendes Paket für n Fahrstunden/Monat (n > 10 → Full Drive, n > 5 → Boost, sonst Basic). */
export function tierForLessons(n: number): PriceTier {
  const tiers = prices.tiers as PriceTier[];
  return (
    [...tiers].sort((a, b) => b.minLessons - a.minLessons).find((t) => n >= t.minLessons) ??
    tiers[tiers.length - 1]
  );
}

/** Vollständige Preistabelle: die 3 Paket-Zeilen + die übrigen Zeilen, in sinnvoller Reihenfolge. */
export function priceTableRows() {
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

export const bookableVkuDates = (courses.vkuEnglish.dates as {
  label: string;
  friday: string;
  saturday: string;
  bookable: boolean;
  value: string;
}[]).filter((d) => d.bookable);
