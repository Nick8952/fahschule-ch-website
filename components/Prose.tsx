import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

import type { PortableTextBlock } from "@/lib/markdownToBlocks";

/**
 * Rendert den Fliesstext aus Sanity (Portable Text).
 *
 * Die Gestaltung steckt in der .prose-Klasse in globals.css — hier wird nur
 * festgelegt, welches HTML-Element aus welchem Baustein wird.
 */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
};

export default function Prose({ body }: { body: PortableTextBlock[] }) {
  if (!body?.length) return null;
  return (
    <div className="prose">
      <PortableText value={body} components={components} />
    </div>
  );
}
