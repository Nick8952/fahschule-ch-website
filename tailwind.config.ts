import type { Config } from "tailwindcss";

/* ============================================================================
   Fahrschule CH — Design-System "Ruhige Hand"
   Kiefer-Grün als Primärfarbe (Ruhe, Wachstum, „bestanden"), sparsames Signal-Rot,
   kühl-grünstichiges Papier. Instrument Serif (Display) + Hanken Grotesk (Body)
   + JetBrains Mono (Preise/Zahlen/Modulstufen).
   ========================================================================== */

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#F4F6F3", warm: "#F7F5EF" },
        panel: "#E9EDE7",
        "pine-tint": "#DCE4DC",
        line: "#D4DAD1",
        ink: { DEFAULT: "#161A17", soft: "#4A5450", faint: "#78827C" },
        pine: { DEFAULT: "#1F3D2F", 600: "#25482F", 400: "#3E6B4E", deep: "#132A20" },
        signal: { DEFAULT: "#E5482D", 600: "#C93B22", soft: "#F6DDD6" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
      },
      fontSize: {
        "step--1": ["clamp(0.82rem,0.80rem + 0.10vw,0.88rem)", { lineHeight: "1.5" }],
        "step-0": ["clamp(1rem,0.97rem + 0.18vw,1.09rem)", { lineHeight: "1.65" }],
        "step-1": ["clamp(1.18rem,1.10rem + 0.38vw,1.40rem)", { lineHeight: "1.45" }],
        "step-2": ["clamp(1.45rem,1.30rem + 0.70vw,2.00rem)", { lineHeight: "1.20" }],
        "step-3": ["clamp(1.90rem,1.60rem + 1.40vw,3.00rem)", { lineHeight: "1.12" }],
        "step-4": ["clamp(2.50rem,1.90rem + 2.80vw,4.25rem)", { lineHeight: "1.04" }],
        "step-5": ["clamp(3.00rem,2.00rem + 4.50vw,5.50rem)", { lineHeight: "1.0" }],
      },
      maxWidth: {
        wrap: "75rem",
        eng: "44rem",
      },
      borderRadius: {
        DEFAULT: "10px",
        sm: "6px",
        lg: "20px",
        pill: "999px",
      },
      boxShadow: {
        s: "0 1px 2px rgba(19,42,32,.06), 0 2px 8px rgba(19,42,32,.05)",
        m: "0 6px 16px rgba(19,42,32,.10), 0 16px 40px rgba(19,42,32,.08)",
        l: "0 16px 40px rgba(19,42,32,.16), 0 36px 80px rgba(19,42,32,.14)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "rise-in": {
          from: { opacity: "0", transform: "translateY(1.2rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "rise-in": "rise-in .7s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
