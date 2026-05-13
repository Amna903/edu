export const theme = {
  colors: {
    brand: {
      primary: "#2366c9",
      primaryDark: "#1a4fa0",
      primarySoft: "#eef6ff",
      navy: "#1e3a5f",
      sky: "#4f86e0",
    },
    neutral: {
      background: "#ffffff",
      surface: "#f8fbff",
      surfaceAlt: "#f1f7ff",
      border: "#dbe7f4",
      text: "#0f172a",
      muted: "#64748b",
    },
    status: {
      success: "#22c55e",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#3b82f6",
    },
  },
  typography: {
    fontFamily: {
      sans: "'Aeonik', 'Inter', sans-serif",
      display: "'Aeonik', 'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
    },
    scale: {
      xs: "12px / 16px",
      sm: "14px / 20px",
      base: "16px / 24px",
      lg: "18px / 28px",
      xl: "20px / 32px",
      "2xl": "24px / 32px",
      "3xl": "32px / 40px",
      "4xl": "40px / 48px",
      "5xl": "48px / 56px",
      "6xl": "56px / 64px",
    },
  },
  surfaces: {
    card: "rounded-[2rem] border border-[#dbe7f4] bg-white shadow-sm",
    cardSoft: "rounded-[2rem] border border-[#dbe7f4] bg-[#f8fbff] shadow-sm",
    cardElevated: "rounded-[2rem] border border-white/20 bg-white shadow-xl",
    table: "rounded-[1.5rem] border border-[#dbe7f4] bg-white overflow-hidden",
    tableHeader: "bg-[#eef6ff] text-[#0b3c5d]",
    tableRow: "border-b border-[#e5eef8] bg-white",
    tableRowAlt: "border-b border-[#e5eef8] bg-[#f8fbff]",
  },
  sections: {
    white: "bg-white text-slate-900",
    softBlue: "bg-[#eef6ff] text-slate-900",
    blue: "bg-[#2366c9] text-white",
    navy: "bg-[#0b3c5d] text-white",
  },
  components: {
    buttonPrimary: "bg-[#2366c9] text-white hover:bg-[#1a4fa0]",
    buttonSecondary: "border border-[#dbe7f4] bg-white text-[#0b3c5d] hover:bg-[#eef6ff]",
    tableHeaderText: "text-xs font-black uppercase tracking-[0.18em] text-[#0b3c5d]",
    label: "text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9]",
  },
} as const;

export const ui = {
  sections: {
    hero: "relative overflow-hidden bg-gradient-to-b from-[#eef6ff]/80 to-white",
    white: "bg-white",
    softBlue: "bg-[#eef6ff]/40",
    brand: "bg-[#2366c9] text-white relative overflow-hidden",
  },
  pills: {
    brand: "inline-flex rounded-full border border-[#dbe7f4] bg-[#2366c9] px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-white",
    brandOutline: "inline-flex rounded-full border border-[#dbe7f4] bg-white px-4 py-1 text-[14px] font-semibold uppercase tracking-[0.14em] text-[#2366c9]",
  },
  buttons: {
    brand: "bg-[#2366c9] hover:bg-[#1a4fa0] text-white",
    brandLight: "bg-white text-[#2366c9] hover:bg-[#eef6ff]",
    brandOutline: "border border-white/30 text-white hover:bg-white/10",
    brandOutlineDark: "border border-[#2366c9] text-[#2366c9] hover:bg-[#2366c9] hover:text-white",
  },
  cards: {
    standard: "rounded-2xl border border-[#dbe7f4] bg-white shadow-sm",
    soft: "rounded-2xl border border-[#dbe7f4] bg-[#f8fbff] shadow-sm",
    elevated: "rounded-[2rem] border border-white/20 bg-white shadow-xl",
    brand: "rounded-[2rem] border border-white/15 bg-[#2366c9] text-white shadow-lg",
  },
  tables: {
    header: "bg-[#2366c9] text-white text-xs uppercase tracking-wider font-semibold",
    headerText: "text-xs font-black uppercase tracking-[0.18em] text-[#0b3c5d]",
    row: "border-b border-[#e5eef8] bg-white",
    rowAlt: "border-b border-[#e5eef8] bg-[#f8fbff]",
  },
} as const;

export type Theme = typeof theme;
