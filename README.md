# Fahrschule CH – Website

Website für **Fahrschule CH – Costa Chatzis**, Zürich (Albisriederplatz).
Next.js 15 (statischer Export) + Sveltia CMS, deployed auf **GitHub Pages**.

**Live:** https://nick8952.github.io/fahrschule-ch-website/
**Inhalte bearbeiten:** https://nick8952.github.io/fahrschule-ch-website/admin/ → siehe [HANDOVER.md](HANDOVER.md)

> GitLab läuft als Spiegel parallel weiter (Demo-Link
> `https://fahrschule-ch-website-f63075.gitlab.io/`). Primär ist GitHub.

## Technik

- **Next.js 15** App Router, TypeScript, Tailwind CSS, Framer Motion – `output: "export"`
- Deploy-Ziel über Env-Variablen (`SITE_ORIGIN`, `BASE_PATH`), in der jeweiligen CI gesetzt.
  Aktuell GitHub Pages unter Pfadpräfix `/fahrschule-ch-website`. Bei eigener Domain:
  `SITE_ORIGIN=https://fahrschule-ch.ch`, `BASE_PATH=""` (siehe HANDOVER.md 6).
- **Sveltia CMS** unter `public/admin/` – Git-basiert (GitHub-Backend), Login über
  `sveltia-cms-auth` (Cloudflare Worker als OAuth-Proxy), CMS-Bundle vendored
  (`public/admin/sveltia-cms.js`, Version 0.201.1).
- **Formulare** via Web3Forms (native POST → `/danke/`).
- **Karte** OpenStreetMap-Embed; **VKU-Kalender** asa.ch-iframe (Consent-Load).
- SEO: Metadata API, `sitemap.xml`, `robots.txt`, `schema.org/DrivingSchool`.
- `data/site.json` → `demo: true` = `noindex` (Demo-Schutz). Bei Go-Live auf `false`.

## Inhalt (wo was liegt)

| Datei | Inhalt |
|---|---|
| `data/site.json` | Firmendaten, Kontakt, Kennzahlen, **Web3Forms-Key**, **demo-Flag** |
| `data/prices.json` | Preistabelle + Rechner-Pakete (eine Quelle) |
| `data/courses.json` | Theoriekurs, Nothelfer, VKU DE/EN, **VKU-Termine** (Liste + Anmelde-Dropdown, eine Quelle) |
| `data/testimonials.json` | Bewertungen |
| `data/steps.json` | „Der Weg" – 10 Schritte |
| `data/modules.json` | Lernmodule (Kompetenzleiter) |
| `data/reasons.json` | „Warum", „Vorteile", Vertrauensband |
| `data/nav.json` | Menü + Footer-Spalten |
| `data/pages.json` | Seiten-spezifische Karten/Listen (Leistungen, Über-mich-Punkte, …) |
| `content/pages/*.md` | Pro Seite: SEO-Titel/-Beschreibung, Hero-Text, Freitext |
| `content/legal/*.md` | AGB, Impressum, Datenschutz |
| `public/img/` | Logo, Fotos (CMS-Uploads → `public/img/uploads/`) |

## Lokal entwickeln

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statischer Export nach out/
```

## Deployment

- **GitHub Pages (primär):** `.github/workflows/deploy.yml` – GitHub Actions bei jedem Push
  auf `main` (auch CMS-Commits). Pages-Quelle: Settings → Pages → Source: GitHub Actions.
- **GitLab Pages (Spiegel):** `.gitlab-ci.yml` – gleicher Build, hält den alten Demo-Link aktiv.
- Beide Remotes pushen: `git push origin main && git push gitlab main`
  (`origin` = GitHub, `gitlab` = GitLab).

## Bekannte inhaltliche Punkte

- **Doppellektion:** Preisseite 100 Min, AGB-Wortlaut 105 Min – hier durchgehend 100 (AGB unverändert).
- **VKU Englisch:** durchgehend CHF 160.
- **VKU-Englisch-Termine** teils vergangen – sichtbarer Hinweis; im CMS aktualisieren.
- Bilder/Logo/Video von der bestehenden Website der Fahrschule CH.
- Einige Karten-Texte auf Unterseiten liegen in `data/pages.json` und sind (noch) nicht im CMS
  – bei Bedarf als weitere CMS-Sammlung ergänzen.

Alte statische Version: Branch `archive/v1-static`, Tag `v1-static-demo`.
