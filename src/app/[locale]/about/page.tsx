import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { company, milestones, standards } from "@/content/company";
import { tx } from "@/lib/copy";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "en" ? "About" : "关于我们",
    description: tx(locale, company.legalName) + (locale === "en" ? " — switchgear plant in Hengli, Dongguan." : "，东莞横沥成套工厂。"),
    alternates: { languages: { zh: "/zh/about", en: "/en/about" } },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations("common");
  const en = locale === "en";

  return (
    <>
      <PageHero
        index="05"
        kicker={en ? "ABOUT" : "关于我们"}
        title={tx(locale, company.legalName)}
        lede={
          en
            ? "A switchgear plant on Liyuan Road, Hengli, Dongguan, established in January 2017. HV and LV assemblies, transformers, compact substations, and PV grid cabinets."
            : "2017 年 1 月成立，工厂在东莞市横沥镇利源路 13 号。做高压成套、低压成套、变压器、箱式变电站和光伏并网柜。"
        }
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "About" : "关于我们" }]}
      />
      <div className="mx-auto max-w-[1180px] px-5 py-12">
        <section id="company" className="grid gap-8 md:grid-cols-[180px_1fr]">
          <h2 className="font-mono text-[12px] tracking-[0.16em] text-action">{en ? "COMPANY" : "公司"}</h2>
          <div className="space-y-4 text-[16px] leading-[26px]">
            <p>
              {en
                ? "Ahifa designs, assembles, and routine-tests distribution equipment. The work is metal-clad panels, ring main units, gas cubicles, LV withdrawable boards, cast-resin transformers, and prefabricated substations — not a trading desk reselling anonymous cabinets."
                : "阿海法做配电设备的设计、成套和出厂试验。产品是中置柜、环网柜、充气柜、低压抽出式、浇注干式变压器和预装式箱变，不是把无名柜子转手出去的贸易台。"}
            </p>
            <p>
              {en
                ? `The line used inside the plant is “${tx(locale, company.slogan)}”. On a drawing that means the busbar section and the component brand stay as quoted.`
                : `厂里用的一句话是「${tx(locale, company.slogan)}」。落到图纸上，就是铜排规格和元器件品牌按报价执行。`}
            </p>
          </div>
        </section>

        <section id="factory" className="mt-14 grid gap-8 md:grid-cols-[180px_1fr]">
          <h2 className="font-mono text-[12px] tracking-[0.16em] text-action">{en ? "PLANT" : "工厂"}</h2>
          <div>
            <p className="text-[16px] leading-[26px]">
              {en
                ? "Assembly, busbar, secondary wiring, and routine checks happen at the Hengli address below. Panels that share a single-line are matched before they are packed."
                : "装配、铜排、二次配线和出厂检查都在下面这个地址完成。同一张一次图上的柜子，在装箱前把接口对好。"}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { src: "/media/about-plant.webp", alt: en ? "Ahifa plant in Hengli" : "横沥厂房", width: 1210, height: 775 },
                  { src: "/media/about-gate.webp", alt: en ? "Entrance to the industrial park" : "园区大门", width: 1350, height: 675 },
                ] as const
              ).map((shot) => (
                <img
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  className="h-auto w-full border border-line object-cover"
                />
              ))}
            </div>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(
                [
                  ["/media/about-sheet-metal.webp", en ? "Sheet-metal work" : "钣金"],
                  ["/media/about-welding.webp", en ? "Welding" : "焊接"],
                  ["/media/about-assembly.webp", en ? "LV panel assembly" : "低压柜装配"],
                  ["/media/about-test.webp", en ? "Power-frequency withstand test set" : "工频耐压试验台"],
                ] as const
              ).map(([src, alt]) => (
                <li key={src} className="border border-line bg-canvas">
                  <img src={src} alt={alt} className="aspect-[4/3] w-full object-contain" />
                  <p className="px-3 py-2 text-[13px] leading-[20px] text-muted-ink">{alt}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-6 grid gap-4 border border-line sm:grid-cols-3">
              {[
                [en ? "Assembly" : "成套装配", en ? "Panel frames, compartments, enclosure fit." : "柜架、隔室和外壳拼装。"],
                [en ? "Busbar & wiring" : "铜排与配线", en ? "Main bus and secondary circuits in the plant." : "主母线与二次回路在厂内完成。"],
                [en ? "Routine checks" : "出厂检查", en ? "Mechanism and circuit checks before shipment." : "发运前做机械与回路检查。"],
              ].map(([title, body]) => (
                <div key={title} className="px-4 py-4">
                  <dt className="text-[16px] font-semibold text-navy-900">{title}</dt>
                  <dd className="mt-2 text-[14px] leading-[22px] text-muted-ink">{body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[15px]">{tx(locale, company.address)}</p>
          </div>
        </section>

        <section id="standards" className="mt-14 grid gap-8 md:grid-cols-[180px_1fr]">
          <h2 className="font-mono text-[12px] tracking-[0.16em] text-action">{en ? "BASIS" : "依据"}</h2>
          <div>
            <p className="text-[16px] leading-[26px]">
              {en
                ? "Design follows the published standards below. Certificate scans are added only after the client has checked them. This page does not claim a mark that has not been verified."
                : "设计参照下列公开标准。证书扫描件经客户核验后再挂上。这一页不宣称尚未核验的标志。"}
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {standards.map((item) => (
                <li key={item.code} className="border border-line px-4 py-3">
                  <p className="font-mono text-navy-900">{item.code}</p>
                  <p className="text-[14px] text-muted-ink">{tx(locale, item.name)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="history" className="mt-14 grid gap-8 md:grid-cols-[180px_1fr]">
          <h2 className="font-mono text-[12px] tracking-[0.16em] text-action">{en ? "PATH" : "历程"}</h2>
          <ol className="space-y-4">
            {milestones.map((item) => (
              <li key={item.year} className="grid grid-cols-[72px_1fr] gap-3 border-b border-line pb-4">
                <span className="font-mono text-[13px] text-action">{item.year}</span>
                <span>{tx(locale, item.text)}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
