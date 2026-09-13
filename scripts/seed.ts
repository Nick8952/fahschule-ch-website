/*
 * Schiebt die bestehenden Inhalte aus data/ und content/ einmalig nach Sanity.
 *
 * Aufruf:
 *   node scripts/seed.ts              (schreibt)
 *   node scripts/seed.ts --dry-run    (zeigt nur, was passieren wuerde)
 *
 * Braucht in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN   (Editor-Token aus sanity.io/manage)
 *
 * Das Skript ist wiederholbar: alle Dokument-IDs und alle Schluessel im
 * Portable Text sind aus dem Inhalt abgeleitet, nicht zufaellig. Ein zweiter
 * Lauf erzeugt also dasselbe Ergebnis und keine Dubletten.
 */

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";
import matter from "gray-matter";

import { markdownToBlocks } from "../lib/markdownToBlocks.ts";

const ROOT = process.cwd();
const DRY = process.argv.includes("--dry-run");

/* .env.local einlesen — ohne zusaetzliche Abhaengigkeit. */
const envFile = path.join(ROOT, ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID fehlt (.env.local).");
  process.exit(1);
}
if (!token && !DRY) {
  console.error("SANITY_API_WRITE_TOKEN fehlt (.env.local). Mit --dry-run geht es ohne.");
  process.exit(1);
}

const json = (name: string) =>
  JSON.parse(fs.readFileSync(path.join(ROOT, "data", `${name}.json`), "utf8"));

const md = (dir: string, name: string) =>
  matter(fs.readFileSync(path.join(ROOT, "content", dir, `${name}.md`), "utf8"));

const site = json("site");
const nav = json("nav");
const prices = json("prices");
const courses = json("courses");
const testimonials = json("testimonials");
const steps = json("steps");
const modules = json("modules");
const reasons = json("reasons");
const pages = json("pages");

type SanityDoc = { _id: string; _type: string; [field: string]: unknown };
const docs: SanityDoc[] = [];

const keyed = <T extends Record<string, unknown>>(items: T[], type: string, prefix = "k") =>
  items.map((item, i) => ({ _key: `${prefix}${i}`, _type: type, ...item }));

docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  demo: site.demo,
  web3formsKey: site.web3formsKey,
  name: site.name,
  legalName: site.legalName,
  instructor: site.instructor,
  tagline: site.tagline,
  blurb: site.blurb,
  address: site.address,
  phone: site.phone,
  email: site.email,
  social: site.social,
  transit: site.transit,
  membership: site.membership,
  mapQuery: site.mapQuery,
  languages: site.languages,
  stats: site.stats,
  themeColor: site.themeColor,
});

docs.push({
  _id: "navigation",
  _type: "navigation",
  primary: keyed(nav.primary, "navLink", "p"),
  mobileExtra: keyed(nav.mobileExtra, "navLink", "m"),
  ctaLabel: nav.ctaLabel,
  ctaHref: nav.ctaHref,
  footerColumns: nav.footerColumns.map((c: any, i: number) => ({
    _key: `c${i}`,
    _type: "footerColumn",
    title: c.title,
    links: keyed(c.links, "navLink", `c${i}l`),
  })),
});

docs.push({
  _id: "pricing",
  _type: "pricing",
  offer: prices.offer,
  vehicles: prices.vehicles,
  vehicleNote: prices.vehicleNote,
  lessonLengths: prices.lessonLengths,
  tiers: keyed(prices.tiers, "priceTier", "t"),
  tierIncludes: prices.tierIncludes,
  calc: prices.calc,
  extraRows: keyed(prices.extraRows, "priceExtraRow", "e"),
  disclaimer: prices.disclaimer,
});

docs.push({
  _id: "courses",
  _type: "courses",
  theoriekurs: courses.theoriekurs,
  nothelferkurs: courses.nothelferkurs,
  vkuDeutsch: courses.vkuDeutsch,
  vkuEnglish: {
    ...courses.vkuEnglish,
    dates: keyed(courses.vkuEnglish.dates, "vkuDate", "d"),
  },
});

