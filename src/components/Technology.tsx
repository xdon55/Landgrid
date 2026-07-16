import { useRevealContainer } from "../hooks/useReveal";
import { LIBASE2 } from "../lib/data";
import {
  Satellite,
  Gauge,
  ScanLine,
  ShieldCheck,
  RadioTower,
} from "lucide-react";

const FEATURE_ICONS = [Satellite, Gauge, ScanLine, ShieldCheck];

export default function Technology() {
  const ref = useRevealContainer();

  return (
    <section id="technology" ref={ref} className="noise relative overflow-hidden bg-stone-warm">
      <div className="grid-survey absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="reveal flex items-center gap-3">
            <span className="h-px w-10 bg-gold-600" />
            <span className="font-mono text-[11px] tracking-[0.35em] text-forest-600">
              TECHNOLOGY SPOTLIGHT
            </span>
          </div>
          <h2 className="reveal reveal-delay-1 font-display mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-forest-950 sm:text-5xl lg:text-[56px]">
            Powered by
            <br />
            <span className="text-gold-gradient">GreenValley</span> & CHC instruments
          </h2>
          <p className="reveal reveal-delay-2 mt-6 text-[15px] leading-relaxed text-forest-900/70">
            Our field teams deploy the latest GNSS receivers, handheld SLAM LiDAR scanners,
            drones and total stations to deliver unmatched precision on every project.
          </p>
        </div>

        {/* LiBase2 spotlight */}
        <div className="reveal grid overflow-hidden rounded-3xl bg-forest-950 lg:grid-cols-2">
          {/* Product visual */}
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
            <img
              src="images/rtk-receiver.jpg"
              alt="LiBase2 RTK GNSS receiver"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-forest-950/30" />
            <div className="absolute top-6 left-6 rounded-full border border-gold-500/40 bg-forest-950/70 px-4 py-1.5 backdrop-blur-sm">
              <span className="font-mono text-[10px] tracking-[0.3em] text-gold-400">
                FLAGSHIP PRODUCT
              </span>
            </div>
            {/* Spec float */}
            <div className="absolute bottom-6 left-6 flex gap-8 rounded-2xl border border-forest-600/40 bg-forest-950/80 px-6 py-4 backdrop-blur-md">
              {LIBASE2.specs.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[15px] font-extrabold text-ivory">{s.value}</div>
                  <div className="font-mono mt-0.5 text-[8px] tracking-[0.2em] text-forest-300">
                    {s.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12 lg:p-14">
            <div className="font-mono text-[10px] tracking-[0.35em] text-gold-500">
              {LIBASE2.subtitle.toUpperCase()}
            </div>
            <h3 className="font-display mt-3 text-4xl font-extrabold tracking-tight text-ivory sm:text-5xl">
              {LIBASE2.name}
            </h3>
            <p className="mt-5 text-[14px] leading-relaxed text-forest-100/75">
              {LIBASE2.intro}
            </p>

            <ul className="mt-8 space-y-5">
              {LIBASE2.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <li key={f.title} className="group flex gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-forest-700 bg-forest-900 text-gold-500 transition-colors duration-300 group-hover:border-gold-500/50">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span>
                      <span className="font-display block text-[14px] font-bold text-ivory">
                        {f.title}
                      </span>
                      <span className="mt-1 block text-[12.5px] leading-relaxed text-forest-100/65">
                        {f.text}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-9 flex flex-wrap gap-2">
              {LIBASE2.industries.map((ind) => (
                <span
                  key={ind}
                  className="rounded-full bg-forest-800/80 px-4 py-1.5 text-[11px] font-semibold tracking-wide text-forest-200"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CORS network band */}
        <div className="reveal mt-6 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl bg-forest-900 p-8 sm:p-12">
            {/* Radar visual */}
            <div className="absolute -right-24 -bottom-24 h-72 w-72 opacity-70">
              <div className="absolute inset-0 rounded-full border border-forest-600/50" />
              <div className="absolute inset-8 rounded-full border border-forest-600/40" />
              <div className="absolute inset-16 rounded-full border border-gold-500/30" />
              <div
                className="animate-radar absolute inset-0"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(212,162,76,0.35), transparent 60deg)",
                  borderRadius: "9999px",
                }}
              />
              <span className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500" />
            </div>
            <div className="relative">
              <div className="flex items-center gap-3">
                <RadioTower className="h-5 w-5 text-gold-500" strokeWidth={1.6} />
                <span className="font-mono text-[10px] tracking-[0.35em] text-gold-400">
                  NATIONWIDE CORS NETWORK
                </span>
              </div>
              <h3 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-ivory sm:text-4xl">
                18 stations.{" "}
                <span className="text-gold-gradient">80% coverage.</span>
              </h3>
              <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-forest-100/70">
                Our proprietary network of Continuously Operating Reference Stations streams
                real-time RTK corrections across Uganda — centimetre-grade positioning
                without a local base station, anywhere, anytime.
              </p>
              <div className="mt-7 grid max-w-sm grid-cols-3 gap-4">
                {[
                  { v: "18", l: "CORS Stations" },
                  { v: "80%", l: "National Coverage" },
                  { v: "<2s", l: "Correction Latency" },
                ].map((m) => (
                  <div key={m.l} className="border-l border-forest-700 pl-3">
                    <div className="font-display text-xl font-extrabold text-gold-400">{m.v}</div>
                    <div className="mt-1 text-[9px] tracking-[0.16em] text-forest-300 uppercase">{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CORS image card */}
          <div className="group relative min-h-[300px] overflow-hidden rounded-3xl">
            <img
              src="images/cors-station.jpg"
              alt="CORS reference station at dusk"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent" />
            <div className="absolute bottom-0 p-8">
              <div className="font-mono text-[10px] tracking-[0.3em] text-gold-400">
                REFERENCE STATION — CENTRAL REGION
              </div>
              <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-forest-100/90">
                Continuous 24/7 broadcast of RTK corrections, powered by solar and backed by
                redundant uplinks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
