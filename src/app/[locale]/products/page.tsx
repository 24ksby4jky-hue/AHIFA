import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { ProductCatalog } from "@/components/products/product-catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Products" : "产品中心";
  const description =
    locale === "en"
      ? "HV switchgear, LV assemblies, transformers, PV grid cabinets, and compact substations from Ahifa in Hengli."
      : "阿海法电气产品：高压成套、低压成套、变压器、光伏并网柜与箱式变电站。";
  return {
    title,
    description,
    alternates: { languages: { zh: "/zh/products", en: "/en/products" } },
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations("common");
  const en = locale === "en";

  return (
    <>
      <PageHero
        index="01"
        kicker={en ? "PRODUCTS" : "产品中心"}
        title={en ? "Equipment, listed by duty." : "按电压和应用列出的设备。"}
        lede={
          en
            ? "Filter by voltage, application, or range. Ratings on each page are catalogue ranges. The quotation locks the actual build."
            : "可按电压、应用或系列筛选。页面上的额定值是样本范围，最终配置以报价单为准。"
        }
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "Products" : "产品" }]}
      />
      <ProductCatalog locale={locale} />
    </>
  );
}
