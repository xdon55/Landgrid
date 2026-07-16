import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Check,
  Calculator,
  Sparkles,
  MapPin,
  Package,
  FileText,
  User,
  Send,
} from "lucide-react";
import { SERVICES } from "../lib/data";
import PageHeader from "../components/PageHeader";

/* ---------- Quote model ---------- */
interface QuoteState {
  services: string[];
  region: string;
  areaSize: string;
  projectType: string;
  timeline: string;
  description: string;
  equipment: string[];
  deliverables: string[];
  fullName: string;
  email: string;
  phone: string;
  company: string;
  address: string;
}

const INITIAL: QuoteState = {
  services: [],
  region: "",
  areaSize: "",
  projectType: "",
  timeline: "standard",
  description: "",
  equipment: [],
  deliverables: [],
  fullName: "",
  email: "",
  phone: "",
  company: "",
  address: "",
};

const REGIONS = [
  "Kampala",
  "Wakiso",
  "Mukono",
  "Entebbe",
  "Jinja",
  "Mbarara",
  "Gulu",
  "Fort Portal",
  "Mbale",
  "Lira",
  "Western Region (Albertine)",
  "Northern Region",
  "Eastern Region",
  "Karamoja",
  "Other",
];

const AREA_SIZES = [
  { id: "xs", label: "< 1 hectare", mult: 1 },
  { id: "sm", label: "1 – 10 hectares", mult: 2.5 },
  { id: "md", label: "10 – 100 hectares", mult: 5 },
  { id: "lg", label: "100 – 1,000 hectares", mult: 12 },
  { id: "xl", label: "> 1,000 hectares", mult: 22 },
];

const PROJECT_TYPES = [
  "Urban / Residential",
  "Rural / Agricultural",
  "Industrial / Commercial",
  "Infrastructure (roads, pipelines)",
  "Mining / Quarry",
  "Environmental / Forestry",
];

const TIMELINES = [
  { id: "urgent", label: "Urgent (< 1 week)", mult: 1.4 },
  { id: "standard", label: "Standard (2 – 4 weeks)", mult: 1 },
  { id: "flexible", label: "Flexible (1+ month)", mult: 0.9 },
];

const EQUIPMENT = [
  { id: "gnss-rtk", label: "GNSS RTK Receiver (CHC i90/i80/i70/i50)" },
  { id: "total-station", label: "Total Station" },
  { id: "uav", label: "Survey Drone (UAV)" },
  { id: "slam", label: "Handheld SLAM LiDAR (LiGrip)" },
  { id: "gpr", label: "Ground Penetrating Radar" },
  { id: "level", label: "Digital Level" },
  { id: "tracking", label: "GPS Tracking Device(s)" },
];

const DELIVERABLES = [
  { id: "cad", label: "CAD Drawings (DWG/DXF)" },
  { id: "pdf-map", label: "PDF Maps & Reports" },
  { id: "shapefile", label: "GIS Shapefiles / Geodatabase" },
  { id: "ortho", label: "Orthomosaic / DSM / DTM" },
  { id: "pointcloud", label: "LiDAR Point Cloud" },
  { id: "3d-model", label: "3D Model / Mesh" },
  { id: "title-doc", label: "Ministry of Lands Title Documentation" },
];

const SERVICE_BASE: Record<string, number> = {
  cadastral: 2_500_000,
  uav: 4_000_000,
  engineering: 3_000_000,
  gis: 5_000_000,
  cors: 1_000_000,
  "gnss-sale": 0,
  tracking: 500_000,
  equipment: 1_500_000,
};

const EQUIP_ADD: Record<string, number> = {
  "gnss-rtk": 800_000,
  "total-station": 600_000,
  uav: 1_500_000,
  slam: 2_000_000,
  gpr: 1_200_000,
  level: 300_000,
  tracking: 250_000,
};

const DELIVERABLE_ADD: Record<string, number> = {
  cad: 400_000,
  "pdf-map": 200_000,
  shapefile: 500_000,
  ortho: 1_200_000,
  pointcloud: 1_500_000,
  "3d-model": 1_800_000,
  "title-doc": 350_000,
};

