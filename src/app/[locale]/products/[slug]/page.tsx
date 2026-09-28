import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { ProductDetail } from "@/components/products/product-detail";
import { getProduct, products } from "@/content/products";
import { routing } from "@/i18n/routing";
import { tx } from "@/lib/copy";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => products.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "AHIFA" };
  const title = `${product.model} ${tx(locale, product.name)}`;
  return {
    title,
    description: tx(locale, product.summary),
    alternates: {
      languages: {
        zh: `/zh/products/${slug}`,
        en: `/en/products/${slug}`,
      },
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();
  const common = await getTranslations("common");
  const en = locale === "en";

  return (
    <>
      <PageHero
        index={product.model}
        kicker={en ? "PRODUCT" : "产品"}
        title={tx(locale, product.name)}
        lede={tx(locale, product.summary)}
        crumbs={[
          { href: "/", label: common("home") },
          { href: "/products", label: en ? "Products" : "产品" },
          { label: product.model },
        ]}
      />
      <div className="mx-auto max-w-[1180px] px-5 py-12">
        <ProductDetail locale={locale} product={product} />
      </div>
    </>
  );
}
