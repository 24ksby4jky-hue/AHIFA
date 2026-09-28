import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { news } from "@/content/news";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

type Search = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "News" : "新闻",
    description: locale === "en" ? "Plant notes and field notes from Ahifa Electric." : "阿海法电气的公司新闻与行业笔记。",
    alternates: { languages: { zh: "/zh/news", en: "/en/news" } },
  };
}

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Search>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const common = await getTranslations("common");
  const en = locale === "en";
  const category = one(sp.category);
  const list = news.filter((item) => !category || item.category === category);

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
      <div className="mx-auto max-w-[1180px] px-5 py-10">
        <div className="flex flex-wrap gap-2">
          {[
            ["", en ? "All" : "全部"],
            ["company", en ? "Company" : "公司新闻"],
            ["industry", en ? "Industry" : "行业动态"],
          ].map(([id, label]) => {
            const active = (id === "" && !category) || category === id;
            return (
              <Link
                key={label}
                href={id ? `/news?category=${id}` : "/news"}
                className={
                  active
                    ? "chamfer-sm bg-navy-900 px-3 py-2 text-[13px] text-white"
                    : "chamfer-sm border border-line px-3 py-2 text-[13px]"
                }
              >
                {label}
              </Link>
            );
          })}
        </div>
        {list.length === 0 ? (
          <p className="mt-8 border border-dashed border-line bg-canvas px-5 py-10">
            {en ? "No notes in this category." : "这个分类下还没有文章。"}
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {list.map((item) => (
              <li key={item.slug}>
                <Link href={`/news/${item.slug}`} className="block py-6">
                  <p className="font-mono text-[12px] text-action tabular">
                    {item.date} · {item.category === "company" ? (en ? "COMPANY" : "公司") : en ? "INDUSTRY" : "行业"}
                  </p>
                  <h2 className="mt-2 text-[22px] leading-[30px] font-semibold text-navy-900">{tx(locale, item.title)}</h2>
                  <p className="mt-2 max-w-3xl text-[15px] leading-[24px] text-muted-ink">{tx(locale, item.summary)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
