import { useEffect, useState } from "react";

export function MasteryProgressBar({ value = 0, className = "" }: { value: number; className?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue((current) => {
        const target = Math.min(100, Math.max(0, value));
        if (current < target) {
          return Math.min(current + target / 16, target);
        }
        return current;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [value]);

  const clampedValue = Math.min(100, Math.max(0, displayValue));
  let color = "#dc3545";
  if (clampedValue >= 80) color = "#17A589";
  else if (clampedValue >= 60) color = "#ffc107";

  const showLabelInside = clampedValue > 30;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full transition-all duration-100"
          style={{ width: `${clampedValue}%`, backgroundColor: color }}
        />
        {showLabelInside && (
          <div className="absolute inset-0 flex items-center justify-end pr-2 font-semibold text-white drop-shadow-sm">
            <span className="text-xs">{Math.round(clampedValue)}%</span>
          </div>
        )}
      </div>
      {!showLabelInside && <span className="min-w-fit text-sm font-semibold text-slate-700">{Math.round(clampedValue)}%</span>}
    </div>
  );
}
