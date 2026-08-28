import { site } from "@/lib/data";
import { absUrl } from "@/lib/site";
import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded border border-line bg-white px-3.5 py-2.5 text-step-0 text-ink outline-none transition focus:border-pine focus:ring-4 focus:ring-pine/10";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[0.76rem] uppercase tracking-[0.06em] text-ink-soft">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[0.8rem] text-ink-faint">{hint}</span>}
    </label>
  );
}

/** Web3Forms-Basisfelder: Zugriffsschlüssel, Betreff, Absendername, Redirect, Honeypot. */
export function Web3FormsHidden({ subject }: { subject: string }) {
  return (
    <>
      <input type="hidden" name="access_key" value={site.web3formsKey} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="from_name" value={`${site.name} Website`} />
      <input type="hidden" name="redirect" value={absUrl("/danke/")} />
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
      />
    </>
  );
}
