import type { Copy } from "@/lib/copy";

export type NewsBlock =
  | { type: "p"; text: Copy }
  | { type: "h"; text: Copy }
  | { type: "quote"; text: Copy };

export type NewsItem = {
  slug: string;
  category: "company" | "industry";
  date: string;
  title: Copy;
  summary: Copy;
  blocks: NewsBlock[];
};

export const news: NewsItem[] = [
  {
    slug: "hengli-assembly-and-routine-tests",
    category: "company",
    date: "2026-08-12",
    title: {
      zh: "横沥工厂怎么把一台柜子交出去",
      en: "How a panel leaves the Hengli plant",
    },
    summary: {
      zh: "从一次图、铜排、二次配线到出厂试验。给采购和工程对照的流程，不是参观口号。",
      en: "From the single-line, busbar, and secondary wiring to routine tests. A sequence for buyers and engineers, not a factory-tour slogan.",
    },
    blocks: [
      {
        type: "p",
        text: {
          zh: "广东阿海法电气的成套在东莞横沥镇利源路 13 号完成。采购关心的不是车间标语，而是一台 KYN28、一台 GCS 或一座 YBW 箱变离开工厂之前，哪些东西已经对过。",
          en: "Ahifa assembles switchgear at No. 13 Liyuan Road, Hengli, Dongguan. Buyers are not asking for a workshop slogan. They want to know what has already been matched before a KYN28, a GCS, or a YBW substation leaves the plant.",
        },
      },
      {
        type: "h",
        text: { zh: "先锁一次图，再开料", en: "Lock the single-line, then cut metal" },
      },
      {
        type: "p",
        text: {
          zh: "柜宽、手车、抽屉回路、变压器容量和箱变三室的开门方向，都来自确认后的一次图和布置图。铜排规格和元器件品牌写在报价里。生产不另换一档材料来消化价格。",
          en: "Panel width, trucks, drawer circuits, transformer rating, and which way the three substation doors swing all come from the approved single-line and layout. Busbar section and component brands sit on the quotation. Production does not quietly step down a material to make the price.",
        },
      },
      {
        type: "h",
        text: { zh: "二次配线在厂里做完", en: "Secondary wiring is finished in the plant" },
      },
      {
        type: "p",
        text: {
          zh: "继电器室或抽屉内的二次线在横沥完成，而不是把一束散线交给现场。回路检查和机械特性随柜体做。箱变则在三室装完后整站发运，现场工作收成就位、接电缆和交接试验。",
          en: "Wiring in the relay compartment or the drawer is finished in Hengli, rather than a bundle of loose wire handed to the site. Circuit checks and mechanism checks travel with the panel. A compact substation ships after the three rooms are fitted. Site work becomes setting, cabling, and the handover tests.",
        },
      },
      {
        type: "quote",
        text: {
          zh: "出厂前能对上的接口，就不要留到基础已经浇完再改。",
          en: "An interface that can be matched before shipment should not wait until the foundation is poured.",
        },
      },
      {
        type: "h",
        text: { zh: "资料随柜走", en: "Documents travel with the gear" },
      },
      {
        type: "p",
        text: {
          zh: "随货至少包括一次图、布置图、二次原理和装箱清单。认证证书以客户核验后的扫描件为准，本站只列出设计所参照的公开标准，不把未核验的证书挂上墙。",
          en: "The shipment includes at least the single-line, general arrangement, schematic, and packing list. Certificates go up only after the client has checked the scans. This site lists the published standards the design follows. It does not hang unverified certificates on the wall.",
        },
      },
      {
        type: "p",
        text: {
          zh: "若要把工况交给工厂，直接写电压、电流、数量和交货地。销售工程师按 1 个工作日回复第一轮技术澄清。",
          en: "To put a duty in front of the plant, write voltage, current, quantity, and delivery place. A sales engineer replies to the first technical clarification within one business day.",
        },
      },
    ],
  },
  {
    slug: "gas-cubicle-for-tight-rooms",
    category: "industry",
    date: "2026-06-03",
    title: {
      zh: "配电房又矮又潮时，为什么会改用充气柜",
      en: "When the room is low and damp, the scheme moves to a gas cubicle",
    },
    summary: {
      zh: "HXGN15 与 HSRM16 不是互相替换的商标，而是两种房间条件。",
      en: "HXGN15 and HSRM16 are not interchangeable badges. They answer two different rooms.",
    },
    blocks: [
      {
        type: "p",
        text: {
          zh: "半绝缘空气环网柜靠净距和维护通道。地下室、沿海配电房和净高不够的市政站，往往装不下同一方案的空气柜。这时 HSRM16 这种全绝缘充气柜才是对的柜子，而不是更贵的替代品。",
          en: "A semi-insulated air RMU needs clearances and an aisle. Basements, coastal rooms, and low municipal stations often cannot take the air-insulated version of the same scheme. That is when an HSRM16 fully insulated gas cubicle is the correct panel, not a more expensive substitute.",
        },
      },
      {
        type: "p",
        text: {
          zh: "选型时把房间净高、靠墙与否、湿度、以及要 12 kV 还是 24 kV 一起给工厂。气体种类和箱体压力写进技术协议，不写在广告句里。",
          en: "Send the plant the room height, whether the gear sits against a wall, the humidity, and whether the duty is 12 kV or 24 kV. Gas type and tank pressure belong in the technical agreement, not in an advertising line.",
        },
      },
    ],
  },
  {
    slug: "pv-cabinet-interface",
    category: "industry",
    date: "2026-04-21",
    title: {
      zh: "光伏并网柜要按逆变器清单分支",
      en: "A PV grid cabinet is branched from the inverter list",
    },
    summary: {
      zh: "只报一个总电流，报装时会在计量和分支保护上被退回来。",
      en: "A single total current is how these cabinets get sent back, on metering and on feeder protection.",
    },
    blocks: [
      {
        type: "p",
        text: {
          zh: "AH-PV400 的工作是把逆变器交流侧收成一个清楚的并网点：分支断路器、汇流、浪涌、表计室，再出去到厂区低压母线。防孤岛由逆变器和电网公司的接入要求决定，柜子提供位置，不代替批复。",
          en: "The job of an AH-PV400 is to turn inverter AC outputs into one clear point of connection: feeder breakers, a bus, surge protection, a meter compartment, then out to the plant LV bus. Anti-islanding is decided by the inverters and the utility. The cabinet provides the space. It does not stand in for the approval.",
        },
      },
      {
        type: "p",
        text: {
          zh: "询价时附上逆变器型号、台数、交流额定电流和电网公司对计量柜的位置要求。工厂按这份清单画分支，而不是按一个整数电流估一台空柜。",
          en: "An inquiry should attach inverter model, quantity, AC rated current, and the utility’s note on where the meter sits. The plant draws the feeders from that list, rather than guessing an empty cabinet from one round current.",
        },
      },
    ],
  },
  {
    slug: "substation-three-rooms",
    category: "company",
    date: "2026-02-18",
    title: {
      zh: "欧式箱变的三室不要并成一扇门",
      en: "The three rooms of a European substation do not share one door",
    },
    summary: {
      zh: "高压、变压器、低压分室，是为了运行和检修不必互相占门。",
      en: "HV, transformer, and LV stay in separate rooms so operation and maintenance are not queued at the same door.",
    },
    blocks: [
      {
        type: "p",
        text: {
          zh: "YBW-12 是欧式预装式箱变。高压环网或充气柜、变压器、低压成套各有一室。美式垫装箱变是另一种布置：单侧操作，油浸变压器常与低压共箱。两种都做，但不能在外形图上画成同一种。",
          en: "YBW-12 is a European prefabricated substation. The HV ring main or gas cubicle, the transformer, and the LV assembly each have a room. An American pad-mount is a different arrangement: single-side operation, and the oil transformer often shares the LV compartment. Ahifa builds both. They are not the same outline drawing.",
        },
      },
      {
        type: "p",
        text: {
          zh: "询价写清高压方案、变压器油或干式、低压馈线数、外壳颜色和基础允许的运输尺寸。开门方向要在浇基础之前确认。",
          en: "An inquiry should state the HV scheme, oil or dry-type transformer, LV feeder count, enclosure colour, and the transport size the foundation allows. Door swing has to be fixed before the foundation is poured.",
        },
      },
    ],
  },
];

export function getNews(slug: string) {
  return news.find((item) => item.slug === slug) ?? null;
}
