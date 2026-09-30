import type { Copy } from "@/lib/copy";

export type SeriesId = "hv" | "lv" | "transformer" | "newenergy" | "substation";
export type ApplicationId =
  | "grid"
  | "industrial"
  | "newenergy"
  | "building"
  | "mining";
export type PlateKind =
  | "kyn"
  | "rmu"
  | "gis"
  | "gcs"
  | "transformer"
  | "pv"
  | "substation";

export type CatalogImage = {
  src: string;
  alt: Copy;
  note?: Copy;
};

export type Product = {
  slug: string;
  series: SeriesId;
  model: string;
  plate: PlateKind;
  voltages: string[];
  applications: ApplicationId[];
  image?: CatalogImage;
  gallery?: CatalogImage[];
  name: Copy;
  summary: Copy;
  overview: Copy[];
  features: Copy[];
  specs: { key: Copy; value: string }[];
  drawing: Copy;
  standards: string[];
  related: string[];
};

export const seriesList: {
  id: SeriesId;
  index: string;
  name: Copy;
  summary: Copy;
  image?: CatalogImage;
}[] = [
  {
    id: "hv",
    index: "01",
    name: { zh: "高压成套设备", en: "HV switchgear" },
    summary: {
      zh: "中置柜、半绝缘环网柜、全绝缘充气柜。12 kV 为主，充气柜覆盖 12 / 24 kV。",
      en: "Metal-clad panels, semi-insulated ring main units, and fully insulated gas cubicles. 12 kV as the base, gas cubicles through 12 / 24 kV.",
    },
  },
  {
    id: "lv",
    index: "02",
    name: { zh: "低压成套设备", en: "LV assemblies" },
    summary: {
      zh: "GCS / GCK / MNS 抽出式，GGD 固定式，以及 XL-21 动力配电箱。",
      en: "GCS, GCK, and MNS withdrawable assemblies, GGD fixed panels, and XL-21 power distribution boxes.",
    },
    image: {
      src: "/media/series-lv.webp",
      alt: { zh: "低压成套开关柜", en: "LV switchgear lineup" },
    },
  },
  {
    id: "transformer",
    index: "03",
    name: { zh: "变压器", en: "Transformers" },
    summary: {
      zh: "SCB 干式与油浸式配电变压器，与高低压柜、箱变配套出厂。",
      en: "SCB dry-type and oil-immersed distribution transformers, shipped with the HV, LV, or substation lineup.",
    },
    image: {
      src: "/media/series-transformer.webp",
      alt: { zh: "树脂浇注干式变压器", en: "Cast-resin dry-type transformer" },
      note: {
        zh: "画册中的浇注干式变压器，不标成 SCB14。容量和型号以报价单为准。",
        en: "Catalogue cast-resin transformer, not labelled SCB14. Rating and model follow the quotation.",
      },
    },
  },
  {
    id: "newenergy",
    index: "04",
    name: { zh: "新能源与智能配电", en: "New energy & intelligent distribution" },
    summary: {
      zh: "光伏并网柜与智能工业配电柜，面向分布式光伏和园区动力。",
      en: "PV grid-connection cabinets and intelligent industrial panels for distributed solar and campus power.",
    },
  },
  {
    id: "substation",
    index: "05",
    name: { zh: "箱式变电站", en: "Compact substations" },
    summary: {
      zh: "欧式预装式箱变，美式箱变按项目配置。高压、变压器、低压在同一外壳。",
      en: "European prefabricated substations, with American pad-mount arrangements when the project calls for them. HV, transformer, and LV in one enclosure.",
    },
  },
];

export const voltageOptions = ["0.4kV", "10kV", "12kV", "24kV"] as const;

export const applicationOptions: { id: ApplicationId; label: Copy }[] = [
  { id: "grid", label: { zh: "电网 / 市政", en: "Utility & municipal" } },
  { id: "industrial", label: { zh: "工业厂房", en: "Industrial plants" } },
  { id: "newenergy", label: { zh: "新能源", en: "New energy" } },
  { id: "building", label: { zh: "数据中心 / 楼宇", en: "Data centers & buildings" } },
  { id: "mining", label: { zh: "矿山 / 冶金", en: "Mining & metals" } },
];

