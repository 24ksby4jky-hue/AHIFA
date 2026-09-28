import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { company } from "@/content/company";
import { tx } from "@/lib/copy";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Privacy" : "隐私政策",
    alternates: { languages: { zh: "/zh/privacy", en: "/en/privacy" } },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations("common");
  const en = locale === "en";
  const sections = en
    ? [
        ["Who we are", `${tx(locale, company.legalName)} builds switchgear at ${tx(locale, company.address)}. This policy covers the marketing site and the inquiry form.`],
        ["What the form collects", "Name, company, country, email, optional phone, the equipment you select, and the duty you describe. The page also stores the path you started from, in the browser only, for this demo."],
        ["What this demo does not do", "The form does not send email, does not write to a database, and does not pass the inquiry to a salesperson. A receipt is shown on the page so the layout can be reviewed."],
        ["Local storage", "A single flag remembers that you dismissed the notice at the bottom of the page. Language is carried in the URL (/zh or /en), not in a tracking profile."],
        ["How long", "On the live site, inquiry records are kept for the sales follow-up and then according to the contract file. This demo keeps nothing after you leave the page."],
        ["Contact", `Questions about this notice: ${company.email}, ${company.phone}.`],
      ]
    : [
        ["我们是谁", `${tx(locale, company.legalName)}，地址 ${tx(locale, company.address)}。本政策适用于本营销网站和询盘表单。`],
        ["表单收集什么", "姓名、公司、国家或地区、邮箱、选填电话、您选择的设备，以及您写下的工况。演示站只在浏览器里保留您开始填写的页面路径。"],
        ["演示站不做什么", "表单不发邮件，不写入数据库，也不把询盘交给销售。成功回执只显示在页面上，供审阅版式。"],
        ["本地存储", "一条标记用于记住您关闭了页底提示。语言写在网址里（/zh 或 /en），不做成跟踪档案。"],
        ["保存多久", "正式网站的询盘按销售跟进和合同档案保存。本演示在您离开页面后不保留内容。"],
        ["联系", `关于本政策：${company.email}，${company.phone}。`],
      ];

  return (
    <>
      <PageHero
        index="08"
        kicker={en ? "PRIVACY" : "隐私政策"}
        title={en ? "What this site keeps." : "本站保存什么。"}
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "Privacy" : "隐私政策" }]}
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
