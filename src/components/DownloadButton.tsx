import { useState } from "react";
import { Download, Loader2, Check } from "lucide-react";
import { generateProfilePDF } from "../lib/generateProfilePDF";
import { cn } from "../utils/cn";

export default function DownloadButton({
  variant = "solid",
  label = "Download Company Profile",
  className,
}: {
  variant?: "solid" | "outline";
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  const handleClick = async () => {
    if (state === "busy") return;
    setState("busy");
    try {
      await generateProfilePDF();
      setState("done");
      setTimeout(() => setState("idle"), 2600);
    } catch (e) {
      console.error(e);
      setState("idle");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={state === "busy"}
      className={cn(
        "group relative inline-flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-full px-6 py-3 text-[13px] font-semibold tracking-wide transition-all duration-500",
        variant === "solid"
          ? "bg-gold-500 text-forest-950 hover:bg-gold-400 hover:shadow-[0_10px_40px_-8px_rgba(212,162,76,0.6)]"
          : "border border-gold-500/50 text-gold-400 hover:border-gold-400 hover:bg-gold-500/10",
        state === "busy" && "cursor-wait",
        className,
      )}
    >
      {state === "busy" ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : state === "done" ? (
        <Check className="h-4 w-4" />
      ) : (
        <Download className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5" />
      )}
      <span className="font-display">
        {state === "busy" ? "Preparing PDF…" : state === "done" ? "Profile downloaded" : label}
      </span>
      <span className="font-mono text-[9px] opacity-60">PDF</span>
    </button>
  );
}
