import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/brand/logo";
import { company } from "@/content/company";
import { seriesList } from "@/content/products";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

const nav = [
  { href: "/products", key: "products" },
  { href: "/solutions", key: "solutions" },
  { href: "/cases", key: "cases" },
  { href: "/support", key: "support" },
  { href: "/about", key: "about" },
  { href: "/news", key: "news" },
  { href: "/contact", key: "contact" },
] as const;

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations("nav");
  const f = await getTranslations("footer");

  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo locale={locale} tone="light" />
          <p className="mt-4 max-w-sm text-[14px] leading-[22px] text-white/70">{f("blurb")}</p>
          <p className="mt-4 font-display text-[15px] text-white/90">{tx(locale, company.slogan)}</p>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-[12px] tracking-[0.16em] text-electric">{f("navigate")}</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[14px] leading-[22px] text-white/75 hover:text-white">
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[12px] tracking-[0.16em] text-electric">{f("series")}</p>
          <ul className="mt-4 space-y-2">
            {seriesList.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/products?series=${item.id}`}
                  className="text-[14px] leading-[22px] text-white/75 hover:text-white"
                >
                  <span className="mr-2 font-mono text-[12px] text-electric">{item.index}</span>
                  {tx(locale, item.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-[12px] tracking-[0.16em] text-electric">{f("contact")}</p>
          <ul className="mt-4 space-y-2 text-[14px] leading-[22px] text-white/75">
            <li>
              <a className="hover:text-white" href={company.phoneHref}>
                {company.phone}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={company.mobileHref}>
                {company.mobile}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-white"
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </li>
            <li className="pt-1 text-white/60">{tx(locale, company.address)}</li>
          </ul>
          <p className="mt-6 font-mono text-[12px] tracking-[0.16em] text-electric">{f("legal")}</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/privacy" className="text-[14px] text-white/75 hover:text-white">
                {f("privacy")}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-[14px] text-white/75 hover:text-white">
                {f("terms")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-[1180px] px-5 py-4 text-[12px] leading-[22px] tracking-wide text-white/45">
          © {new Date().getFullYear()} {f("rights")}
        </p>
      </div>
    </footer>
  );
}
