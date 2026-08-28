"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { prices, type Gear, type PriceTier } from "@/lib/data";

const W = 640;
const H = 240;
const PAD = { l: 16, r: 16, t: 22, b: 34 };

/* SIGNATURE — das degressive Preismodell auf Dunkel inszeniert. */
export default function PriceModel() {
  const tiers = prices.tiers as PriceTier[];
  const { rangeMin, rangeMax, default: def, priceSuffix, heading, intro } = prices.calc;

  const [gear, setGear] = useState<Gear>("automat");
  const [n, setN] = useState(def);

  const priceAt = (lessons: number, g: Gear) => {
    const sorted = [...tiers].sort((a, b) => b.minLessons - a.minLessons);
    const t = sorted.find((x) => lessons >= x.minLessons) ?? tiers[tiers.length - 1];
    return { price: t[g], tier: t };
  };
  const current = priceAt(n, gear);

  const allPrices = tiers.flatMap((t) => [t.automat, t.geschaltet]);
  const yMin = Math.min(...allPrices) - 6;
  const yMax = Math.max(...allPrices) + 5;

  const x = (l: number) => PAD.l + ((l - rangeMin) / (rangeMax - rangeMin)) * (W - PAD.l - PAD.r);
  const y = (p: number) => PAD.t + (1 - (p - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);

  const stepPath = useMemo(() => {
    const pts: string[] = [];
    for (let l = rangeMin; l <= rangeMax; l++) pts.push(`${x(l).toFixed(1)},${y(priceAt(l, gear).price).toFixed(1)}`);
    return "M" + pts.join(" L");
  }, [gear]); // eslint-disable-line react-hooks/exhaustive-deps

  const areaPath = `${stepPath} L${x(rangeMax).toFixed(1)},${(H - PAD.b).toFixed(1)} L${x(rangeMin).toFixed(1)},${(H - PAD.b).toFixed(1)} Z`;
  const dotX = x(n);
  const dotY = y(current.price);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_minmax(300px,360px)]">
      <div>
        <p className="eyebrow mb-4">Dein Monat</p>
        <h2 className="max-w-[16ch] text-step-3 font-extrabold text-white">{heading}</h2>
        <p className="mt-3 max-w-[46ch]">{intro}</p>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-7 w-full"
          role="img"
          aria-label={`Preiskurve: bei ${n} Fahrstunden pro Monat kostet die Doppellektion CHF ${current.price}.`}
        >
          {tiers
            .slice()
            .sort((a, b) => a.minLessons - b.minLessons)
            .map((t, i, arr) => {
              const x0 = x(Math.max(rangeMin, t.minLessons));
              const x1 = x(i < arr.length - 1 ? arr[i + 1].minLessons : rangeMax + 0.5);
              const on = t.key === current.tier.key;
              const labelX = Math.min(W - 4, Math.max(4, (x0 + x1) / 2));
              return (
                <g key={t.key}>
                  {on && (
                    <>
                      <rect x={x0} y={PAD.t} width={Math.max(0, x1 - x0)} height={H - PAD.t - PAD.b} fill="#FF4D2E" opacity={0.16} />
                      <line x1={x0} x2={x0} y1={PAD.t} y2={H - PAD.b} stroke="#FF4D2E" strokeWidth={1} opacity={0.5} />
                    </>
                  )}
                  <text
                    x={labelX}
                    y={H - 12}
                    textAnchor={i === 0 ? "start" : i === arr.length - 1 ? "end" : "middle"}
                    fontFamily="var(--font-mono)"
                    fontSize="11"
                    fontWeight={on ? 600 : 400}
                    fill={on ? "#FF7A63" : "#6B7793"}
                    letterSpacing="1"
                  >
                    {t.name.toUpperCase()}
                  </text>
                </g>
              );
            })}
          <motion.path d={areaPath} fill="#FF4D2E" initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} transition={{ duration: 0.6 }} />
          <motion.path
            d={stepPath}
            fill="none"
            stroke="#FF4D2E"
            strokeWidth={3}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.line y1={PAD.t} y2={H - PAD.b} stroke="#FF4D2E" strokeWidth={1} strokeDasharray="3 4" opacity={0.6} initial={false} animate={{ x1: dotX, x2: dotX }} transition={{ type: "spring", stiffness: 260, damping: 28 }} />
          <motion.circle r={7} fill="#FF4D2E" stroke="#0C1220" strokeWidth={3} initial={false} animate={{ cx: dotX, cy: dotY }} transition={{ type: "spring", stiffness: 260, damping: 28 }} />
        </svg>

        <div className="mt-4">
          <label className="mb-2 flex items-center justify-between font-mono text-[0.76rem] uppercase tracking-[0.08em] text-on-dark-soft">
            <span>Fahrstunden pro Monat</span>
            <span className="font-display text-step-1 font-bold text-white">
              {n >= rangeMax ? `${rangeMax}+` : n}
            </span>
          </label>
          <input
            type="range"
            min={rangeMin}
            max={rangeMax}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            aria-label="Fahrstunden pro Monat"
            className="h-2 w-full cursor-pointer appearance-none rounded-pill bg-midnight-3 accent-signal"
          />
        </div>
      </div>

      {/* Ergebnis */}
      <div className="flex flex-col justify-center border border-steel bg-midnight-2 p-6">
        <div className="inline-flex self-start border border-steel">
          {(["automat", "geschaltet"] as Gear[]).map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGear(g)}
              className={`px-3.5 py-2 font-mono text-[0.72rem] uppercase tracking-[0.06em] transition-colors ${
                gear === g ? "bg-signal text-white" : "text-on-dark-soft"
              }`}
            >
              {g === "automat" ? "Automat" : "Geschaltet"}
            </button>
          ))}
        </div>

        <p className="mt-6 font-mono text-[0.78rem] uppercase tracking-[0.1em] text-signal-soft">
          {current.tier.name}
        </p>
        <p className="font-display text-[3rem] font-extrabold leading-none text-white sm:text-step-5">
          CHF {current.price}
        </p>
        <p className="mt-1 font-mono text-[0.76rem] text-on-dark-soft">{priceSuffix}</p>
        <p className="mt-4 text-[0.9rem] text-on-dark-soft">
          {current.tier.cond} ·{" "}
          {gear === "automat" ? prices.vehicles.automat : prices.vehicles.geschaltet}
        </p>
        <p className="mt-5 border-t border-steel pt-4 font-mono text-[0.74rem] leading-relaxed text-on-dark-faint">
          Richtwert auf Basis der Preisliste. Probelektion immer CHF 50. Keine Vorauszahlung –
          Abrechnung Ende Monat.
        </p>
      </div>
    </div>
  );
}
