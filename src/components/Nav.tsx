import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Crosshair, Menu, X } from "lucide-react";
import DownloadButton from "./DownloadButton";
import { cn } from "../utils/cn";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/technology", label: "Technology" },
  { to: "/equipment", label: "LiDAR" },
  { to: "/gnss-tracking", label: "GNSS & Tracking" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

export function LogoMark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-3", className)}>
      <span className="relative grid h-10 w-10 place-items-center">
        <Crosshair
          className="h-9 w-9 text-gold-500 transition-transform duration-700 group-hover:rotate-90"
          strokeWidth={1.4}
        />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-gold-500" />
      </span>
      <span className="leading-none">
        <span className="font-display block text-[17px] font-extrabold tracking-[0.14em] text-ivory">
          LANDGRID
        </span>
        <span className="font-mono mt-1 block text-[8px] tracking-[0.42em] text-gold-500">
          UGANDA LIMITED
        </span>
      </span>
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const transparentRoutes = ["/"];
  const isTransparent = transparentRoutes.includes(location.pathname) && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-700",
        isTransparent
          ? "bg-transparent"
          : "border-b border-forest-800/60 bg-forest-950/85 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <LogoMark />

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "group relative text-[12.5px] font-medium tracking-wide transition-colors duration-300",
                  isActive ? "text-gold-400" : "text-forest-200/80 hover:text-ivory",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px bg-gold-500 transition-all duration-500",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <DownloadButton className="px-4 py-2 text-[11.5px]" label="Profile PDF" />
          <Link
            to="/quote"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-[12px] font-bold text-forest-950 transition-all duration-500 hover:bg-gold-400 hover:shadow-[0_10px_40px_-8px_rgba(212,162,76,0.6)]"
          >
            Get a Quote
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-forest-700 text-ivory lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden bg-forest-950/95 backdrop-blur-xl transition-all duration-500 lg:hidden",
          open ? "max-h-[560px] border-b border-forest-800/60" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-6">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-forest-900 text-gold-400"
                    : "text-forest-200 hover:bg-forest-900 hover:text-ivory",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <DownloadButton className="w-full justify-center" label="Company Profile" />
            <Link
              to="/quote"
              className="inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-gold-500 px-5 py-3 text-[13px] font-bold text-forest-950"
            >
              Get a Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
