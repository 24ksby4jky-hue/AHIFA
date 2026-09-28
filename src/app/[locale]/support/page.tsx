import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { downloadTypes, downloads, faqs, warrantyPoints, type DownloadItem } from "@/content/support";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

type Search = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Support" : "服务支持",
    description:
      locale === "en"
        ? "Selection notes, arrangement drawings, warranty terms, and questions for Ahifa switchgear."
        : "选型手册、布置图纸、质保说明和常见问题。",
    alternates: { languages: { zh: "/zh/support", en: "/en/support" } },
  };
}

export default async function SupportPage({
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
  const cta = await getTranslations("cta");
  const en = locale === "en";
  const type = one(sp.type) as DownloadItem["type"] | undefined;
  const files = downloads.filter((item) => !type || item.type === type);

  return (
    <>
      <PageHero
        index="04"
        kicker={en ? "SUPPORT" : "服务支持"}
        title={en ? "Documents, warranty, and the questions buyers actually ask." : "资料、质保，以及采购真正会问的问题。"}
        lede={
          en
            ? "Drawings and manuals are requested against a model. Warranty months stay in the contract, not in a slogan."
            : "图纸和手册按型号索取。质保月数写在合同里，不写成一句广告。"
        }
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "Support" : "服务支持" }]}
      />
      <div className="mx-auto max-w-[1180px] px-5 py-12">
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

        <section id="warranty" className="mt-16">
          <h2 className="text-[32px] leading-[40px] font-semibold text-navy-900">{en ? "Warranty" : "售后与质保"}</h2>
          <ul className="mt-6 space-y-3">
            {warrantyPoints.map((point, index) => (
              <li key={point.zh} className="flex gap-3 border border-line px-4 py-3">
                <span className="font-mono text-[12px] text-action">{String(index + 1).padStart(2, "0")}</span>
                <span>{tx(locale, point)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="mt-16">
          <h2 className="text-[32px] leading-[40px] font-semibold text-navy-900">{en ? "Questions" : "常见问题"}</h2>
          <div className="mt-6 divide-y divide-line border-y border-line">
            {faqs.map((item) => (
              <details key={item.q.zh} className="group py-4">
                <summary className="cursor-pointer list-none text-[18px] text-navy-900">
                  <span className="mr-3 font-mono text-[12px] text-action">Q</span>
                  {tx(locale, item.q)}
                </summary>
                <p className="mt-3 pl-6 text-[16px] leading-[26px] text-ink">{tx(locale, item.a)}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
