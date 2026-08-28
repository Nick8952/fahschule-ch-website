"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { site, nav } from "@/lib/data";
import { asset } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-shadow ${
          scrolled ? "shadow-s" : ""
        }`}
      >
        <div
          className={`border-b backdrop-blur transition-colors ${
            scrolled ? "bg-paper/95" : "bg-paper/80"
          }`}
        >
          <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} – Start`}>
              <Image
                src={asset("/img/logo.png")}
                alt={`${site.name} – ${site.instructor}`}
                width={280}
                height={74}
                className="h-7 w-auto"
                priority
                unoptimized
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
              {nav.primary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  hrefLang={"lang" in item ? (item as { lang: string }).lang : undefined}
                  className={`relative rounded-pill px-3 py-2 text-[0.9rem] font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-pine"
                      : "text-ink-soft hover:text-pine"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-signal" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={nav.ctaHref}
                className="hidden rounded-pill bg-pine px-4 py-2.5 text-[0.86rem] font-semibold text-white transition-transform hover:-translate-y-0.5 sm:inline-flex"
              >
                {nav.ctaLabel} · CHF 50
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Menü schliessen" : "Menü öffnen"}
                aria-expanded={open}
                className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-white lg:hidden"
              >
                <span className="relative block h-[2px] w-5 bg-ink before:absolute before:-top-1.5 before:left-0 before:h-[2px] before:w-5 before:bg-ink after:absolute after:top-1.5 after:left-0 after:h-[2px] after:w-5 after:bg-ink" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobiles Voll-Sheet */}
      <div
        className={`fixed inset-0 z-40 bg-paper transition-transform duration-300 lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: "calc(var(--header-h) + 1rem)" }}
        aria-hidden={!open}
      >
        <nav className="wrap flex h-full flex-col gap-1 overflow-y-auto pb-24">
          {[
            { label: "Start", href: "/" },
            ...nav.primary,
            ...nav.mobileExtra,
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-b border-line py-4 font-display text-2xl"
            >
              {item.label}
              <span className="text-signal">→</span>
            </Link>
          ))}
          <div className="mt-6 grid gap-2 text-step-0">
            <a href={`tel:${site.phone.tel}`} className="font-semibold text-pine">
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span className="text-ink-soft">
              {site.address.street}, {site.address.zip} {site.address.city}
            </span>
          </div>
        </nav>
      </div>

      {/* Fixe Aktionsleiste (Mobile) */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-paper/95 p-2 backdrop-blur sm:hidden">
        <a
          href={`tel:${site.phone.tel}`}
          className="flex flex-1 items-center justify-center rounded-lg border border-line py-3 font-semibold text-pine"
        >
          Anrufen
        </a>
        <Link
          href={nav.ctaHref}
          className="flex flex-1 items-center justify-center rounded-lg bg-signal py-3 font-semibold text-white"
        >
          Probelektion
        </Link>
      </div>

      <div className="h-[var(--header-h)]" />
    </>
  );
}
