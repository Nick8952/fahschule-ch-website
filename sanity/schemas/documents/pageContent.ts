import { defineField, defineType } from "sanity";

/** Strukturierte Zusatz-Inhalte je Seite, die nicht in die einfachen
    Seitentexte (Sammlung «Seite») passen — Kacheln, Aufzählungen usw. */
export const pageContent = defineType({
  name: "pageContent",
  title: "Seiten-Inhalte (Kacheln & Listen)",
  type: "document",
  groups: [
    { name: "home", title: "Startseite", default: true },
    { name: "ueberMich", title: "Über mich" },
    { name: "kurse", title: "Kurse" },
    { name: "kontrollfahrt", title: "Kontrollfahrt" },
    { name: "drivingSchool", title: "Driving School (EN)" },
  ],
  fields: [
    defineField({
      name: "home",
      title: "Startseite",
      type: "object",
      group: "home",
      fields: [
        defineField({
          name: "sections",
          title: "Abschnitts-Überschriften",
          type: "object",
          fields: [
            defineField({ name: "warum", title: "«Warum»-Überschrift", type: "string" }),
            defineField({ name: "leistungen", title: "«Leistungen»-Überschrift", type: "string" }),
            defineField({ name: "vorteile", title: "«Vorteile»-Überschrift", type: "string" }),
            defineField({ name: "testimonials", title: "«Bewertungen»-Überschrift", type: "string" }),
          ],
        }),
        defineField({ name: "services", title: "Leistungs-Kacheln", type: "array", of: [{ type: "serviceCard" }] }),
      ],
    }),
    defineField({
      name: "ueberMich",
      title: "Über mich",
      type: "object",
      group: "ueberMich",
      fields: [
        defineField({
          name: "sections",
          title: "Abschnitts-Überschriften",
          type: "object",
          fields: [
            defineField({ name: "intro", title: "Intro-Überschrift", type: "string" }),
            defineField({ name: "konzept", title: "Konzept-Überschrift", type: "string" }),
            defineField({ name: "auszeichnet", title: "«Auszeichnet»-Überschrift", type: "string" }),
          ],
        }),
        defineField({ name: "introBody", title: "Intro-Text", type: "text", rows: 4 }),
        defineField({ name: "konzeptPunkte", title: "Unterrichtskonzept-Punkte", type: "array", of: [{ type: "titleBody" }] }),
        defineField({ name: "auszeichnetPunkte", title: "«Was mich auszeichnet»-Punkte", type: "array", of: [{ type: "titleBody" }] }),
      ],
    }),
    defineField({
      name: "kurse",
      title: "Kurse",
      type: "object",
      group: "kurse",
      fields: [defineField({ name: "cards", title: "Kurs-Kacheln", type: "array", of: [{ type: "serviceCard" }] })],
    }),
    defineField({
      name: "kontrollfahrt",
      title: "Kontrollfahrt",
      type: "object",
      group: "kontrollfahrt",
      fields: [
        defineField({ name: "callout", title: "Wichtiger Hinweis", type: "text", rows: 2 }),
        defineField({ name: "gutZuWissen", title: "«Gut zu wissen»-Liste", type: "array", of: [{ type: "text" }] }),
      ],
    }),
    defineField({
      name: "drivingSchool",
      title: "Driving School (EN)",
      type: "object",
      group: "drivingSchool",
      fields: [
        defineField({ name: "langNote", title: "Language note", type: "string" }),
        defineField({
          name: "langNoteLink",
          title: "Link zur deutschen Seite",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Ziel", type: "string" }),
          ],
        }),
        defineField({
          name: "sections",
          title: "Section headings",
          type: "object",
          fields: [
            defineField({ name: "intro", title: "Intro heading", type: "string" }),
            defineField({ name: "reasonsTitle", title: "Reasons heading", type: "string" }),
          ],
        }),
        defineField({ name: "intro", title: "Intro text", type: "text", rows: 4 }),
        defineField({ name: "reasons", title: "Reasons", type: "array", of: [{ type: "titleBody" }] }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Seiten-Inhalte (Kacheln & Listen)" }) },
});
