import { defineField, defineType } from "sanity";

/* Wiederverwendbare Bausteine. Alle Beschriftungen auf Deutsch. */

export const navLink = defineType({
  name: "navLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Beschriftung", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Ziel",
      type: "string",
      description: 'Seitenpfad, z. B. "/kurse".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "lang",
      title: "Sprach-Kennung",
      type: "string",
      description: 'Nur für die englische Seite: "en". Sonst leer lassen.',
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const footerColumn = defineType({
  name: "footerColumn",
  title: "Fusszeilen-Spalte",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Spaltentitel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "links", title: "Links", type: "array", of: [{ type: "navLink" }] }),
  ],
  preview: { select: { title: "title" } },
});

export const titleBody = defineType({
  name: "titleBody",
  title: "Titel & Text",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});

export const stepItem = defineType({
  name: "stepItem",
  title: "Schritt",
  type: "object",
  fields: [
    defineField({ name: "n", title: "Nummer", type: "number", validation: (r) => r.required().integer().positive() }),
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3 }),
    defineField({ name: "badge", title: "Kurz-Etikett", type: "string", description: "Ein bis zwei Wörter, z. B. «Pflicht»." }),
  ],
  preview: { select: { title: "title", subtitle: "body", n: "n" } },
});

export const moduleItem = defineType({
  name: "moduleItem",
  title: "Lernmodul",
  type: "object",
  fields: [
    defineField({ name: "range", title: "Modul-Nr.", type: "string", description: 'Z. B. "3–4".', validation: (r) => r.required() }),
    defineField({ name: "level", title: "Taxonomiestufe (1–6)", type: "number", validation: (r) => r.required().integer().min(1).max(6) }),
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "range" } },
});

export const testimonialItem = defineType({
  name: "testimonialItem",
  title: "Bewertung",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "lang",
      title: "Sprache",
      type: "string",
      options: { list: [{ title: "Deutsch", value: "de" }, { title: "Englisch", value: "en" }] },
      initialValue: "de",
    }),
    defineField({ name: "text", title: "Text", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "name", subtitle: "text" } },
});

export const priceTier = defineType({
  name: "priceTier",
  title: "Paket",
  type: "object",
  fields: [
    defineField({ name: "key", title: "Schlüssel (nicht ändern)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "name", title: "Paketname", type: "string", validation: (r) => r.required() }),
    defineField({ name: "cond", title: "Bedingung", type: "string", description: 'Z. B. "ab 6 Fahrstunden/Monat".' }),
    defineField({ name: "minLessons", title: "Ab X Fahrstunden/Monat", type: "number", validation: (r) => r.required().integer() }),
    defineField({ name: "automat", title: "Preis Automat (CHF)", type: "number", validation: (r) => r.required() }),
    defineField({ name: "geschaltet", title: "Preis Geschaltet (CHF)", type: "number", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "name", subtitle: "cond" } },
});

export const priceExtraRow = defineType({
  name: "priceExtraRow",
  title: "Preiszeile",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Leistung", type: "string", validation: (r) => r.required() }),
    defineField({ name: "automat", title: "Automat", type: "string", validation: (r) => r.required() }),
    defineField({ name: "geschaltet", title: "Geschaltet", type: "string", validation: (r) => r.required() }),
    defineField({ name: "free", title: "Gratis-Hervorhebung", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "label", subtitle: "automat" } },
});

export const vkuDate = defineType({
  name: "vkuDate",
  title: "VKU-Termin",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Bezeichnung", type: "string", description: "Z. B. «VKU 2 · März».", validation: (r) => r.required() }),
    defineField({ name: "friday", title: "Freitag", type: "string" }),
    defineField({ name: "saturday", title: "Samstag", type: "string" }),
    defineField({ name: "bookable", title: "Buchbar (im Formular wählbar)", type: "boolean", initialValue: true }),
    defineField({ name: "value", title: "Wert im Dropdown", type: "string" }),
  ],
  preview: { select: { title: "label", bookable: "bookable" } },
});

export const serviceCard = defineType({
  name: "serviceCard",
  title: "Leistungs-Kachel",
  type: "object",
  fields: [
    defineField({ name: "tag", title: "Kurz-Etikett", type: "string" }),
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3 }),
    defineField({ name: "price", title: "Preishinweis", type: "string" }),
    defineField({ name: "points", title: "Stichpunkte", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "href", title: "Ziel-Link", type: "string" }),
    defineField({ name: "image", title: "Bildpfad", type: "string", description: "Z. B. /img/hero-1.webp." }),
  ],
  preview: { select: { title: "title", subtitle: "tag" } },
});

/** Fliesstext mit Ueberschriften, Fett/Kursiv und Links. */
export const richText = defineType({
  name: "richText",
  title: "Text",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Absatz", value: "normal" },
        { title: "Zwischentitel", value: "h2" },
      ],
      lists: [{ title: "Aufzaehlung", value: "bullet" }],
      marks: {
        decorators: [
          { title: "Fett", value: "strong" },
          { title: "Kursiv", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "Adresse",
                type: "string",
                description: 'Volle Adresse (https://…), "/seite" oder "mailto:…".',
                validation: (r: any) => r.required(),
              },
            ],
          },
        ],
      },
    },
  ],
});
