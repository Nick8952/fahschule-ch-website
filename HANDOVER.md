# Übergabe – Website Fahrschule CH (Costa Chatzis)

Diese Anleitung richtet sich an zwei Personen:

- **Abschnitt 1–3** an denjenigen, der die Website technisch einrichtet (einmalig).
- **Abschnitt 4–6** an Costa Chatzis, der die Inhalte danach selbst pflegt.

---

## Worauf die Website läuft

| Teil | Dienst | Wofür |
|---|---|---|
| Website | **Vercel** | Liefert die Seiten aus, weltweit und verschlüsselt |
| Programmcode | **GitHub** | Speichert den Bauplan der Website |
| Inhalte | **Sanity** | Texte, Preise, Kurse, VKU-Termine – das, was bearbeitet wird |
| Kontaktformular | **Web3Forms** | Leitet Anfragen an die E-Mail-Adresse weiter |

Es gibt **keinen eigenen Server und keine Datenbank**, die gewartet werden müssten.

---

## Auf wessen Konten? (bitte zuerst lesen)

Die Konten wandern **erst nach der Zusage** zu Costa. Vorher läuft alles auf den
Konten des Erstellers.

| | Vor der Zusage (Demo) | Nach der Zusage |
|---|---|---|
| GitHub | Ersteller | auf Costas Konto übertragen |
| Vercel | Ersteller | auf Costas Konto übertragen |
| Sanity | Ersteller | Costa als Administrator einladen, dann Projekt übertragen |
| Web3Forms | **eigene** E-Mail, damit das Formular vorführbar ist | Costa holt den Schlüssel auf `info@fahrschule-ch.ch` |

Bei Sanity gilt: **Anmeldung ist nicht dasselbe wie Inhaberschaft.** Costa kann
längst mit seiner E-Mail Inhalte bearbeiten, während das Projekt noch dem
Ersteller gehört. Die Übertragung ist der letzte Schritt, nicht der erste.

---

## 1. Sanity-Projekt

**Bereits angelegt:** Projekt-ID `9py9mmpz`, Dataset `production`, Sichtbarkeit
**Public** (die Website braucht dadurch kein Lese-Token).

Falls neu aufgesetzt werden muss (z. B. eigenes Projekt für einen anderen Kunden):

1. Auf <https://sanity.io> anmelden — vor der Zusage mit der **eigenen**
   E-Mail-Adresse, nicht mit der des Kunden.
2. **Create new project** → Dataset `production`, Sichtbarkeit **Public**.
3. Unter **API → Tokens** einen Token mit der Rolle **Editor** erstellen (nur
   für `npm run seed`, nur einmal sichtbar — sofort kopieren).
4. Unter **API → CORS origins** eintragen (jeweils mit *Allow credentials*):
   - `http://localhost:3000`
   - die Vercel-Adresse, z. B. `https://fahschule-ch-website.vercel.app`
   - `https://fahrschule-ch.ch`, sobald die Domain verbunden ist

**Für das bestehende Projekt `9py9mmpz` noch zu erledigen:** CORS-Eintrag für die
tatsächliche Vercel-Adresse ergänzen, sobald das Projekt in Vercel importiert ist
(Schritt 3).

## 2. Inhalte einspielen

Die Inhalte liegen bereits in Sanity (heute per `npm run seed` eingespielt). Bei
Bedarf erneut möglich — das Skript überschreibt anhand fester Dokument-Namen,
statt zu duplizieren:

```bash
cp .env.example .env.local   # Werte eintragen, siehe unten
npm run seed -- --dry-run    # zeigt nur an, was passieren würde
npm run seed                 # schreibt/überschreibt die Dokumente
npm run dev                  # localhost:3000/studio zum Prüfen
```

Für `npm run seed` wird zusätzlich `SANITY_API_WRITE_TOKEN` gebraucht (Editor-Rolle,
siehe Schritt 1.3) — nur lokal, nie in Vercel eintragen.

## 3. Vercel verbinden

1. Auf <https://vercel.com> mit dem GitHub-Konto anmelden.
2. **Add New → Project** → `Nick8952/fahschule-ch-website` importieren.
3. Unter **Settings → Environment Variables** eintragen:

   | Name | Wert |
   |---|---|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | `9py9mmpz` |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-10-01` |
   | `NEXT_PUBLIC_SITE_URL` | die endgültige Adresse, z. B. `https://fahrschule-ch.ch` |
   | `SANITY_REVALIDATE_SECRET` | ein selbst ausgedachtes Passwort |

   Den **Schreib**-Token (`SANITY_API_WRITE_TOKEN`) hier **nicht** eintragen.

