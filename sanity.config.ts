import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, studioProjectId } from "./sanity/env";
import { schemaTypes, singletonTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

const singletons = new Set<string>(singletonTypes);

export default defineConfig({
  name: "fahrschule-ch-studio",
  title: "Fahrschule CH — Inhalte",
  basePath: "/studio",

  projectId: studioProjectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    // Der Vision-Tab erlaubt technische Abfragen direkt im Studio. Nur während
    // der Entwicklung sichtbar — für den Kunden wäre er nur Ballast.
    ...(process.env.NODE_ENV === "development"
      ? [visionTool({ defaultApiVersion: apiVersion })]
      : []),
  ],

  schema: {
    types: schemaTypes,
    // Einmalige Dokumente aus dem globalen «Neu»-Menü nehmen. Erreichbar
    // bleiben sie über die Seitenleiste (siehe sanity/structure.ts).
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },

  document: {
    // Für einmalige Dokumente auch «Löschen» und «Duplizieren» entfernen.
    actions: (actions, { schemaType }) =>
      singletons.has(schemaType)
        ? actions.filter(({ action }) =>
            ["publish", "discardChanges", "restore"].includes(action ?? ""),
          )
        : actions,
  },
});
