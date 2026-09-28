import { Link } from "@/i18n/navigation";

export function PageHero({
  index,
  kicker,
  title,
  lede,
  crumbs,
}: {
  index: string;
  kicker: string;
  title: string;
  lede?: string;
  crumbs: { href?: string; label: string }[];
}) {
  return (
    <section className="eng-grid text-white">
      <div className="mx-auto max-w-[1180px] px-5 py-12 md:py-16">
        <nav aria-label="Breadcrumb" className="font-mono text-[12px] tracking-[0.08em] text-white/55">
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((crumb, i) => (
              <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden>/</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-6 font-mono text-[12px] tracking-[0.18em] text-electric">
          {index} / {kicker}
        </p>
        <h1 className="mt-3 max-w-3xl text-[32px] leading-[40px] font-semibold md:text-[48px] md:leading-[56px]">
          {title}
        </h1>
        {lede ? <p className="mt-4 max-w-2xl text-[16px] leading-[26px] text-white/75">{lede}</p> : null}
      </div>
    </section>
  );
}
