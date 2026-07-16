import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, MapPin, BadgeCheck, Ruler, Satellite, Plane } from "lucide-react";
import { COMPANY } from "../lib/data";

const CHIPS = [
  { icon: Ruler, label: "mm Accuracy" },
  { icon: Plane, label: "UAV Mapping" },
  { icon: Satellite, label: "RTK GNSS" },
  { icon: BadgeCheck, label: "ISO Certified" },
];

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="top" className="noise relative flex min-h-screen flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="images/hero.jpg"
          alt="Landgrid surveyor on the hills of Uganda"
          className="h-full w-full scale-105 object-cover"
          style={{
            transform: `scale(1.08) translate(${mouse.x * -8}px, ${mouse.y * -6}px)`,
            transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/75 to-forest-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/60" />
        <div className="topo-lines absolute inset-0 opacity-60" />
      </div>

      {/* Coordinate rail — right */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-6 xl:flex">
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-gold-500/60 to-transparent" />
        <span className="font-mono rotate-90 whitespace-nowrap text-[10px] tracking-[0.3em] text-forest-300/80">
          {COMPANY.coordinates}
        </span>
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-gold-500/60 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-6 pt-32 pb-24 lg:px-10">
        {/* Eyebrow */}
        <div className="reveal is-visible mb-8 flex items-center gap-4">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping-soft absolute inset-0 rounded-full bg-gold-500" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-gold-500" />
          </span>
          <span className="font-mono text-[11px] tracking-[0.35em] text-forest-200">
            EST. {COMPANY.founded} · SERVING EAST AFRICA
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display max-w-5xl text-[13vw] leading-[0.95] font-extrabold tracking-tight text-ivory sm:text-7xl lg:text-[102px]">
          Precision
          <br />
          <span className="text-gold-gradient">Surveying.</span>
          <br />
          <span className="text-forest-200/95">Smarter</span>{" "}
          <span className="text-gold-gradient">Mapping.</span>
        </h1>

        <p className="mt-8 max-w-xl text-[15.5px] leading-relaxed font-light text-forest-100/85 lg:text-lg">
          World-class geospatial, surveying and engineering solutions delivered with
          African expertise — accurate data that powers better decisions.
        </p>

        {/* Chips + CTA */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {CHIPS.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 rounded-full border border-forest-500/40 bg-forest-950/50 px-4 py-2 text-[12px] font-medium text-forest-100 backdrop-blur-sm transition-colors duration-300 hover:border-gold-500/60 hover:text-gold-300"
            >
              <c.icon className="h-3.5 w-3.5 text-gold-500" strokeWidth={1.8} />
              {c.label}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Link
            to="/services"
            className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-ivory px-7 py-3.5 text-[13px] font-bold text-forest-950 transition-all duration-500 hover:bg-gold-500 hover:shadow-[0_14px_50px_-10px_rgba(212,162,76,0.65)]"
          >
            Explore our services
            <ArrowDownRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Link>
          <Link
            to="/quote"
            className="group relative text-[13px] font-semibold tracking-wide text-forest-100 transition-colors hover:text-gold-400"
          >
            Request a survey quote
            <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-100 bg-forest-400 transition-transform duration-500 group-hover:scale-x-0" />
            <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold-500 transition-transform duration-500 group-hover:scale-x-100" />
          </Link>
        </div>

        {/* Bottom meta row */}
        <div className="mt-20 flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-3 text-forest-200/80">
            <MapPin className="h-4 w-4 text-gold-500" strokeWidth={1.8} />
            <span className="font-mono text-[11px] tracking-[0.25em]">{COMPANY.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-7 items-start justify-center rounded-full border border-forest-500/50 pt-2">
              <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-gold-500" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-forest-300/70">SCROLL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
