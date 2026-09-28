import { BrandButton } from "@/components/brand/brand-button";
import { getLocale, getTranslations } from "next-intl/server";

export default async function NotFound() {
  const locale = await getLocale();
  const home = await getTranslations("common");
  const title = locale === "en" ? "This sheet is not in the set" : "页面不在这套图纸里";
  const body =
    locale === "en"
      ? "The address does not match a product, solution, project, or article. Return to the lineup, or check the path."
      : "这个地址没有对应的产品、方案、案例或文章。回到产品列，或核对路径。";

  return (
    <section className="eng-grid text-white">
      <div className="mx-auto max-w-[1180px] px-5 py-24 md:py-32">
        <p className="font-mono text-[12px] tracking-[0.2em] text-electric">404 / AHIFA · HENGLI</p>
        <h1 className="mt-4 max-w-2xl text-[32px] leading-[40px] font-semibold md:text-[48px] md:leading-[56px]">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-[16px] leading-[26px] text-white/75">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BrandButton href="/">{home("home")}</BrandButton>
          <BrandButton href="/products" variant="outline">
            {locale === "en" ? "Products" : "产品"}
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
