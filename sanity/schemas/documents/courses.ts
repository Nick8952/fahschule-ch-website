import { defineField, defineType } from "sanity";

export const courses = defineType({
  name: "courses",
  title: "Kurse & VKU-Termine",
  type: "document",
  groups: [
    { name: "theorie", title: "Theorie & Nothelfer", default: true },
    { name: "vkuDe", title: "VKU Deutsch" },
    { name: "vkuEn", title: "VKU Englisch" },
  ],
  fields: [
    defineField({
      name: "theoriekurs",
      title: "Theoriekurs",
      type: "object",
      group: "theorie",
      fields: [
        defineField({ name: "fee", title: "Gebühr", type: "string" }),
        defineField({ name: "voucher", title: "Gutschein-Hinweis", type: "string" }),
        defineField({ name: "intro", title: "Einleitung", type: "text", rows: 2 }),
        defineField({ name: "times", title: "Zeiten", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "location", title: "Ort", type: "text", rows: 2 }),
        defineField({ name: "note", title: "Callout-Hinweis", type: "string" }),
      ],
    }),
    defineField({
      name: "nothelferkurs",
      title: "Nothelferkurs",
      type: "object",
      group: "theorie",
      fields: [
        defineField({ name: "fee", title: "Gebühr", type: "string" }),
        defineField({ name: "voucher", title: "Gutschein-Hinweis", type: "string" }),
        defineField({ name: "intro", title: "Text", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "vkuDeutsch",
      title: "Verkehrskunde Deutsch",
      type: "object",
      group: "vkuDe",
      fields: [
        defineField({ name: "fee", title: "Gebühr Deutsch", type: "string" }),
        defineField({ name: "feeEnglish", title: "Gebühr Englisch", type: "string" }),
        defineField({ name: "intro", title: "Einleitung", type: "text", rows: 2 }),
        defineField({ name: "includes", title: "Inklusive", type: "text", rows: 2 }),
        defineField({ name: "bring", title: "Mitbringen", type: "string" }),
        defineField({ name: "location", title: "Ort", type: "text", rows: 2 }),
        defineField({ name: "iframeUrl", title: "Kurskalender-URL (asa.ch)", type: "url" }),
      ],
    }),
    defineField({
      name: "vkuEnglish",
      title: "Verkehrskunde Englisch",
      type: "object",
      group: "vkuEn",
      fields: [
        defineField({ name: "fee", title: "Fee", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 2 }),
        defineField({ name: "feeNote", title: "Fee note", type: "text", rows: 2 }),
        defineField({ name: "requirements", title: "Requirements", type: "text", rows: 2 }),
        defineField({ name: "bring", title: "Bring along", type: "string" }),
        defineField({ name: "location", title: "Location", type: "text", rows: 2 }),
        defineField({ name: "datesNote", title: "Hinweis über der Terminliste", type: "text", rows: 2 }),
        defineField({
          name: "dates",
          title: "Kurstermine",
          type: "array",
          of: [{ type: "vkuDate" }],
          description: "«Buchbar» markierte Termine erscheinen im Anmelde-Dropdown.",
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Kurse & VKU-Termine" }) },
});
