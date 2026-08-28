import Link from "next/link";
import { Field, Web3FormsHidden, inputClass } from "./FormBits";

export default function ContactForm() {
  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="rounded-lg border border-line bg-white p-6 shadow-m sm:p-8"
    >
      <Web3FormsHidden subject="Neue Anfrage – Probelektion / Fahrstunden (fahrschule-ch.ch)" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name, Vorname">
          <input name="Name" required className={inputClass} autoComplete="name" />
        </Field>
        <Field label="Mobiltelefon">
          <input name="Mobiltelefon" type="tel" required className={inputClass} autoComplete="tel" />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="E-Mail">
          <input name="E-Mail" type="email" required className={inputClass} autoComplete="email" />
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 font-mono text-[0.76rem] uppercase tracking-[0.06em] text-ink-soft">
          Hattest du bereits Fahrstunden?
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {["Noch keine Fahrstunden", "Ich hatte bereits Fahrstunden"].map((opt, i) => (
            <label
              key={opt}
              className="cursor-pointer rounded-pill border border-line px-3.5 py-2 text-[0.9rem] has-[:checked]:border-pine has-[:checked]:bg-pine-tint"
            >
              <input
                type="radio"
                name="Erfahrung"
                value={opt}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <Field label="Nachricht">
          <textarea
            name="Nachricht"
            rows={4}
            className={inputClass}
            placeholder="Womit kann ich dir helfen? Gewünschtes Getriebe, Verfügbarkeit …"
          />
        </Field>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-[0.9rem] text-ink-soft">
        <input type="checkbox" required className="mt-0.5 h-5 w-5 accent-signal" />
        <span>
          Ich habe die{" "}
          <Link href="/datenschutz" className="text-pine underline">
            Datenschutzerklärung
          </Link>{" "}
          /{" "}
          <Link href="/agb" className="text-pine underline">
            AGB
          </Link>{" "}
          gelesen und akzeptiere sie.
        </span>
      </label>

      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
        Absenden
      </button>
    </form>
  );
}