export const products: Product[] = [
  {
    slug: "kyn28-12",
    series: "hv",
    model: "KYN28-12",
    plate: "kyn",
    image: {
      src: "/media/product-kyn28.webp",
      alt: { zh: "KYN28 铠装中置式开关柜", en: "KYN28 metal-clad switchgear" },
    },
    voltages: ["12kV"],
    applications: ["grid", "industrial", "building", "mining"],
    name: { zh: "铠装中置式金属封闭开关柜", en: "Metal-clad withdrawable switchgear" },
    summary: {
      zh: "12 kV 铠装中置柜。断路器手车，继电器室、断路器室、电缆室分隔。用于开闭所、厂房进线与配电。",
      en: "12 kV metal-clad, withdrawable. Breaker truck, with relay, breaker, and cable compartments segregated. For switching stations, plant incomers, and distribution.",
    },
    overview: [
      {
        zh: "KYN28-12 是阿海法高压成套的主柜型。柜体为金属铠装，手车中置，推进与试验位置机械闭锁。二次室可按综保或常规继电器布置。",
        en: "KYN28-12 is the main HV panel in the Ahifa range. Metal-clad, mid-mounted truck, with mechanical interlocks between service and test positions. The LV compartment takes a protection relay or a conventional scheme.",
      },
      {
        zh: "母线室与电缆室分开。电缆室可装避雷器、接地开关和零序互感器。柜宽按电流与方案在 650、800、1000 mm 中选型，具体以一次图为准。",
        en: "Busbar and cable compartments are separate. The cable compartment can take surge arresters, an earthing switch, and a core-balance CT. Panel width is selected at 650, 800, or 1,000 mm from the single-line.",
      },
    ],
    features: [
      { zh: "金属铠装，隔室分隔，检修时减少带电暴露。", en: "Metal-clad compartments, so maintenance sees less live gear." },
      { zh: "手车推进、试验、移出三位置，机械与电气联锁。", en: "Truck service, test, and withdrawn positions, mechanically and electrically interlocked." },
      { zh: "可配真空断路器，额定电流与开断电流按工程选取。", en: "Vacuum circuit-breaker. Rated current and breaking current selected per project." },
      { zh: "二次配线在横沥工厂完成，出厂前做机械特性与回路检查。", en: "Secondary wiring is finished in Hengli and checked, with the mechanism, before shipment." },
    ],
    specs: [
      { key: { zh: "额定电压", en: "Rated voltage" }, value: "12 kV" },
      { key: { zh: "额定频率", en: "Rated frequency" }, value: "50 Hz" },
      { key: { zh: "额定电流", en: "Rated current" }, value: "630 – 3,150 A" },
      { key: { zh: "额定短路开断电流", en: "Rated short-circuit breaking current" }, value: "20 – 40 kA" },
      { key: { zh: "外壳防护", en: "Enclosure" }, value: "IP4X" },
      { key: { zh: "结构", en: "Construction" }, value: "Metal-clad / mid-mounted truck" },
      { key: { zh: "柜宽", en: "Panel width" }, value: "650 / 800 / 1,000 mm" },
    ],
    drawing: {
      zh: "正视示意：上继电器室，中断路器手车，下电缆室。尺寸以确认图为准。",
      en: "Front arrangement: relay compartment, breaker truck, cable compartment. Dimensions follow the approved drawing.",
    },
    standards: ["IEC 62271-200", "GB/T 3906"],
    related: ["hxgn15-12", "hsrm16-12", "ybw-12"],
  },
  {
    slug: "hxgn15-12",
    series: "hv",
    model: "HXGN15-12",
    plate: "rmu",
    image: {
      src: "/media/product-hxgn.webp",
      alt: { zh: "HXGN 交流金属封闭环网柜", en: "HXGN metal-enclosed ring main unit" },
    },
    voltages: ["12kV"],
    applications: ["grid", "industrial"],
    name: { zh: "半绝缘交流金属封闭环网柜", en: "Semi-insulated ring main unit" },
    summary: {
      zh: "12 kV 空气绝缘环网柜。负荷开关单元或负荷开关-熔断器组合，用于市政环网和终端用户。",
      en: "12 kV air-insulated ring main unit. Load-break or switch-fuse ways for municipal rings and consumer substations.",
    },
    overview: [
      {
        zh: "HXGN15-12 柜体紧凑，适合开闭所、箱变高压室和小区配电房。单元可按进线、出线、计量组合。",
        en: "HXGN15-12 is a compact air-insulated RMU for switching stations, the HV room of a compact substation, and neighbourhood substations. Ways combine incomer, feeder, and metering.",
      },
      {
        zh: "半绝缘结构，带电体对地以空气为主绝缘，局部用绝缘件加强。操作机构在正面，五防按方案配置。",
        en: "Semi-insulated: air is the main insulation to earth, with solid insulation at stress points. The mechanism is on the front. Interlocks follow the scheme.",
      },
    ],
    features: [
      { zh: "环网进线、出线、变压器保护单元可并柜。", en: "Ring incomer, feeder, and transformer-protection ways can be coupled." },
      { zh: "正面操作，适合靠墙安装的配电房。", en: "Front operation, suited to substations built against a wall." },
      { zh: "可带接地开关，检修前可见接地位置。", en: "Earthing switch available, with a visible earth position before work." },
    ],
    specs: [
      { key: { zh: "额定电压", en: "Rated voltage" }, value: "12 kV" },
      { key: { zh: "额定频率", en: "Rated frequency" }, value: "50 Hz" },
      { key: { zh: "额定电流", en: "Rated current" }, value: "630 A" },
      { key: { zh: "绝缘", en: "Insulation" }, value: "Air, semi-insulated" },
      { key: { zh: "典型单元", en: "Typical ways" }, value: "Load-break / switch-fuse" },
    ],
    drawing: {
      zh: "三单元并柜示意。单元顺序以一次系统图为准。",
      en: "Three-way lineup. Way order follows the single-line diagram.",
    },
    standards: ["IEC 62271-200", "GB/T 3906"],
    related: ["kyn28-12", "hsrm16-12", "ybw-12"],
  },
  {
    slug: "hsrm16-12",
    series: "hv",
    model: "HSRM16-12",
    plate: "gis",
    image: {
      src: "/media/product-hsrm16.webp",
      alt: { zh: "HSRM16 全绝缘充气环网柜", en: "HSRM16 fully insulated gas ring main unit" },
    },
    voltages: ["12kV", "24kV"],
    applications: ["grid", "industrial", "building"],
    name: { zh: "全绝缘充气环网柜", en: "Fully insulated gas ring main unit" },
    summary: {
      zh: "12 / 24 kV 全绝缘充气柜。密封箱体，适合潮湿、多尘和占地紧的城市配网。",
      en: "12 / 24 kV fully insulated gas RMU. Sealed tank for humid, dusty, and tight urban distribution rooms.",
    },
    overview: [
      {
        zh: "HSRM16 把开关封在充气箱里，外部全绝缘，受环境影响小于空气绝缘环网柜。城市电缆网改造和地下室配电房是主要场景。",
        en: "HSRM16 seals the switchgear in a gas tank. The outside is fully insulated, so the room climate matters less than it does for an air-insulated RMU. Urban cable networks and basement substations are the usual rooms.",
      },
      {
        zh: "扩展方式按项目定：固定单元或可扩展母线。箱体压力与气体种类在技术协议里写明，不在本页代替试验报告。",
        en: "Extension is fixed or by busbar, per project. Tank pressure and gas are stated in the technical agreement. This page does not replace a test report.",
      },
    ],
    features: [
      { zh: "全绝缘、全密封，适合高湿度配电房。", en: "Fully insulated and sealed, for high-humidity rooms." },
      { zh: "12 kV 与 24 kV 两个电压等级。", en: "Both 12 kV and 24 kV ratings." },
      { zh: "正面操作，占地小于同方案的空气柜。", en: "Front operation, smaller footprint than the air-insulated equivalent." },
    ],
    specs: [
      { key: { zh: "额定电压", en: "Rated voltage" }, value: "12 / 24 kV" },
      { key: { zh: "额定频率", en: "Rated frequency" }, value: "50 Hz" },
      { key: { zh: "额定电流", en: "Rated current" }, value: "630 A" },
      { key: { zh: "绝缘", en: "Insulation" }, value: "Gas, fully insulated" },
      { key: { zh: "安装", en: "Installation" }, value: "Indoor, front access" },
    ],
    drawing: {
      zh: "密封箱体与套管出线示意。扩展方向在布置图上确认。",
      en: "Sealed tank and bushing outlets. Extension direction is confirmed on the layout.",
    },
    standards: ["IEC 62271-200", "GB/T 3906"],
    related: ["hxgn15-12", "kyn28-12", "ybw-12"],
  },
  {
    slug: "gcs",
    series: "lv",
    model: "GCS",
    plate: "gcs",
    image: {
      src: "/media/product-gcs.webp",
      alt: { zh: "GCS 低压抽出式开关柜", en: "GCS LV withdrawable switchgear" },
    },
    voltages: ["0.4kV"],
    applications: ["industrial", "building", "mining"],
    name: { zh: "低压抽出式开关柜", en: "LV withdrawable switchgear" },
    summary: {
      zh: "0.4 kV 抽出式配电柜。功能单元抽屉化，用于厂房动力中心、数据机房和冶金辅助配电。",
      en: "0.4 kV withdrawable assembly. Functional units in drawers, for plant MCCs, data halls, and metals-plant auxiliaries.",
    },
    overview: [
      {
        zh: "GCS 柜架与抽屉模数化。进线、母联、馈线和电动机回路按方案混装。同系列还可提供 GCK、MNS 抽出式和 GGD 固定式。",
        en: "The GCS frame and drawers are modular. Incomers, bus couplers, feeders, and motor starters mix to the scheme. The same workshop also builds GCK and MNS withdrawable gear, and GGD fixed panels.",
      },
      {
        zh: "水平母线容量、抽屉回路和元器件品牌在报价单逐项列出，避免低配替换。XL-21 动力箱用于末端。",
        en: "Horizontal bus rating, drawer circuits, and component brands are itemised on the quotation, so the build is not quietly downgraded. XL-21 boxes cover the final distribution.",
      },
    ],
    features: [
      { zh: "抽屉单元可抽出检修，缩短回路停电。", en: "Drawers withdraw for service, so one circuit does not take the board down." },
      { zh: "进线、电容补偿、馈线可在同一列。", en: "Incomer, PFC, and feeders can share one lineup." },
      { zh: "元器件品牌与铜排规格写进报价。", en: "Component brands and busbar section are written into the quote." },
    ],
    specs: [
      { key: { zh: "额定工作电压", en: "Rated operational voltage" }, value: "400 V" },
      { key: { zh: "额定频率", en: "Rated frequency" }, value: "50 Hz" },
      { key: { zh: "水平母线", en: "Horizontal busbar" }, value: "Up to 4,000 A" },
      { key: { zh: "结构", en: "Construction" }, value: "Withdrawable drawers" },
      { key: { zh: "同系列", en: "Same range" }, value: "GCK / MNS / GGD / XL-21" },
    ],
    drawing: {
      zh: "抽屉层示意。回路高度以方案模数为准。",
      en: "Drawer stack. Circuit height follows the scheme module.",
    },
    standards: ["GB/T 7251.1", "IEC 61439-2"],
    related: ["ah-pv400", "scb14", "ybw-12"],
  },
  {
    slug: "scb14",
    series: "transformer",
    model: "SCB14",
    plate: "transformer",
    voltages: ["10kV", "0.4kV"],
    applications: ["industrial", "building", "grid"],
    name: { zh: "环氧浇注干式变压器", en: "Cast-resin dry-type transformer" },
    summary: {
      zh: "10 kV / 0.4 kV 干式变压器。用于楼宇、厂房和箱变变压器室。油浸式另按项目配置。",
      en: "10 kV / 0.4 kV cast-resin transformer for buildings, plants, and the transformer room of a compact substation. Oil-immersed units are quoted per project.",
    },
    overview: [
      {
        zh: "SCB14 线圈环氧浇注，不需要油坑，适合室内和箱变。容量、联结组别、阻抗和温升在询价时按负荷给出。",
        en: "SCB14 windings are cast in epoxy. No oil bund, so it suits indoor rooms and compact substations. Rating, vector group, impedance, and temperature rise are set from the load at inquiry.",
      },
      {
        zh: "可与 KYN28 或环网柜、GCS 低压柜成套供货，进出线接口在工厂对好，减少现场改铜排。",
        en: "It can ship with KYN28 or an RMU and a GCS LV board. HV and LV interfaces are matched in the factory so the site is not recutting busbar.",
      },
    ],
    features: [
      { zh: "室内安装，无绝缘油。", en: "Indoor installation, no insulating oil." },
      { zh: "可带温控与风机，按温升要求选。", en: "Temperature control and fans, selected to the temperature-rise duty." },
      { zh: "能与高低压柜同一张一次图供货。", en: "Supplied against the same single-line as the HV and LV gear." },
    ],
    specs: [
      { key: { zh: "额定电压", en: "Rated voltage" }, value: "10 / 0.4 kV" },
      { key: { zh: "容量范围", en: "Rating range" }, value: "315 – 2,500 kVA" },
      { key: { zh: "频率", en: "Frequency" }, value: "50 Hz" },
      { key: { zh: "冷却", en: "Cooling" }, value: "AN / AF" },
      { key: { zh: "绝缘", en: "Insulation" }, value: "Cast resin" },
    ],
    drawing: {
      zh: "铁心与浇注线圈示意。外形以该容量的外形图为准。",
      en: "Core and cast windings. Outline dimensions follow the drawing for the selected rating.",
    },
    standards: ["IEC 60076-11", "GB/T 1094.11"],
    related: ["ybw-12", "gcs", "kyn28-12"],
  },
  {
    slug: "ah-pv400",
    series: "newenergy",
    model: "AH-PV400",
    plate: "pv",
    voltages: ["0.4kV"],
    applications: ["newenergy", "industrial", "building"],
    name: { zh: "光伏并网柜", en: "PV grid-connection cabinet" },
    summary: {
      zh: "0.4 kV 光伏并网柜。接逆变器交流侧，完成隔离、保护、计量接口和浪涌防护，再送入厂区或建筑低压母线。",
      en: "0.4 kV PV grid-connection cabinet. It takes the inverter AC output, provides isolation, protection, a metering interface, and surge protection, then feeds the plant or building LV bus.",
    },
    overview: [
      {
        zh: "AH-PV400 用于分布式屋顶和小型地面电站的交流并网点。柜内按逆变器台数配置塑壳断路器或框架断路器、避雷器、电流互感器和表计室。防孤岛保护由逆变器与电网公司的接入要求共同确定，本柜提供安装和回路位置，不替代接入批复。",
        en: "AH-PV400 is the AC grid interface for rooftop and small ground-mount plants. The cabinet is arranged for the number of inverters: MCCB or ACB, surge arresters, CTs, and a meter compartment. Anti-islanding is set by the inverter and the utility interconnection rules. The cabinet provides the circuits and space; it does not replace the utility approval.",
      },
      {
        zh: "同系列还有智能工业配电柜，把测量、分合闸状态和通信接口做到厂房动力柜上，便于园区值班。通信协议在技术协议里约定。",
        en: "The same range includes intelligent industrial panels, with metering, breaker status, and a communications interface for a campus control room. The protocol is agreed in the technical specification.",
      },
    ],
    features: [
      { zh: "逆变器交流汇流后一点并网，边界清楚。", en: "Inverter AC outputs collect to one grid interface, so the boundary is clear." },
      { zh: "计量、隔离、浪涌分层布置。", en: "Metering, isolation, and surge protection are laid out in separate zones." },
      { zh: "可按屋顶电站回路数增减分支。", en: "Feeder count follows the number of rooftop inverter circuits." },
      { zh: "柜体与厂区 GCS 低压柜外观和接口可统一。", en: "Enclosure and interfaces can match the plant GCS lineup." },
    ],
    specs: [
      { key: { zh: "额定电压", en: "Rated voltage" }, value: "400 V" },
      { key: { zh: "额定频率", en: "Rated frequency" }, value: "50 Hz" },
      { key: { zh: "进线", en: "Incomers" }, value: "PV inverter AC" },
      { key: { zh: "出线", en: "Outgoing" }, value: "Site LV bus" },
      { key: { zh: "典型配置", en: "Typical fit-out" }, value: "Breaker + SPD + metering" },
      { key: { zh: "安装", en: "Installation" }, value: "Indoor / shelter" },
    ],
    drawing: {
      zh: "并网柜正视：分支断路器、汇流、计量室。分支数以逆变器清单为准。",
      en: "Front view: feeder breakers, bus, meter compartment. Feeder count follows the inverter schedule.",
    },
    standards: ["GB/T 7251.1", "IEC 61439-2"],
    related: ["gcs", "ybw-12", "scb14"],
  },
  {
    slug: "ybw-12",
    series: "substation",
    model: "YBW-12",
    plate: "substation",
    image: {
      src: "/media/product-ybw.webp",
      alt: { zh: "欧式预装式箱式变电站", en: "European prefabricated substation" },
    },
    gallery: [
      {
        src: "/media/product-ybw-wood.webp",
        alt: { zh: "木纹外壳箱变", en: "Wood-finish substation enclosure" },
      },
      {
        src: "/media/product-ybw-white.webp",
        alt: { zh: "白壳蓝顶箱变", en: "White substation enclosure with a blue roof" },
      },
      {
        src: "/media/product-ybw-yellow.webp",
        alt: { zh: "黄壳红顶箱变", en: "Yellow substation enclosure with a red roof" },
      },
    ],
    voltages: ["12kV", "0.4kV"],
    applications: ["grid", "industrial", "newenergy", "mining"],
    name: { zh: "欧式预装式箱式变电站", en: "European prefabricated substation" },
    summary: {
      zh: "12 kV / 0.4 kV 欧式箱变。高压环网、变压器、低压成套分室布置在同一外壳，工厂预装后整站运输。",
      en: "12 kV / 0.4 kV European compact substation. HV ring main, transformer, and LV assembly in separate compartments of one enclosure, factory-built and shipped as a unit.",
    },
    overview: [
      {
        zh: "YBW-12 把开闭、变压和低压分配收进预装外壳。高压室常用 HXGN15 或充气柜方案，变压器室放干式或油浸变压器，低压室用 GCS 或 GGD。三室独立开门。",
        en: "YBW-12 puts switching, transformation, and LV distribution in a prefabricated enclosure. The HV room usually takes HXGN15 or a gas cubicle, the transformer room a dry-type or oil-immersed unit, and the LV room GCS or GGD. Each room has its own door.",
      },
      {
        zh: "适用于工业园、市政末端和新能源场区的就地变电。美式箱变（垫装）在项目要求单侧操作、油浸变压器与低压共箱时另行配置。基础、通风和外壳防腐在布置图里确认。",
        en: "It suits industrial parks, the end of a municipal feeder, and new-energy yards that need a local substation. An American pad-mount is quoted when the project wants single-side operation and an oil transformer sharing the LV compartment. Foundation, ventilation, and enclosure finish are confirmed on the layout.",
      },
    ],
    features: [
      { zh: "工厂预装，现场以就位、接线、试验为主。", en: "Factory assembled. Site work is setting, cabling, and testing." },
      { zh: "高、变、低三室分隔，运行与检修互不占用同一门。", en: "HV, transformer, and LV rooms are separate, so operation and maintenance do not share one door." },
      { zh: "高压方案可选空气环网或充气柜。", en: "HV can be an air RMU or a gas cubicle." },
      { zh: "外壳按户外环境考虑通风与防腐。", en: "The enclosure is specified for outdoor ventilation and corrosion." },
    ],
    specs: [
      { key: { zh: "高压侧", en: "HV side" }, value: "12 kV" },
      { key: { zh: "低压侧", en: "LV side" }, value: "0.4 kV" },
      { key: { zh: "结构", en: "Arrangement" }, value: "European, three compartments" },
      { key: { zh: "高压柜", en: "HV gear" }, value: "HXGN15 or HSRM16" },
      { key: { zh: "变压器", en: "Transformer" }, value: "Dry-type or oil-immersed" },
      { key: { zh: "低压柜", en: "LV gear" }, value: "GCS or GGD" },
    ],
    drawing: {
      zh: "平面三室：高压、变压器、低压。开门方向在基础图上确认。",
      en: "Plan of three rooms: HV, transformer, LV. Door swing is confirmed on the foundation drawing.",
    },
    standards: ["GB/T 17467", "IEC 62271-202"],
    related: ["hxgn15-12", "scb14", "gcs", "ah-pv400"],
  },
];

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug) ?? null;
}

export function getSeries(id: SeriesId) {
  return seriesList.find((item) => item.id === id)!;
}
