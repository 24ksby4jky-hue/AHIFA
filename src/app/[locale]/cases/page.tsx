import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { cases, regions, type RegionId } from "@/content/cases";
import { applicationOptions, type ApplicationId } from "@/content/products";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

type Search = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

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

export default async function CasesPage({
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
  const industry = one(sp.industry) as ApplicationId | undefined;
  const region = one(sp.region) as RegionId | undefined;
  const list = cases.filter((item) => {
    if (industry && item.industry !== industry) return false;
    if (region && item.region !== region) return false;
    return true;
  });

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
      <div className="mx-auto max-w-[1180px] px-5 py-10">
        <div className="flex flex-wrap gap-2">
          <Filter href="/cases" active={!industry && !region} label={common("all")} />
          {applicationOptions.map((item) => (
            <Filter
              key={item.id}
              href={`/cases?industry=${item.id}`}
              active={industry === item.id && !region}
              label={tx(locale, item.label)}
            />
          ))}
          {regions.map((item) => (
            <Filter
              key={item.id}
              href={`/cases?region=${item.id}`}
              active={region === item.id && !industry}
              label={tx(locale, item.label)}
            />
          ))}
        </div>
        {list.length === 0 ? (
          <p className="mt-10 border border-dashed border-line bg-canvas px-5 py-10 text-[16px] leading-[26px]">
            {en ? "No line-up matches this filter." : "这个筛选下没有配置。"}
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {list.map((item) => (
              <li key={item.slug}>
                <Link href={`/cases/${item.slug}`} className="chamfer block h-full border border-line p-5 hover:border-action">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[28px] leading-none text-navy-900">{item.region}</span>
                    <span className="font-mono text-[12px] text-action">{item.sea ? "SEA" : "CN"}</span>
                  </div>
                  <h2 className="mt-4 text-[22px] leading-[30px] font-semibold text-navy-900">{tx(locale, item.title)}</h2>
                  <p className="mt-2 text-[14px] text-muted-ink">{tx(locale, item.place)}</p>
                  <p className="mt-3 text-[15px] leading-[24px]">{tx(locale, item.summary)}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function Filter({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={
        active
          ? "chamfer-sm bg-navy-900 px-3 py-2 text-[13px] text-white"
          : "chamfer-sm border border-line px-3 py-2 text-[13px] text-navy-900"
      }
      aria-current={active ? "true" : undefined}
    >
      {label}
    </Link>
  );
}
