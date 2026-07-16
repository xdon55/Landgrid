import {
  MapPinned,
  Plane,
  DraftingCompass,
  Globe2,
  RadioTower,
  PackageCheck,
  ArrowUpRight,
  ShoppingCart,
  Navigation,
} from "lucide-react";
import { useRevealContainer } from "../hooks/useReveal";
import { SERVICES } from "../lib/data";

const ICONS: Record<string, typeof MapPinned> = {
  cadastral: MapPinned,
  uav: Plane,
  engineering: DraftingCompass,
  gis: Globe2,
  cors: RadioTower,
  "gnss-sale": ShoppingCart,
  tracking: Navigation,
  equipment: PackageCheck,
};

export default function Services() {
  const ref = useRevealContainer();

  return (
    <section id="services" ref={ref} className="noise grid-survey relative bg-forest-950">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
        {/* Header */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <div className="reveal flex items-center gap-3">
              <span className="h-px w-10 bg-gold-500" />
              <span className="font-mono text-[11px] tracking-[0.35em] text-forest-300">
                OUR SERVICES
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 font-display mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-ivory sm:text-5xl lg:text-[56px]">
              End-to-end geospatial
              <br />
              solutions, engineered
              <br />
              <span className="text-gold-gradient">for precision.</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-md text-[15px] leading-relaxed text-forest-100/70 lg:ml-auto">
            From boundary surveys and drone mapping to complex GIS platforms and
            engineering consultancy — our integrated offering covers every stage of your
            project lifecycle.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-x-6 gap-y-px sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.id];
            return (
              <article
                key={s.id}
                className={`reveal reveal-delay-${(i % 4) + 1} group relative cursor-default border-t border-forest-800/70 py-10 pr-6 transition-colors duration-500 hover:border-gold-500/50`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-[13px] font-bold tracking-[0.2em] text-forest-400/70 transition-colors duration-500 group-hover:text-gold-500">
                    {s.index}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-forest-500/50 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold-500" />
                </div>

                <div className="mt-9 mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-forest-700/80 bg-forest-900/60 text-forest-300 transition-all duration-500 group-hover:border-gold-500/50 group-hover:bg-gold-500/10 group-hover:text-gold-400">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                <h3 className="font-display text-xl font-bold tracking-tight text-ivory transition-colors duration-300 group-hover:text-gold-300">
                  {s.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-forest-100/65">
                  {s.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-forest-700/70 px-3 py-1 text-[10.5px] font-medium tracking-wide text-forest-300/80 transition-colors duration-300 group-hover:border-gold-500/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
