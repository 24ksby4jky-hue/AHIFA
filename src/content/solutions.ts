import type { Copy } from "@/lib/copy";
import type { ApplicationId } from "@/content/products";

export type Solution = {
  slug: string;
  industry: ApplicationId;
  index: string;
  title: Copy;
  summary: Copy;
  challenge: Copy[];
  approach: Copy[];
  composition: Copy[];
  products: string[];
  cases: string[];
};

export const solutions: Solution[] = [
  {
    slug: "grid",
    industry: "grid",
    index: "01",
    title: { zh: "电网与市政配网", en: "Utility and municipal distribution" },
    summary: {
      zh: "电缆环网、开闭所和末端公变。柜型按 12 / 24 kV 和房间条件选空气环网或充气柜。",
      en: "Cable rings, switching stations, and public distribution at the end of a feeder. Air RMU or gas cubicles, chosen for 12 / 24 kV and the room.",
    },
    challenge: [
      {
        zh: "市政配电房往往靠墙、潮湿、净高有限。空气柜的维护通道和充气柜的密封方案不能混用同一张布置图。",
        en: "Municipal rooms are often against a wall, humid, and low. The aisle an air-insulated panel needs is not the same layout as a sealed gas cubicle.",
      },
    ],
    approach: [
      {
        zh: "环网进线用 HXGN15 或 HSRM16。需要断路器分段和计量时，开闭所改用 KYN28 列柜。末端公变用 YBW-12 整站预装。",
        en: "Ring ways use HXGN15 or HSRM16. Where the switching station needs breaker sections and metering, the lineup changes to KYN28. A public transformer at the feeder end uses a factory-built YBW-12.",
      },
    ],
    composition: [
      { zh: "环网进线与出线单元", en: "Ring incomer and feeder ways" },
      { zh: "必要时的断路器分段柜", en: "Breaker section panels where the scheme needs them" },
      { zh: "预装式箱变或室内干式变压器", en: "Prefabricated substation or an indoor dry-type transformer" },
    ],
    products: ["hxgn15-12", "hsrm16-12", "kyn28-12", "ybw-12"],
    cases: ["municipal-rmu", "batam-substation"],
  },
  {
    slug: "industrial",
    industry: "industrial",
    index: "02",
    title: { zh: "工业厂房与园区", en: "Plants and industrial parks" },
    summary: {
      zh: "进线中置柜、干式变压器、抽出式动力中心。回路按工艺负荷而不是按样本页拼柜。",
      en: "Metal-clad incomers, a dry-type transformer, and a withdrawable MCC. Circuits follow the process load, not a catalogue page.",
    },
    challenge: [
      {
        zh: "厂房进线、电动机馈线和照明往往被拆给不同供应商，接口铜排和保护定值到现场才对不上。",
        en: "Plant incomers, motor feeders, and lighting are often split across suppliers. Busbar interfaces and protection settings then fail to meet on site.",
      },
    ],
    approach: [
      {
        zh: "10 kV 或 12 kV 进线、SCB14、GCS 由同一张一次图出图。抽屉回路、元器件品牌和电缆室在技术协议里锁死。",
        en: "The 10 kV or 12 kV incomer, SCB14, and GCS are drawn on one single-line. Drawer circuits, component brands, and the cable compartment are locked in the technical agreement.",
      },
    ],
    composition: [
      { zh: "KYN28 进线与馈线", en: "KYN28 incomer and feeders" },
      { zh: "SCB14 干式变压器", en: "SCB14 dry-type transformer" },
      { zh: "GCS 动力中心与 XL-21 末端箱", en: "GCS MCC and XL-21 final boxes" },
    ],
    products: ["kyn28-12", "scb14", "gcs"],
    cases: ["binh-duong-plant", "hengli-plant"],
  },
  {
    slug: "newenergy",
    industry: "newenergy",
    index: "03",
    title: { zh: "新能源电站", en: "Solar and storage yards" },
    summary: {
      zh: "分布式光伏的交流并网柜，以及场区箱变。并网点、计量和厂用低压分开布置。",
      en: "AC grid-connection cabinets for distributed PV, and yard substations. The point of connection, metering, and auxiliary LV stay in separate compartments.",
    },
    challenge: [
      {
        zh: "逆变器出路数多，并网柜如果只按总电流估，分支保护和计量位置会在报装时被退回。",
        en: "Inverter counts are high. A grid cabinet sized only on total current gets rejected when feeder protection and the meter position are missing at interconnection.",
      },
    ],
    approach: [
      {
        zh: "AH-PV400 按逆变器清单分支。场区升压或厂用变电用 YBW-12。保护与电网公司的接入意见在报价前对齐，不把接入批复写进柜体铭牌。",
        en: "AH-PV400 is branched from the inverter schedule. Yard step-up or auxiliary power uses YBW-12. Protection is aligned with the utility’s interconnection comments before the quote. The cabinet nameplate does not claim the utility’s approval.",
      },
    ],
    composition: [
      { zh: "逆变器交流汇流与并网柜", en: "Inverter AC collection and the grid cabinet" },
      { zh: "计量与浪涌分区", en: "Metering and surge zones" },
      { zh: "场区箱变", en: "Yard compact substation" },
    ],
    products: ["ah-pv400", "ybw-12", "gcs"],
    cases: ["chonburi-pv"],
  },
  {
    slug: "building",
    industry: "building",
    index: "04",
    title: { zh: "数据中心与商业楼宇", en: "Data centers and commercial buildings" },
    summary: {
      zh: "楼宇变配电：干式变压器、低压抽出式、需要时的 12 kV 进线。强调室内布置和回路可抽出。",
      en: "Building substations: dry-type transformers, withdrawable LV, and a 12 kV incomer when the supply needs it. Indoor layout and withdrawable circuits.",
    },
    challenge: [
      {
        zh: "楼层配电房净高、运输通道和噪声比厂房更紧。油浸变压器和固定式大柜经常进不了货梯。",
        en: "Floor substations are tighter on height, the goods lift, and noise than a plant. Oil-filled transformers and deep fixed panels often do not fit the lift.",
      },
    ],
    approach: [
      {
        zh: "优先 SCB14 与 GCS。数据机房的馈线抽屉按列头柜上游回路编号。充气柜用于地下室高压，减少对环境的依赖。",
        en: "SCB14 and GCS come first. Data-hall feeders are numbered to the row PDUs they feed. Gas cubicles cover basement HV, where the room climate is poor.",
      },
    ],
    composition: [
      { zh: "地下室 HSRM16 或 KYN28", en: "Basement HSRM16 or KYN28" },
      { zh: "SCB14", en: "SCB14" },
      { zh: "GCS 馈线抽屉", en: "GCS feeder drawers" },
    ],
    products: ["hsrm16-12", "scb14", "gcs"],
    cases: ["penang-data"],
  },
  {
    slug: "mining",
    industry: "mining",
    index: "05",
    title: { zh: "房地产、矿山与冶金", en: "Estates, mining, and metals" },
    summary: {
      zh: "小区变电与矿山、冶金辅助配电。粉尘和冲击负荷下，柜体防护和电动机回路要单独说明。",
      en: "Estate substations, and auxiliary distribution for mining and metals. Dust and shock loads need their own note on enclosure and motor circuits.",
    },
    challenge: [
      {
        zh: "房地产项目要的是可复制的箱变；矿山和冶金要的是能承受电动机启动的低压柜。用同一份样本页会把两者写错。",
        en: "An estate project wants a repeatable compact substation. A mine or a metals plant wants an LV board that can start motors. One catalogue page writes both of them wrong.",
      },
    ],
    approach: [
      {
        zh: "小区和园区末端用 YBW-12。矿山与冶金动力中心用 GCS，进线短路容量和电动机启动在询价表里单列。粉尘场所提高外壳要求，不默认 IP4X。",
        en: "Estates and park ends use YBW-12. Mine and metals MCCs use GCS, with fault level and motor starting called out on the inquiry. Dusty rooms raise the enclosure requirement. IP4X is not assumed.",
      },
    ],
    composition: [
      { zh: "预装式箱变", en: "Prefabricated substation" },
      { zh: "KYN28 进线（需要高压断路器时）", en: "KYN28 incomer, when an HV breaker is required" },
      { zh: "GCS 电动机与馈线抽屉", en: "GCS motor and feeder drawers" },
    ],
    products: ["ybw-12", "kyn28-12", "gcs"],
    cases: ["hengli-plant"],
  },
];

export function getSolution(slug: string) {
  return solutions.find((item) => item.slug === slug) ?? null;
}
