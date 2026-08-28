import Link from "next/link";
import { bookableVkuDates } from "@/lib/data";
import { Field, Web3FormsHidden, inputClass } from "./FormBits";

export default function VkuRegistrationForm() {
  return (
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="rounded-lg border border-line bg-white p-6 shadow-m sm:p-8"
    >
      <Web3FormsHidden subject="VKU English – Anmeldung (fahrschule-ch.ch)" />

      <Field label="Please select course">
        <select name="Course" required className={inputClass} defaultValue="">
          <option value="" disabled>
            – please select –
          </option>
          {bookableVkuDates.map((d) => (
            <option key={d.value} value={d.value}>
              {d.value}
            </option>
          ))}
        </select>
      </Field>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Last name">
          <input name="Last name" required className={inputClass} />
        </Field>
        <Field label="First name">
          <input name="First name" required className={inputClass} />
        </Field>
        <Field label="Phone">
          <input name="Phone" type="tel" required className={inputClass} />
        </Field>
        <Field label="E-mail">
          <input name="E-mail" type="email" required className={inputClass} />
        </Field>
        <Field label="Learner's driving licence canton">
          <input name="Canton" placeholder="e.g. Zürich" className={inputClass} />
        </Field>
        <Field label="ID number learner's permit (Faber number)">
          <input name="Faber number" className={inputClass} />
        </Field>
        <Field label="Date of birth">
          <input name="Date of birth" type="date" className={inputClass} />
        </Field>
        <Field label="Remarks">
          <input name="Remarks" className={inputClass} />
        </Field>
      </div>

      <div className="mt-5 grid gap-2.5 text-[0.9rem] text-ink-soft">
        <label className="flex items-start gap-2.5">
          <input type="checkbox" name="Voucher for free trial lesson" value="Yes" className="mt-0.5 h-5 w-5 accent-signal" />
          I would like to receive a voucher for a free trial lesson.
        </label>
        <label className="flex items-start gap-2.5">
          <input type="checkbox" name="Already taking lessons elsewhere" value="Yes" className="mt-0.5 h-5 w-5 accent-signal" />
          I&apos;m already taking driving lessons at another driving school.
        </label>
        <label className="flex items-start gap-2.5">
          <input type="checkbox" required className="mt-0.5 h-5 w-5 accent-signal" />
          <span>
            I have read the{" "}
            <Link href="/datenschutz" className="text-pine underline">
              Privacy Policy
            </Link>{" "}
            and accept it.
          </span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
        Send registration
      </button>
    </form>
  );
}
