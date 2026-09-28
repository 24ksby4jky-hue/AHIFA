import { cn } from "cn";
import { company } from "@/content/company";
import { tx } from "@/lib/copy";

export function Logo({
  locale,
  tone = "light",
  className,
}: {
  locale: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const onDark = tone === "light";
  return (
    <span className={cn("inline-flex items-center gap-3 py-1 pr-2", className)}>
      <span
        aria-hidden
        className={cn("h-9 w-[3px]", onDark ? "bg-electric" : "bg-action")}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[18px] font-semibold tracking-[0.16em]",
            onDark ? "text-white" : "text-navy-900",
          )}
        >
          {company.mark}
        </span>
        <span
          className={cn(
            "mt-1 text-[11px] tracking-[0.12em]",
            onDark ? "text-white/70" : "text-muted-ink",
          )}
        >
          {tx(locale, company.shortName)}
        </span>
      </span>
    </span>
  );
}
