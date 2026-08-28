/* Liest Markdown-Inhalte aus dem content-Ordner: Frontmatter + gerendertes HTML. */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = process.cwd();

marked.setOptions({ gfm: true, breaks: false });

type Parsed<T> = { frontmatter: T; html: string; raw: string };

function read<T>(file: string): Parsed<T> {
  const src = fs.readFileSync(file, "utf8");
  const { data, content } = matter(src);
  const html = content.trim() ? (marked.parse(content) as string) : "";
  return { frontmatter: data as T, html, raw: content };
}

export function getPage<T = Record<string, unknown>>(slug: string): Parsed<T> {
  return read<T>(path.join(ROOT, "content", "pages", `${slug}.md`));
}

export function getLegal<T = { title: string; subtitle?: string; seoTitle?: string; seoDescription?: string }>(
  slug: string,
): Parsed<T> {
  return read<T>(path.join(ROOT, "content", "legal", `${slug}.md`));
}

export function listPages(): string[] {
  return fs
    .readdirSync(path.join(ROOT, "content", "pages"))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
