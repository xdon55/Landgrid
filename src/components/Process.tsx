import { useRevealContainer } from "../hooks/useReveal";
import { PROCESS, TESTIMONIAL } from "../lib/data";
import { Quote } from "lucide-react";

export default function Process() {
  const ref = useRevealContainer();

  return (
    <section id="process" ref={ref} className="relative bg-stone-warm">
      <div className="grid-survey absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-32">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="reveal flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold-600" />
            <span className="font-mono text-[11px] tracking-[0.35em] text-forest-600">
              OUR PROCESS
            </span>
            <span className="h-px w-10 bg-gold-600" />
          </div>
          <h2 className="reveal reveal-delay-1 font-display mx-auto mt-6 max-w-2xl text-4xl leading-[1.05] font-extrabold tracking-tight text-forest-950 sm:text-5xl">
            A proven methodology,
            <br />
            <span className="text-forest-500">start to finish.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line */}
          <svg
            className="absolute top-7 left-0 hidden h-px w-full lg:block"
            aria-hidden
          >
            <line
              x1="0" y1="0" x2="100%" y2="0"
              stroke="#d4a24c"
              strokeWidth="1"
              strokeDasharray="6 6"
              className="animate-dash"
            />
          </svg>

          {PROCESS.map((p, i) => (
            <div
              key={p.step}
              className={`reveal reveal-delay-${i + 1} group relative`}
            >
              <div className="relative z-10 mb-7 inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/50 bg-forest-950 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-500">
                <span className="font-display text-lg font-extrabold text-gold-500 transition-colors duration-500 group-hover:text-forest-950">
                  {p.step}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold tracking-tight text-forest-950">
                {p.title}
              </h3>
              <p className="mt-2.5 max-w-[260px] text-[13.5px] leading-relaxed text-forest-900/65">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="reveal relative mx-auto mt-24 max-w-4xl overflow-hidden rounded-3xl bg-forest-950 p-10 sm:p-14">
          <div className="topo-lines absolute inset-0 opacity-50" />
          <Quote className="absolute -top-2 right-8 h-28 w-28 text-forest-800/60" strokeWidth={1} />
          <div className="relative">
            <span className="font-mono text-[10px] tracking-[0.35em] text-gold-500">
              CLIENT VOICES — TRUSTED BY INDUSTRY LEADERS
            </span>
            <blockquote className="font-display mt-6 text-xl leading-snug font-bold tracking-tight text-ivory sm:text-[26px]">
              "{TESTIMONIAL.quote}"
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-500 font-display text-lg font-extrabold text-forest-950">
                {TESTIMONIAL.author.charAt(4)}
              </span>
              <div>
                <div className="font-display text-[14.5px] font-bold text-ivory">
                  {TESTIMONIAL.author}
                </div>
                <div className="mt-0.5 text-[12px] text-forest-300/80">
                  {TESTIMONIAL.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
