"use client";

import { useState } from "react";
import { useT } from "@/lib/i18n/LanguageContext";

export default function VkuCalendar({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const t = useT();

  return (
    <div className="card !p-6 text-center sm:!p-8">
      {loaded ? (
        <iframe
          src={src}
          title={t(["copy", "VKU-Kurskalender & Anmeldung"], "VKU-Kurskalender & Anmeldung")}
          loading="lazy"
          className="min-h-[520px] w-full border-0 bg-white"
        />
      ) : (
        <>
          <p className="mx-auto max-w-[46ch] text-[0.93rem]">
            {t(["copy", "Der externe Kurskalender (asa.ch) wird erst nach deiner Zustimmung geladen. Dabei wird eine Verbindung zu asa.ch aufgebaut."], "Der externe Kurskalender (asa.ch) wird erst nach deiner Zustimmung geladen. Dabei wird eine Verbindung zu asa.ch aufgebaut.")}
          </p>
          <button type="button" onClick={() => setLoaded(true)} className="btn btn-signal mt-5 w-full sm:w-[22rem]">
            {t(["copy", "Kurskalender & Anmeldung laden"], "Kurskalender & Anmeldung laden")}
          </button>
        </>
      )}
    </div>
  );
}
