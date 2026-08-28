import type { Metadata } from "next";
import { Instrument_Serif, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/data";
import { absUrl } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body text-step-0 antialiased">
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-pine focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="inhalt">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
