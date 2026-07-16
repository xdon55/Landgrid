import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="grid min-h-[80vh] place-items-center bg-forest-950 px-6">
      <div className="text-center">
        <div className="font-display text-[120px] font-extrabold leading-none text-gold-gradient sm:text-[180px]">
          404
        </div>
        <h1 className="font-display mt-4 text-3xl font-extrabold text-ivory">
          Coordinates not found.
        </h1>
        <p className="mt-3 text-[15px] text-forest-200/70">
          The page you're looking for has moved or doesn't exist.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-[13px] font-bold text-forest-950"
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <Link
            to="/quote"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-forest-600 px-6 py-3 text-[13px] font-bold text-ivory"
          >
            <Search className="h-4 w-4" /> Build a Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
