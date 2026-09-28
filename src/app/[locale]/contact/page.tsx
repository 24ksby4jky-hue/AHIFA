import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { RfqForm } from "@/components/contact/rfq-form";
import { company } from "@/content/company";
import { getProduct } from "@/content/products";
import { tx } from "@/lib/copy";

type Search = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "Contact" : "联系我们",
    description:
      locale === "en"
        ? "Request a quote from Ahifa Electric in Hengli, Dongguan."
        : "向东莞横沥的阿海法电气提交询盘。",
    alternates: { languages: { zh: "/zh/contact", en: "/en/contact" } },
  };
}

export default async function ContactPage({
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
  const productSlug = one(sp.product);
  const intent = one(sp.intent);
  const product = productSlug ? getProduct(productSlug) : null;
  const initialMessage =
    intent === "file" && product
      ? en
        ? `Please send the document set for ${product.model}.`
        : `请提供 ${product.model} 的资料。`
      : intent === "drawing" && product
        ? en
          ? `Please issue the arrangement drawing for ${product.model}.`
          : `请出具 ${product.model} 的布置图。`
        : "";

  return (
    <>
      <PageHero
        index="07"
        kicker={en ? "CONTACT" : "联系我们"}
        title={en ? "Send the duty. A reply within one business day." : "写下工况。一个工作日内回复。"}
        lede={
          en
            ? "Name, company, country, email, and the equipment. A sales engineer replies within one business day with the first technical clarification."
            : "姓名、公司、国家、邮箱和设备。销售工程师在一个工作日内做第一轮技术澄清。"
        }
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "Contact" : "联系我们" }]}
      />
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <RfqForm initialProduct={product?.slug} initialMessage={initialMessage} />
        <aside className="h-fit border border-line bg-canvas p-5">
          <p className="font-mono text-[12px] tracking-[0.16em] text-action">{en ? "PLANT" : "工厂"}</p>
          <p className="mt-3 text-[16px] font-semibold text-navy-900">{tx(locale, company.legalName)}</p>
          <p className="mt-2 text-[14px] leading-[22px] text-ink">{tx(locale, company.address)}</p>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a className="text-action" href={company.phoneHref}>
                {company.phone}
              </a>
            </li>
            <li>
              <a className="text-action" href={company.mobileHref}>
                {company.mobile}
              </a>
            </li>
            <li>
              <a className="text-action" href={`mailto:${company.email}`}>
                {company.email}
              </a>
            </li>
            <li>
              <a className="text-action" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
          <a
            href={company.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="chamfer mt-6 block border border-navy-900 bg-navy-900 px-4 py-6 text-white"
          >
            <span className="font-mono text-[12px] tracking-[0.16em] text-electric">DONGGUAN · HENGLI</span>
            <span className="mt-2 block text-[16px]">{en ? "Open the plant on the map" : "在地图中打开厂区"}</span>
            <span className="mt-2 block text-[13px] text-white/70">{en ? "Liyuan Road, Hengli Town" : "横沥镇利源路"}</span>
          </a>
        </aside>
      </div>
    </>
  );
}
