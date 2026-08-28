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

  useEffect(() => setOpen(false), [pathname]);
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
      <header className="fixed inset-x-0 top-0 z-50 bg-midnight/95 backdrop-blur">
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center rounded-sm bg-white px-2 py-1.5"
            aria-label={`${site.name} – Start`}
          >
            <Image
              src={asset("/img/logo.png")}
              alt={`${site.name} – ${site.instructor}`}
              width={280}
              height={74}
              className="h-4 w-auto"
              priority
              unoptimized
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Hauptnavigation">
            {nav.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                hrefLang={"lang" in item ? (item as { lang: string }).lang : undefined}
                className={`relative px-3 py-2 font-mono text-[0.76rem] uppercase tracking-[0.06em] transition-colors ${
                  isActive(item.href) ? "text-signal" : "text-on-dark-soft hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={nav.ctaHref}
              className="hidden bg-signal px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-white transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              {nav.ctaLabel} · CHF 50
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menü schliessen" : "Menü öffnen"}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center border border-steel text-white lg:hidden"
            >
              <span className="relative block h-[2px] w-5 bg-current before:absolute before:-top-1.5 before:left-0 before:h-[2px] before:w-5 before:bg-current after:absolute after:top-1.5 after:left-0 after:h-[2px] after:w-5 after:bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobiles Voll-Sheet */}
      <div
        className={`fixed inset-0 z-40 bg-midnight transition-transform duration-300 lg:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: "calc(var(--header-h) + 1rem)" }}
        aria-hidden={!open}
      >
        <nav className="wrap flex h-full flex-col overflow-y-auto pb-24">
          {[{ label: "Start", href: "/" }, ...nav.primary, ...nav.mobileExtra].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-b border-steel/50 py-4 font-display text-3xl font-bold text-white"
            >
              {item.label}
              <span className="text-signal">→</span>
            </Link>
          ))}
          <div className="mt-6 grid gap-2 font-mono text-[0.9rem] text-on-dark-soft">
            <a href={`tel:${site.phone.tel}`} className="text-signal">
              {site.phone.display}
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>
              {site.address.street}, {site.address.zip} {site.address.city}
            </span>
          </div>
        </nav>
      </div>

      {/* Fixe Aktionsleiste (Mobile) */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 flex gap-px border-t border-steel bg-midnight sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <a
          href={`tel:${site.phone.tel}`}
          className="flex flex-1 items-center justify-center py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-white"
        >
          Anrufen
        </a>
        <Link
          href={nav.ctaHref}
          className="flex flex-1 items-center justify-center bg-signal py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-white"
        >
          Probelektion
        </Link>
      </div>

      <div className="h-[var(--header-h)] bg-midnight" />
    </>
  );
}