function computeEstimate(q: QuoteState) {
  if (q.services.length === 0) return { low: 0, high: 0, mid: 0 };
  const base = q.services.reduce((s, id) => s + (SERVICE_BASE[id] || 0), 0);
  const areaMult = AREA_SIZES.find((a) => a.id === q.areaSize)?.mult || 1;
  const timeMult = TIMELINES.find((t) => t.id === q.timeline)?.mult || 1;
  const equipSum = q.equipment.reduce((s, id) => s + (EQUIP_ADD[id] || 0), 0);
  const delSum = q.deliverables.reduce((s, id) => s + (DELIVERABLE_ADD[id] || 0), 0);
  const mid = Math.round((base * areaMult * timeMult + equipSum + delSum) / 10000) * 10000;
  return { low: Math.round(mid * 0.8 / 10000) * 10000, high: Math.round(mid * 1.25 / 10000) * 10000, mid };
}

function formatUGX(n: number) {
  if (n <= 0) return "—";
  if (n >= 1_000_000_000) return `UGX ${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `UGX ${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `UGX ${(n / 1_000).toFixed(0)}K`;
  return `UGX ${n}`;
}

const STORAGE_KEY = "lg_quote_draft";

function loadDraft(): QuoteState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...INITIAL, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

export default function QuoteBuilderPage() {
  const [state, setState] = useState<QuoteState>(() => loadDraft() || INITIAL);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

  // Persist draft
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* ignore */ }
  }, [state]);

  const estimate = useMemo(() => computeEstimate(state), [state]);

  const update = <K extends keyof QuoteState>(k: K, v: QuoteState[K]) => {
    setState((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const toggle = (key: "services" | "equipment" | "deliverables", value: string) => {
    setState((s) => ({
      ...s,
      [key]: s[key].includes(value) ? s[key].filter((v) => v !== value) : [...s[key], value],
    }));
  };

  const validateStep = (n: number): boolean => {
    const e: Record<string, string> = {};
    if (n === 1 && state.services.length === 0) e.services = "Select at least one service.";
    if (n === 2) {
      if (!state.region) e.region = "Required.";
      if (!state.areaSize) e.areaSize = "Required.";
      if (!state.projectType) e.projectType = "Required.";
    }
    if (n === 4) {
      if (!state.fullName.trim()) e.fullName = "Required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = "Valid email required.";
      if (!state.phone.trim()) e.phone = "Required.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, 5));
  };
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = () => {
    if (!validateStep(4)) return;
    setSubmitting(true);
    setTimeout(() => {
      const n = Math.floor(10000 + Math.random() * 90000);
      const quoteRef = `LGQ-${new Date().getFullYear()}-${n}`;
      try {
        const log = JSON.parse(localStorage.getItem("lg_quote_log") || "[]");
        log.push({ ref: quoteRef, estimate, state, submittedAt: new Date().toISOString() });
        localStorage.setItem("lg_quote_log", JSON.stringify(log));
        localStorage.removeItem(STORAGE_KEY);
      } catch { /* ignore */ }
      setRef(quoteRef);
      setSubmitting(false);
    }, 800);
  };

  const startOver = () => {
    setState(INITIAL);
    setStep(1);
    setRef(null);
    setErrors({});
  };

  if (ref) {
    return (
      <>
        <PageHeader
          kicker="QUOTE CONFIRMED"
          title="Thank you —"
          accent="we'll be in touch."
          crumbs={[{ label: "Quote" }, { label: "Confirmation" }]}
        />
        <section className="bg-ivory py-20">
          <div className="mx-auto max-w-2xl px-6">
            <div className="rounded-3xl border border-forest-800/10 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-100 text-forest-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="font-display mt-6 text-2xl font-extrabold text-forest-950">
                Quote request received
              </h2>
              <p className="mt-3 text-[14px] text-forest-900/70">
                A detailed quotation with itemised costs will be emailed to{" "}
                <strong className="text-forest-800">{state.email}</strong> within 24 hours.
              </p>
              <div className="mt-6 inline-block rounded-xl border border-gold-500/30 bg-gold-50 px-6 py-4">
                <div className="font-mono text-[10px] tracking-[0.3em] text-forest-600">
                  QUOTE REFERENCE
                </div>
                <div className="font-display mt-1 text-xl font-extrabold text-forest-950">{ref}</div>
              </div>
              <div className="mt-8 rounded-xl bg-forest-50 p-5 text-left">
                <div className="font-mono text-[10px] tracking-[0.3em] text-forest-600">
                  INDICATIVE RANGE
                </div>
                <div className="font-display mt-1 text-2xl font-extrabold text-forest-950">
                  {formatUGX(estimate.low)} – {formatUGX(estimate.high)}
                </div>
                <p className="mt-2 text-[12px] text-forest-900/60">
                  Final pricing confirmed after site assessment and scope review.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={startOver}
                  className="cursor-pointer rounded-full bg-forest-950 px-6 py-3 text-[13px] font-bold text-ivory"
                >
                  Build another quote
                </button>
                <Link
                  to="/contact"
                  className="rounded-full border border-forest-700 px-6 py-3 text-[13px] font-bold text-forest-800"
                >
                  Send a message
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const steps = [
    { n: 1, label: "Services", icon: Sparkles },
    { n: 2, label: "Project Scope", icon: MapPin },
    { n: 3, label: "Equipment", icon: Package },
    { n: 4, label: "Your Details", icon: User },
    { n: 5, label: "Review", icon: FileText },
  ];

  return (
    <>
      <PageHeader
        kicker="QUOTE BUILDER"
        title="Build your project quote"
        accent="in 5 minutes."
        subtitle="Answer a few questions and our wizard will generate a tailored, no-obligation estimate — you can resume your draft at any time."
        crumbs={[{ label: "Quote Builder" }]}
      />

      <section className="bg-ivory py-16">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-6 lg:grid-cols-[260px_1fr_320px] lg:px-10">
          {/* Step rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-forest-800/10 bg-white p-6">
              <div className="font-mono text-[10px] tracking-[0.3em] text-forest-600">PROGRESS</div>
              <ol className="mt-5 space-y-1">
                {steps.map((s) => (
                  <li key={s.n}>
                    <button
                      onClick={() => {
                        if (s.n < step) setStep(s.n);
                        else if (s.n === step + 1) next();
                      }}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                        step === s.n
                          ? "bg-forest-950 text-ivory"
                          : step > s.n
                            ? "text-forest-700 hover:bg-forest-100"
                            : "text-forest-400"
                      }`}
                    >
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[12px] font-bold ${
                          step === s.n
                            ? "bg-gold-500 text-forest-950"
                            : step > s.n
                              ? "bg-forest-500 text-ivory"
                              : "bg-forest-100 text-forest-500"
                        }`}
                      >
                        {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                      </span>
                      <span className="text-[13px] font-semibold">{s.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <div className="mt-6 rounded-xl bg-forest-50 p-4 text-[11.5px] text-forest-900/70">
                Your draft is saved automatically. Come back anytime to continue.
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="rounded-3xl border border-forest-800/10 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
            {step === 1 && (
              <StepBlock
                title="Which services do you need?"
                subtitle="Select all that apply. You can always add more later."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {SERVICES.map((s) => {
                    const selected = state.services.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => toggle("services", s.id)}
                        className={`group cursor-pointer rounded-2xl border-2 p-5 text-left transition-all ${
                          selected
                            ? "border-gold-500 bg-gold-50"
                            : "border-forest-100 bg-white hover:border-forest-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-mono text-[10px] tracking-[0.25em] text-forest-500">
                              {s.index}
                            </div>
                            <div className="font-display mt-1 text-[15px] font-bold text-forest-950">
                              {s.title}
                            </div>
                          </div>
                          <span
                            className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 ${
                              selected
                                ? "border-gold-500 bg-gold-500 text-white"
                                : "border-forest-200 bg-white"
                            }`}
                          >
                            {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                          </span>
                        </div>
                        <p className="mt-2 text-[12px] leading-relaxed text-forest-900/60 line-clamp-2">
                          {s.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
                {errors.services && <p className="mt-3 text-[12px] text-red-600">{errors.services}</p>}
              </StepBlock>
            )}

            {step === 2 && (
              <StepBlock title="Tell us about your project" subtitle="This helps us scope the work.">
                <div className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold text-forest-900">Region *</label>
                    <select
                      value={state.region}
                      onChange={(e) => update("region", e.target.value)}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] outline-none focus:border-gold-500 ${errors.region ? "border-red-500" : "border-forest-200"}`}
                    >
                      <option value="">Select region…</option>
                      {REGIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-bold text-forest-900">Project Area *</label>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {AREA_SIZES.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => update("areaSize", a.id)}
                          className={`cursor-pointer rounded-xl border-2 px-4 py-3 text-[13px] font-semibold transition-all ${
                            state.areaSize === a.id
                              ? "border-gold-500 bg-gold-50 text-forest-900"
                              : "border-forest-100 text-forest-700 hover:border-forest-300"
                          }`}
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-bold text-forest-900">Project Type *</label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {PROJECT_TYPES.map((p) => (
                        <button
                          key={p}
                          onClick={() => update("projectType", p)}
                          className={`cursor-pointer rounded-xl border-2 px-4 py-3 text-left text-[13px] font-semibold transition-all ${
                            state.projectType === p
                              ? "border-gold-500 bg-gold-50 text-forest-900"
                              : "border-forest-100 text-forest-700 hover:border-forest-300"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[12px] font-bold text-forest-900">Timeline</label>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {TIMELINES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => update("timeline", t.id)}
                          className={`cursor-pointer rounded-xl border-2 px-4 py-3 text-[12px] font-semibold transition-all ${
                            state.timeline === t.id
                              ? "border-gold-500 bg-gold-50 text-forest-900"
                              : "border-forest-100 text-forest-700 hover:border-forest-300"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[12px] font-bold text-forest-900">
                      Project Brief (optional)
                    </label>
                    <textarea
                      rows={4}
                      value={state.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Describe the project — deliverables, constraints, known site conditions…"
                      className="w-full resize-none rounded-xl border border-forest-200 bg-white px-4 py-3 text-[14px] outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              </StepBlock>
            )}

            {step === 3 && (
              <StepBlock
                title="Equipment & deliverables"
                subtitle="Optional — helps us refine the estimate."
              >
                <div className="space-y-7">
                  <div>
                    <label className="mb-2 block text-[12px] font-bold text-forest-900">
                      Instruments Required
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {EQUIPMENT.map((eq) => (
                        <CheckPill
                          key={eq.id}
                          checked={state.equipment.includes(eq.id)}
                          onClick={() => toggle("equipment", eq.id)}
                          label={eq.label}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-[12px] font-bold text-forest-900">
                      Deliverables
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {DELIVERABLES.map((d) => (
                        <CheckPill
                          key={d.id}
                          checked={state.deliverables.includes(d.id)}
                          onClick={() => toggle("deliverables", d.id)}
                          label={d.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </StepBlock>
            )}

            {step === 4 && (
              <StepBlock title="Your contact details" subtitle="Where should we send the quote?">
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField label="Full Name *" value={state.fullName} onChange={(v) => update("fullName", v)} error={errors.fullName} />
                  <InputField label="Email *" value={state.email} onChange={(v) => update("email", v)} error={errors.email} type="email" />
                  <InputField label="Phone *" value={state.phone} onChange={(v) => update("phone", v)} error={errors.phone} type="tel" />
                  <InputField label="Company" value={state.company} onChange={(v) => update("company", v)} />
                  <div className="sm:col-span-2">
                    <InputField label="Address / Site Location" value={state.address} onChange={(v) => update("address", v)} />
                  </div>
                </div>
              </StepBlock>
            )}

            {step === 5 && (
              <StepBlock title="Review your quote request" subtitle="Confirm the details before submission.">
                <div className="space-y-5 text-[13.5px]">
                  <SummaryRow label="Services">
                    {state.services.map((id) => SERVICES.find((s) => s.id === id)?.title).join(", ") || "—"}
                  </SummaryRow>
                  <SummaryRow label="Region">{state.region || "—"}</SummaryRow>
                  <SummaryRow label="Area">
                    {AREA_SIZES.find((a) => a.id === state.areaSize)?.label || "—"}
                  </SummaryRow>
                  <SummaryRow label="Project Type">{state.projectType || "—"}</SummaryRow>
                  <SummaryRow label="Timeline">
                    {TIMELINES.find((t) => t.id === state.timeline)?.label || "—"}
                  </SummaryRow>
                  <SummaryRow label="Equipment">
                    {state.equipment.map((id) => EQUIPMENT.find((e) => e.id === id)?.label).join(", ") || "—"}
                  </SummaryRow>
                  <SummaryRow label="Deliverables">
                    {state.deliverables.map((id) => DELIVERABLES.find((d) => d.id === id)?.label).join(", ") || "—"}
                  </SummaryRow>
                  <SummaryRow label="Contact">
                    {state.fullName} · {state.email} · {state.phone}
                  </SummaryRow>
                </div>
              </StepBlock>
            )}

            {/* Nav */}
            <div className="mt-10 flex items-center justify-between gap-3">
              <button
                onClick={back}
                disabled={step === 1}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-forest-200 px-5 py-3 text-[13px] font-bold text-forest-800 transition-colors hover:bg-forest-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>
              {step < 5 ? (
                <button
                  onClick={next}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-forest-950 px-6 py-3 text-[13px] font-bold text-ivory transition-colors hover:bg-gold-500 hover:text-forest-950"
                >
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={submitting}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gold-500 px-7 py-3 text-[13px] font-bold text-forest-950 transition-all hover:bg-gold-400 disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : <>Submit Request <Send className="h-4 w-4" /></>}
                </button>
              )}
            </div>
          </div>

          {/* Estimate sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl bg-forest-950 p-6 text-ivory">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-gold-500" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-gold-400">
                  INDICATIVE ESTIMATE
                </span>
              </div>
              <div className="mt-4 font-display text-2xl font-extrabold text-gold-gradient">
                {estimate.mid > 0
                  ? `${formatUGX(estimate.low)} – ${formatUGX(estimate.high)}`
                  : "Select services"}
              </div>
              <p className="mt-2 text-[11.5px] text-forest-100/60">
                Final pricing confirmed after site assessment. VAT exclusive.
              </p>

              <div className="mt-6 space-y-2 border-t border-forest-800 pt-5 text-[12px]">
                <Mini label="Services" value={state.services.length.toString()} />
                <Mini label="Area" value={AREA_SIZES.find((a) => a.id === state.areaSize)?.label || "—"} />
                <Mini label="Instruments" value={state.equipment.length.toString()} />
                <Mini label="Deliverables" value={state.deliverables.length.toString()} />
              </div>

              <div className="mt-6 rounded-xl bg-gold-500/10 p-4">
                <div className="font-display text-[12px] font-bold text-gold-400">
                  Step {step} of 5
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-forest-800">
                  <div
                    className="h-full rounded-full bg-gold-500 transition-all duration-500"
                    style={{ width: `${(step / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ---------- Sub-components ---------- */
function StepBlock({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-extrabold text-forest-950">{title}</h2>
      {subtitle && <p className="mt-1 text-[13.5px] text-forest-900/60">{subtitle}</p>}
      <div className="mt-7">{children}</div>
    </div>
  );
}

function CheckPill({ checked, onClick, label }: { checked: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-[12.5px] font-semibold transition-all ${
        checked
          ? "border-gold-500 bg-gold-50 text-forest-900"
          : "border-forest-100 text-forest-700 hover:border-forest-300"
      }`}
    >
      <span
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 ${
          checked ? "border-gold-500 bg-gold-500 text-white" : "border-forest-200 bg-white"
        }`}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      {label}
    </button>
  );
}

function InputField({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-bold text-forest-900">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] outline-none focus:border-gold-500 ${error ? "border-red-500" : "border-forest-200"}`}
      />
      {error && <p className="mt-1 text-[11.5px] text-red-600">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 border-b border-forest-100 pb-3 last:border-0">
      <div className="w-32 shrink-0 font-mono text-[10px] tracking-[0.25em] text-forest-500">
        {label.toUpperCase()}
      </div>
      <div className="flex-1 text-[13.5px] text-forest-900">{children}</div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-forest-300/70">{label}</span>
      <span className="font-semibold text-ivory">{value}</span>
    </div>
  );
}
