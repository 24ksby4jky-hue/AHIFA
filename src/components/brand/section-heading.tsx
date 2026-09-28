import { cn } from "cn";

export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  tone = "dark",
  className,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <div className={cn("max-w-2xl", className)}>
      {(index || eyebrow) && (
        <p
          className={cn(
            "font-mono text-[12px] tracking-[0.18em]",
            light ? "text-electric" : "text-action",
          )}
        >
          {index ? `${index}` : ""}
          {index && eyebrow ? "  /  " : ""}
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 text-[32px] leading-[40px] font-semibold",
          light ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-3 text-[16px] leading-[26px]",
            light ? "text-white/75" : "text-muted-ink",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
