import type { Config } from "tailwindcss";

/* ============================================================================
   Fahrschule CH — Design-System "Nachtfahrt"
   Selbstbewusst & markant: alternierende Dunkel/Hell-Blöcke, tiefes Blau-Schwarz,
   EIN leuchtender Akzent (Signal-Rot). Grosstypo Darker Grotesque + Archivo,
   DM Mono für Zahlen/Modulcodes/Eyebrows.
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
        midnight: { DEFAULT: "#0C1220", 2: "#141D33", 3: "#1D2942" },
        steel: { DEFAULT: "#2A3856", soft: "#3C4C6E" },
        chalk: { DEFAULT: "#F2F1EC", 2: "#E7E5DC" },
        ink: { DEFAULT: "#12151C", soft: "#454A55" },
        signal: { DEFAULT: "#FF4D2E", 600: "#E23B1E", soft: "#FF7A63", wash: "#FBE3DC" },
        "on-dark": { DEFAULT: "#EDEEF2", soft: "#9AA4BC", faint: "#6B7793" },
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
      },
      fontSize: {
        "step--1": ["clamp(0.80rem,0.78rem + 0.10vw,0.86rem)", { lineHeight: "1.5" }],
        "step-0": ["clamp(1rem,0.97rem + 0.18vw,1.09rem)", { lineHeight: "1.6" }],
        "step-1": ["clamp(1.18rem,1.10rem + 0.38vw,1.42rem)", { lineHeight: "1.4" }],
        "step-2": ["clamp(1.5rem,1.30rem + 0.9vw,2.15rem)", { lineHeight: "1.12" }],
        "step-3": ["clamp(2.1rem,1.65rem + 2.0vw,3.4rem)", { lineHeight: "1.02" }],
        "step-4": ["clamp(2.8rem,2.0rem + 3.6vw,5.0rem)", { lineHeight: "0.98" }],
        "step-5": ["clamp(3.4rem,2.1rem + 6.0vw,7.0rem)", { lineHeight: "0.92" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        wrap: "78rem",
        eng: "44rem",
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        lg: "10px",
        pill: "999px",
      },
      boxShadow: {
        s: "0 1px 2px rgba(10,15,28,.10), 0 2px 10px rgba(10,15,28,.08)",
        m: "0 10px 24px rgba(10,15,28,.16), 0 24px 60px rgba(10,15,28,.12)",
        l: "0 24px 60px rgba(8,12,24,.35), 0 48px 100px rgba(8,12,24,.28)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
