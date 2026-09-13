import { defineField, defineType } from "sanity";

/** Feste Liste statt Freitext — neue Seiten anzulegen ergibt keinen Sinn,
    solange es dafür keine Route im Code gibt. */
const PAGE_SLUGS = [
  { title: "Startseite", value: "home" },
  { title: "Angebote & Preise", value: "angebot-preise" },
  { title: "Über mich", value: "ueber-mich" },
  { title: "Kurse", value: "kurse" },
  { title: "Kontrollfahrt", value: "kontrollfahrt" },
  { title: "Der Weg", value: "der-weg" },
  { title: "Kontakt", value: "kontakt" },
  { title: "Danke (nach dem Absenden)", value: "danke" },
  { title: "Theoriekurs", value: "theoriekurs" },
  { title: "Verkehrskunde Deutsch", value: "verkehrskunde" },
  { title: "Verkehrskunde Englisch", value: "verkehrskunde-englisch" },
  { title: "Driving School (English)", value: "driving-school" },
  { title: "Inhaltsverzeichnis", value: "inhaltsverzeichnis" },
];

const LEGAL_SLUGS = [
  { title: "AGB", value: "agb" },
  { title: "Impressum", value: "impressum" },
  { title: "Datenschutz", value: "datenschutz" },
];

export const page = defineType({
  name: "page",
  title: "Seite",
  type: "document",
  groups: [
    { name: "inhalt", title: "Inhalt", default: true },
    { name: "seo", title: "Google & Suche" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Welche Seite",
      type: "string",
      options: { list: PAGE_SLUGS, layout: "dropdown" },
      group: "inhalt",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero (Kopfbereich)",
      type: "object",
      group: "inhalt",
      fields: [
        defineField({ name: "eyebrow", title: "Überzeile", type: "string" }),
        defineField({ name: "title", title: "Titel", type: "string" }),
        defineField({ name: "lead", title: "Lead-Text", type: "text", rows: 3 }),
        defineField({ name: "badge", title: "Badge (nur Startseite)", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      title: "Freitext / Fliesstext",
      type: "richText",
      group: "inhalt",
      description: "Nur auf wenigen Seiten in Verwendung. Darf sonst leer bleiben.",
    }),
    defineField({
      name: "sections",
      title: "Abschnitts-Titel",
      type: "object",
      group: "inhalt",
      description: "Nur auf der Kontaktseite in Verwendung (Formular- und Anfahrts-Titel).",
      fields: [
        defineField({
          name: "form",
          title: "Formular-Abschnitt",
          type: "object",
          fields: [defineField({ name: "title", title: "Titel", type: "string" })],
        }),
        defineField({
          name: "anfahrt",
          title: "Anfahrt-Abschnitt",
          type: "object",
          fields: [defineField({ name: "title", title: "Titel", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "seoTitle",
      title: "SEO-Titel (Browser-Tab & Google)",
      type: "string",
      group: "seo",
      validation: (r) => r.required(),
    }),
    defineField({ name: "seoDescription", title: "SEO-Beschreibung", type: "text", rows: 3, group: "seo" }),
    defineField({ name: "ogImage", title: "Vorschaubild (Social)", type: "string", group: "seo", description: "Bildpfad, z. B. /img/hero-2.webp." }),
  ],
  preview: {
    select: { slug: "slug", title: "hero.title" },
    prepare: ({ slug, title }) => ({
      title: PAGE_SLUGS.find((p) => p.value === slug)?.title ?? slug,
      subtitle: title,
    }),
  },
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Rechtstext",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Welcher Text",
      type: "string",
      options: { list: LEGAL_SLUGS, layout: "dropdown" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Untertitel", type: "text", rows: 2 }),
    defineField({ name: "seoTitle", title: "SEO-Titel", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO-Beschreibung", type: "text", rows: 2 }),
    defineField({ name: "body", title: "Inhalt", type: "richText", validation: (r) => r.required() }),
  ],
  preview: {
    select: { slug: "slug", title: "title" },
    prepare: ({ slug, title }) => ({
      title: LEGAL_SLUGS.find((p) => p.value === slug)?.title ?? slug,
      subtitle: title,
    }),
  },
});
