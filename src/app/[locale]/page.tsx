import { setRequestLocale } from "next-intl/server";
import { BrandButton } from "@/components/brand/brand-button";
import { SectionHeading } from "@/components/brand/section-heading";
import { EquipmentPlate } from "@/components/visuals/equipment";
import { cases } from "@/content/cases";
import { company, standards, stats } from "@/content/company";
import { news } from "@/content/news";
import { seriesList } from "@/content/products";
import { solutions } from "@/content/solutions";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";
  const featured = cases.filter((item) => item.sea).slice(0, 3);

  return (
    <>
      <section className="eng-grid text-white">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="font-mono text-[12px] tracking-[0.2em] text-electric">
              {en ? "AHIFA ELECTRIC  /  HENGLI, DONGGUAN" : "广东阿海法电气  /  东莞横沥"}
            </p>
            <h1 className="mt-4 max-w-xl text-[34px] leading-[42px] font-semibold md:text-[48px] md:leading-[56px]">
              {en ? "Switchgear, assembled in Dongguan." : "高低压成套开关设备，在横沥装完再出厂。"}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] leading-[26px] text-white/75">
              {en
                ? "Metal-clad panels, ring main units, gas-insulated cubicles, dry-type transformers, prefabricated substations, and PV grid-connection cabinets. Rated, wired, and routine-checked before they leave Liyuan Road."
                : "中置柜、环网柜、充气柜、干式变压器、预装式箱变和光伏并网柜。额定参数、二次配线和出厂检查在利源路的工厂做完，再发到现场。"}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BrandButton href="/contact">{en ? "Request a quote" : "获取报价"}</BrandButton>
              <BrandButton href="/products" variant="outline">
                {en ? "View the range" : "浏览产品"}
              </BrandButton>
            </div>
          </div>
          <div className="chamfer border border-white/15">
            <EquipmentPlate kind="lineup" title={en ? "AHIFA lineup" : "阿海法成套示意"} />
          </div>
        </div>
        <div className="border-t border-white/10">
          <dl className="mx-auto grid max-w-[1180px] gap-px bg-white/10 px-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["12 / 24 kV", en ? "HV metal-clad and RMU" : "高压中置柜与环网"],
              ["0.4 kV", en ? "LV assemblies and PV cabinets" : "低压成套与并网柜"],
              ["YBW", en ? "Prefabricated substations" : "欧式预装式箱变"],
              ["2017", en ? "Plant in Hengli" : "工厂落在横沥"],
            ].map(([value, label]) => (
              <div key={value} className="bg-navy-900/80 px-1 py-4">
                <dt className="font-mono text-[18px] text-white tabular">{value}</dt>
                <dd className="mt-1 text-[13px] leading-[22px] text-white/60">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-16 md:py-20">
        <SectionHeading
          index="01"
          eyebrow={en ? "RANGES" : "产品中心"}
          title={en ? "Five ranges, one factory." : "五个系列，同一座工厂。"}
          subtitle={
            en
              ? "HV, LV, transformers, new-energy cabinets, and compact substations. The new-energy and substation ranges sit beside the panels the plant already builds."
              : "高压、低压、变压器、新能源配电和箱式变电站。并网柜和箱变与原有成套放在同一条出厂路径上。"
          }
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {seriesList.map((item) => (
            <li key={item.id}>
              <Link
                href={`/products?series=${item.id}`}
                className="chamfer group flex h-full flex-col border border-line bg-white p-5 hover:border-action"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[12px] tracking-[0.16em] text-action">{item.index}</span>
                  <span className="text-[12px] text-muted-ink group-hover:text-action">
                    {en ? "Open" : "进入"}
                  </span>
                </div>
                <h3 className="mt-4 text-[22px] leading-[30px] font-semibold text-navy-900">{tx(locale, item.name)}</h3>
                <p className="mt-2 text-[15px] leading-[24px] text-muted-ink">{tx(locale, item.summary)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="eng-grid-light">
        <div className="mx-auto max-w-[1180px] px-5 py-16 md:py-20">
          <SectionHeading
            index="02"
            eyebrow={en ? "INDUSTRIES" : "解决方案"}
            title={en ? "Schemes follow the room, not a brochure page." : "方案按房间和负荷来，不按样本页拼。"}
          />
          <ul className="mt-10 divide-y divide-line border-y border-line bg-white">
            {solutions.map((item) => (
              <li key={item.slug}>
                <Link href={`/solutions/${item.slug}`} className="grid gap-2 px-4 py-5 hover:bg-canvas md:grid-cols-[72px_1fr_1.2fr] md:items-baseline">
                  <span className="font-mono text-[12px] text-action">{item.index}</span>
                  <span className="text-[18px] font-semibold text-navy-900">{tx(locale, item.title)}</span>
                  <span className="text-[14px] leading-[22px] text-muted-ink">{tx(locale, item.summary)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy-700 text-white">
        <dl className="mx-auto grid max-w-[1180px] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div key={item.value} className="border-white/10 px-5 py-8 lg:border-l first:lg:border-l-0">
              <dt className="font-mono text-[40px] leading-none tabular text-white">{item.value}</dt>
              <dd className="mt-3 text-[14px] leading-[22px] text-white/70">
                <span className="mr-2 font-mono text-[12px] text-electric">{String(index + 1).padStart(2, "0")}</span>
                {tx(locale, item.label)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="03"
            eyebrow={en ? "TYPICAL LINE-UPS" : "典型配置"}
            title={en ? "Southeast Asia, then the home market." : "先看东南亚接口，再看国内配电房。"}
            subtitle={
              en
                ? "These are representative duties, not a client list. Names and photographs are replaced when the market team files the real projects."
                : "这些是按行业和地区整理的典型成套，不是客户名录。正式项目名称和照片在市场部入库后替换。"
            }
          />
          <Link href="/cases" className="text-[14px] text-action">
            {en ? "All line-ups" : "全部配置"}
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {featured.map((item) => (
            <li key={item.slug}>
              <Link href={`/cases/${item.slug}`} className="chamfer flex h-full flex-col border border-line p-5 hover:border-action">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[28px] leading-none text-navy-900">{item.region}</span>
                  <span className="font-mono text-[12px] tracking-[0.14em] text-action">{item.index}</span>
                </div>
                <h3 className="mt-6 text-[22px] leading-[30px] font-semibold text-navy-900">{tx(locale, item.title)}</h3>
                <p className="mt-2 text-[14px] leading-[22px] text-muted-ink">{tx(locale, item.place)}</p>
                <p className="mt-3 text-[15px] leading-[24px] text-ink">{tx(locale, item.summary)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-canvas">
        <div className="mx-auto max-w-[1180px] px-5 py-14">
          <p className="font-mono text-[12px] tracking-[0.18em] text-action">{en ? "04  /  DESIGN BASIS" : "04  /  设计依据"}</p>
          <h2 className="mt-3 text-[32px] leading-[40px] font-semibold text-navy-900">
            {en ? "Published standards the drawings follow." : "图纸参照的公开标准。"}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {standards.map((item) => (
              <li key={item.code} className="border border-line bg-white px-4 py-4">
                <p className="font-mono text-[14px] text-navy-900">{item.code}</p>
                <p className="mt-1 text-[14px] leading-[22px] text-muted-ink">{tx(locale, item.name)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-5 py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading index="05" eyebrow={en ? "NOTES" : "新闻"} title={en ? "Factory notes." : "工厂笔记。"} />
          <Link href="/news" className="text-[14px] text-action">
            {en ? "All notes" : "全部"}
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {news.slice(0, 3).map((item) => (
            <li key={item.slug}>
              <Link href={`/news/${item.slug}`} className="grid gap-2 py-5 md:grid-cols-[120px_100px_1fr] md:items-baseline">
                <span className="font-mono text-[13px] text-muted-ink tabular">{item.date}</span>
                <span className="font-mono text-[12px] tracking-[0.12em] text-action">
                  {item.category === "company" ? (en ? "PLANT" : "公司") : en ? "FIELD" : "行业"}
                </span>
                <span className="text-[18px] text-navy-900">{tx(locale, item.title)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="eng-grid">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[12px] tracking-[0.18em] text-electric">RFQ · 1 {en ? "BUSINESS DAY" : "个工作日"}</p>
            <h2 className="mt-3 max-w-xl text-[32px] leading-[40px] font-semibold text-white">
              {en ? "Send the duty to Hengli." : "把工况发给横沥工厂。"}
            </h2>
            <p className="mt-3 max-w-xl text-[16px] leading-[26px] text-white/70">
              {en
                ? `${tx(locale, company.legalName)}. Voltage, current, quantity, delivery place.`
                : `${tx(locale, company.legalName)}。写上电压、电流、数量和交货地。`}
            </p>
          </div>
          <BrandButton href="/contact">{en ? "Request a quote" : "获取报价"}</BrandButton>
        </div>
      </section>
    </>
  );
}
