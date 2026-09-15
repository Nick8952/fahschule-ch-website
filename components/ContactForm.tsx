import Link from "next/link";
import { Field, Web3FormsHidden, inputClass } from "./FormBits";
import TranslatedText from "./TranslatedText";
import TranslatedTextarea from "./TranslatedTextarea";

export default function ContactForm() {
  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="card !p-6 sm:!p-8"
    >
      <Web3FormsHidden subject="Neue Anfrage – Probelektion / Fahrstunden (fahrschule-ch.ch)" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={<TranslatedText de="Name, Vorname" />}>
          <input name="Name" required className={inputClass} autoComplete="name" />
        </Field>
        <Field label={<TranslatedText de="Mobiltelefon" />}>
          <input name="Mobiltelefon" type="tel" required className={inputClass} autoComplete="tel" />
        </Field>
      </div>

      <div className="mt-4">
        <Field label={<TranslatedText de="E-Mail" />}>
          <input name="E-Mail" type="email" required className={inputClass} autoComplete="email" />
        </Field>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 font-mono text-[0.76rem] uppercase tracking-[0.06em] text-ink-soft">
          <TranslatedText de="Hattest du bereits Fahrstunden?" />
        </legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {["Noch keine Fahrstunden", "Ich hatte bereits Fahrstunden"].map((opt, i) => (
            <label
              key={opt}
              className="flex min-h-11 w-full cursor-pointer items-center justify-center border border-ink/20 px-3 py-2 text-center text-[0.9rem] has-[:checked]:border-signal has-[:checked]:bg-signal/10"
            >
              <input
                type="radio"
                name="Erfahrung"
                value={opt}
                defaultChecked={i === 0}
                className="sr-only"
              />
              <TranslatedText de={opt} />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <Field label={<TranslatedText de="Nachricht" />}>
          <TranslatedTextarea
            name="Nachricht"
            rows={4}
            className={inputClass}
            placeholderDe="Womit kann ich dir helfen? Gewünschtes Getriebe, Verfügbarkeit …"
          />
        </Field>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-[0.9rem] text-ink-soft">
        <input type="checkbox" required className="mt-0.5 h-5 w-5 accent-signal" />
        <span>
          <TranslatedText de="Ich habe die" />{" "}
          <Link href="/datenschutz" className="text-signal underline">
            <TranslatedText de="Datenschutzerklärung" />
          </Link>{" "}
          /{" "}
          <Link href="/agb" className="text-signal underline">
            AGB
          </Link>{" "}
          <TranslatedText de="gelesen und akzeptiere sie." />
        </span>
      </label>

      <button type="submit" className="btn btn-signal mt-6 w-full sm:w-[9rem]">
        <TranslatedText de="Absenden" />
      </button>
    </form>
  );
}
