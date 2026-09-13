import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Grundeinstellungen",
  type: "document",
  groups: [
    { name: "firma", title: "Firma", default: true },
    { name: "kontakt", title: "Kontakt & Adresse" },
    { name: "unterricht", title: "Unterricht" },
    { name: "kennzahlen", title: "Kennzahlen" },
    { name: "technik", title: "Technisches" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "firma", validation: (r) => r.required() }),
    defineField({ name: "legalName", title: "Rechtlicher Name", type: "string", group: "firma" }),
    defineField({ name: "instructor", title: "Fahrlehrer", type: "string", group: "firma", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Slogan", type: "string", group: "firma" }),
    defineField({ name: "blurb", title: "Kurzbeschreibung (Footer)", type: "text", rows: 2, group: "firma" }),

    defineField({
      name: "address",
      title: "Adresse",
      type: "object",
      group: "kontakt",
      fields: [
        defineField({ name: "street", title: "Strasse & Nr.", type: "string", validation: (r) => r.required() }),
        defineField({ name: "zip", title: "PLZ", type: "string", validation: (r) => r.required() }),
        defineField({ name: "city", title: "Ort", type: "string", validation: (r) => r.required() }),
        defineField({ name: "center", title: "Center-Name", type: "string" }),
        defineField({ name: "floorNote", title: "Stockwerk-Hinweis", type: "string" }),
      ],
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "object",
      group: "kontakt",
      fields: [
        defineField({ name: "display", title: "Anzeige (z. B. 078 843 91 76)", type: "string", validation: (r) => r.required() }),
        defineField({ name: "tel", title: "Wählbar (z. B. +41788439176)", type: "string", validation: (r) => r.required() }),
      ],
    }),
    defineField({ name: "email", title: "E-Mail", type: "string", group: "kontakt", validation: (r) => r.required().email() }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      group: "kontakt",
      fields: [
        defineField({ name: "instagram", title: "Instagram-URL", type: "url" }),
        defineField({ name: "facebook", title: "Facebook-URL", type: "url" }),
      ],
    }),
    defineField({ name: "transit", title: "Anfahrt ÖV", type: "string", group: "kontakt" }),
    defineField({ name: "membership", title: "Mitgliedschaft", type: "string", group: "kontakt" }),
    defineField({ name: "mapQuery", title: "Karten-Suchbegriff", type: "string", group: "kontakt" }),

    defineField({
      name: "languages",
      title: "Unterrichtssprachen",
      type: "array",
      of: [{ type: "string" }],
      group: "unterricht",
    }),

    defineField({
      name: "stats",
      title: "Kennzahlen",
      type: "object",
      group: "kennzahlen",
      fields: [
        defineField({ name: "students", title: "Anzahl Schüler:innen", type: "string" }),
        defineField({ name: "studentsLabel", title: "Label dazu", type: "string" }),
        defineField({ name: "firstTryPass", title: "Erstprüfungs-Quote", type: "string" }),
        defineField({ name: "firstTryPassLabel", title: "Label dazu", type: "string" }),
        defineField({ name: "sinceYear", title: "Fachausweis seit", type: "string" }),
        defineField({ name: "sinceYearLabel", title: "Label dazu", type: "string" }),
      ],
    }),

    defineField({
      name: "demo",
      title: "Demo-Modus",
      type: "boolean",
      group: "technik",
      description: "Angehakt: Suchmaschinen schliessen die Seite aus. Vor dem echten Start ausschalten.",
      initialValue: true,
    }),
    defineField({
      name: "web3formsKey",
      title: "Web3Forms Zugriffs-Schlüssel",
      type: "string",
      group: "technik",
      description: "Ohne diesen Schlüssel funktionieren die Formulare nicht.",
    }),
    defineField({ name: "themeColor", title: "Theme-Farbe (Hex)", type: "string", group: "technik" }),
  ],
  preview: { prepare: () => ({ title: "Grundeinstellungen" }) },
});
