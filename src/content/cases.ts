import type { Copy } from "@/lib/copy";
import type { ApplicationId } from "@/content/products";

export type RegionId = "VN" | "TH" | "ID" | "MY" | "CN";

export type ProjectCase = {
  slug: string;
  index: string;
  region: RegionId;
  sea: boolean;
  industry: ApplicationId;
  title: Copy;
  place: Copy;
  summary: Copy;
  scope: Copy[];
  products: string[];
};

export const regions: { id: RegionId; label: Copy }[] = [
  { id: "VN", label: { zh: "越南", en: "Vietnam" } },
  { id: "TH", label: { zh: "泰国", en: "Thailand" } },
  { id: "ID", label: { zh: "印度尼西亚", en: "Indonesia" } },
  { id: "MY", label: { zh: "马来西亚", en: "Malaysia" } },
  { id: "CN", label: { zh: "中国", en: "China" } },
];

export const cases: ProjectCase[] = [
  {
    slug: "binh-duong-plant",
    index: "01",
    region: "VN",
    sea: true,
    industry: "industrial",
    title: { zh: "工业园 12 kV 进线与动力中心", en: "Industrial park, 12 kV incomer and MCC" },
    place: { zh: "越南 · 平阳", en: "Binh Duong, Vietnam" },
    summary: {
      zh: "典型配置：厂房进线用 KYN28-12，变压器后接 GCS 抽出式动力柜。面向东南亚工业园的接口写法。",
      en: "Typical lineup: KYN28-12 plant incomer, then a GCS withdrawable MCC after the transformer. Written the way a Southeast Asian industrial park asks for the interface.",
    },
    scope: [
      { zh: "12 kV 进线柜与馈线柜一列，手车真空断路器。", en: "One 12 kV lineup of incomer and feeders, vacuum breaker trucks." },
      { zh: "低压动力中心按工艺回路分抽屉，含电动机与普通馈线。", en: "LV MCC drawers split by process circuit, motors and plain feeders." },
      { zh: "一次图、柜体布置和装箱清单在出厂前闭合。", en: "Single-line, general arrangement, and packing list closed before shipment." },
    ],
    products: ["kyn28-12", "gcs", "scb14"],
  },
  {
    slug: "chonburi-pv",
    index: "02",
    region: "TH",
    sea: true,
    industry: "newenergy",
    title: { zh: "屋顶光伏 0.4 kV 并网", en: "Rooftop PV, 0.4 kV grid connection" },
    place: { zh: "泰国 · 春武里", en: "Chonburi, Thailand" },
    summary: {
      zh: "典型配置：逆变器交流侧汇入 AH-PV400，计量与浪涌单独成室，再送入厂区低压母线。",
      en: "Typical lineup: inverter AC outputs collect in an AH-PV400, with metering and surge in their own zone, then into the plant LV bus.",
    },
    scope: [
      { zh: "按逆变器台数配置分支断路器，而不是只给一个总开关。", en: "Feeder breakers follow the inverter count, not a single main switch." },
      { zh: "预留电网公司表计位置。", en: "Space reserved for the utility meter." },
      { zh: "并网点与厂用负荷在图上分开。", en: "The point of connection and the plant load are separate on the drawing." },
    ],
    products: ["ah-pv400", "gcs"],
  },
  {
    slug: "batam-substation",
    index: "03",
    region: "ID",
    sea: true,
    industry: "grid",
    title: { zh: "园区末端欧式箱变", en: "Park-end European compact substation" },
    place: { zh: "印度尼西亚 · 巴淡", en: "Batam, Indonesia" },
    summary: {
      zh: "典型配置：YBW-12 三室箱变，高压环网、干式变压器、低压馈线在工厂装完再整站发运。",
      en: "Typical lineup: YBW-12 in three rooms — HV ring main, dry-type transformer, LV feeders — assembled at the plant and shipped as one unit.",
    },
    scope: [
      { zh: "高压室采用环网单元，适合电缆进线。", en: "HV room uses ring-main ways, for cable incomers." },
      { zh: "外壳按户外通风和防腐提出要求。", en: "Enclosure specified for outdoor ventilation and corrosion." },
      { zh: "基础图与开门方向随货提交。", en: "Foundation drawing and door swings ship with the unit." },
    ],
    products: ["ybw-12", "hxgn15-12", "scb14"],
  },
  {
    slug: "penang-data",
    index: "04",
    region: "MY",
    sea: true,
    industry: "building",
    title: { zh: "数据机房低压馈线", en: "Data hall LV feeders" },
    place: { zh: "马来西亚 · 槟城", en: "Penang, Malaysia" },
    summary: {
      zh: "典型配置：GCS 抽屉馈线对应列头柜上游，干式变压器放在楼层配电房，避免油浸设备上楼。",
      en: "Typical lineup: GCS feeder drawers mapped to row PDUs, with a dry-type transformer in the floor substation so oil-filled gear stays off the upper floors.",
    },
    scope: [
      { zh: "馈线编号与机房列号对应。", en: "Feeder numbers match the hall row numbers." },
      { zh: "抽屉回路可单独抽出。", en: "Each drawer circuit withdraws on its own." },
      { zh: "运输尺寸按货梯净空校核。", en: "Transport size checked against the goods-lift opening." },
    ],
    products: ["gcs", "scb14"],
  },
  {
    slug: "municipal-rmu",
    index: "05",
    region: "CN",
    sea: false,
    industry: "grid",
    title: { zh: "市政电缆环网", en: "Municipal cable ring" },
    place: { zh: "广东 · 配电站", en: "Guangdong distribution room" },
    summary: {
      zh: "典型配置：HXGN15 半绝缘环网用于常规配电房；地下室改 HSRM16 充气柜。",
      en: "Typical lineup: HXGN15 semi-insulated RMU for a standard room; HSRM16 gas cubicles where the room is a basement.",
    },
    scope: [
      { zh: "进线、出线、变压器保护单元并柜。", en: "Incomer, feeder, and transformer-protection ways coupled." },
      { zh: "正面操作，靠墙布置。", en: "Front operation, set against a wall." },
      { zh: "接地开关位置在操作面可见。", en: "Earthing-switch position visible on the operating face." },
    ],
    products: ["hxgn15-12", "hsrm16-12"],
  },
  {
    slug: "hengli-plant",
    index: "06",
    region: "CN",
    sea: false,
    industry: "industrial",
    title: { zh: "横沥厂房成套接口", en: "Hengli plant, matched lineup" },
    place: { zh: "中国 · 东莞横沥", en: "Hengli, Dongguan, China" },
    summary: {
      zh: "典型配置：同一工厂完成中置柜、干式变压器和低压柜，进出线接口在出厂前对好。",
      en: "Typical lineup: metal-clad panels, dry-type transformer, and LV assembly from the same plant, with HV and LV interfaces matched before shipment.",
    },
    scope: [
      { zh: "一次方案与二次原理在厂内会签。", en: "Single-line and schematic signed off inside the factory." },
      { zh: "出厂试验后整列或分柜发运。", en: "Shipped as a lineup or as panels after routine tests." },
      { zh: "现场以就位和电缆接入为主。", en: "Site work is setting and cable termination." },
    ],
    products: ["kyn28-12", "scb14", "gcs"],
  },
];

export function getCase(slug: string) {
  return cases.find((item) => item.slug === slug) ?? null;
}