docs.push({
  _id: "testimonials",
  _type: "testimonials",
  intro: testimonials.intro,
  items: keyed(testimonials.items, "testimonialItem", "t"),
});

docs.push({
  _id: "steps",
  _type: "steps",
  intro: steps.intro,
  items: keyed(steps.items, "stepItem", "s"),
});

docs.push({
  _id: "modules",
  _type: "modules",
  heading: modules.heading,
  intro: modules.intro,
  items: keyed(modules.items, "moduleItem", "m"),
});

docs.push({
  _id: "reasons",
  _type: "reasons",
  warum: keyed(reasons.warum, "titleBody", "w"),
  vorteile: reasons.vorteile,
  trustStrip: reasons.trustStrip,
});

docs.push({
  _id: "pageContent",
  _type: "pageContent",
  home: {
    sections: pages.home.sections,
    services: keyed(pages.home.services, "serviceCard", "s"),
  },
  ueberMich: {
    sections: pages.ueberMich.sections,
    introBody: pages.ueberMich.introBody,
    konzeptPunkte: keyed(pages.ueberMich.konzeptPunkte, "titleBody", "k"),
    auszeichnetPunkte: keyed(pages.ueberMich.auszeichnetPunkte, "titleBody", "a"),
  },
  kurse: { cards: keyed(pages.kurse.cards, "serviceCard", "c") },
  kontrollfahrt: {
    callout: pages.kontrollfahrt.callout,
    gutZuWissen: pages.kontrollfahrt.gutZuWissen,
  },
  drivingSchool: {
    langNote: pages.drivingSchool.langNote,
    langNoteLink: pages.drivingSchool.langNoteLink,
    sections: pages.drivingSchool.sections,
    intro: pages.drivingSchool.intro,
    reasons: keyed(pages.drivingSchool.reasons, "titleBody", "r"),
  },
});

const PAGE_SLUGS = [
  "home",
  "angebot-preise",
  "ueber-mich",
  "kurse",
  "kontrollfahrt",
  "der-weg",
  "kontakt",
  "danke",
  "theoriekurs",
  "verkehrskunde",
  "verkehrskunde-englisch",
  "driving-school",
  "inhaltsverzeichnis",
];

for (const slug of PAGE_SLUGS) {
  const { data, content } = md("pages", slug);
  docs.push({
    _id: `page-${slug}`,
    _type: "page",
    slug,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    ...(data.ogImage ? { ogImage: data.ogImage } : {}),
    hero: { ...data.hero },
    ...(data.sections ? { sections: data.sections } : {}),
    body: content.trim() ? markdownToBlocks(content) : [],
  });
}

for (const slug of ["agb", "impressum", "datenschutz"]) {
  const { data, content } = md("legal", slug);
  docs.push({
    _id: `legal-${slug}`,
    _type: "legalPage",
    slug,
    title: data.title,
    subtitle: data.subtitle,
    seoTitle: data.seoTitle,
    seoDescription: data.seoDescription,
    body: markdownToBlocks(content),
  });
}

console.log(`${docs.length} Dokumente vorbereitet:`);
for (const d of docs) console.log(`  ${d._type.padEnd(14)} ${d._id}`);

if (DRY) {
  console.log("\n--dry-run: nichts geschrieben.");
  process.exit(0);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-10-01", useCdn: false });

// Alles in einer Transaktion: entweder sind alle Dokumente da oder keines.
// createOrReplace statt create, damit ein zweiter Lauf nicht scheitert.
const tx = docs.reduce((t, doc) => t.createOrReplace(doc), client.transaction());

try {
  await tx.commit();
  console.log(`\nFertig — ${docs.length} Dokumente in ${projectId}/${dataset} geschrieben.`);
} catch (error) {
  console.error("\nFehlgeschlagen:", error instanceof Error ? error.message : error);
  process.exit(1);
}
