import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandButton } from "@/components/brand/brand-button";
import { PageHero } from "@/components/brand/page-hero";
import { getProduct } from "@/content/products";
import { getCase } from "@/content/cases";
import { getSolution, solutions } from "@/content/solutions";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { tx } from "@/lib/copy";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => solutions.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getSolution(slug);
  if (!item) return {};
  return {
    title: tx(locale, item.title),
    description: tx(locale, item.summary),
    alternates: { languages: { zh: `/zh/solutions/${slug}`, en: `/en/solutions/${slug}` } },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = getSolution(slug);
  if (!item) notFound();
  const common = await getTranslations("common");
  const en = locale === "en";
  const recommended = item.products.map((id) => getProduct(id)).filter(Boolean);
  const relatedCases = item.cases.map((id) => getCase(id)).filter(Boolean);

  return (
    <>
      <PageHero
        index={item.index}
        kicker={en ? "SOLUTION" : "方案"}
        title={tx(locale, item.title)}
        lede={tx(locale, item.summary)}
        crumbs={[
          { href: "/", label: common("home") },
          { href: "/solutions", label: en ? "Solutions" : "解决方案" },
          { label: tx(locale, item.title) },
        ]}
      />
      <article className="mx-auto max-w-[1180px] px-5 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="font-mono text-[12px] tracking-[0.16em] text-action">{en ? "THE ROOM" : "行业条件"}</h2>
            {item.challenge.map((paragraph) => (
              <p key={paragraph.zh} className="mt-3 text-[16px] leading-[26px]">
                {tx(locale, paragraph)}
              </p>
            ))}
          </section>
          <section>
            <h2 className="font-mono text-[12px] tracking-[0.16em] text-action">{en ? "THE SCHEME" : "我们的方案"}</h2>
            {item.approach.map((paragraph) => (
              <p key={paragraph.zh} className="mt-3 text-[16px] leading-[26px]">
                {tx(locale, paragraph)}
              </p>
            ))}
            <ul className="mt-4 space-y-2">
              {item.composition.map((line, index) => (
                <li key={line.zh} className="flex gap-3 border border-line px-3 py-2">
                  <span className="font-mono text-[12px] text-action">{String(index + 1).padStart(2, "0")}</span>
                  {tx(locale, line)}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <section className="mt-12">
          <h2 className="text-[22px] leading-[30px] font-semibold text-navy-900">{en ? "Recommended equipment" : "推荐产品"}</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {recommended.map((product) =>
              product ? (
                <li key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="block border border-line px-4 py-3 hover:border-action">
                    <span className="font-mono text-[12px] text-action">{product.model}</span>
                    <span className="mt-1 block text-navy-900">{tx(locale, product.name)}</span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </section>
        <section className="mt-10">
          <h2 className="text-[22px] leading-[30px] font-semibold text-navy-900">{en ? "Related line-ups" : "相关配置"}</h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedCases.map((project) =>
              project ? (
                <li key={project.slug}>
                  <Link href={`/cases/${project.slug}`} className="block border border-line px-4 py-3 hover:border-action">
                    <span className="font-mono text-[12px] text-action">{project.region}</span>
                    <span className="mt-1 block text-navy-900">{tx(locale, project.title)}</span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </section>
        <div className="mt-10">
          <BrandButton href="/contact">{en ? "Request a quote" : "获取报价"}</BrandButton>
        </div>
      </article>
    </>
  );
}
