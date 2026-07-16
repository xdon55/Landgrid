import { ArrowUpRight, MapPin, Scaling } from "lucide-react";
import { useRevealContainer } from "../hooks/useReveal";
import { PROJECTS } from "../lib/data";

export default function Projects() {
  const ref = useRevealContainer();

  return (
    <section id="projects" ref={ref} className="noise topo-lines relative bg-forest-950">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="reveal flex items-center gap-3">
              <span className="h-px w-10 bg-gold-500" />
              <span className="font-mono text-[11px] tracking-[0.35em] text-forest-300">
                FEATURED PROJECTS
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 font-display mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-ivory sm:text-5xl lg:text-[56px]">
              Work that shapes
              <br />
              <span className="text-gold-gradient">Uganda's future.</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 max-w-sm text-[14px] leading-relaxed text-forest-100/65">
            850+ completed projects across government, energy, transport, agriculture and
            private development.
          </p>
        </div>

        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <article
              key={p.id}
              className={`reveal reveal-delay-${i + 1} group grid cursor-default gap-0 overflow-hidden rounded-3xl border border-forest-800/60 bg-forest-900/40 backdrop-blur-sm transition-all duration-700 hover:border-gold-500/40 lg:grid-cols-[1.1fr_1fr] ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
            >
              {/* Image */}
              <div className="relative min-h-[280px] overflow-hidden lg:min-h-[380px] [direction:ltr]">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-107"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-forest-950/60 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 rounded-full bg-forest-950/80 px-4 py-1.5 backdrop-blur-sm">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-gold-400">
                    {p.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative flex flex-col justify-center p-8 sm:p-12 [direction:ltr]">
                <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500">
                  {p.category.toUpperCase()}
                </span>
                <h3 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-ivory transition-colors duration-300 group-hover:text-gold-300 sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-forest-100/70">
                  {p.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-6 border-t border-forest-800/70 pt-6">
                  <span className="flex items-center gap-2 text-[12px] text-forest-200/80">
                    <MapPin className="h-3.5 w-3.5 text-gold-500" strokeWidth={1.8} />
                    {p.location}
                  </span>
                  <span className="flex items-center gap-2 text-[12px] text-forest-200/80">
                    <Scaling className="h-3.5 w-3.5 text-gold-500" strokeWidth={1.8} />
                    {p.area}
                  </span>
                </div>
                <span className="absolute top-8 right-8 hidden h-11 w-11 place-items-center rounded-full border border-forest-700 text-forest-300 transition-all duration-500 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-forest-950 lg:grid">
                  <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
