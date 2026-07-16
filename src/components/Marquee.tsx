import { Plus } from "lucide-react";

const ITEMS = [
  "Cadastral Surveys",
  "UAV Mapping",
  "Engineering Surveys",
  "GIS & Remote Sensing",
  "CORS RTK Network",
  "GNSS Sale & Rental",
  "GPS Car Tracking",
  "LiDAR Scanning",
  "LiGrip O2 Lite",
  "LiGrip O2",
  "LiBase2 RTK",
  "CHC GNSS Receivers",
  "Fleet Management",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-forest-800/70 bg-forest-950 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-forest-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-forest-950 to-transparent" />
      <div className="animate-marquee flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display px-8 text-[15px] font-bold tracking-[0.08em] whitespace-nowrap text-forest-300/70">
              {item.toUpperCase()}
            </span>
            <Plus className="h-3.5 w-3.5 text-gold-500/80" strokeWidth={2} />
          </span>
        ))}
      </div>
    </div>
  );
}
