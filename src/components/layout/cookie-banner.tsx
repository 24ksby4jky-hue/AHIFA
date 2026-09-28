"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const KEY = "ahifa-cookie-notice";

export function CookieBanner() {
  const t = useTranslations("cookie");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(KEY)) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-4 pb-4">
      <div className="chamfer mx-auto flex max-w-[1180px] flex-col gap-3 border border-line bg-canvas px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] leading-[22px] text-ink">{t("body")}</p>
        <Button
          className="chamfer-sm h-10 bg-navy-900 px-4 text-white hover:bg-navy-700"
          onClick={() => {
            window.localStorage.setItem(KEY, "1");
            setOpen(false);
          }}
        >
          {t("accept")}
        </Button>
      </div>
    </div>
  );
}
