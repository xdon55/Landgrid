import { Compass, Target, Award } from "lucide-react";
import { useRevealContainer, useCountUp } from "../hooks/useReveal";
import { STATS } from "../lib/data";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="group border-l border-forest-800/70 pl-5 transition-colors duration-500 hover:border-gold-500">
      <div className="font-display text-4xl font-extrabold tracking-tight text-ivory sm:text-5xl">
        <span ref={ref}>{v}</span>
        <span className="text-gold-500">{suffix}</span>
      </div>
      <div className="font-mono mt-2 text-[10px] tracking-[0.28em] text-forest-300/80">
        {label.toUpperCase()}
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRevealContainer();

  return (
    <section id="about" ref={ref} className="noise topo-lines-light relative overflow-hidden bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div>
            <div className="reveal flex items-center gap-3">
              <span className="h-px w-10 bg-gold-500" />
              <span className="font-mono text-[11px] tracking-[0.35em] text-forest-600">
                ABOUT LANDGRID
              </span>
            </div>

            <h2 className="reveal font-display reveal-delay-1 mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-forest-950 sm:text-5xl lg:text-[56px]">
              African expertise.
              <br />
              <span className="text-forest-500">World-class</span> precision.
            </h2>

            <p className="reveal reveal-delay-2 mt-7 max-w-lg text-[15px] leading-relaxed text-forest-900/70">
              Founded in 2012 in Kampala, Landgrid Uganda Limited has grown into one of East
              Africa's most trusted geospatial, surveying and engineering firms. We serve
              government agencies, engineers, developers and land owners across{" "}
              <strong className="font-semibold text-forest-800">62+ districts</strong> — from
              single parcel boundaries to national infrastructure corridors.
            </p>

            <p className="reveal reveal-delay-3 mt-5 max-w-lg text-[15px] leading-relaxed text-forest-900/70">
              Every deliverable passes a three-tier quality review and is signed off by a
              registered surveyor — sub-centimetre accuracy you can build on.
            </p>

            {/* Mission / Vision */}
            <div className="reveal reveal-delay-3 mt-10 grid gap-5 sm:grid-cols-2">
              <div className="group rounded-2xl bg-forest-950 p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 text-gold-400">
                  <Target className="h-4.5 w-4.5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display mt-5 text-[11px] font-bold tracking-[0.25em] text-gold-400">
                  OUR MISSION
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-forest-100/85">
                  To empower confident land and infrastructure decisions with precise,
                  accessible and timely geospatial data.
                </p>
              </div>
              <div className="group rounded-2xl bg-forest-800 p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/40 text-gold-400">
                  <Compass className="h-4.5 w-4.5" strokeWidth={1.6} />
                </div>
                <h3 className="font-display mt-5 text-[11px] font-bold tracking-[0.25em] text-gold-400">
                  OUR VISION
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-forest-100/85">
                  To be East Africa's most trusted geospatial partner — mapping the future
                  of a developing continent.
                </p>
              </div>
            </div>
          </div>

          {/* Imagery */}
          <div className="reveal reveal-delay-2 relative">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.pexels.com/photos/30379883/pexels-photo-30379883.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200"
                alt="Landgrid field surveyor with total station"
                className="aspect-[5/6] w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="animate-float-y absolute -left-4 bottom-10 w-[240px] rounded-2xl border border-forest-800/10 bg-ivory/95 p-6 shadow-[0_24px_60px_-20px_rgba(5,23,16,0.45)] backdrop-blur-md sm:-left-10 lg:-left-16">
              <Award className="h-6 w-6 text-gold-600" strokeWidth={1.6} />
              <div className="font-display mt-3 text-4xl font-extrabold text-forest-950">
                13<span className="text-gold-600">+</span>
              </div>
              <div className="font-mono mt-1 text-[9px] tracking-[0.3em] text-forest-900/60">
                YEARS OF EXCELLENCE — SINCE 2012
              </div>
              <div className="mt-4 space-y-1.5 border-t border-forest-800/10 pt-4 text-[11.5px] font-medium text-forest-900/75">
                <div className="flex justify-between"><span>SRB Registered</span><span className="text-forest-500">Uganda</span></div>
                <div className="flex justify-between"><span>ISU Member</span><span className="text-forest-500">Certified</span></div>
                <div className="flex justify-between"><span>ISO 9001:2015</span><span className="text-forest-500">Accredited</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats band */}
        <div className="reveal mt-24 rounded-3xl bg-forest-950 px-8 py-12 sm:px-12 lg:px-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s) => (
              <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
