export type ForecastBand = {
  min: number;
  gradeBand: string;
  label: string;
  action: string;
  colorClass: string;
};

export const forecastThresholds: ForecastBand[] = [
  {
    min: 85,
    gradeBand: "A* / A",
    label: "A* / A track",
    action: "Proceed directly to O-Level subject courses. Monitor monthly.",
    colorClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    min: 70,
    gradeBand: "B / A",
    label: "B / A track",
    action: "Take 1-2 targeted Pre-O-Level or bridge modules before O-Level.",
    colorClass: "bg-sky-50 text-sky-800 border-sky-200",
  },
  {
    min: 55,
    gradeBand: "C / B",
    label: "C / B track",
    action: "Pre-O-Level programme recommended before starting O-Level.",
    colorClass: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    min: 40,
    gradeBand: "D / C",
    label: "D / C track",
    action: "Full Pre-O-Level programme and bridge support required.",
    colorClass: "bg-orange-50 text-orange-800 border-orange-200",
  },
  {
    min: 0,
    gradeBand: "D / E",
    label: "D / E track",
    action: "Begin with Lower Secondary and Pre-O-Level programmes first.",
    colorClass: "bg-rose-50 text-rose-800 border-rose-200",
  },
];

export function calculateGradeForecast(score: number) {
  const band = forecastThresholds.find((entry) => score >= entry.min) ?? forecastThresholds[forecastThresholds.length - 1];

  return {
    readinessScore: score,
    gradeBand: band.gradeBand,
    forecastLabel: band.label,
    recommendedAction: band.action,
    colorClass: band.colorClass,
  };
}
