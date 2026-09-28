import type { Copy } from "@/lib/copy";

export const company = {
  legalName: {
    zh: "广东阿海法电气有限公司",
    en: "Guangdong Ahifa Electric Co., Ltd.",
  } satisfies Copy,
  shortName: { zh: "阿海法电气", en: "AHIFA Electric" } satisfies Copy,
  mark: "AHIFA",
  slogan: {
    zh: "德行品质，智造未来",
    en: "Conduct and quality, built into the gear.",
  } satisfies Copy,
  founded: "2017",
  foundedLabel: { zh: "2017 年 1 月成立", en: "Established January 2017" } satisfies Copy,
  phone: "0769-8117 7338",
  phoneHref: "tel:+8676981177338",
  mobile: "136 5252 6609",
  mobileHref: "tel:+8613652526609",
  whatsapp: "8613652526609",
  email: "sales@ahifa.com.cn",
  address: {
    zh: "广东省东莞市横沥镇利源路 13 号",
    en: "No. 13 Liyuan Road, Hengli Town, Dongguan, Guangdong, China",
  } satisfies Copy,
  mapUrl:
    "https://www.openstreetmap.org/search?query=%E4%B8%9C%E8%8E%9E%E5%B8%82%E6%A8%AA%E6%8B%A1%E9%95%87%E5%88%A9%E6%BA%90%E8%B7%AF13%E5%8F%B7",
};

export const standards: { code: string; name: Copy }[] = [
  {
    code: "IEC 62271-200",
    name: {
      zh: "金属封闭开关设备与控制设备",
      en: "AC metal-enclosed switchgear and controlgear",
    },
  },
  {
    code: "GB/T 3906",
    name: {
      zh: "3.6 kV～40.5 kV 交流金属封闭开关设备",
      en: "AC metal-enclosed switchgear, 3.6–40.5 kV",
    },
  },
  {
    code: "GB/T 7251.1",
    name: {
      zh: "低压成套开关设备",
      en: "Low-voltage switchgear assemblies",
    },
  },
  {
    code: "GB/T 17467",
    name: {
      zh: "高压 / 低压预装式变电站",
      en: "HV/LV prefabricated substations",
    },
  },
];

export const stats: { value: string; label: Copy }[] = [
  { value: "2017", label: { zh: "成立于东莞横沥", en: "Founded in Hengli, Dongguan" } },
  { value: "05", label: { zh: "产品系列", en: "Equipment ranges" } },
  { value: "24 kV", label: { zh: "高压成套覆盖", en: "HV assemblies up to" } },
  { value: "0.4 kV", label: { zh: "低压与并网柜", en: "LV and grid-tie cabinets" } },
];

export const milestones: { year: string; text: Copy }[] = [
  {
    year: "2017",
    text: {
      zh: "公司成立，工厂落在东莞横沥镇利源路。",
      en: "The company is established. The plant sits on Liyuan Road, Hengli, Dongguan.",
    },
  },
  {
    year: "HV",
    text: {
      zh: "高压成套形成 KYN28 中置柜、HXGN15 环网柜与 HSRM16 充气柜三条线。",
      en: "The HV range settles on KYN28 metal-clad panels, HXGN15 ring main units, and HSRM16 gas-insulated cubicles.",
    },
  },
  {
    year: "LV",
    text: {
      zh: "低压抽出式与固定式成套，配套干式变压器，服务厂房与楼宇配电。",
      en: "Withdrawable and fixed LV assemblies, paired with dry-type transformers, for plants and buildings.",
    },
  },
  {
    year: "PV",
    text: {
      zh: "光伏并网柜与智能工业配电柜进入新能源和园区项目接口。",
      en: "PV grid-connection cabinets and intelligent industrial panels take the interface on solar and campus jobs.",
    },
  },
  {
    year: "YB",
    text: {
      zh: "欧式预装式箱变把高压、变压器与低压收进同一外壳，便于现场就位。",
      en: "European prefabricated substations put HV, transformer, and LV in one enclosure for a short site install.",
    },
  },
];
