import Services from "../components/Services";
import Process from "../components/Process";
import PageHeader from "../components/PageHeader";
import { SERVICES } from "../lib/data";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="OUR SERVICES"
        title="End-to-end geospatial"
        accent="solutions."
        subtitle="From boundary surveys and drone mapping to complex GIS platforms, GNSS equipment rental and 24/7 GPS tracking — our integrated offering covers every stage of your project lifecycle."
        crumbs={[{ label: "Services" }]}
        bgImage="images/drone.jpg"
      >
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SERVICES.slice(0, 4).map((s) => (
            <div
              key={s.id}
              className="rounded-xl border border-forest-700/60 bg-forest-900/50 px-5 py-4 backdrop-blur-sm"
            >
              <div className="font-mono text-[9px] tracking-[0.3em] text-gold-500">
                {s.index}
              </div>
              <div className="font-display mt-1.5 text-[13px] font-bold text-ivory">
                {s.title}
              </div>
            </div>
          ))}
        </div>
      </PageHeader>

      <Services />
      <Process />
    </>
  );
}
