"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { EquipmentPlate } from "@/components/visuals/equipment";
import {
  applicationOptions,
  products,
  getSeries,
  seriesList,
  voltageOptions,
  type ApplicationId,
  type SeriesId,
} from "@/content/products";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

const PAGE_SIZE = 4;

function query(parts: Record<string, string | undefined>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(parts)) {
    if (value) params.set(key, value);
  }
  const text = params.toString();
  return text ? `?${text}` : "";
}

function ProductCatalogView({
  locale,
  series,
  voltage,
  application,
  page,
}: {
  locale: string;
  series?: string;
  voltage?: string;
  application?: string;
  page: number;
}) {
  const common = useTranslations("common");
  const en = locale === "en";
  const seriesId = series as SeriesId | undefined;
  const applicationId = application as ApplicationId | undefined;
  const filtered = products.filter((item) => {
    if (seriesId && item.series !== seriesId) return false;
    if (voltage && !item.voltages.includes(voltage)) return false;
    if (applicationId && !item.applications.includes(applicationId)) return false;
    return true;
  });
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pages);
  const slice = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const base = { series, voltage, application };
  const seriesMeta = seriesId ? getSeries(seriesId) : null;

  return (
    <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-12 lg:grid-cols-[240px_1fr]">
      <form
        key={`${series ?? ""}|${voltage ?? ""}|${application ?? ""}`}
        method="get"
        className="h-fit border border-line bg-canvas p-4"
      >
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
        {seriesMeta?.image ? (
          <figure className="mb-6 border border-line bg-canvas">
            <img
              src={seriesMeta.image.src}
              alt={tx(locale, seriesMeta.image.alt)}
              className="max-h-72 w-full object-contain"
            />
            <figcaption className="border-t border-line px-4 py-3 text-[14px] leading-[22px] text-muted-ink">
              {tx(locale, seriesMeta.image.note ?? seriesMeta.image.alt)}
            </figcaption>
          </figure>
        ) : null}
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
                  {item.image ? (
                    <img
                      src={item.image.src}
                      alt={tx(locale, item.image.alt)}
                      className="h-44 w-full bg-canvas object-contain"
                    />
                  ) : (
                    <EquipmentPlate kind={item.plate} title={item.model} className="h-40 object-cover" />
                  )}
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
  );
}

function ProductCatalogFromQuery({ locale }: { locale: string }) {
  const sp = useSearchParams();
  const page = Math.max(1, Number(sp.get("page") || "1") || 1);
  return (
    <ProductCatalogView
      locale={locale}
      series={sp.get("series") || undefined}
      voltage={sp.get("voltage") || undefined}
      application={sp.get("application") || undefined}
      page={page}
    />
  );
}

export function ProductCatalog({ locale }: { locale: string }) {
  return (
    <Suspense fallback={<ProductCatalogView locale={locale} page={1} />}>
      <ProductCatalogFromQuery locale={locale} />
    </Suspense>
  );
}
