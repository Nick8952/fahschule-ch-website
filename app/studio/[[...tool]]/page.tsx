import { isSanityConfigured } from "@/sanity/env";

import Studio from "./Studio";

export { metadata, viewport } from "next-sanity/studio";

/* Das Studio ist die Bearbeitungsoberfläche und gehört nicht in den Index. */
export const dynamic = "force-dynamic";

/**
 * Ohne verbundenes Sanity-Projekt würde das Studio beim Start mit einem
 * unverständlichen Fehler abbrechen. Stattdessen steht hier, was noch fehlt —
 * gedacht für den Moment, in dem das Projekt zwar deployt, Sanity aber noch
 * nicht eingerichtet ist.
 */
function SetupNotice() {
  const steps = [
    "Auf sanity.io ein Projekt anlegen (Dataset: production).",
    "Projekt-ID, Dataset und ein Lese-Token als Umgebungsvariablen in Vercel eintragen.",
    "In Sanity unter API → CORS origins die Adresse dieser Website eintragen, mit «Allow credentials».",
    "Neu deployen — danach ist diese Seite die Inhaltsverwaltung.",
  ];

  return (
    <main className="block-dark flex min-h-[100svh] items-center">
      <div className="wrap wrap-eng py-24">
        <p className="eyebrow mb-6">Inhaltsverwaltung</p>

        <h1 className="text-step-3 font-extrabold text-white">Noch kein Sanity-Projekt verbunden</h1>

        <p className="mt-6 max-w-[52ch] text-on-dark-soft">
          Die Website läuft bereits und zeigt so lange die im Projekt hinterlegten Inhalte an.
          Damit sie hier bearbeitet werden können, fehlt nur noch die Verbindung zu Sanity.
        </p>

        <ol className="mt-10">
          {steps.map((text, i) => (
            <li
              key={text}
              className="grid gap-x-6 border-t border-steel py-5 sm:grid-cols-[4rem_1fr]"
            >
              <span className="font-mono text-[0.85rem] text-signal-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-on-dark-soft">{text}</span>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-[0.9rem] text-on-dark-faint">
          Die ausführliche Anleitung mit allen Werten steht in HANDOVER.md im Projekt.
        </p>
      </div>
    </main>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured) return <SetupNotice />;
  return <Studio />;
}
