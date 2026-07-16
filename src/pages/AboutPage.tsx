import About from "../components/About";
import WhyUs from "../components/WhyUs";
import PageHeader from "../components/PageHeader";
import { COMPANY, STATS, VALUES } from "../lib/data";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="ABOUT LANDGRID"
        title="African expertise."
        accent="World-class precision."
        subtitle={`Since ${COMPANY.founded}, we have combined local knowledge with cutting-edge technology to become one of East Africa's most trusted geospatial, surveying and engineering firms.`}
        crumbs={[{ label: "About" }]}
        bgImage="images/hero.jpg"
      >
        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="border-l border-forest-600/60 pl-4">
              <div className="font-display text-3xl font-extrabold text-ivory">
                {s.value}
                <span className="text-gold-500">{s.suffix}</span>
              </div>
              <div className="font-mono mt-1 text-[9px] tracking-[0.25em] text-forest-300/80">
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </PageHeader>

      <About />
      <WhyUs />

      {/* Values deep-dive */}
      <section className="bg-stone-warm py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold-600" />
              <span className="font-mono text-[11px] tracking-[0.35em] text-forest-600">
                OUR VALUES
              </span>
            </div>
            <h2 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">
              What drives us every day.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="group relative rounded-2xl bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="font-display block text-[40px] leading-none font-extrabold text-forest-100 transition-colors group-hover:text-gold-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-4 text-xl font-bold text-forest-950">
                  {v.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-forest-900/70">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
