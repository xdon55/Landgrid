import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Services from "../components/Services";
import Process from "../components/Process";
import DownloadButton from "../components/DownloadButton";
import { STATS } from "../lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />

      {/* Quote CTA banner */}
      <section className="relative overflow-hidden bg-gold-500">
        <div className="topo-lines-light absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="font-mono text-[10px] tracking-[0.35em] text-forest-900/70">
                READY TO START?
              </span>
              <h2 className="font-display mt-3 text-3xl leading-tight font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl">
                Build your project quote in 5 minutes.
              </h2>
              <p className="mt-4 text-[14.5px] text-forest-900/80">
                Tell us about your survey needs and get a tailored estimate —
                no commitment, no hassle.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/quote"
                className="group inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-forest-950 px-7 py-4 text-[13.5px] font-bold text-ivory transition-all duration-500 hover:shadow-[0_18px_50px_-12px_rgba(5,23,16,0.7)]"
              >
                Build a Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <DownloadButton
                variant="outline"
                className="justify-center border-forest-950/40 text-forest-950 hover:border-forest-950 hover:bg-forest-950/5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-forest-950 py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-6 sm:grid-cols-3 lg:grid-cols-5 lg:px-10">
          {STATS.map((s) => (
            <div key={s.label} className="border-l border-forest-800/70 pl-5">
              <div className="font-display text-3xl font-extrabold tracking-tight text-ivory lg:text-4xl">
                {s.value}
                <span className="text-gold-500">{s.suffix}</span>
              </div>
              <div className="font-mono mt-2 text-[10px] tracking-[0.28em] text-forest-300/80">
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Process />

      {/* Latest projects teaser */}
      <section className="relative bg-stone-warm py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold-600" />
                <span className="font-mono text-[11px] tracking-[0.35em] text-forest-600">
                  LATEST WORK
                </span>
              </div>
              <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">
                Selected projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="group inline-flex cursor-pointer items-center gap-2 text-[13px] font-bold text-forest-700 transition-colors hover:text-gold-600"
            >
              View all projects
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                t: "Albertine Oil Fields",
                c: "Cadastral Survey",
                img: "https://images.pexels.com/photos/25301009/pexels-photo-25301009.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900",
              },
              {
                t: "Kampala Metro GIS",
                c: "GIS Platform",
                img: "https://images.pexels.com/photos/28146858/pexels-photo-28146858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900",
              },
              {
                t: "Entebbe Expressway",
                c: "Engineering",
                img: "https://images.pexels.com/photos/6872325/pexels-photo-6872325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900",
              },
            ].map((p) => (
              <Link
                to="/projects"
                key={p.t}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <img
                  src={p.img}
                  alt={p.t}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-gold-400">
                    {p.c.toUpperCase()}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-bold text-ivory">{p.t}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
