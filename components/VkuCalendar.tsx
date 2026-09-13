"use client";

import { useState } from "react";

export default function VkuCalendar({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="card !p-6 text-center sm:!p-8">
      {loaded ? (
        <iframe
          src={src}
          title="VKU-Kurskalender & Anmeldung"
          loading="lazy"
          className="min-h-[520px] w-full border-0 bg-white"
        />
      ) : (
        <>
          <p className="mx-auto max-w-[46ch] text-[0.93rem]">
            Der externe Kurskalender (asa.ch) wird erst nach deiner Zustimmung geladen.
            Dabei wird eine Verbindung zu asa.ch aufgebaut.
          </p>
          <button type="button" onClick={() => setLoaded(true)} className="btn btn-signal mt-5">
            Kurskalender &amp; Anmeldung laden
          </button>
        </>
      )}
    </div>
  );
}
