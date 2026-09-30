"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BrandButton } from "@/components/brand/brand-button";
import { EquipmentPlate } from "@/components/visuals/equipment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getProduct, getSeries, products, type Product } from "@/content/products";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";
import { cn } from "cn";

const tabs = ["overview", "specs", "drawing", "related"] as const;

export function ProductDetail({ locale, product }: { locale: string; product: Product }) {
  const t = useTranslations("cta");
  const common = useTranslations("common");
  const [tab, setTab] = useState<(typeof tabs)[number]>("overview");
  const series = getSeries(product.series);
  const related = product.related.map((slug) => getProduct(slug)).filter(Boolean) as Product[];
  const labels = {
    overview: locale === "en" ? "Overview" : "概况",
    specs: locale === "en" ? "Ratings" : "技术参数",
    drawing: locale === "en" ? "Arrangement" : "结构示意",
    related: locale === "en" ? "Related" : "相关产品",
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        {product.image ? (
          <div className="chamfer overflow-hidden border border-line bg-canvas">
            <img
              src={product.image.src}
              alt={tx(locale, product.image.alt)}
              className="aspect-[4/3] w-full object-contain"
            />
          </div>
        ) : (
          <div className="chamfer overflow-hidden border border-white/10">
            <EquipmentPlate kind={product.plate} title={product.model} />
          </div>
        )}
        {product.gallery?.length ? (
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {product.gallery.map((shot) => (
              <li key={shot.src} className="border border-line bg-canvas">
                <img src={shot.src} alt={tx(locale, shot.alt)} className="aspect-[4/3] w-full object-contain" />
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-3 font-mono text-[12px] tracking-[0.14em] text-muted-ink">
          {product.model} · {product.voltages.join(" / ")}
        </p>
      </div>
      <div>
        <p className="font-mono text-[12px] tracking-[0.16em] text-action">
          {series.index} / {tx(locale, series.name)}
        </p>
        <h2 className="mt-2 text-[22px] leading-[30px] font-semibold text-navy-900">{product.model}</h2>
        <p className="mt-3 text-[16px] leading-[26px] text-muted-ink">{tx(locale, product.summary)}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.standards.map((item) => (
            <span key={item} className="chamfer-sm border border-line bg-canvas px-2 py-1 font-mono text-[12px] text-navy-700">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <BrandButton href={`/contact?product=${product.slug}`}>{t("quote")}</BrandButton>
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="chamfer-sm h-11 border border-navy-900 px-5 text-[14px] text-navy-900">
                {t("drawing")}
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl rounded-none border-line bg-white sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle className="font-display text-navy-900">{product.model}</DialogTitle>
                <DialogDescription>{tx(locale, product.drawing)}</DialogDescription>
              </DialogHeader>
              <EquipmentPlate kind={product.plate} title={product.model} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="lg:col-span-2">
        <div role="tablist" aria-label={product.model} className="flex gap-0 overflow-x-auto border-b border-line">
          {tabs.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "shrink-0 border-b-2 px-4 py-3 text-[14px] leading-[22px]",
                tab === id ? "border-action text-navy-900" : "border-transparent text-muted-ink",
              )}
            >
              {labels[id]}
            </button>
          ))}
        </div>
        <div className="pt-6" role="tabpanel">
          {tab === "overview" ? (
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                {product.overview.map((paragraph) => (
                  <p key={paragraph.zh} className="text-[16px] leading-[26px] text-ink">
                    {tx(locale, paragraph)}
                  </p>
                ))}
              </div>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={feature.zh} className="flex gap-3 border border-line bg-canvas px-4 py-3">
                    <span className="font-mono text-[12px] text-action">{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-[15px] leading-[24px]">{tx(locale, feature)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {tab === "specs" ? (
            <dl className="border border-line">
              {product.specs.map((spec) => (
                <div key={spec.key.zh} className="grid border-b border-line last:border-b-0 sm:grid-cols-[240px_1fr]">
                  <dt className="bg-canvas px-4 py-3 text-[14px] leading-[22px] text-muted-ink">{tx(locale, spec.key)}</dt>
                  <dd className="px-4 py-3 font-mono text-[15px] tabular text-navy-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {tab === "drawing" ? (
            <div>
              <EquipmentPlate kind={product.plate} title={product.model} className="chamfer max-w-3xl" />
              <p className="mt-4 max-w-2xl text-[14px] leading-[22px] text-muted-ink">{tx(locale, product.drawing)}</p>
            </div>
          ) : null}
          {tab === "related" ? (
            related.length ? (
              <ul className="grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/products/${item.slug}`} className="chamfer block border border-line p-4 hover:border-action">
                      <p className="font-mono text-[12px] text-action">{item.model}</p>
                      <p className="mt-2 text-[16px] leading-[26px] text-navy-900">{tx(locale, item.name)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-ink">{common("relatedEmpty")}</p>
            )
          ) : null}
        </div>
        <p className="sr-only">{products.length}</p>
      </div>
    </div>
  );
}
