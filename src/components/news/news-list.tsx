"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { news } from "@/content/news";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

function NewsListView({ locale, category }: { locale: string; category?: string }) {
  const en = locale === "en";
  const list = news.filter((item) => !category || item.category === category);

  return (
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
  );
}

function NewsListFromQuery({ locale }: { locale: string }) {
  const sp = useSearchParams();
  return <NewsListView locale={locale} category={sp.get("category") || undefined} />;
}

export function NewsList({ locale }: { locale: string }) {
  return (
    <Suspense fallback={<NewsListView locale={locale} />}>
      <NewsListFromQuery locale={locale} />
    </Suspense>
  );
}
