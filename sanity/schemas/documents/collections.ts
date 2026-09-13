import { defineField, defineType } from "sanity";

export const testimonials = defineType({
  name: "testimonials",
  title: "Bewertungen",
  type: "document",
  fields: [
    defineField({ name: "intro", title: "Einleitungstext", type: "text", rows: 2 }),
    defineField({ name: "items", title: "Bewertungen", type: "array", of: [{ type: "testimonialItem" }] }),
  ],
  preview: { prepare: () => ({ title: "Bewertungen" }) },
});

export const steps = defineType({
  name: "steps",
  title: "Der Weg (10 Schritte)",
  type: "document",
  fields: [
    defineField({ name: "intro", title: "Einleitung", type: "text", rows: 2 }),
    defineField({ name: "items", title: "Schritte", type: "array", of: [{ type: "stepItem" }] }),
  ],
  preview: { prepare: () => ({ title: "Der Weg" }) },
});

export const modules = defineType({
  name: "modules",
  title: "Lernmodule",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Überschrift", type: "string" }),
    defineField({ name: "intro", title: "Einleitung", type: "text", rows: 2 }),
    defineField({ name: "items", title: "Module", type: "array", of: [{ type: "moduleItem" }] }),
  ],
  preview: { prepare: () => ({ title: "Lernmodule" }) },
});

export const reasons = defineType({
  name: "reasons",
  title: "Gründe & Vorteile",
  type: "document",
  fields: [
    defineField({
      name: "warum",
      title: "«Warum Fahrschule CH?» (6 Gründe)",
      type: "array",
      of: [{ type: "titleBody" }],
    }),
    defineField({ name: "vorteile", title: "«Deine Vorteile» (Liste)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "trustStrip", title: "Vertrauensband (Startseite)", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { prepare: () => ({ title: "Gründe & Vorteile" }) },
});
