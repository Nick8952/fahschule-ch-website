"use client";

import { useState } from "react";
import { courses } from "@/lib/data";

export default function VkuCalendar() {
  const [loaded, setLoaded] = useState(false);
  const src = courses.vkuDeutsch.iframeUrl;

  return (
    <div className="rounded-lg border border-line bg-panel p-6 text-center sm:p-8">
      {loaded ? (
        <iframe
          src={src}
          title="VKU-Kurskalender & Anmeldung"
          loading="lazy"
          className="min-h-[520px] w-full rounded border-0 bg-white"
        />
      ) : (
        <>
          <p className="mx-auto max-w-[46ch] text-[0.94rem] text-ink-soft">
            Der externe Kurskalender (asa.ch) wird erst nach deiner Zustimmung geladen.
            Dabei wird eine Verbindung zu asa.ch aufgebaut.
          </p>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="btn btn-pine mt-5"
          >
            Kurskalender &amp; Anmeldung laden
          </button>
        </>
      )}
    </div>
  );
}
