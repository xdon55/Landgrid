import {
  Cpu,
  BadgeCheck,
  Zap,
  Crosshair,
  Network,
  Handshake,
} from "lucide-react";
import { useRevealContainer } from "../hooks/useReveal";
import { VALUES } from "../lib/data";

const ICONS = [Cpu, BadgeCheck, Zap, Crosshair, Network, Handshake];

export default function WhyUs() {
  const ref = useRevealContainer();

  return (
    <section ref={ref} className="relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-32">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <div className="reveal flex items-center gap-3">
              <span className="h-px w-10 bg-gold-600" />
              <span className="font-mono text-[11px] tracking-[0.35em] text-forest-600">
                WHY LANDGRID
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 font-display mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-forest-950 sm:text-5xl">
              Built on precision.
              <br />
              Delivered <span className="text-forest-500">with care.</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-md text-[15px] leading-relaxed text-forest-900/70 lg:ml-auto">
            We combine African expertise with world-class technology and methodology to
            deliver solutions that stand up to the most demanding international standards.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => {
            const Icon = ICONS[i];
            return (
              <div
                key={v.title}
                className={`reveal reveal-delay-${(i % 3) + 1} group relative overflow-hidden rounded-2xl border border-forest-800/10 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-[0_28px_60px_-24px_rgba(5,23,16,0.25)]`}
              >
                <div className="topo-lines-light absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-950 text-gold-500 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-forest-950">
                    <Icon className="h-5.5 w-5.5" strokeWidth={1.6} />
                  </div>
                  <h3 className="font-display mt-6 text-lg font-bold tracking-tight text-forest-950">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-forest-900/65">
                    {v.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
