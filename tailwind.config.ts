import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // Premium SaaS typography scale (8px base)
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        base: ["16px", { lineHeight: "24px" }],
        lg: ["18px", { lineHeight: "28px" }],
        xl: ["20px", { lineHeight: "32px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["32px", { lineHeight: "40px" }],
        "4xl": ["40px", { lineHeight: "48px" }],
        "5xl": ["48px", { lineHeight: "56px" }],
        "6xl": ["56px", { lineHeight: "64px" }],
        "7xl": ["64px", { lineHeight: "72px" }],
        "8xl": ["80px", { lineHeight: "88px" }],
        // Custom sizes for body text, cards, and tables
        "body-sm": ["16px", { lineHeight: "24px" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
        "card-text": ["18px", { lineHeight: "28px" }],
        "table-text": ["18px", { lineHeight: "28px" }],
        // Theme typography sizes
        h1: ["48px", { lineHeight: "1.1" }],
        h2: ["32px", { lineHeight: "1.2" }],
        h3: ["24px", { lineHeight: "1.375" }],
        h4: ["20px", { lineHeight: "1.5" }],
        h5: ["18px", { lineHeight: "1.5" }],
        button: ["16px", { lineHeight: "24px" }],
        label: ["12px", { lineHeight: "16px" }],
        caption: ["12px", { lineHeight: "16px" }],
        "sm-small": ["11px", { lineHeight: "14px" }],
      },
      spacing: {
        // Named spacing from theme.ts
        'xs-theme': '4px',
        'sm-theme': '8px',
        'md-theme': '12px',
        'lg-theme': '16px',
        'xl-theme': '24px',
        '2xl-theme': '32px',
        '3xl-theme': '48px',
        '4xl-theme': '64px',
        // 8px scale system
        ...Array.from({ length: 32 }, (_, i) => ({
          [i * 0.5]: `${i * 0.125}rem`, // 0, 0.125rem (2px), 0.25rem (4px), 0.5rem (8px), ...
        })).reduce((acc, obj) => ({ ...acc, ...obj }), {}),
      },
      borderRadius: {
        'sm-theme': '4px',
        'md-theme': '8px',
        'lg-theme': '12px',
        'xl-theme': '16px',
        '2xl-theme': '24px',
        '3xl-theme': '32px',
        'full': '9999px',
        lg: ".5625rem", /* 9px */
        md: ".375rem", /* 6px */
        sm: ".1875rem", /* 3px */
      },
      boxShadow: {
        'sm-theme': "0 1px 2px rgba(0, 0, 0, 0.05)",
        'md-theme': "0 4px 6px rgba(0, 0, 0, 0.1)",
        'lg-theme': "0 10px 15px rgba(0, 0, 0, 0.1)",
        'xl-theme': "0 20px 25px rgba(0, 0, 0, 0.1)",
        '2xl-theme': "0 25px 50px rgba(0, 0, 0, 0.15)",
      },
      colors: {
        // Brand Colors
        brand: {
          primary: "#2366c9",
          "primary-dark": "#1a4fa0",
          "primary-soft": "#eef6ff",
          navy: "#1e3a5f",
          sky: "#4f86e0",
        },
        // Neutral Colors
        neutral: {
          background: "#ffffff",
          surface: "#f8fbff",
          "surface-alt": "#f1f7ff",
          border: "#dbe7f4",
          text: "#0f172a",
          muted: "#64748b",
          "text-muted": "#475569",
          "text-light": "#64748b",
          "text-dark": "#1E3A5F",
          white: "#ffffff",
          black: "#000000",
          "slate-gray": "#4b5563",
          "slate-light": "#334155",
        },
        // Status Colors
        status: {
          success: "#22c55e",
          warning: "#f59e0b",
          danger: "#ef4444",
          info: "#3b82f6",
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
        // Background Colors
        backgrounds: {
          white: "#ffffff",
          "soft-blue": "#eef6ff",
          navy: "#1e3a5f",
          primary: "#2366c9",
          "light-blue": "#f8fbff",
          "light": "#f8fbff",
        },
        // Legacy system color tokens
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)"
        },
      },
      fontFamily: {
        sans: ["'Geist', 'Aeonik', 'Inter', var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        emuSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        emuFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        emuSpin: "emuSpin 20s linear infinite",
        emuFloat: "emuFloat 5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
