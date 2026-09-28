import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { solutions } from "@/content/solutions";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Solutions" : "解决方案",
    description:
      locale === "en"
        ? "Switchgear schemes for utility networks, plants, solar yards, buildings, and mining."
        : "面向电网、厂房、新能源、楼宇和矿山冶金的成套方案。",
    alternates: { languages: { zh: "/zh/solutions", en: "/en/solutions" } },
  };
}

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations("common");
  const en = locale === "en";

  return (
    <>
      <PageHero
        index="02"
        kicker={en ? "SOLUTIONS" : "解决方案"}
        title={en ? "Five industries, written as schemes." : "五个行业，写成可执行的方案。"}
        lede={
          en
            ? "Each page states the room, the lineup, and the products that belong in it. It is not a single generic solutions paragraph."
            : "每一页写清房间条件、系统构成和对应产品，而不是一段放之四海的方案说明。"
        }
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "Solutions" : "解决方案" }]}
      />
      <ul className="mx-auto grid max-w-[1180px] gap-4 px-5 py-12 md:grid-cols-2">
        {solutions.map((item) => (
          <li key={item.slug}>
            <Link href={`/solutions/${item.slug}`} className="chamfer flex h-full flex-col border border-line p-5 hover:border-action">
              <span className="font-mono text-[12px] tracking-[0.16em] text-action">{item.index}</span>
              <h2 className="mt-4 text-[22px] leading-[30px] font-semibold text-navy-900">{tx(locale, item.title)}</h2>
              <p className="mt-3 text-[15px] leading-[24px] text-muted-ink">{tx(locale, item.summary)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
