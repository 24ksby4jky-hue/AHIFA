"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { downloadTypes, downloads, type DownloadItem } from "@/content/support";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

function DownloadIndexView({ locale, type }: { locale: string; type?: string }) {
  const common = useTranslations("common");
  const cta = useTranslations("cta");
  const en = locale === "en";
  const fileType = type as DownloadItem["type"] | undefined;
  const files = downloads.filter((item) => !fileType || item.type === fileType);

  return (
    <section id="downloads">
      <h2 className="text-[32px] leading-[40px] font-semibold text-navy-900">{en ? "Document index" : "资料目录"}</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {downloadTypes.map((item) => {
          const active = (item.id === "all" && !type) || item.id === type;
          const href = item.id === "all" ? "/support" : `/support?type=${item.id}`;
          return (
            <Link
              key={item.id}
              href={href}
              className={
                active
                  ? "chamfer-sm bg-navy-900 px-3 py-2 text-[13px] text-white"
                  : "chamfer-sm border border-line px-3 py-2 text-[13px]"
              }
            >
              {tx(locale, item.label)}
            </Link>
          );
        })}
      </div>
      {files.length === 0 ? (
        <p className="mt-6 border border-dashed border-line bg-canvas px-5 py-8">
          {en ? "No files in this group." : "这一类下面还没有文件。"}
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {files.map((file) => (
            <li key={file.id} className="grid gap-3 py-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="font-mono text-[12px] text-action">{file.meta}</p>
                <h3 className="mt-1 text-[18px] text-navy-900">{tx(locale, file.title)}</h3>
                <p className="mt-1 text-[14px] leading-[22px] text-muted-ink">{tx(locale, file.note)}</p>
              </div>
              <Link
                href={file.product ? `/contact?product=${file.product}&intent=file` : "/contact?intent=file"}
                className="text-[14px] text-action"
              >
                {cta("requestFile")}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-[13px] leading-[22px] text-muted-ink">{common("filesNote")}</p>
    </section>
  );
}

function DownloadIndexFromQuery({ locale }: { locale: string }) {
  const sp = useSearchParams();
  return <DownloadIndexView locale={locale} type={sp.get("type") || undefined} />;
}

export function DownloadIndex({ locale }: { locale: string }) {
  return (
    <Suspense fallback={<DownloadIndexView locale={locale} />}>
      <DownloadIndexFromQuery locale={locale} />
    </Suspense>
  );
}
