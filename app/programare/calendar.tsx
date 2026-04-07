"use client";

import { useState } from "react";

const MONTHS_RO = [
  "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];
const DAYS_RO = ["L", "Ma", "Mi", "J", "V", "S", "D"];

function toISO(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function Calendar({
  value,
  onChange,
}: {
  value: string;
  onChange: (iso: string) => void;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initial = value ? new Date(value) : today;
  const [view, setView] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();

  // Monday = 0, Sunday = 6
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => setView(new Date(year, month - 1, 1));
  const nextMonth = () => setView(new Date(year, month + 1, 1));

  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="rounded px-3 py-1 text-neutral-400 hover:bg-neutral-800 hover:text-amber-400"
          aria-label="Luna anterioară"
        >
          ‹
        </button>
        <p className="font-medium">
          {MONTHS_RO[month]} {year}
        </p>
        <button
          type="button"
          onClick={nextMonth}
          className="rounded px-3 py-1 text-neutral-400 hover:bg-neutral-800 hover:text-amber-400"
          aria-label="Luna următoare"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-500 mb-2">
        {DAYS_RO.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const iso = toISO(d);
          const isPast = d < today;
          const isSelected = iso === value;
          const isToday = iso === toISO(today);
          const isSunday = d.getDay() === 0;
          const disabled = isPast || isSunday;

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              className={[
                "aspect-square rounded text-sm transition",
                disabled && "text-neutral-700 cursor-not-allowed",
                !disabled && !isSelected && "text-neutral-200 hover:bg-neutral-800",
                isSelected && "bg-amber-400 text-neutral-950 font-semibold",
                isToday && !isSelected && "ring-1 ring-amber-400/50",
              ].filter(Boolean).join(" ")}
              title={isSunday ? "Închis duminica" : undefined}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      {value && (
        <p className="mt-4 text-center text-sm text-neutral-400">
          Data selectată: <span className="text-amber-400 font-medium">{value}</span>
        </p>
      )}
    </div>
  );
}
