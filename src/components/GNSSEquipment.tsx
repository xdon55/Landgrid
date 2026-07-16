import { useRevealContainer } from "../hooks/useReveal";
import { CHC_GNSS_RECEIVERS, HCE320_CONTROLLER, GPS_TRACKING } from "../lib/data";
import {
  Satellite,
  Signal,
  Navigation,
  MapPin,
  Bell,
  Fuel,
  Car,
  Smartphone,
  ChevronRight,
  Check,
} from "lucide-react";

const TRACKING_ICONS = [Navigation, MapPin, Fuel, Bell];

export default function GNSSEquipment() {
  const ref = useRevealContainer();

  return (
    <section id="gnss-equipment" ref={ref} className="noise relative overflow-hidden bg-ivory">
      <div className="grid-survey absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-36">
        {/* ========== GNSS SALE & RENTAL ========== */}
        <div className="mb-20">
          <div className="mb-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <div className="reveal flex items-center gap-3">
                <span className="h-px w-10 bg-gold-600" />
                <span className="font-mono text-[11px] tracking-[0.35em] text-forest-600">
                  GNSS EQUIPMENT SALE & RENTAL
                </span>
              </div>
              <h2 className="reveal reveal-delay-1 font-display mt-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-forest-950 sm:text-5xl lg:text-[56px]">
                CHC GNSS
                <br />
                <span className="text-forest-500">Receivers</span>
              </h2>
            </div>
            <p className="reveal reveal-delay-2 max-w-md text-[15px] leading-relaxed text-forest-900/70 lg:ml-auto">
              We offer a complete range of CHC GNSS receivers for sale and
              rental — from flagship IMU-RTK to compact network receivers — plus
              rugged controllers and full after-sales support.
            </p>
          </div>

          {/* Receiver cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CHC_GNSS_RECEIVERS.map((rx, i) => (
              <div
                key={rx.model}
                className={`reveal reveal-delay-${(i % 3) + 1} group relative overflow-hidden rounded-2xl border border-forest-800/10 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-500/40 hover:shadow-[0_28px_60px_-24px_rgba(5,23,16,0.2)]`}
              >
                <div className="topo-lines-light absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-950 text-gold-500 transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-forest-950">
                      <Satellite className="h-5 w-5" strokeWidth={1.6} />
                    </div>
                    <span className="rounded-full border border-forest-300/60 px-3 py-1 text-[10px] font-semibold tracking-wide text-forest-600">
                      SALE & RENTAL
                    </span>
                  </div>

                  <h3 className="font-display mt-5 text-lg font-bold tracking-tight text-forest-950">
                    {rx.model}
                  </h3>
                  <p className="font-mono mt-1 text-[10px] tracking-[0.2em] text-gold-600">
                    {rx.tagline.toUpperCase()}
                  </p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-forest-900/65">
                    {rx.description}
                  </p>

                  {/* Quick specs */}
                  <div className="mt-5 space-y-1.5 border-t border-forest-800/10 pt-4">
                    {rx.specs.slice(0, 4).map((s) => (
                      <div key={s.label} className="flex justify-between text-[11px]">
                        <span className="text-forest-900/55">{s.label}</span>
                        <span className="font-semibold text-forest-800">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 space-y-1.5">
                    {rx.highlights.slice(0, 3).map((h) => (
                      <div key={h} className="flex gap-2 text-[11px] text-forest-900/60">
                        <Check className="mt-0.5 h-3 w-3 shrink-0 text-forest-500" strokeWidth={2} />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* HCE 320 Controller card */}
            <div className="reveal reveal-delay-3 group relative overflow-hidden rounded-2xl border border-gold-500/30 bg-forest-950 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(5,23,16,0.4)]">
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/40 bg-gold-500/10 text-gold-400">
                    <Smartphone className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <span className="rounded-full bg-gold-500/20 px-3 py-1 text-[10px] font-semibold tracking-wide text-gold-400">
                    CONTROLLER
                  </span>
                </div>
                <h3 className="font-display mt-5 text-lg font-bold tracking-tight text-ivory">
                  {HCE320_CONTROLLER.model}
                </h3>
                <p className="mt-3 text-[12.5px] leading-relaxed text-forest-100/70">
                  {HCE320_CONTROLLER.description}
                </p>
                <div className="mt-5 space-y-1.5 border-t border-forest-700/50 pt-4">
                  {HCE320_CONTROLLER.specs.map((s) => (
                    <div key={s.label} className="flex justify-between text-[11px]">
                      <span className="text-forest-300/70">{s.label}</span>
                      <span className="font-semibold text-forest-100">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== GPS CAR TRACKING ========== */}
        <div className="reveal mt-8">
          <div className="overflow-hidden rounded-3xl border border-forest-800/10 bg-forest-950">
            <div className="grid lg:grid-cols-2">
              {/* Content */}
              <div className="p-8 sm:p-12 lg:p-14">
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-gold-500" strokeWidth={1.6} />
                  <span className="font-mono text-[10px] tracking-[0.35em] text-gold-400">
                    {GPS_TRACKING.subtitle.toUpperCase()}
                  </span>
                </div>

                <h3 className="font-display mt-4 text-3xl font-extrabold tracking-tight text-ivory sm:text-4xl">
                  GPS Car Tracking
                  <br />
                  <span className="text-gold-gradient">Services</span>
                </h3>

                <p className="mt-5 text-[14px] leading-relaxed text-forest-100/75">
                  {GPS_TRACKING.description}
                </p>

                {/* Features */}
                <ul className="mt-8 space-y-5">
                  {GPS_TRACKING.features.map((f, i) => {
                    const Icon = TRACKING_ICONS[i];
                    return (
                      <li key={f.title} className="group/feat flex gap-4">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-forest-700 bg-forest-900 text-gold-500 transition-colors duration-300 group-hover/feat:border-gold-500/50">
                          <Icon className="h-4 w-4" strokeWidth={1.6} />
                        </span>
                        <span>
                          <span className="font-display block text-[13.5px] font-bold text-ivory">
                            {f.title}
                          </span>
                          <span className="mt-0.5 block text-[12px] leading-relaxed text-forest-100/60">
                            {f.text}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Services list side */}
              <div className="relative flex flex-col justify-center bg-forest-900/60 p-8 sm:p-12 lg:p-14">
                {/* Animated radar */}
                <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 opacity-40">
                  <div className="absolute inset-0 rounded-full border border-forest-600/40" />
                  <div className="absolute inset-8 rounded-full border border-forest-600/30" />
                  <div className="absolute inset-16 rounded-full border border-gold-500/25" />
                  <div
                    className="animate-radar absolute inset-0"
                    style={{
                      background: "conic-gradient(from 0deg, rgba(212,162,76,0.3), transparent 80deg)",
                      borderRadius: "9999px",
                    }}
                  />
                  <span className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500" />
                </div>

                <div className="relative">
                  <h4 className="font-mono text-[10px] tracking-[0.35em] text-gold-400">
                    TRACKING SERVICES
                  </h4>

                  <div className="mt-6 space-y-3">
                    {GPS_TRACKING.services.map((s) => (
                      <div
                        key={s}
                        className="group/svc flex items-center gap-3 rounded-xl border border-forest-700/50 bg-forest-950/60 px-5 py-4 transition-all duration-300 hover:border-gold-500/40"
                      >
                        <ChevronRight className="h-4 w-4 text-gold-500/70 transition-transform duration-300 group-hover/svc:translate-x-0.5" />
                        <span className="text-[13px] font-medium text-forest-100/80">{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* Access info */}
                  <div className="mt-8 rounded-xl border border-gold-500/30 bg-gold-500/10 p-5">
                    <div className="flex items-center gap-2">
                      <Signal className="h-4 w-4 text-gold-500" strokeWidth={1.6} />
                      <span className="font-display text-[12px] font-bold text-gold-400">
                        24/7 ONLINE ACCESS
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-forest-100/70">
                      Track in real time on PC or download the mobile app for
                      on-the-go monitoring — anywhere, anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
