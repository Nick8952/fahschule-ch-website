import { site } from "@/lib/data";
import { absUrl } from "@/lib/site";
import type { ReactNode } from "react";

export const inputClass =
  "w-full border-b-2 border-ink/15 bg-transparent px-0 py-2.5 text-step-0 text-ink outline-none transition focus:border-signal";

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
      <span className="mb-1 block font-mono text-[0.72rem] uppercase tracking-[0.08em] text-ink-soft/70">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[0.8rem] text-ink-soft/60">{hint}</span>}
    </label>
  );
}

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
