import type { SchemaTypeDefinition } from "sanity";

import { courses } from "./documents/courses";
import { modules, reasons, steps, testimonials } from "./documents/collections";
import { legalPage, page } from "./documents/pages";
import { pageContent } from "./documents/pageContent";
import { navigation } from "./documents/navigation";
import { pricing } from "./documents/pricing";
import { siteSettings } from "./documents/siteSettings";
import {
  footerColumn,
  moduleItem,
  navLink,
  priceExtraRow,
  priceTier,
  richText,
  serviceCard,
  stepItem,
  testimonialItem,
  titleBody,
  vkuDate,
} from "./objects/shared";

/** Dokumenttypen, die es genau einmal gibt. Sie bekommen im Studio keinen
    «Neues Dokument»-Knopf, damit niemand aus Versehen ein zweites anlegt. */
export const singletonTypes = [
  "siteSettings",
  "navigation",
  "pricing",
  "courses",
  "testimonials",
  "steps",
  "modules",
  "reasons",
  "pageContent",
] as const;

export const schemaTypes: SchemaTypeDefinition[] = [
  // Bausteine
  navLink,
  footerColumn,
  titleBody,
  stepItem,
  moduleItem,
  testimonialItem,
  priceTier,
  priceExtraRow,
  vkuDate,
  serviceCard,
  richText,

  // Einmalige Dokumente
  siteSettings,
  navigation,
  pricing,
  courses,
  testimonials,
  steps,
  modules,
  reasons,
  pageContent,

  // Sammlungen
  page,
  legalPage,
];
