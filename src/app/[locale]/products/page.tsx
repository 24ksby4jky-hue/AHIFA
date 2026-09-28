import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/brand/page-hero";
import { EquipmentPlate } from "@/components/visuals/equipment";
import {
  applicationOptions,
  products,
  seriesList,
  voltageOptions,
  type ApplicationId,
  type SeriesId,
} from "@/content/products";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

const PAGE_SIZE = 4;

type Search = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function query(parts: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(parts)) {
    if (value) params.set(key, value);
  }
  const text = params.toString();
  return text ? `?${text}` : "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "en" ? "Products" : "产品中心";
  const description =
    locale === "en"
      ? "HV switchgear, LV assemblies, transformers, PV grid cabinets, and compact substations from Ahifa in Hengli."
      : "阿海法电气产品：高压成套、低压成套、变压器、光伏并网柜与箱式变电站。";
  return {
    title,
    description,
    alternates: { languages: { zh: "/zh/products", en: "/en/products" } },
  };
}

export default async function ProductsPage({
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
  const series = one(sp.series) as SeriesId | undefined;
  const voltage = one(sp.voltage);
  const application = one(sp.application) as ApplicationId | undefined;
  const page = Math.max(1, Number(one(sp.page) || "1") || 1);

  const filtered = products.filter((item) => {
    if (series && item.series !== series) return false;
    if (voltage && !item.voltages.includes(voltage)) return false;
    if (application && !item.applications.includes(application)) return false;
    return true;
  });
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const base = { series, voltage, application };

  return (
    <>
      <PageHero
        index="01"
        kicker={en ? "PRODUCTS" : "产品中心"}
        title={en ? "Equipment, listed by duty." : "按电压和应用列出的设备。"}
        lede={
          en
            ? "Filter by voltage, application, or range. Ratings on each page are catalogue ranges. The quotation locks the actual build."
            : "可按电压、应用或系列筛选。页面上的额定值是样本范围，最终配置以报价单为准。"
        }
        crumbs={[{ href: "/", label: common("home") }, { label: en ? "Products" : "产品" }]}
      />
      <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-12 lg:grid-cols-[240px_1fr]">
        <form method="get" className="h-fit border border-line bg-canvas p-4">
          <p className="font-mono text-[12px] tracking-[0.16em] text-action">{common("filter")}</p>
          <label className="mt-4 block text-[12px] text-muted-ink">
            {en ? "Range" : "系列"}
            <select name="series" defaultValue={series ?? ""} className="mt-1 h-11 w-full border border-line bg-white px-2 text-[14px] text-ink">
              <option value="">{common("all")}</option>
              {seriesList.map((item) => (
                <option key={item.id} value={item.id}>
                  {tx(locale, item.name)}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-[12px] text-muted-ink">
            {en ? "Voltage" : "电压"}
            <select name="voltage" defaultValue={voltage ?? ""} className="mt-1 h-11 w-full border border-line bg-white px-2 text-[14px] text-ink">
              <option value="">{common("all")}</option>
              {voltageOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-[12px] text-muted-ink">
            {en ? "Application" : "应用"}
            <select
              name="application"
              defaultValue={application ?? ""}
              className="mt-1 h-11 w-full border border-line bg-white px-2 text-[14px] text-ink"
            >
              <option value="">{common("all")}</option>
              {applicationOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {tx(locale, item.label)}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="chamfer-sm mt-4 h-11 w-full bg-navy-900 text-[14px] text-white">
            {common("filter")}
          </button>
          <Link href="/products" className="mt-3 block text-center text-[13px] text-action">
            {common("clear")}
          </Link>
        </form>
        <div>
          {slice.length === 0 ? (
            <div className="border border-dashed border-line bg-canvas px-5 py-12">
              <p className="font-mono text-[12px] tracking-[0.16em] text-action">00</p>
              <p className="mt-3 max-w-lg text-[16px] leading-[26px] text-ink">{common("emptyProducts")}</p>
              <Link href="/contact" className="mt-4 inline-block text-[14px] text-action">
                {en ? "Send the duty" : "把工况发给工程师"}
              </Link>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {slice.map((item) => (
                <li key={item.slug}>
                  <Link href={`/products/${item.slug}`} className="chamfer block h-full border border-line hover:border-action">
                    <EquipmentPlate kind={item.plate} title={item.model} className="h-40 object-cover" />
                    <div className="p-4">
                      <p className="font-mono text-[12px] text-action">{item.model}</p>
                      <h2 className="mt-2 text-[18px] leading-[26px] font-semibold text-navy-900">{tx(locale, item.name)}</h2>
                      <p className="mt-2 text-[14px] leading-[22px] text-muted-ink">{tx(locale, item.summary)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {filtered.length > PAGE_SIZE ? (
            <nav className="mt-6 flex items-center justify-between border-t border-line pt-4" aria-label="Pagination">
              <Link
                href={`/products${query({ ...base, page: String(Math.max(1, current - 1)) })}`}
                className="text-[14px] text-action aria-disabled:text-muted-ink"
                aria-disabled={current === 1}
              >
                {common("prev")}
              </Link>
              <span className="font-mono text-[12px] text-muted-ink">
                {current} / {pages}
              </span>
              <Link
                href={`/products${query({ ...base, page: String(Math.min(pages, current + 1)) })}`}
                className="text-[14px] text-action"
              >
                {common("next")}
              </Link>
            </nav>
          ) : null}
        </div>
      </div>
    </>
  );
}
