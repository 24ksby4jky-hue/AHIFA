"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { BrandButton } from "@/components/brand/brand-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/content/products";
import { Link } from "@/i18n/navigation";
import { tx } from "@/lib/copy";

type Errors = Partial<Record<"name" | "company" | "country" | "email" | "message", string>>;

const fieldClass =
  "h-11 rounded-none border-line bg-white px-3 text-[16px] text-ink shadow-none focus-visible:border-action focus-visible:ring-action/30";

export function RfqForm({
  initialProduct,
  initialMessage,
}: {
  initialProduct?: string;
  initialMessage?: string;
}) {
  const t = useTranslations("form");
  const locale = useLocale();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState(initialProduct ?? "");
  const [message, setMessage] = useState(initialMessage ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<{ ref: string } | null>(null);

  const productName = useMemo(() => {
    const found = products.find((item) => item.slug === product);
    return found ? `${found.model} · ${tx(locale, found.name)}` : "";
  }, [locale, product]);

  function validate(): Errors {
    const next: Errors = {};
    if (!name.trim()) next.name = t("required");
    if (!company.trim()) next.company = t("required");
    if (!country.trim()) next.country = t("required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = t("emailInvalid");
    if (message.trim().length < 10) next.message = t("messageShort");
    return next;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    const stamp = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const serial = String(1000 + (name.length * 17 + company.length * 13) % 9000);
    setDone({ ref: `AH-${stamp}-${serial}` });
  }

  if (done) {
    return (
      <div className="chamfer border border-line bg-white p-6 md:p-8" role="status">
        <p className="font-mono text-[12px] tracking-[0.18em] text-action">RFQ · ACCEPTED</p>
        <h2 className="mt-3 text-[32px] leading-[40px] font-semibold text-navy-900">{t("successTitle")}</h2>
        <p className="mt-3 max-w-xl text-[16px] leading-[26px] text-muted-ink">{t("successBody")}</p>
        <dl className="mt-6 divide-y divide-line border border-line">
          <Row label={t("reference")} value={done.ref} mono />
          <Row label={t("company")} value={company} />
          <Row label={t("country")} value={country} />
          <Row label={t("email")} value={email} />
          {productName ? <Row label={t("product")} value={productName} /> : null}
        </dl>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="chamfer-sm h-11 border border-navy-900 px-5 text-[14px] text-navy-900"
            onClick={() => {
              setDone(null);
              setMessage("");
            }}
          >
            {t("another")}
          </button>
          <Link href="/" className="inline-flex h-11 items-center px-2 text-[14px] text-action">
            {t("backHome")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="chamfer border border-line bg-white p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} error={errors.name}>
          <Input className={fieldClass} name="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </Field>
        <Field label={t("company")} error={errors.company}>
          <Input className={fieldClass} name="company" value={company} onChange={(e) => setCompany(e.target.value)} autoComplete="organization" />
        </Field>
        <Field label={t("country")} error={errors.country}>
          <Input className={fieldClass} name="country" value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name" />
        </Field>
        <Field label={t("email")} error={errors.email}>
          <Input className={fieldClass} name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        </Field>
        <Field label={t("phone")} hint={t("optional")}>
          <Input className={fieldClass} name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </Field>
        <Field label={t("product")} hint={t("optional")}>
          <Select value={product || undefined} onValueChange={setProduct}>
            <SelectTrigger className="h-11 w-full rounded-none border-line bg-white text-[16px] data-[size=default]:h-11">
              <SelectValue placeholder={t("productPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {products.map((item) => (
                <SelectItem key={item.slug} value={item.slug}>
                  {item.model} · {tx(locale, item.name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <div className="mt-5">
        <Field label={t("message")} error={errors.message} hint={t("messageHint")}>
          <Textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-36 rounded-none border-line bg-white px-3 py-3 text-[16px] text-ink shadow-none focus-visible:border-action focus-visible:ring-action/30"
          />
        </Field>
      </div>
      <div className="mt-6">
        <BrandButton type="submit">{t("submit")}</BrandButton>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[12px] tracking-[0.08em] text-muted-ink">{label}</Label>
      {children}
      {error ? (
        <p className="text-[14px] leading-[22px] text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-[12px] leading-[22px] text-muted-ink">{hint}</p>
      ) : null}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="grid gap-1 px-4 py-3 sm:grid-cols-[140px_1fr] sm:items-baseline">
      <dt className="text-[12px] tracking-[0.08em] text-muted-ink">{label}</dt>
      <dd className={mono ? "font-mono text-[15px] text-navy-900 tabular" : "text-[15px] text-ink"}>{value}</dd>
    </div>
  );
}
