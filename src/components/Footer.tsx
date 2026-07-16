import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  ArrowUpRight,
  Share2,
  AtSign,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useRevealContainer } from "../hooks/useReveal";
import { COMPANY, SERVICES } from "../lib/data";
import DownloadButton from "./DownloadButton";
import { LogoMark } from "./Nav";

export default function Footer() {
  const ref = useRevealContainer();

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden bg-forest-950">
      {/* CTA band */}
      <div className="mx-auto max-w-[1400px] px-6 pt-28 lg:px-10">
        <div className="reveal noise relative overflow-hidden rounded-[28px] bg-gold-500 px-8 py-14 sm:px-14 lg:px-20 lg:py-18">
          <svg
            className="absolute -right-20 -bottom-24 h-96 w-96 text-forest-950/10"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            aria-hidden
          >
            <circle cx="100" cy="100" r="90" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" strokeWidth="1" />
            <circle cx="100" cy="100" r="30" strokeWidth="1" />
            <line x1="100" y1="0" x2="100" y2="200" strokeWidth="1" />
            <line x1="0" y1="100" x2="200" y2="100" strokeWidth="1" />
          </svg>
          <div className="relative flex flex-wrap items-end justify-between gap-10">
            <div className="max-w-xl">
              <span className="font-mono text-[10px] tracking-[0.35em] text-forest-900/70">
                LET'S WORK TOGETHER
              </span>
              <h2 className="font-display mt-3 text-4xl leading-[1.02] font-extrabold tracking-tight text-forest-950 sm:text-5xl lg:text-6xl">
                Ready to map
                <br />
                the future?
              </h2>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-forest-900/80">
                Tell us about your parcel, corridor or city — our consultants respond to
                every inquiry within one business day.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${COMPANY.email}`}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-forest-950 px-8 py-4 text-[13.5px] font-bold text-ivory transition-all duration-500 hover:shadow-[0_18px_50px_-12px_rgba(5,23,16,0.7)]"
              >
                Request a survey quote
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
              </a>
              <DownloadButton
                variant="outline"
                className="justify-center border-forest-950/40 text-forest-950 hover:border-forest-950 hover:bg-forest-950/5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-10 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div>
            <LogoMark />
            <p className="mt-6 max-w-xs text-[13.5px] leading-relaxed text-forest-100/65">
              {COMPANY.tagline} World-class geospatial, surveying and engineering solutions
              delivered with African expertise.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Share2, label: "LinkedIn", url: "https://linkedin.com" },
                { Icon: AtSign, label: "Email", url: `mailto:${COMPANY.email}` },
                { Icon: MessageCircle, label: "WhatsApp", url: `https://wa.me/256781423708` },
              ].map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-forest-700/70 text-forest-300 transition-all duration-300 hover:border-gold-500 hover:bg-gold-500 hover:text-forest-950"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.35em] text-gold-500">SERVICES</h4>
            <ul className="mt-6 space-y-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="text-[13.5px] text-forest-100/70 transition-colors duration-300 hover:text-gold-400"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.35em] text-gold-500">COMPANY</h4>
            <ul className="mt-6 space-y-3">
              {([
                ["About us", "/about"],
                ["Technology", "/technology"],
                ["LiDAR Equipment", "/equipment"],
                ["GNSS & Tracking", "/gnss-tracking"],
                ["Projects", "/projects"],
                ["Request a quote", "/quote"],
              ] as const).map(([label, href]) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-[13.5px] text-forest-100/70 transition-colors duration-300 hover:text-gold-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[10px] tracking-[0.35em] text-gold-500">HEAD OFFICE</h4>
            <ul className="mt-6 space-y-4 text-[13.5px] text-forest-100/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.7} />
                {COMPANY.address}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.7} />
                {COMPANY.phone} · {COMPANY.phoneMobile}
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.7} />
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-gold-400">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.7} />
                <a href="https://www.landgrid.net" target="_blank" rel="noreferrer" className="transition-colors hover:text-gold-400">
                  www.{COMPANY.website}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" strokeWidth={1.7} />
                Mon – Fri, 08:00 – 17:30 EAT
              </li>
            </ul>
          </div>
        </div>

        {/* Coordinate strip */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-forest-800/70 pt-8">
          <span className="font-mono text-[10.5px] tracking-[0.3em] text-forest-400/70">
            {COMPANY.coordinates} — KAMPALA
          </span>
          <span className="text-[12px] text-forest-300/60">
            © {new Date().getFullYear()} Landgrid Uganda Limited. All rights reserved.
          </span>
          <span className="font-mono text-[10.5px] tracking-[0.3em] text-forest-400/70">
            EST. 2012 · UGANDA
          </span>
        </div>
      </div>
    </footer>
  );
}
