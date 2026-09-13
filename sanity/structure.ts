import {
  CogIcon,
  DocumentTextIcon,
  DocumentsIcon,
  MenuIcon,
  OlistIcon,
  StackCompactIcon,
  TagIcon,
  ThListIcon,
  CheckmarkCircleIcon,
  CommentIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

/**
 * Die Seitenleiste des Studios.
 *
 * Einmalige Dokumente (Preise, Kurse, Ablauf …) bekommen keinen «Neu»-Knopf –
 * es gibt sie ja nur je einmal. Reihenfolge folgt dem, was am häufigsten
 * geändert wird, nicht dem Alphabet.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Inhalte")
    .items([
      S.listItem()
        .title("Preise")
        .icon(TagIcon)
        .child(S.document().schemaType("pricing").documentId("pricing")),

      S.listItem()
        .title("Kurse & VKU-Termine")
        .icon(ThListIcon)
        .child(S.document().schemaType("courses").documentId("courses")),

      S.listItem()
        .title("Der Weg")
        .icon(OlistIcon)
        .child(S.document().schemaType("steps").documentId("steps")),

      S.listItem()
        .title("Lernmodule")
        .icon(StackCompactIcon)
        .child(S.document().schemaType("modules").documentId("modules")),

      S.listItem()
        .title("Bewertungen")
        .icon(CommentIcon)
        .child(S.document().schemaType("testimonials").documentId("testimonials")),

      S.listItem()
        .title("Gründe & Vorteile")
        .icon(CheckmarkCircleIcon)
        .child(S.document().schemaType("reasons").documentId("reasons")),

      S.divider(),

      S.listItem()
        .title("Seitentexte")
        .icon(DocumentsIcon)
        .child(S.documentTypeList("page").title("Seitentexte")),

      S.listItem()
        .title("Seiten-Kacheln & Listen")
        .icon(DocumentsIcon)
        .child(S.document().schemaType("pageContent").documentId("pageContent")),

      S.divider(),

      S.listItem()
        .title("Grundeinstellungen")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),

      S.listItem()
        .title("Navigation")
        .icon(MenuIcon)
        .child(S.document().schemaType("navigation").documentId("navigation")),

      S.listItem()
        .title("Rechtstexte")
        .icon(DocumentTextIcon)
        .child(S.documentTypeList("legalPage").title("Rechtstexte")),
    ]);
