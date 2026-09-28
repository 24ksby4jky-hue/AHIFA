import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { company } from "@/content/company";
import { tx } from "@/lib/copy";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Terms of use" : "使用条款",
    alternates: { languages: { zh: "/zh/terms", en: "/en/terms" } },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations("common");
  const en = locale === "en";
  const sections = en
    ? [
        ["Catalogue, not an offer", "Ratings, widths, and arrangements on this site are catalogue ranges. A binding offer is the quotation issued by Ahifa against your duty. Nothing here is an online shop."],
        ["Drawings", "Sketches show compartments. Approved general arrangements and schematics are issued after the selection is agreed. Do not build a foundation from a sketch on this site."],
        ["Projects shown", "Project pages are typical line-ups for Southeast Asia and China. They are not a list of named customers."],
        ["Standards", "Standard numbers describe the design basis. They are not a claim that a certificate has been checked, until the scan is on file."],
        ["Use of the site", `You may read and share links. You may not copy the pages and present them as another maker’s catalogue. ${tx(locale, company.legalName)}.`],
      ]
    : [
        ["样本不是要约", "本站的额定值、柜宽和布置是样本范围。有约束力的报价是阿海法按您的工况发出的报价单。这里不能下单，也不能付款。"],
        ["图纸", "结构示意只说明隔室。确认后的布置图和二次原理在选型确定后出具。不要按网页上的示意图浇基础。"],
        ["案例页", "案例页是面向东南亚和国内的典型配置，不是具名客户名单。"],
        ["标准", "标准号说明设计依据。在证书扫描件归档之前，不表示该证书已经核验。"],
        ["使用", `可以阅读和转发链接。不得把这些页面改头换面当成其他厂家的样本。${tx(locale, company.legalName)}。`],
      ];

  return (
    <>
      <PageHero
        index="09"
        kicker={en ? "TERMS" : "使用条款"}
        title={en ? "How to read this catalogue." : "怎样阅读这本样本。"}
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "Terms" : "使用条款" }]}
      />
      <article className="mx-auto max-w-[760px] space-y-8 px-5 py-12">
        {sections.map(([title, body]) => (
          <section key={title}>
            <h2 className="text-[22px] leading-[30px] font-semibold text-navy-900">{title}</h2>
            <p className="mt-2 text-[16px] leading-[26px]">{body}</p>
          </section>
        ))}
      </article>
    </>
  );
}
