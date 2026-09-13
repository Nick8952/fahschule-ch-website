import { defineField, defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation & Footer",
  type: "document",
  fields: [
    defineField({ name: "primary", title: "Hauptmenü", type: "array", of: [{ type: "navLink" }] }),
    defineField({ name: "mobileExtra", title: "Zusätzlich im Mobilmenü", type: "array", of: [{ type: "navLink" }] }),
    defineField({ name: "ctaLabel", title: "CTA-Button-Text", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA-Button-Ziel", type: "string" }),
    defineField({ name: "footerColumns", title: "Footer-Spalten", type: "array", of: [{ type: "footerColumn" }] }),
  ],
  preview: { prepare: () => ({ title: "Navigation & Footer" }) },
});
