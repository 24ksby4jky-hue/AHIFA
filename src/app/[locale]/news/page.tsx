import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { NewsList } from "@/components/news/news-list";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "News" : "新闻",
    description: locale === "en" ? "Plant notes and field notes from Ahifa Electric." : "阿海法电气的公司新闻与行业笔记。",
    alternates: { languages: { zh: "/zh/news", en: "/en/news" } },
  };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations("common");
  const en = locale === "en";

  return (
    <>
      <PageHero
        index="06"
        kicker={en ? "NEWS" : "新闻"}
        title={en ? "Notes from the plant and the field." : "工厂和现场的笔记。"}
        lede={
          en
            ? "Company notes describe how Hengli builds. Industry notes describe how to specify the gear."
            : "公司新闻写横沥怎么做柜子。行业笔记写采购该怎么提条件。"
        }
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "News" : "新闻" }]}
      />
      <NewsList locale={locale} />
    </>
  );
}
