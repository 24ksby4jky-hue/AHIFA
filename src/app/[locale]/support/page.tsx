import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { DownloadIndex } from "@/components/support/download-index";
import { faqs, warrantyPoints } from "@/content/support";
import { tx } from "@/lib/copy";

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

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations("common");
  const en = locale === "en";

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
        <DownloadIndex locale={locale} />

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
