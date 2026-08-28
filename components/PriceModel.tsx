"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { prices, type Gear, type PriceTier } from "@/lib/data";

const W = 640;
const H = 240;
const PAD = { l: 16, r: 16, t: 22, b: 34 };

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

  // Preis-Domäne für die Y-Achse
  const allPrices = tiers.flatMap((t) => [t.automat, t.geschaltet]);
  const yMin = Math.min(...allPrices) - 3;
  const yMax = Math.max(...allPrices) + 3;

  const x = (lessons: number) =>
    PAD.l + ((lessons - rangeMin) / (rangeMax - rangeMin)) * (W - PAD.l - PAD.r);
  const y = (price: number) =>
    PAD.t + (1 - (price - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);

  const stepPath = useMemo(() => {
    const pts: string[] = [];
    for (let l = rangeMin; l <= rangeMax; l++) {
      const p = priceAt(l, gear).price;
      pts.push(`${x(l).toFixed(1)},${y(p).toFixed(1)}`);
    }
    return "M" + pts.join(" L");
  }, [gear]); // eslint-disable-line react-hooks/exhaustive-deps

  const areaPath = `${stepPath} L${x(rangeMax).toFixed(1)},${(H - PAD.b).toFixed(1)} L${x(
    rangeMin,
  ).toFixed(1)},${(H - PAD.b).toFixed(1)} Z`;

  const dotX = x(n);
  const dotY = y(current.price);

  return (
    <div className="rounded-lg border border-line bg-white p-6 shadow-m sm:p-9">
      <div className="max-w-[52ch]">
        <p className="eyebrow mb-3">Dein Monat</p>
        <h2 className="text-step-2">{heading}</h2>
        <p className="mt-2 text-ink-soft">{intro}</p>
      </div>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_minmax(280px,340px)]">
        {/* Kurve */}
        <div>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            role="img"
            aria-label={`Preiskurve: bei ${n} Fahrstunden pro Monat kostet die Doppellektion CHF ${current.price}.`}
          >
            {tiers
              .slice()
              .sort((a, b) => a.minLessons - b.minLessons)
              .map((t, i, arr) => {
                const x0 = x(Math.max(rangeMin, t.minLessons));
                const x1 = x(i < arr.length - 1 ? arr[i + 1].minLessons : rangeMax + 0.5);
                return (
                  <g key={t.key}>
                    <rect
                      x={x0}
                      y={PAD.t}
                      width={Math.max(0, x1 - x0)}
                      height={H - PAD.t - PAD.b}
                      fill={t.key === current.tier.key ? "#DCE4DC" : "transparent"}
                      opacity={t.key === current.tier.key ? 1 : 0}
                    />
                    <text
                      x={(x0 + x1) / 2}
                      y={H - 12}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize="11"
                      fill={t.key === current.tier.key ? "#1F3D2F" : "#78827C"}
                    >
                      {t.name}
                    </text>
                  </g>
                );
              })}

            <motion.path
              d={areaPath}
              fill="#1F3D2F"
              opacity={0.06}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.06 }}
              viewport={{ once: true }}
            />
            <motion.path
              d={stepPath}
              fill="none"
              stroke="#1F3D2F"
              strokeWidth={2.5}
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.line
              x1={dotX}
              x2={dotX}
              y1={PAD.t}
              y2={H - PAD.b}
              stroke="#E5482D"
              strokeWidth={1}
              strokeDasharray="3 4"
              animate={{ x1: dotX, x2: dotX }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            />
            <motion.circle
              r={7}
              fill="#E5482D"
              stroke="#fff"
              strokeWidth={3}
              animate={{ cx: dotX, cy: dotY }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            />
          </svg>

          <div className="mt-4">
            <label className="mb-2 flex items-center justify-between font-mono text-[0.8rem] uppercase tracking-[0.08em] text-ink-soft">
              <span>Fahrstunden pro Monat</span>
              <span className="text-step-1 font-medium text-pine">
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
              className="h-2 w-full cursor-pointer appearance-none rounded-pill bg-panel accent-signal"
            />
          </div>
        </div>

        {/* Ergebnis */}
        <div className="flex flex-col justify-center rounded-lg bg-panel p-6">
          <div className="inline-flex self-start rounded-pill bg-white p-1">
            {(["automat", "geschaltet"] as Gear[]).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGear(g)}
                className={`rounded-pill px-3.5 py-2 text-[0.82rem] font-semibold transition-colors ${
                  gear === g ? "bg-pine text-white" : "text-ink-soft"
                }`}
              >
                {g === "automat" ? "Automat" : "Geschaltet"}
              </button>
            ))}
          </div>

          <p className="mt-5 font-display text-[0.95rem] uppercase tracking-[0.08em] text-signal">
            {current.tier.name}
          </p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-step-5 leading-none text-pine">
              CHF {current.price}
            </span>
          </p>
          <p className="mt-1 font-mono text-[0.8rem] text-ink-faint">{priceSuffix}</p>
          <p className="mt-4 text-[0.9rem] text-ink-soft">
            {current.tier.cond} ·{" "}
            {gear === "automat" ? prices.vehicles.automat : prices.vehicles.geschaltet}
          </p>

          <p className="mt-5 border-t border-line pt-4 text-[0.82rem] text-ink-faint">
            Richtwert auf Basis der Preisliste. Probelektion immer CHF 50. Keine Vorauszahlung –
            Abrechnung Ende Monat.
          </p>
        </div>
      </div>
    </div>
  );
}
