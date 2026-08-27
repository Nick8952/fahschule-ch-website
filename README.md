# Fahrschule CH – Demo-Website

Statische Demo-Website für **Fahrschule CH – Costa Chatzis**, Zürich (Albisriederplatz).
Neu aufgebaut auf Basis der Inhalte von [fahrschule-ch.ch](https://www.fahrschule-ch.ch/).

## Technik

- Reines HTML/CSS/JS, **kein Build-Tool nötig**
- Responsive, mobil getestet (kein horizontales Scrollen, Touch-Ziele ≥ 44 px)
- SEO-Basics: Meta-Tags, Open Graph, `schema.org/DrivingSchool`, `sitemap.xml`, `robots.txt`
- Kontakt- und VKU-Formular per **vorbefülltem `mailto:`** (kein Backend)
- Externe Komponenten (VKU-Kurskalender der asa.ch, Google Maps) werden nur nach
  Klick / als Link geladen – kein Tracking

## Struktur

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite |
| `angebot-preise.html` | Angebote, Preis-Rechner, vollständige Preisliste |
| `agb.html` | AGB |
| `ueber-mich.html` | Costa Chatzis |
| `kurse.html` | Kursübersicht |
| `theoriekurs.html` · `verkehrskunde.html` · `verkehrskunde-englisch.html` | Kurse |
| `kontrollfahrt.html` | Kontrollfahrt |
| `der-weg.html` | 10 Schritte zum Führerausweis |
| `kontakt.html` | Kontaktformular & Anfahrt |
| `driving-school.html` | Englische Seite |
| `impressum.html` · `datenschutz.html` · `inhaltsverzeichnis.html` | Rechtliches / Sitemap |
| `css/style.css` · `js/main.js` | Design-System & Interaktionen |
| `assets/img` · `assets/video` | Logo, Originalfotos, Intro-Video |

## Lokal ansehen

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
# → http://localhost:8130/
```

## Deployment

GitLab Pages via `.gitlab-ci.yml` – nach jedem Push auf den Default-Branch wird die
Seite automatisch veröffentlicht (Projekt → Deploy → Pages).

## Englische Seite

`driving-school.html` ist bewusst komplett auf Englisch – die Original-Website
(`fahrschule-ch.ch/ch/driving-school-zuerich/`) hat diese Seite ebenfalls in Englisch
für englischsprachige Fahrschüler:innen. Im Menü heisst der Punkt „English“, oben auf
der Seite steht ein Hinweis mit Link zurück zur deutschen Startseite.

## Hinweise / offene Punkte

- **Doppellektion:** Preisseite nennt 100 Minuten, die AGB der Original-Seite 105 Minuten –
  hier durchgehend **100 Minuten** verwendet (AGB-Text im Wortlaut belassen).
- **VKU-Englisch-Preis:** durchgehend **CHF 160** (eine Unterseite der Original-Seite nannte
  an einer Stelle 200 – nicht übernommen).
- **VKU-Englisch-Termine** sind der Original-Website entnommen und teils vergangen –
  Hinweis auf der Seite, Daten bitte mit dem Fahrlehrer bestätigen bzw. aktualisieren.
- Bilder/Logo/Video stammen von der bestehenden Website der Fahrschule CH.

Unverbindliche Demo, erstellt zu Präsentationszwecken.
