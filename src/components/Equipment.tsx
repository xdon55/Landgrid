import { useRevealContainer } from "../hooks/useReveal";
import { LIGRIP_O2_LITE, LIGRIP_O2 } from "../lib/data";
import {
  ScanLine,
  Crosshair,
  Camera,
  Layers,
  Workflow,
  Radio,
  Move3d,
  Eye,
  Target,
  Gauge,
  Package,
  ChevronRight,
} from "lucide-react";

const LITE_ICONS = [ScanLine, Crosshair, Camera, Layers, Move3d, Radio];
const O2_ICONS = [ScanLine, Eye, Target, Gauge, Workflow];

interface Product {
  name: string;
  subtitle: string;
  sku: string;
  intro: string;
  packageIncludes: string;
  specs: { label: string; value: string }[];
  features: { title: string; text: string }[];
  collectionModes: string[];
  applications: string[];
  image: string;
}

function ProductCard({
  product,
  featureIcons,
  reversed,
}: {
  product: Product;
  featureIcons: typeof LITE_ICONS;
  reversed?: boolean;
}) {
  return (
    <div
      className={`reveal grid overflow-hidden rounded-3xl border border-forest-800/50 bg-forest-900/40 backdrop-blur-sm lg:grid-cols-2 ${reversed ? "lg:[direction:rtl]" : ""}`}
    >
      {/* Image side */}
      <div className="relative min-h-[380px] overflow-hidden [direction:ltr]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-forest-950/40" />

        {/* Floating SKU badge */}
        <div className="absolute top-6 left-6 rounded-full border border-gold-500/40 bg-forest-950/80 px-4 py-1.5 backdrop-blur-sm">
          <span className="font-mono text-[10px] tracking-[0.3em] text-gold-400">
            GreenValley International
          </span>
        </div>

        {/* Bottom quick specs */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap gap-4 rounded-2xl border border-forest-600/40 bg-forest-950/85 px-5 py-4 backdrop-blur-md">
            {product.specs.slice(0, 4).map((s) => (
              <div key={s.label} className="min-w-[80px]">
                <div className="font-display text-[14px] font-extrabold text-ivory">{s.value}</div>
                <div className="font-mono mt-0.5 text-[7.5px] tracking-[0.18em] text-forest-300">
                  {s.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className="p-8 sm:p-10 lg:p-12 [direction:ltr]">
        <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500">
          {product.subtitle.toUpperCase()}
        </span>
        <h3 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-ivory sm:text-4xl">
          {product.name}
        </h3>
        <p className="mt-4 text-[13.5px] leading-relaxed text-forest-100/70">
          {product.intro}
        </p>

        {/* Package includes */}
        <div className="mt-6 rounded-xl border border-forest-700/60 bg-forest-950/60 p-4">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gold-500" strokeWidth={1.6} />
            <span className="font-mono text-[9px] tracking-[0.25em] text-gold-400">
              PACKAGE INCLUDES
            </span>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-forest-100/70">
            {product.packageIncludes}
          </p>
        </div>

        {/* Features list */}
        <ul className="mt-7 space-y-4">
          {product.features.slice(0, 4).map((f, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <li key={f.title} className="group flex gap-3.5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-forest-700 bg-forest-900 text-gold-500 transition-colors duration-300 group-hover:border-gold-500/50">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="font-display block text-[13px] font-bold text-ivory">
                    {f.title}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] leading-relaxed text-forest-100/60">
                    {f.text}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        {/* Collection modes */}
        <div className="mt-7 flex flex-wrap gap-2">
          {product.collectionModes.map((mode) => (
            <span
              key={mode}
              className="rounded-full bg-forest-800/80 px-3.5 py-1.5 text-[10.5px] font-semibold tracking-wide text-forest-200"
            >
              {mode}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Equipment() {
  const ref = useRevealContainer();

  return (
    <section id="equipment" ref={ref} className="noise relative overflow-hidden bg-forest-950">
      <div className="topo-lines absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
        {/* Header */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <div className="reveal flex items-center gap-3">
              <span className="h-px w-10 bg-gold-500" />
              <span className="font-mono text-[11px] tracking-[0.35em] text-forest-300">
                EQUIPMENT CATALOG — LIGRIP SERIES
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 font-display mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-ivory sm:text-5xl lg:text-[56px]">
              Handheld SLAM
              <br />
              <span className="text-gold-gradient">LiDAR Scanners</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-md text-[15px] leading-relaxed text-forest-100/70 lg:ml-auto">
            Our field teams deploy GreenValley's complete LiGrip range —
            from the compact O2 Lite to the flagship O2 — delivering
            centimetre-level SLAM LiDAR data on every project we undertake.
          </p>
        </div>

        {/* Product cards */}
        <div className="space-y-8">
          <ProductCard product={LIGRIP_O2_LITE} featureIcons={LITE_ICONS} />
          <ProductCard product={LIGRIP_O2} featureIcons={O2_ICONS} reversed />
        </div>

        {/* Applications strip */}
        <div className="reveal mt-12 rounded-2xl border border-forest-800/50 bg-forest-900/40 p-8 backdrop-blur-sm lg:p-10">
          <h4 className="font-mono text-[10px] tracking-[0.35em] text-gold-500">
            APPLICATION SCENARIOS
          </h4>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-4">
            {[
              ...new Set([
                ...LIGRIP_O2_LITE.applications,
                ...LIGRIP_O2.applications,
              ]),
            ].map((app) => (
              <span
                key={app}
                className="group flex items-center gap-2 text-[13px] text-forest-100/70 transition-colors duration-300 hover:text-gold-400"
              >
                <ChevronRight className="h-3.5 w-3.5 text-gold-500/70 transition-transform duration-300 group-hover:translate-x-0.5" />
                {app}
              </span>
            ))}
          </div>
        </div>

        {/* Comparison strip */}
        <div className="reveal mt-8 overflow-hidden rounded-2xl border border-forest-800/50">
          <div className="bg-forest-900/80 px-8 py-4">
            <h4 className="font-mono text-[10px] tracking-[0.35em] text-gold-500">
              QUICK COMPARISON
            </h4>
          </div>
          <div className="divide-y divide-forest-800/40">
            {/* Header row */}
            <div className="grid grid-cols-3 bg-forest-950/70 px-8 py-3">
              <span className="text-[11px] font-semibold text-forest-300">SPECIFICATION</span>
              <span className="text-center text-[11px] font-semibold text-forest-300">
                LiGrip O2 Lite
              </span>
              <span className="text-center text-[11px] font-semibold text-forest-300">
                LiGrip O2
              </span>
            </div>
            {[
              ["Weight", "1.3 kg", "2.2 kg"],
              ["Accuracy", "< 3 cm", "< 3 cm"],
              ["Scan Rate", "200K pts/s", "640K pts/s"],
              ["Max Range", "70 m", "300 m"],
              ["Cameras", "12 MP × 2", "12 MP × 3"],
              ["FOV", "Standard", "280° × 360°"],
              ["Storage", "512 GB SSD", "512 GB SSD"],
              ["Point Spacing", "—", "2 mm"],
              ["Collection Modes", "4 modes", "6 modes"],
            ].map(([label, lite, o2], i) => (
              <div
                key={label}
                className={`grid grid-cols-3 px-8 py-3 ${i % 2 === 0 ? "bg-forest-900/30" : "bg-forest-950/40"}`}
              >
                <span className="text-[12px] font-medium text-forest-200/80">{label}</span>
                <span className="text-center text-[12px] text-forest-100/70">{lite}</span>
                <span className="text-center text-[12px] text-forest-100/70">{o2}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
