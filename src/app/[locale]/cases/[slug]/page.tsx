import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandButton } from "@/components/brand/brand-button";
import { PageHero } from "@/components/brand/page-hero";
import { cases, getCase, regions } from "@/content/cases";
import { applicationOptions, getProduct } from "@/content/products";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { tx } from "@/lib/copy";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => cases.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  return {
    title: tx(locale, item.title),
    description: tx(locale, item.summary),
    alternates: { languages: { zh: `/zh/cases/${slug}`, en: `/en/cases/${slug}` } },
  };
}

export default async function CasePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = getCase(slug);
  if (!item) notFound();
  const common = await getTranslations("common");
  const en = locale === "en";
  const region = regions.find((entry) => entry.id === item.region);
  const industry = applicationOptions.find((entry) => entry.id === item.industry);
  const used = item.products.map((id) => getProduct(id)).filter(Boolean);

  return (
    <>
      <PageHero
        index={item.region}
        kicker={en ? "LINE-UP" : "典型配置"}
        title={tx(locale, item.title)}
        lede={tx(locale, item.summary)}
        crumbs={[
          { href: "/", label: common("home") },
          { href: "/cases", label: en ? "Projects" : "工程案例" },
          { label: tx(locale, item.place) },
        ]}
      />
      <article className="mx-auto max-w-[1180px] px-5 py-12">
        <dl className="grid border border-line sm:grid-cols-3">
          <Info label={en ? "Place" : "地点"} value={tx(locale, item.place)} />
          <Info label={en ? "Region" : "地区"} value={region ? tx(locale, region.label) : item.region} />
          <Info label={en ? "Industry" : "行业"} value={industry ? tx(locale, industry.label) : item.industry} />
        </dl>
        <h2 className="mt-10 text-[22px] leading-[30px] font-semibold text-navy-900">{en ? "Scope" : "范围"}</h2>
        <ul className="mt-4 space-y-3">
          {item.scope.map((line, index) => (
            <li key={line.zh} className="flex gap-3">
              <span className="font-mono text-[12px] text-action">{String(index + 1).padStart(2, "0")}</span>
              <span>{tx(locale, line)}</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-10 text-[22px] leading-[30px] font-semibold text-navy-900">{en ? "Equipment" : "所用设备"}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {used.map((product) =>
            product ? (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`} className="block border border-line px-4 py-3 hover:border-action">
                  <span className="font-mono text-[12px] text-action">{product.model}</span>
                  <span className="mt-1 block">{tx(locale, product.name)}</span>
                </Link>
              </li>
            ) : null,
          )}
        </ul>
        <div className="mt-10">
          <BrandButton href="/contact">{en ? "Request a similar quote" : "按此配置询价"}</BrandButton>
        </div>
      </article>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line px-4 py-3 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <dt className="font-mono text-[12px] tracking-[0.12em] text-muted-ink">{label}</dt>
      <dd className="mt-1 text-navy-900">{value}</dd>
    </div>
  );
}
