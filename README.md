# Fahrschule CH – Website

Website für **Fahrschule CH – Costa Chatzis**, Zürich (Albisriederplatz).
Next.js 15 (statischer Export) + Sveltia CMS, deployed auf GitLab Pages.

**Live:** https://nick-tbz.gitlab.io/fahrschule-ch-website/
**Inhalte bearbeiten:** https://nick-tbz.gitlab.io/fahrschule-ch-website/admin/ → siehe [HANDOVER.md](HANDOVER.md)

## Technik

- **Next.js 15** App Router, TypeScript, Tailwind CSS, Framer Motion – `output: "export"`
- **basePath** `/fahrschule-ch-website` (Pfad auf GitLab Pages). Bei eigener Domain in
  `next.config.mjs` auf `""` setzen (siehe HANDOVER.md).
- **Sveltia CMS** unter `public/admin/` – Git-basiert, Login via GitLab-OAuth (PKCE),
  CMS-Bundle vendored (`public/admin/sveltia-cms.js`, Version 0.201.1).
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
npm run dev        # http://localhost:3000/fahrschule-ch-website
npm run build      # statischer Export nach out/
```

## Deployment

GitLab CI (`.gitlab-ci.yml`): `npm ci && npm run build && mv out public`. Läuft bei jedem
Push auf `main` (auch CMS-Commits) → ~1–2 Min später live.

## Bekannte inhaltliche Punkte

- **Doppellektion:** Preisseite 100 Min, AGB-Wortlaut 105 Min – hier durchgehend 100 (AGB unverändert).
- **VKU Englisch:** durchgehend CHF 160.
- **VKU-Englisch-Termine** teils vergangen – sichtbarer Hinweis; im CMS aktualisieren.
- Bilder/Logo/Video von der bestehenden Website der Fahrschule CH.
- Einige Karten-Texte auf Unterseiten liegen in `data/pages.json` und sind (noch) nicht im CMS
  – bei Bedarf als weitere CMS-Sammlung ergänzen.

Alte statische Version: Branch `archive/v1-static`, Tag `v1-static-demo`.
