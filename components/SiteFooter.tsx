import Link from "next/link";
import Image from "next/image";
import { site, nav } from "@/lib/data";
import { asset } from "@/lib/site";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      {/* CTA-Statement */}
      <section className="block-dark border-t border-steel/60">
        <div className="wrap section">
          <p className="eyebrow mb-5">Bereit?</p>
          <h2 className="max-w-[14ch] text-step-4 font-extrabold text-white">
            Bereit, loszufahren?
          </h2>
          <p className="mt-5 max-w-[46ch] text-on-dark-soft">
            Sichere dir deine Probelektion für CHF 50 – oder stelle einfach kurz deine Frage.
            Ich melde mich schnell zurück.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/kontakt" className="btn btn-signal">
              Probelektion buchen
            </Link>
            <a href={`tel:${site.phone.tel}`} className="btn btn-ghost text-white">
              {site.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-midnight-2 text-on-dark-soft">
        <div className="wrap py-14">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div>
              <span className="mb-4 inline-flex rounded-sm bg-white px-2.5 py-2">
                <Image
                  src={asset("/img/logo.png")}
                  alt={site.name}
                  width={280}
                  height={74}
                  className="h-6 w-auto"
                  unoptimized
                />
              </span>
              <p className="text-[0.92rem] leading-relaxed">
                {site.tagline}. {site.blurb}
              </p>
              <div className="mt-4 flex gap-2">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center border border-steel hover:bg-steel/40"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center border border-steel hover:bg-steel/40"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
                    <path d="M13 22v-8h3l1-4h-4V8c0-1 .3-2 2-2h2V2.2C18.7 2.1 17.4 2 16 2c-3 0-5 1.8-5 5.2V10H8v4h3v8z" />
                  </svg>
                </a>
              </div>
            </div>

            {nav.footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="mb-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-on-dark-soft/80">
                  {col.title}
                </h3>
                <ul className="grid gap-2 text-[0.92rem]">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-3.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-on-dark-soft/80">
                Kontakt
              </h3>
              <address className="grid gap-1.5 not-italic text-[0.92rem]">
                <span>Fahrschule CH – {site.instructor}</span>
                <span>{site.address.center}</span>
                <span>
                  {site.address.street}, {site.address.zip} {site.address.city}
                </span>
                <a href={`tel:${site.phone.tel}`} className="hover:text-white">
                  {site.phone.display}
                </a>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </address>
              <div className="mt-4 border border-steel px-4 py-3.5 text-[0.86rem] leading-relaxed">
                <strong className="mb-1 block font-mono text-[0.7rem] uppercase tracking-[0.08em] text-white">
                  Treffpunkt Albisriederplatz
                </strong>
                {site.transit} —{" "}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-white hover:text-signal"
                >
                  Route öffnen
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-steel/60 pt-6 font-mono text-[0.78rem]">
            <span>
              © {year} {site.name} – {site.instructor}
            </span>
            <span>{site.membership}</span>
            <span>
              <Link href="/impressum" className="hover:text-white">
                Impressum
              </Link>{" "}
              ·{" "}
              <Link href="/datenschutz" className="hover:text-white">
                Datenschutz
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
