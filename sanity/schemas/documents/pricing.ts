import { defineField, defineType } from "sanity";

export const pricing = defineType({
  name: "pricing",
  title: "Preise & Rechner",
  type: "document",
  groups: [
    { name: "angebot", title: "Angebot", default: true },
    { name: "pakete", title: "Pakete & Rechner" },
    { name: "tabelle", title: "Preistabelle" },
  ],
  fields: [
    defineField({ name: "offer", title: "Aktuelles Angebot", type: "text", rows: 2, group: "angebot" }),
    defineField({
      name: "vehicles",
      title: "Fahrzeuge",
      type: "object",
      group: "angebot",
      fields: [
        defineField({ name: "automat", title: "Automat", type: "string" }),
        defineField({ name: "geschaltet", title: "Geschaltet", type: "string" }),
      ],
    }),
    defineField({ name: "vehicleNote", title: "Fahrzeug-Hinweis", type: "text", rows: 2, group: "angebot" }),
    defineField({
      name: "lessonLengths",
      title: "Lektionslängen",
      type: "object",
      group: "angebot",
      fields: [
        defineField({ name: "single", title: "Einzellektion", type: "string" }),
        defineField({ name: "onehalf", title: "1,5 Lektion", type: "string" }),
        defineField({ name: "double", title: "Doppellektion", type: "string" }),
      ],
    }),

    defineField({
      name: "tiers",
      title: "Pakete (Rechner & Tabelle)",
      type: "array",
      of: [{ type: "priceTier" }],
      group: "pakete",
      description: "Diese Zeilen erscheinen im Preis-Rechner UND in der Preistabelle.",
    }),
    defineField({ name: "tierIncludes", title: "Im Paket enthalten", type: "array", of: [{ type: "string" }], group: "pakete" }),
    defineField({
      name: "calc",
      title: "Rechner-Einstellungen",
      type: "object",
      group: "pakete",
      fields: [
        defineField({ name: "heading", title: "Überschrift", type: "string" }),
        defineField({ name: "intro", title: "Einleitung", type: "text", rows: 2 }),
        defineField({ name: "rangeMin", title: "Slider Minimum", type: "number" }),
        defineField({ name: "rangeMax", title: "Slider Maximum", type: "number" }),
        defineField({ name: "default", title: "Slider Startwert", type: "number" }),
        defineField({ name: "priceSuffix", title: "Preis-Zusatz", type: "string" }),
      ],
    }),

    defineField({ name: "extraRows", title: "Weitere Tabellenzeilen", type: "array", of: [{ type: "priceExtraRow" }], group: "tabelle" }),
    defineField({ name: "disclaimer", title: "Hinweis unter der Tabelle", type: "text", rows: 2, group: "tabelle" }),
  ],
  preview: { prepare: () => ({ title: "Preise & Rechner" }) },
});
