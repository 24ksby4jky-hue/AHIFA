"use client";

import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Logo } from "@/components/brand/logo";
import { BrandButton } from "@/components/brand/brand-button";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "cn";

const links = [
  { href: "/products", key: "products" },
  { href: "/solutions", key: "solutions" },
  { href: "/cases", key: "cases" },
  { href: "/support", key: "support" },
  { href: "/about", key: "about" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const cta = useTranslations("cta");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900 text-white">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center gap-4 px-5">
        <Link href="/" className="shrink-0" aria-label="AHIFA">
          <Logo locale={locale} tone="light" />
        </Link>
        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-2.5 py-2 text-[14px] leading-[22px] text-white/75 hover:text-white",
                  active && "text-white",
                )}
                aria-current={active ? "page" : undefined}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <LanguageSwitch />
          <BrandButton href="/contact" className="hidden sm:inline-flex">
            {cta("quote")}
          </BrandButton>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white lg:hidden"
                aria-label={t("menu")}
              >
                <Menu strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[min(100%,22rem)] border-l border-white/10 bg-navy-900 text-white"
            >
              <SheetHeader className="border-b border-white/10 px-5 py-5 text-left">
                <SheetTitle className="font-display text-white tracking-[0.14em]">AHIFA</SheetTitle>
                <SheetDescription className="text-white/60">
                  {locale === "en" ? "Hengli, Dongguan" : "东莞横沥"}
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col px-3 py-4" aria-label="Mobile">
                {links.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="border-b border-white/10 px-2 py-3 text-[16px] leading-[26px] text-white"
                    >
                      {t(item.key)}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto px-5 pb-8">
                <SheetClose asChild>
                  <BrandButton href="/contact" className="w-full">
                    {cta("quote")}
                  </BrandButton>
                </SheetClose>
              </div>
              <SheetClose
                className="absolute top-4 right-4 inline-flex size-9 items-center justify-center text-white"
                aria-label={t("close")}
              >
                <X strokeWidth={1.5} />
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function LanguageSwitch() {
  const pathname = usePathname();
  const locale = useLocale();
  return (
    <div className="flex items-center font-mono text-[12px] tracking-[0.14em]">
      <Link
        href={pathname}
        locale="zh"
        hrefLang="zh"
        className={cn("px-1.5 py-2", locale === "zh" ? "text-white" : "text-white/45 hover:text-white")}
        aria-current={locale === "zh" ? "true" : undefined}
      >
        中文
      </Link>
      <span className="text-electric" aria-hidden>
        /
      </span>
      <Link
        href={pathname}
        locale="en"
        hrefLang="en"
        className={cn("px-1.5 py-2", locale === "en" ? "text-white" : "text-white/45 hover:text-white")}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
