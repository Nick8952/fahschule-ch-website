"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { getNav, getSite } from "@/lib/data";
import { asset } from "@/lib/site";
import LanguageToggle from "./LanguageToggle";
import { useT } from "@/lib/i18n/LanguageContext";

type Props = {
  site: Awaited<ReturnType<typeof getSite>>;
  nav: Awaited<ReturnType<typeof getNav>>;
};

export default function SiteHeader({ site, nav }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useT();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className={`header-shell fixed inset-x-0 top-0 z-50 ${scrolled ? "is-scrolled" : ""}`}>
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center rounded-sm bg-white px-2 py-1.5"
            aria-label={`${site.name} – ${t("ui.home", "Start")}`}
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

          <nav className="hidden items-center gap-x-6 xl:flex" aria-label={t("ui.mainNav", "Hauptnavigation")}>
            {nav.primary.filter((item) => item.href !== "/driving-school").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                hrefLang={"lang" in item ? (item as { lang: string }).lang : undefined}
                className={`relative inline-flex h-10 items-center whitespace-nowrap font-mono text-[0.78rem] font-medium tracking-[0.01em] transition-colors ${
                  isActive(item.href) ? "text-signal-soft" : "text-on-dark-soft hover:text-white"
                }`}
              >
                {t(["nav", item.label], item.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle className="hidden xl:grid" />
            <Link
              href={nav.ctaHref}
              className="btn btn-signal hidden w-[8.5rem] whitespace-nowrap !min-h-0 !px-2 !py-2 !text-[0.68rem] sm:inline-flex"
            >
              {t(["copy", "Probelektion"], nav.ctaLabel)}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("ui.menuClose", "Menü schliessen") : t("ui.menuOpen", "Menü öffnen")}
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center border border-steel text-white xl:hidden"
            >
              <span className="relative block h-[2px] w-5 bg-current before:absolute before:-top-1.5 before:left-0 before:h-[2px] before:w-5 before:bg-current after:absolute after:top-1.5 after:left-0 after:h-[2px] after:w-5 after:bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobiles Voll-Sheet */}
      <div
        className={`fixed inset-0 z-40 bg-midnight transition-transform duration-300 xl:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ paddingTop: "calc(var(--header-h) + 1rem)" }}
        aria-hidden={!open}
      >
        <nav className="wrap flex h-full flex-col overflow-y-auto pb-24" aria-label={t("ui.mobileNav", "Mobile Navigation")}>
          <LanguageToggle className="mb-4" />
          {[{ label: "Start", href: "/" }, ...nav.primary, ...nav.mobileExtra].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between border-b border-steel/50 py-4 font-display text-3xl font-bold text-white"
            >
              {t(["nav", item.label], item.label)}
              <span className="text-signal-soft">→</span>
            </Link>
          ))}
          <div className="mt-6 grid gap-2 font-mono text-[0.9rem] text-on-dark-soft">
            <a href={`tel:${site.phone.tel}`} className="text-signal-soft">
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
        className="fixed inset-x-0 bottom-0 z-30 flex gap-px border-t border-steel bg-midnight [transform:translateZ(0)] sm:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <a
          href={`tel:${site.phone.tel}`}
          className="flex flex-1 items-center justify-center py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-white"
        >
          {t("ui.call", "Anrufen")}
        </a>
        <Link
          href={nav.ctaHref}
          className="flex flex-1 items-center justify-center bg-signal py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-white"
        >
          {t("ui.trial", "Probelektion")}
        </Link>
      </div>

      <div className="h-[var(--header-h)] bg-midnight" />
    </>
  );
}
