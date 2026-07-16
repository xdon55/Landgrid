import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

export default function PageHeader({
  kicker,
  title,
  subtitle,
  accent,
  crumbs = [],
  bgImage,
  children,
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  accent?: string;
  crumbs?: Crumb[];
  bgImage?: string;
  children?: ReactNode;
}) {
  return (
    <section className="noise topo-lines relative overflow-hidden border-b border-forest-800/60 bg-forest-950">
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 via-forest-950/85 to-forest-950" />
      <div className="relative mx-auto max-w-[1400px] px-6 pt-32 pb-20 lg:px-10 lg:pt-40 lg:pb-24">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-2 text-[11px] font-medium">
          <Link to="/" className="text-forest-300/70 transition-colors hover:text-gold-400">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-forest-500/60" />
              {c.to ? (
                <Link to={c.to} className="text-forest-300/70 transition-colors hover:text-gold-400">
                  {c.label}
                </Link>
              ) : (
                <span className="text-gold-400">{c.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="reveal is-visible flex items-center gap-3">
          <span className="h-px w-10 bg-gold-500" />
          <span className="font-mono text-[11px] tracking-[0.35em] text-forest-300">
            {kicker}
          </span>
        </div>

        <h1 className="reveal is-visible font-display mt-6 max-w-4xl text-4xl leading-[1.05] font-extrabold tracking-tight text-ivory sm:text-5xl lg:text-6xl">
          {title} {accent && <span className="text-gold-gradient">{accent}</span>}
        </h1>

        {subtitle && (
          <p className="reveal is-visible mt-6 max-w-2xl text-[15px] leading-relaxed text-forest-100/75 lg:text-lg">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
