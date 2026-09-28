"use client";

import { useLocale } from "next-intl";
import { BrandButton } from "@/components/brand/brand-button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const locale = useLocale();
  const title = locale === "en" ? "The page did not finish loading" : "这一页没有完成加载";
  const body =
    locale === "en"
      ? "Something in this view failed. Retry the same page, or go back to the home lineup."
      : "这个视图没有完成渲染。可以重试，或回到首页。";

  return (
    <section className="eng-grid text-white">
      <div className="mx-auto max-w-[1180px] px-5 py-24">
        <p className="font-mono text-[12px] tracking-[0.2em] text-electric">500 / AHIFA</p>
        <h1 className="mt-4 text-[32px] leading-[40px] font-semibold md:text-[48px] md:leading-[56px]">{title}</h1>
        <p className="mt-4 max-w-xl text-white/75">{body}</p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="chamfer-sm h-11 bg-action px-5 text-[14px] text-white"
          >
            {locale === "en" ? "Retry" : "重试"}
          </button>
          <BrandButton href="/" variant="outline">
            {locale === "en" ? "Home" : "首页"}
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
