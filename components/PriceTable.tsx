import { priceTableRows, prices } from "@/lib/data";

export default function PriceTable() {
  const rows = priceTableRows();
  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-ink/10">
        <table className="w-full min-w-[30rem] border-collapse text-left">
          <thead>
            <tr className="bg-midnight text-white">
              <th className="px-4 py-3.5 font-mono text-[0.78rem] font-medium uppercase tracking-[0.06em]">
                Leistung
              </th>
              <th className="w-[22%] px-4 py-3.5 text-right font-mono text-[0.78rem] font-medium uppercase tracking-[0.06em]">
                Automat
              </th>
              <th className="w-[22%] px-4 py-3.5 text-right font-mono text-[0.78rem] font-medium uppercase tracking-[0.06em]">
                Geschaltet
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-ink/10 last:border-0 hover:bg-chalk-2/60">
                <td className="px-4 py-3.5 text-[0.94rem] text-ink-soft">{r.label}</td>
                <td
                  className={`px-4 py-3.5 text-right font-mono font-medium ${
                    r.free ? "text-go" : "text-ink"
                  }`}
                >
                  {r.automat}
                </td>
                <td
                  className={`px-4 py-3.5 text-right font-mono font-medium ${
                    r.free ? "text-go" : "text-ink"
                  }`}
                >
                  {r.geschaltet}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[0.84rem] text-ink-soft/70">{prices.disclaimer}</p>
    </div>
  );
}
