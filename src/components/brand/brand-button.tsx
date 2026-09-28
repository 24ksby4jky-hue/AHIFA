import type { ReactNode } from "react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const styles = {
  solid:
    "chamfer-sm h-11 border-0 bg-action px-5 text-[14px] tracking-wide text-white hover:bg-navy-700",
  outline:
    "chamfer-sm h-11 border border-white/50 bg-transparent px-5 text-[14px] tracking-wide text-white hover:border-electric hover:bg-white/5",
  outlineDark:
    "chamfer-sm h-11 border border-navy-900 bg-transparent px-5 text-[14px] tracking-wide text-navy-900 hover:border-action hover:text-action",
  ghost:
    "h-11 bg-transparent px-3 text-[14px] text-white hover:bg-white/10 hover:text-white",
} as const;

export function BrandButton({
  href,
  children,
  variant = "solid",
  className,
  type = "button",
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = cn(styles[variant], className);
  if (href) {
    return (
      <Button asChild className={classes}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }
  return (
    <Button type={type} disabled={disabled} className={classes}>
      {children}
    </Button>
  );
}