4. **Deploy** drücken. Ab jetzt baut Vercel bei jeder Code-Änderung automatisch neu.
5. In Sanity unter **API → Webhooks** einen Webhook anlegen:

   | Feld | Wert |
   |---|---|
   | URL | `https://<deine-adresse>/api/revalidate` |
   | Dataset | `production` |
   | Trigger on | Create, Update, Delete |
   | Secret | derselbe Wert wie `SANITY_REVALIDATE_SECRET` |

   Ohne diesen Webhook dauert es bis zu einer Minute, bis eine Änderung sichtbar
   wird (ISR-Intervall). Mit ihm sind es wenige Sekunden.

---

## 4. Inhalte bearbeiten (für Costa)

**Adresse:** `https://<deine-website>/studio`
**Anmeldung:** mit der E-Mail-Adresse, an die die Einladung ging. Kein
zusätzliches Passwort, keine Software zum Installieren. Geht auch am Handy.

Links in der Leiste stehen die Bereiche, oben nach Häufigkeit sortiert:

| Bereich | Was drin steht |
|---|---|
| **Preise** | Preistabelle, Pakete/Rechner-Werte, Angebotstext |
| **Kurse & VKU-Termine** | Theoriekurs, Nothelferkurs, VKU Deutsch/Englisch, buchbare Termine |
| **Der Weg** | Die Schritte zum Führerschein |
| **Lernmodule** | Die Kompetenzleiter |
| **Bewertungen** | Kundenstimmen |
| **Gründe & Vorteile** | „Warum Fahrschule CH", Vorteile-Liste |
| **Seitentexte** | Überschriften/Einleitungen je Seite, SEO-Texte |
| **Seiten-Kacheln & Listen** | Karten/Listen auf den Unterseiten |
| **Grundeinstellungen** | Adresse, Telefon, E-Mail, Kennzahlen, Web3Forms-Schlüssel, Demo-Modus |
| **Navigation** | Menüpunkte oben und in der Fusszeile |
| **Rechtstexte** | AGB, Impressum, Datenschutz |

**So läuft eine Änderung ab:**

1. Bereich anklicken, Feld ändern.
2. Unten rechts auf **Publish** tippen.
3. Nach ein paar Sekunden neu laden — fertig.

Solange nicht auf *Publish* getippt wurde, ändert sich auf der Website nichts.

**Etwas kaputt gemacht?** Oben rechts im Studio gibt es eine Versionsgeschichte.
Jeder frühere Stand lässt sich zurückholen.

## 5. Kontaktformular scharfschalten

**Für die Demo** trägt der Ersteller vorübergehend seine eigene Adresse ein.

**Für den Betrieb** muss Costa es selbst machen (Zugriff auf `info@fahrschule-ch.ch`):

1. Auf <https://web3forms.com> die E-Mail-Adresse eintragen.
2. Den zugeschickten Access Key kopieren.
3. Im Studio unter **Grundeinstellungen → Web3Forms Zugriffs-Schlüssel** einfügen,
   **Publish** drücken.
4. Testanfrage senden und prüfen, ob sie ankommt.

## 6. Vor dem echten Start

- [ ] **Demo-Modus ausschalten** (Grundeinstellungen → `demo` auf AUS). Solange er
      an ist, wird die Seite bei Google nicht gefunden.
- [ ] **Web3Forms-Schlüssel auf Costas Adresse umgestellt?**
- [ ] **Eigene Domain** `fahrschule-ch.ch` in Vercel verbinden, DNS beim aktuellen
      Provider umstellen, `NEXT_PUBLIC_SITE_URL` in Vercel anpassen.
- [ ] Sanity-**CORS** um die finale Domain ergänzen.
- [ ] Auf dem Handy durchklicken: Anrufen, Route öffnen, Formular abschicken.

---

## Wenn etwas nicht funktioniert

**Das Studio zeigt «Noch kein Sanity-Projekt verbunden»**
Die Umgebungsvariablen in Vercel fehlen oder sind falsch geschrieben. Nach dem
Eintragen muss einmal neu deployt werden.

**Anmeldung im Studio schlägt fehl / weisse Seite**
Die Adresse der Website fehlt in Sanity unter *API → CORS origins*. Dort mit
*Allow credentials* eintragen.

**Änderung ist nach dem Publish nicht sichtbar**
Bis zu einer Minute warten und neu laden. Bleibt es dabei, stimmt der Webhook
nicht (Abschnitt 3, Schritt 5) oder das Secret weicht ab.

**Anfragen kommen nicht an**
Web3Forms-Schlüssel prüfen (Abschnitt 5). Auch in den Spam-Ordner schauen.
