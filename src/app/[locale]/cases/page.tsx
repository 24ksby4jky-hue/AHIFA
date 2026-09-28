import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { CaseList } from "@/components/cases/case-list";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Projects" : "工程案例",
    description:
      locale === "en"
        ? "Typical Ahifa line-ups for Southeast Asia and China, filtered by industry and region."
        : "阿海法典型成套配置，可按行业和地区筛选，东南亚项目排在前面。",
    alternates: { languages: { zh: "/zh/cases", en: "/en/cases" } },
  };
}

export default async function CasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations("common");
  const en = locale === "en";

  return (
    <>
      <PageHero
        index="03"
        kicker={en ? "PROJECTS" : "工程案例"}
        title={en ? "Line-ups, with Southeast Asia first." : "典型配置，东南亚排在前面。"}
        lede={
          en
            ? "Representative duties for buyers comparing interfaces. They are not a published client list."
            : "给采购对照接口的典型工况，不是已公开的客户名录。"
        }
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "Projects" : "工程案例" }]}
      />
      <CaseList locale={locale} />
    </>
  );
}
