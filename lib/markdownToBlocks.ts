/* Markdown -> Portable Text (das Textformat von Sanity).
 *
 * Gebraucht an zwei Stellen, deshalb hier einmal zentral:
 *   1. scripts/seed.ts schiebt die bestehenden content/*.md nach Sanity
 *   2. lib/content.ts nutzt es fuer den Rueckfall, solange kein Sanity-Projekt
 *      verbunden ist — dadurch rendert die Seite in beiden Faellen dieselbe
 *      Datenform und es gibt nur EINEN Render-Pfad in Prose.tsx.
 *
 * Bewusst nur der Funktionsumfang, der im Inhalt wirklich vorkommt:
 * Zwischentitel (##), Absaetze, Aufzaehlungen, fett, kursiv, Links.
 * Die Schluessel werden aus der Position abgeleitet und sind damit stabil —
 * ein erneutes Seeden erzeugt identische Dokumente statt neuer Versionen.
 */

export type PortableTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

export type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: "normal" | "h2";
  listItem?: "bullet";
  level?: number;
  markDefs: { _key: string; _type: "link"; href: string }[];
  children: PortableTextSpan[];
};

const INLINE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;

function parseInline(text: string, blockKey: string) {
  const markDefs: PortableTextBlock["markDefs"] = [];
  const children: PortableTextSpan[] = [];

  const push = (value: string, marks: string[]) => {
    if (!value) return;
    children.push({
      _type: "span",
      _key: `${blockKey}s${children.length}`,
      text: value,
      marks,
    });
  };

  let last = 0;
  let match: RegExpExecArray | null;
  INLINE.lastIndex = 0;

  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > last) push(text.slice(last, match.index), []);

    if (match[1] !== undefined) {
      const key = `${blockKey}l${markDefs.length}`;
      markDefs.push({ _key: key, _type: "link", href: match[2] });
      push(match[1], [key]);
    } else if (match[3] !== undefined) {
      push(match[3], ["strong"]);
    } else {
      push(match[4], ["em"]);
    }

    last = INLINE.lastIndex;
  }

  if (last < text.length) push(text.slice(last), []);
  if (children.length === 0) push("", []);

  return { markDefs, children };
}

function block(
  raw: string,
  key: string,
  style: "normal" | "h2",
  listItem?: "bullet",
): PortableTextBlock {
  const { markDefs, children } = parseInline(raw.trim(), key);
  return {
    _type: "block",
    _key: key,
    style,
    ...(listItem ? { listItem, level: 1 } : {}),
    markDefs,
    children,
  };
}

export function markdownToBlocks(markdown: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  const paragraphs = markdown.trim().split(/\n{2,}/);

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;

    const lines = trimmed.split("\n");
    const isList = lines.every((l) => /^\s*[-*+]\s+/.test(l));

    if (isList) {
      for (const line of lines) {
        blocks.push(
          block(line.replace(/^\s*[-*+]\s+/, ""), `b${blocks.length}`, "normal", "bullet"),
        );
      }
      continue;
    }

    const heading = trimmed.match(/^#{2,6}\s+(.*)$/s);
    if (heading) {
      blocks.push(block(heading[1].replace(/\n/g, " "), `b${blocks.length}`, "h2"));
      continue;
    }

    // Einzelne Zeilenumbrueche bleiben erhalten (Adressbloecke im Impressum).
    // Prose.tsx rendert Absaetze mit white-space: pre-line.
    blocks.push(block(lines.join("\n"), `b${blocks.length}`, "normal"));
  }

  return blocks;
}
