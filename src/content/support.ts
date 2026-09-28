import type { Copy } from "@/lib/copy";

export type DownloadItem = {
  id: string;
  type: "manual" | "drawing" | "certificate";
  title: Copy;
  meta: string;
  product?: string;
  note: Copy;
};

export const downloads: DownloadItem[] = [
  {
    id: "kyn28-manual",
    type: "manual",
    title: { zh: "KYN28-12 选型说明", en: "KYN28-12 selection notes" },
    meta: "PDF · 手册",
    product: "kyn28-12",
    note: {
      zh: "柜宽、电流、开断电流与手车方案的选用顺序。",
      en: "Order of selection for width, current, breaking current, and truck.",
    },
  },
  {
    id: "hxgn-manual",
    type: "manual",
    title: { zh: "HXGN15 单元组合", en: "HXGN15 way combinations" },
    meta: "PDF · 手册",
    product: "hxgn15-12",
    note: {
      zh: "进线、出线、计量单元的并柜方式。",
      en: "How incomer, feeder, and metering ways are coupled.",
    },
  },
  {
    id: "pv-manual",
    type: "manual",
    title: { zh: "AH-PV400 并网接口", en: "AH-PV400 grid interface" },
    meta: "PDF · 手册",
    product: "ah-pv400",
    note: {
      zh: "逆变器清单如何落到分支断路器和计量室。",
      en: "How an inverter schedule becomes feeder breakers and a meter compartment.",
    },
  },
  {
    id: "ybw-drawing",
    type: "drawing",
    title: { zh: "YBW-12 三室布置", en: "YBW-12 three-room arrangement" },
    meta: "PDF · 图纸",
    product: "ybw-12",
    note: {
      zh: "高压、变压器、低压的平面与开门方向。",
      en: "Plan of HV, transformer, and LV, with door swings.",
    },
  },
  {
    id: "kyn-drawing",
    type: "drawing",
    title: { zh: "KYN28-12 隔室示意", en: "KYN28-12 compartment sketch" },
    meta: "PDF · 图纸",
    product: "kyn28-12",
    note: {
      zh: "继电器室、手车、电缆室的正视关系。确认图另出。",
      en: "Front relationship of relay, truck, and cable compartments. The approved drawing is separate.",
    },
  },
  {
    id: "standards-note",
    type: "certificate",
    title: { zh: "设计参照标准清单", en: "List of design standards" },
    meta: "PDF · 说明",
    note: {
      zh: "IEC 62271-200、GB/T 3906、GB/T 7251.1、GB/T 17467。证书扫描件在核验后替换本清单。",
      en: "IEC 62271-200, GB/T 3906, GB/T 7251.1, GB/T 17467. Certificate scans replace this list after they are checked.",
    },
  },
];

export const downloadTypes: { id: DownloadItem["type"] | "all"; label: Copy }[] = [
  { id: "all", label: { zh: "全部", en: "All" } },
  { id: "manual", label: { zh: "选型手册", en: "Selection notes" } },
  { id: "drawing", label: { zh: "布置图纸", en: "Arrangement drawings" } },
  { id: "certificate", label: { zh: "标准与证书", en: "Standards & certificates" } },
];

export const faqs: { q: Copy; a: Copy }[] = [
  {
    q: { zh: "报价需要哪些条件？", en: "What does a quotation need?" },
    a: {
      zh: "电压、电流或容量、数量、使用场所（室内、地下室、户外箱变）和交货地。有一次图或逆变器清单时一并附上。",
      en: "Voltage, current or rating, quantity, the room (indoor, basement, outdoor substation), and delivery place. Attach a single-line or an inverter schedule if you have one.",
    },
  },
  {
    q: { zh: "图纸什么时候给？", en: "When are drawings issued?" },
    a: {
      zh: "选型确认后出布置图和二次原理。本站的结构示意只说明隔室关系，不代替确认图。",
      en: "General arrangement and schematics follow once the selection is agreed. The sketches on this site show compartments only. They are not the approved drawing.",
    },
  },
  {
    q: { zh: "质保怎么算？", en: "How does warranty work?" },
    a: {
      zh: "质保月数写在合同和报价单里，从出厂试验合格、双方确认的起算点计算。不在网页上改写成一个对所有柜子都一样的月数。",
      en: "Warranty months are written in the contract and the quotation, counted from the start point both sides confirm after routine tests. The website does not invent one period for every panel.",
    },
  },
  {
    q: { zh: "东南亚怎么交货？", en: "How do you ship to Southeast Asia?" },
    a: {
      zh: "工厂在东莞横沥。贸易条款按项目谈，常见是东莞工厂交货或深圳港装船。包装按海运柜体，箱变注明整站尺寸。",
      en: "The plant is in Hengli, Dongguan. Incoterms are agreed per job, commonly ex works Hengli or FOB Shenzhen. Packing is for ocean freight. Compact substations state the complete unit size.",
    },
  },
  {
    q: { zh: "元器件品牌可以指定吗？", en: "Can we name component brands?" },
    a: {
      zh: "可以。断路器、继电器、仪表的品牌写进报价。未写明的项目不在生产时替换。",
      en: "Yes. Breaker, relay, and meter brands are written into the quotation. Items that are not named are not swapped in production.",
    },
  },
  {
    q: { zh: "出了问题找谁？", en: "Who do we call if something fails?" },
    a: {
      zh: "先打合同上的项目工程师。珠三角由横沥工厂对接，其他地区按合同约定的服务点。电话 0769-8117 7338，手机 136 5252 6609。",
      en: "Start with the project engineer named in the contract. The Pearl River Delta is handled from Hengli; other regions follow the service point in the contract. Tel. 0769-8117 7338, mobile 136 5252 6609.",
    },
  },
];

export const warrantyPoints: Copy[] = [
  {
    zh: "质保范围以合同列明的柜体、母线和工厂配线为界。用户自行更换的元器件另行约定。",
    en: "Warranty covers the enclosure, busbar, and factory wiring named in the contract. Components the user later swaps are agreed separately.",
  },
  {
    zh: "出厂资料包括试验记录、一次图和装箱清单。现场交接试验由合同规定由谁实施。",
    en: "Factory documents include test records, the single-line, and the packing list. The contract states who runs the site handover tests.",
  },
  {
    zh: "备件按柜号和回路号提供，不按模糊的“同型号”发货。",
    en: "Spares are supplied against panel number and circuit number, not against a vague “same model”.",
  },
];
