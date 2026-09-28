"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { cases, regions, type RegionId } from "@/content/cases";
import { applicationOptions, type ApplicationId } from "@/content/products";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

function CaseListView({
  locale,
  industry,
  region,
}: {
  locale: string;
  industry?: string;
  region?: string;
}) {
  const common = useTranslations("common");
  const en = locale === "en";
  const industryId = industry as ApplicationId | undefined;
  const regionId = region as RegionId | undefined;
  const list = cases.filter((item) => {
    if (industryId && item.industry !== industryId) return false;
    if (regionId && item.region !== regionId) return false;
    return true;
  });

  return (
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

function CaseListFromQuery({ locale }: { locale: string }) {
  const sp = useSearchParams();
  return <CaseListView locale={locale} industry={sp.get("industry") || undefined} region={sp.get("region") || undefined} />;
}

export function CaseList({ locale }: { locale: string }) {
  return (
    <Suspense fallback={<CaseListView locale={locale} />}>
      <CaseListFromQuery locale={locale} />
    </Suspense>
  );
}
