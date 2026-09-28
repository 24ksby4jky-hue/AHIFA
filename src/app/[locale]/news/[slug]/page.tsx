import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { getNews, news } from "@/content/news";
import { routing } from "@/i18n/routing";
import { tx } from "@/lib/copy";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => news.map((item) => ({ locale, slug: item.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getNews(slug);
  if (!item) return {};
  return {
    title: tx(locale, item.title),
    description: tx(locale, item.summary),
    alternates: { languages: { zh: `/zh/news/${slug}`, en: `/en/news/${slug}` } },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const item = getNews(slug);
  if (!item) notFound();
  const common = await getTranslations("common");
  const en = locale === "en";

  return (
    <>
      <PageHero
        index={item.date}
        kicker={item.category === "company" ? (en ? "COMPANY" : "公司新闻") : en ? "INDUSTRY" : "行业动态"}
        title={tx(locale, item.title)}
        lede={tx(locale, item.summary)}
        crumbs={[
          { href: "/", label: common("home") },
          { href: "/news", label: en ? "News" : "新闻" },
          { label: tx(locale, item.title) },
        ]}
      />
      <article className="mx-auto max-w-[760px] px-5 py-12">
        {item.blocks.map((block, index) => {
          if (block.type === "h") {
            return (
              <h2 key={index} className="mt-10 text-[22px] leading-[30px] font-semibold text-navy-900">
                {tx(locale, block.text)}
              </h2>
            );
          }
          if (block.type === "quote") {
            return (
              <blockquote key={index} className="mt-8 border-l-2 border-action pl-4 text-[18px] leading-[30px] text-navy-900">
                {tx(locale, block.text)}
              </blockquote>
            );
          }
          return (
            <p key={index} className="mt-4 text-[16px] leading-[26px] text-ink">
              {tx(locale, block.text)}
            </p>
          );
        })}
      </article>
    </>
  );
}
