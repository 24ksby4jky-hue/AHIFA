export type Copy = { zh: string; en: string };

export function tx(locale: string, copy: Copy) {
  return locale === "en" ? copy.en : copy.zh;
}
