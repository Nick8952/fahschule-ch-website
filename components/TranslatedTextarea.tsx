"use client";

import type { TextareaHTMLAttributes } from "react";
import { useT } from "@/lib/i18n/LanguageContext";

export default function TranslatedTextarea({
  placeholderDe,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { placeholderDe: string }) {
  const t = useT();
  return <textarea {...props} placeholder={t(["copy", placeholderDe], placeholderDe)} />;
}
