# Übergabe & Bedienung

## 1. Einmalige Einrichtung (durch Nick, vor der Übergabe)

### a) GitHub-OAuth-App + Auth-Worker für das CMS-Login

Sveltia CMS mit GitHub braucht einen kleinen OAuth-Proxy. Einmalig:

**1. GitHub-OAuth-App anlegen**
1. `https://github.com/settings/developers` → **OAuth Apps** → **New OAuth App**
2. **Application name:** `Fahrschule CH – Website CMS`
3. **Homepage URL:** `https://fahrschule-ch.ch`
4. **Authorization callback URL:** `https://<worker-subdomain>.workers.dev/callback`
   (URL aus Schritt 2 – erst Worker deployen, dann hier eintragen; danach kommt eine
   **Client ID** + man erzeugt ein **Client Secret**)

**2. Auth-Worker deployen** (kostenlos, Cloudflare)
1. `https://github.com/sveltia/sveltia-cms-auth` → Button **Deploy to Cloudflare**
2. Nach dem Deploy die Worker-URL notieren (z. B. `https://sveltia-cms-auth.<name>.workers.dev`)
3. Im Worker unter **Settings → Variables** setzen:
   - `GITHUB_CLIENT_ID` = Client ID aus Schritt 1
   - `GITHUB_CLIENT_SECRET` = Client Secret aus Schritt 1
   - `ALLOWED_DOMAINS` = `fahrschule-ch.ch,nick8952.github.io`
4. Callback-URL der OAuth-App auf `https://<worker-url>/callback` setzen (Schritt 1.4)
5. In `public/admin/config.yml` bei `backend.base_url` die Worker-URL eintragen, committen/pushen.

Der/die Kunde/Kundin braucht außerdem **Schreibzugriff (Write)** auf das GitHub-Repo
`Nick8952/fahrschule-ch-website`.

### b) Web3Forms-Schlüssel für die Formulare

1. `https://web3forms.com` → E-Mail `info@fahrschule-ch.ch` eingeben → **Create Access Key**
2. Den Schlüssel aus der Bestätigungsmail kopieren
3. In `data/site.json` bei `web3formsKey` einsetzen (oder später im CMS unter
   „Firmendaten & Einstellungen") → committen/pushen.

Ohne (a) kann sich niemand ins CMS einloggen; ohne (b) kommen keine Formular-Anfragen an.

---

## 2. Inhalte bearbeiten (für Costa / den Kunden)

1. **`https://nick8952.github.io/fahrschule-ch-website/admin/`** aufrufen
   (nach Go-Live auf eigene Domain entsprechend `https://<domain>/admin/`)
2. **„Sign in with GitHub"** → mit dem GitHub-Konto anmelden, das Schreibzugriff aufs Repo hat
3. Links eine Sammlung wählen, Felder ausfüllen, oben rechts **„Publish"**
4. Nach ~1–2 Minuten ist die Änderung live (GitHub Actions baut die Seite automatisch neu)

**Was wo bearbeitbar ist:**

| Im CMS unter … | ändert … |
|---|---|
| Firmendaten & Einstellungen | Adresse, Telefon, E-Mail, Social, Kennzahlen, **Demo-Modus**, **Web3Forms-Key** |
| Preise | Preistabelle, Pakete/Rechner, Angebotstext |
| Kurse | Theoriekurs, VKU DE/EN, **VKU-Termine** (buchbare Termine landen im Anmeldeformular) |
| Weitere Inhalte | Bewertungen, „Der Weg", Lernmodule, „Warum/Vorteile", Menü |
| Seiten-Texte | SEO-Titel/-Beschreibung, Hero-Texte, Freitextblöcke je Seite |
| Rechtstexte | AGB, Impressum, Datenschutz |

**Bilder tauschen:** im jeweiligen Feld „Vorschaubild" hochladen. Hero-/Sektionsfotos liegen
in `data/pages.json` bzw. den Seiten – falls diese im CMS gebraucht werden, eine weitere
Sammlung ergänzen.

---

## 3. Go-Live (wenn der Kunde zusagt)

1. **Demo-Modus aus:** CMS → „Firmendaten & Einstellungen" → `demo` auf **AUS** → Publish.
   (Entfernt `noindex` und die `robots.txt`-Sperre.)
2. **Eigene Domain** (`fahrschule-ch.ch`) auf GitHub Pages – siehe Abschnitt 6.

---

## 4. Projekt an den Kunden übergeben (Nick raus)

1. GitHub → Repo → **Settings → General → Danger Zone → Transfer ownership** an das
   Kundenkonto (oder Kunde forkt/importiert das Repo).
2. Neue **GitHub-OAuth-App** im Kundenkonto anlegen (Schritt 1a), Worker-Variablen +
   `config.yml` `repo` / `base_url` anpassen.
3. Kunde bekommt **Write**-Rechte aufs Repo (für CMS-Schreibzugriff).
4. **Web3Forms-Key** ist an `info@fahrschule-ch.ch` gebunden – bleibt gültig, kann im
   Web3Forms-Dashboard rotiert werden.
5. CMS-Bundle aktualisieren: neue Datei von
   `https://unpkg.com/@sveltia/cms@<version>/dist/sveltia-cms.js` nach
   `public/admin/sveltia-cms.js` legen + committen.

---

## 5. Fallback, falls das CMS-Login nicht klappt

Sveltia CMS läuft hier über den GitHub-OAuth-Proxy (`sveltia-cms-auth`, Cloudflare Worker).
Wenn das Login klemmt: Worker-Logs prüfen, `ALLOWED_DOMAINS` / Client-ID / Secret
kontrollieren, Callback-URL der OAuth-App = `<worker-url>/callback`. Alternativ auf
**Decap CMS** wechseln (`config.yml` weitgehend kompatibel, gleicher Worker als OAuth-Provider).

---

## 6. GitHub Pages + Domain

**Deploy** läuft über GitHub Actions (`.github/workflows/deploy.yml`) bei jedem Push auf `main`.
Pages-Quelle: **Settings → Pages → Source: GitHub Actions** (einmalig, ist gesetzt).

**Aktuelle URL (kein DNS nötig):** `https://nick8952.github.io/fahrschule-ch-website/`
Workflow-Env: `SITE_ORIGIN=https://nick8952.github.io`, `BASE_PATH=/fahrschule-ch-website`.

**Beim Go-Live auf eine eigene Domain** (z. B. `fahrschule-ch.ch` – Kunde/Domaininhaber muss DNS setzen):
1. `public/CNAME` mit der Domain anlegen.
2. Workflow: `SITE_ORIGIN: https://<domain>`, `BASE_PATH: ""`.
3. `public/admin/config.yml` `site_url` / `display_url` / `logo_url` auf `https://<domain>`.
4. GitHub → **Settings → Pages → Custom domain** eintragen.
5. **DNS** beim Provider:
   - Subdomain (z. B. `demo`) → **CNAME** auf `nick8952.github.io`
   - Apex → **A** auf `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
6. Nach Propagation „Enforce HTTPS" aktivieren; GitHub-OAuth-App (1a) Homepage-URL anpassen.

**GitLab läuft als Spiegel parallel weiter** (`.gitlab-ci.yml` + Remote `gitlab`) – der bestehende
Demo-Link `https://fahrschule-ch-website-f63075.gitlab.io/` funktioniert unverändert weiter.
Primär ist GitHub: `origin` = GitHub, `gitlab` = GitLab.
Push auf beide: `git push origin main && git push gitlab main`.
