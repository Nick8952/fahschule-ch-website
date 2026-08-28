# Übergabe & Bedienung

## 1. Einmalige Einrichtung (durch Nick, vor der Übergabe)

### a) GitLab-OAuth-App für das CMS-Login

Es gibt dafür keine API – einmal von Hand in GitLab:

1. `https://gitlab.com/-/user_settings/applications` öffnen → **Add new application**
2. **Name:** `Fahrschule CH – Website CMS`
3. **Redirect URI:** `https://nick-tbz.gitlab.io/fahrschule-ch-website/admin/`
   (exakt so, mit Schrägstrich am Ende)
4. **Confidential:** Häkchen **entfernen**
5. **Scopes:** nur **`api`**
6. **Save application** → die **Application ID** kopieren
7. In `public/admin/config.yml` bei `backend.app_id` einsetzen, committen/pushen.

### b) Web3Forms-Schlüssel für die Formulare

1. `https://web3forms.com` → E-Mail `info@fahrschule-ch.ch` eingeben → **Create Access Key**
2. Den Schlüssel aus der Bestätigungsmail kopieren
3. In `data/site.json` bei `web3formsKey` einsetzen (oder später im CMS unter
   „Firmendaten & Einstellungen") → committen/pushen.

Ohne (a) kann sich niemand ins CMS einloggen; ohne (b) kommen keine Formular-Anfragen an.

---

## 2. Inhalte bearbeiten (für Costa / den Kunden)

1. **`https://nick-tbz.gitlab.io/fahrschule-ch-website/admin/`** aufrufen
2. **„Sign in with GitLab"** → mit dem GitLab-Konto anmelden, das Zugriff auf das Projekt hat
3. Links eine Sammlung wählen, Felder ausfüllen, oben rechts **„Publish"**
4. Nach ~1–2 Minuten ist die Änderung live (GitLab baut die Seite automatisch neu)

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
2. **Eigene Domain** (`fahrschule-ch.ch`): GitLab → Projekt → **Deploy → Pages → New domain**,
   DNS setzen (CNAME/ALIAS + Verifizierungs-TXT). Danach:
   - `next.config.mjs`: `BASE_PATH = ""`, `SITE_ORIGIN = "https://www.fahrschule-ch.ch"`
   - `public/admin/config.yml`: `site_url` / `display_url` / `logo_url` anpassen
   - GitLab-OAuth-App: Redirect URI auf `https://www.fahrschule-ch.ch/admin/` ändern
   - Web3Forms: nichts nötig (Redirect-URL wird aus `SITE_ORIGIN` gebaut).

---

## 4. Projekt an den Kunden übergeben (Nick raus)

1. GitLab → Projekt → **Settings → General → Advanced → Transfer project** in den
   Namespace/die Gruppe des Kunden (oder Kunde importiert das Repo).
2. Neue **GitLab-OAuth-App** im Kundenkonto anlegen (Schritt 1a), `config.yml` `repo` + `app_id`
   anpassen.
3. Kunde bekommt **Maintainer**-Rechte im Projekt (für CMS-Schreibzugriff).
4. **Web3Forms-Key** ist an `info@fahrschule-ch.ch` gebunden – bleibt gültig, kann im
   Web3Forms-Dashboard rotiert werden.
5. CMS-Bundle aktualisieren: neue Datei von
   `https://unpkg.com/@sveltia/cms@<version>/dist/sveltia-cms.js` nach
   `public/admin/sveltia-cms.js` legen + committen.

---

## 5. Fallback, falls das CMS-Login nicht klappt

Sveltia CMS nutzt den GitLab-PKCE-Flow (kein Server). Wenn GitLab das irgendwann nicht mehr
unterstützt: auf **Decap CMS** wechseln (`config.yml` ist kompatibel) und einen
`sveltia-cms-auth`- bzw. `netlify-cms-oauth-provider`-Worker (kostenlos, Cloudflare Workers)
als OAuth-Proxy davorschalten. `backend` dann `name: git-gateway` bzw. `name: gitlab` mit
`base_url: <worker-url>`.
