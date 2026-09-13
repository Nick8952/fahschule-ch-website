import type { Metadata } from "next";
import { Darker_Grotesque, Archivo, DM_Mono } from "next/font/google";
import { getNav, getSite } from "@/lib/data";
import { absUrl } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const display = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(absUrl("/")),
    title: {
      default: `${site.name} Zürich – ${site.instructor}`,
      template: `%s`,
    },
    description: site.blurb,
    applicationName: site.name,
    authors: [{ name: `${site.name} – ${site.instructor}` }],
    robots: site.demo
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "de_CH",
      siteName: site.name,
    },
    other: { "theme-color": site.themeColor },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [site, nav] = await Promise.all([getSite(), getNav()]);
  return (
    <html lang="de" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body text-step-0">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader site={site} nav={nav} />
        <main id="inhalt">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
