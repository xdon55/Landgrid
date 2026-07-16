import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Calculator,
} from "lucide-react";
import { COMPANY, SERVICES } from "../lib/data";
import PageHeader from "../components/PageHeader";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  subject: string;
  message: string;
  consent: boolean;
}

interface Errors {
  [key: string]: string;
}

const INITIAL: FormState = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  subject: "",
  message: "",
  consent: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s-]{9,}$/;

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.fullName.trim()) e.fullName = "Please enter your full name.";
  if (!f.email.trim()) e.email = "Email is required.";
  else if (!EMAIL_RE.test(f.email)) e.email = "Enter a valid email address.";
  if (f.phone && !PHONE_RE.test(f.phone)) e.phone = "Enter a valid phone number.";
  if (!f.service) e.service = "Select the service you're enquiring about.";
  if (!f.subject.trim()) e.subject = "Please add a subject.";
  if (!f.message.trim() || f.message.trim().length < 10)
    e.message = "Please provide a brief description (at least 10 characters).";
  if (!f.consent) e.consent = "Please consent to be contacted.";
  return e;
}

function genRef() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `LG-${new Date().getFullYear()}-${n}`;
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [ticket, setTicket] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((s) => ({ ...s, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const ref = genRef();
      try {
        const log = JSON.parse(localStorage.getItem("lg_contact_log") || "[]");
        log.push({ ref, ...form, submittedAt: new Date().toISOString() });
        localStorage.setItem("lg_contact_log", JSON.stringify(log));
      } catch {
        /* ignore */
      }
      setTicket(ref);
      setSubmitting(false);
    }, 700);
  };

  const reset = () => {
    setForm(INITIAL);
    setErrors({});
    setTicket(null);
  };

  return (
    <>
      <PageHeader
        kicker="GET IN TOUCH"
        title="Let's start a"
        accent="conversation."
        subtitle="Tell us about your project and our consultants will respond within one business day."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="relative bg-ivory">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 lg:grid-cols-[1.2fr_1fr] lg:px-10 lg:py-28">
          {/* Form */}
          <div className="rounded-3xl border border-forest-800/10 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
            {ticket ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-forest-100 text-forest-600">
                  <CheckCircle2 className="h-8 w-8" strokeWidth={1.8} />
                </div>
                <h2 className="font-display mt-6 text-2xl font-extrabold text-forest-950">
                  Message received!
                </h2>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-forest-900/70">
                  Thank you, <strong>{form.fullName}</strong>. Our team will review
                  your inquiry and respond to{" "}
                  <strong className="text-forest-700">{form.email}</strong> within one
                  business day.
                </p>
                <div className="mt-6 rounded-xl border border-gold-500/30 bg-gold-50 px-6 py-4">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-forest-600">
                    REFERENCE NUMBER
                  </div>
                  <div className="font-display mt-1 text-lg font-extrabold text-forest-950">
                    {ticket}
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={reset}
                    className="cursor-pointer rounded-full bg-forest-950 px-6 py-3 text-[13px] font-bold text-ivory"
                  >
                    Send another message
                  </button>
                  <Link
                    to="/quote"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-forest-700 px-6 py-3 text-[13px] font-bold text-forest-800"
                  >
                    <Calculator className="h-4 w-4" /> Build a Quote
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <h2 className="font-display text-2xl font-extrabold text-forest-950">
                  Send us a message
                </h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name *"
                    error={errors.fullName}
                    value={form.fullName}
                    onChange={(v) => update("fullName", v)}
                    placeholder="Jane Doe"
                  />
                  <Field
                    label="Email *"
                    type="email"
                    error={errors.email}
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    placeholder="jane@company.com"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Phone"
                    type="tel"
                    error={errors.phone}
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
                    placeholder="+256 7XX XXX XXX"
                  />
                  <Field
                    label="Company / Organisation"
                    value={form.company}
                    onChange={(v) => update("company", v)}
                    placeholder="Optional"
                  />
                </div>

                {/* Service select */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-bold text-forest-900">
                    Service of Interest *
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-forest-900 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 ${errors.service ? "border-red-500" : "border-forest-200"}`}
                  >
                    <option value="">Select a service…</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                  {errors.service && <ErrorMsg msg={errors.service} />}
                </div>

                <Field
                  label="Subject *"
                  error={errors.subject}
                  value={form.subject}
                  onChange={(v) => update("subject", v)}
                  placeholder="e.g. Cadastral survey for 5-hectare plot in Wakiso"
                />

                {/* Message */}
                <div>
                  <label className="mb-1.5 block text-[12px] font-bold text-forest-900">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us a bit about your project — location, size, timeline, deliverables…"
                    className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-[14px] text-forest-900 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 ${errors.message ? "border-red-500" : "border-forest-200"}`}
                  />
                  {errors.message && <ErrorMsg msg={errors.message} />}
                </div>

                {/* Consent */}
                <label className="flex cursor-pointer items-start gap-3 text-[12.5px] text-forest-900/80">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-forest-600"
                  />
                  <span>
                    I consent to Landgrid Uganda Limited contacting me about my enquiry.
                    My data will be handled in line with your privacy policy.
                  </span>
                </label>
                {errors.consent && <ErrorMsg msg={errors.consent} />}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-forest-950 px-7 py-4 text-[14px] font-bold text-ivory transition-all duration-300 hover:bg-gold-500 hover:text-forest-950 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? (
                    <>Sending…</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </button>

                <p className="text-[11.5px] text-forest-900/55">
                  Prefer email? Write to{" "}
                  <a href={`mailto:${COMPANY.email}`} className="font-semibold text-forest-700 underline">
                    {COMPANY.email}
                  </a>
                </p>
              </form>
            )}
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-forest-950 p-8 text-ivory">
              <h3 className="font-display text-xl font-extrabold">Head Office</h3>
              <ul className="mt-6 space-y-4 text-[13.5px] text-forest-100/80">
                <InfoRow icon={<MapPin className="h-4 w-4" />}>{COMPANY.address}</InfoRow>
                <InfoRow icon={<Phone className="h-4 w-4" />}>
                  <div>
                    <a href={`tel:${COMPANY.phone}`} className="hover:text-gold-400">
                      {COMPANY.phone}
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${COMPANY.phoneMobile}`} className="hover:text-gold-400">
                      {COMPANY.phoneMobile}
                    </a>
                  </div>
                </InfoRow>
                <InfoRow icon={<Mail className="h-4 w-4" />}>
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-gold-400">
                    {COMPANY.email}
                  </a>
                </InfoRow>
                <InfoRow icon={<Globe className="h-4 w-4" />}>
                  <a href={`https://www.${COMPANY.website}`} className="hover:text-gold-400">
                    www.{COMPANY.website}
                  </a>
                </InfoRow>
                <InfoRow icon={<Clock className="h-4 w-4" />}>
                  Mon – Fri, 08:00 – 17:30 EAT
                </InfoRow>
              </ul>
            </div>

            {/* Uganda map decorative */}
            <div className="relative overflow-hidden rounded-3xl border border-forest-800/10 bg-forest-100 p-8">
              <div className="topo-lines-light absolute inset-0 opacity-60" />
              <div className="relative">
                <span className="font-mono text-[10px] tracking-[0.3em] text-forest-600">
                  SERVING NATIONWIDE
                </span>
                <h3 className="font-display mt-2 text-2xl font-extrabold text-forest-950">
                  62+ districts across Uganda.
                </h3>
                <p className="mt-3 text-[13px] text-forest-900/70">
                  Our field teams operate from Kampala to Karamoja, Kasese to Mbale —
                  with RTK CORS coverage across 80% of the country.
                </p>
                <svg viewBox="0 0 200 240" className="mt-6 h-48 w-full">
                  <path
                    d="M60 20 Q90 10 130 30 Q160 45 170 80 Q180 120 165 160 Q150 190 120 210 Q90 225 60 215 Q30 200 25 160 Q20 120 35 80 Q45 40 60 20 Z"
                    fill="#dceee4"
                    stroke="#1d5a40"
                    strokeWidth="1.5"
                  />
                  <circle cx="110" cy="140" r="4" fill="#d4a24c" />
                  <circle cx="110" cy="140" r="10" fill="none" stroke="#d4a24c" strokeWidth="0.8" opacity="0.6">
                    <animate attributeName="r" values="4;14;4" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <text x="118" y="144" fontSize="9" fill="#051710" fontWeight="bold">
                    KAMPALA
                  </text>
                </svg>
              </div>
            </div>

            <Link
              to="/quote"
              className="block rounded-3xl bg-gold-500 p-8 transition-all duration-500 hover:shadow-[0_20px_50px_-14px_rgba(212,162,76,0.6)]"
            >
              <Calculator className="h-7 w-7 text-forest-950" />
              <h3 className="font-display mt-3 text-xl font-extrabold text-forest-950">
                Need a price estimate?
              </h3>
              <p className="mt-2 text-[13px] text-forest-900/80">
                Build a tailored quote in 5 minutes with our interactive wizard.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold text-forest-950">
                Start Quote Builder →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-bold text-forest-900">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-forest-900 outline-none transition-colors placeholder:text-forest-400/60 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 ${error ? "border-red-500" : "border-forest-200"}`}
      />
      {error && <ErrorMsg msg={error} />}
    </div>
  );
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <div className="mt-1.5 flex items-center gap-1.5 text-[11.5px] font-medium text-red-600">
      <AlertCircle className="h-3.5 w-3.5" /> {msg}
    </div>
  );
}

function InfoRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-gold-500">{icon}</span>
      <div className="space-y-0.5">{children}</div>
    </li>
  );
}
