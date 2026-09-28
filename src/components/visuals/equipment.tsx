import { cn } from "cn";
import type { PlateKind } from "@/content/products";

const stroke = "#8EBAF5";
const hot = "#3B82F6";
const fill = "#123B6B";
const deep = "#0A1E38";

export function EquipmentPlate({
  kind,
  className,
  title,
}: {
  kind: PlateKind | "lineup";
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 640 420"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={title ?? "Switchgear arrangement"}
    >
      <rect x="0" y="0" width="640" height="420" fill={deep} />
      <g opacity="0.45" stroke="rgba(59,130,246,0.35)" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 52} y1="24" x2={40 + i * 52} y2="396" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h${i}`} x1="24" y1={36 + i * 48} x2="616" y2={36 + i * 48} />
        ))}
      </g>
      {kind === "lineup" ? <Lineup /> : <Single kind={kind} />}
      <g fill={hot} fontFamily="ui-monospace, monospace" fontSize="11">
        <text x="28" y="28">AHIFA / HENGLI</text>
        <text x="470" y="404">12–24 kV · 0.4 kV</text>
      </g>
    </svg>
  );
}

function Single({ kind }: { kind: PlateKind }) {
  if (kind === "kyn") return <Kyn x={230} y={48} />;
  if (kind === "rmu") return <Rmu x={150} y={78} />;
  if (kind === "gis") return <Gis x={170} y={90} />;
  if (kind === "gcs") return <Gcs x={210} y={50} />;
  if (kind === "transformer") return <Transformer x={200} y={70} />;
  if (kind === "pv") return <Pv x={200} y={56} />;
  return <Substation x={120} y={90} />;
}

function Lineup() {
  return (
    <g>
      <Kyn x={70} y={48} scale={0.86} />
      <Rmu x={230} y={86} scale={0.78} />
      <Substation x={390} y={120} scale={0.72} />
      <line x1="78" y1="360" x2="560" y2="360" stroke={hot} strokeWidth="1.5" />
      <text x="150" y="382" fill={stroke} fontFamily="ui-monospace, monospace" fontSize="11">
        KYN28
      </text>
      <text x="300" y="382" fill={stroke} fontFamily="ui-monospace, monospace" fontSize="11">
        RMU
      </text>
      <text x="455" y="382" fill={stroke} fontFamily="ui-monospace, monospace" fontSize="11">
        YBW
      </text>
    </g>
  );
}

function Kyn({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect x="0" y="0" width="150" height="320" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <path d="M150 0 L162 12 L162 332 L150 320 Z" fill="#0E2A4E" stroke={stroke} strokeWidth="1" />
      <rect x="12" y="14" width="126" height="70" fill={deep} stroke={hot} strokeWidth="1.5" />
      <rect x="22" y="28" width="46" height="8" fill={hot} />
      <rect x="22" y="44" width="78" height="4" fill={stroke} opacity="0.7" />
      <rect x="22" y="54" width="60" height="4" fill={stroke} opacity="0.45" />
      <rect x="12" y="96" width="126" height="120" fill={deep} stroke={stroke} strokeWidth="1.5" />
      <circle cx="75" cy="156" r="22" fill="none" stroke={hot} strokeWidth="1.5" />
      <circle cx="75" cy="156" r="6" fill={hot} />
      <rect x="12" y="228" width="126" height="78" fill={deep} stroke={stroke} strokeWidth="1.5" />
      <path d="M28 246 H122 M28 262 H100 M28 278 H110" stroke={stroke} strokeWidth="1.5" />
    </g>
  );
}

function Rmu({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${i * 92} 0)`}>
          <rect width="86" height="250" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <rect x="14" y="18" width="58" height="36" fill={deep} stroke={hot} strokeWidth="1.5" />
          <circle cx="43" cy="110" r="16" fill="none" stroke={hot} strokeWidth="1.5" />
          <path d="M28 160 H58 M43 160 V200" stroke={stroke} strokeWidth="1.5" />
          <rect x="24" y="206" width="38" height="22" fill={deep} stroke={stroke} strokeWidth="1.5" />
        </g>
      ))}
    </g>
  );
}

function Gis({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="300" height="230" rx="18" fill={fill} stroke={hot} strokeWidth="1.5" />
      <rect x="16" y="16" width="268" height="198" rx="12" fill={deep} stroke={stroke} strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${48 + i * 80} 48)`}>
          <rect width="48" height="90" fill={fill} stroke={stroke} strokeWidth="1.5" />
          <circle cx="24" cy="36" r="10" fill="none" stroke={hot} strokeWidth="1.5" />
          <path d="M24 70 V120" stroke={hot} strokeWidth="1.5" />
        </g>
      ))}
    </g>
  );
}

function Gcs({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="200" height="320" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(16 ${16 + i * 58})`}>
          <rect width="168" height="48" fill={deep} stroke={i === 0 ? hot : stroke} strokeWidth="1.5" />
          <circle cx="24" cy="24" r="6" fill={hot} />
          <path d="M44 24 H140" stroke={stroke} strokeWidth="1.5" />
        </g>
      ))}
    </g>
  );
}

function Transformer({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="240" height="260" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${36 + i * 62} 40)`}>
          <rect width="46" height="160" fill={deep} stroke={hot} strokeWidth="1.5" />
          <path d="M8 20 H38 M8 40 H38 M8 60 H38 M8 80 H38 M8 100 H38 M8 120 H38 M8 140 H38" stroke={stroke} strokeWidth="1.5" />
        </g>
      ))}
      <path d="M30 230 H210" stroke={hot} strokeWidth="2" />
    </g>
  );
}

function Pv({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="230" height="300" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <path d="M24 28 H90 L108 48 H200" stroke={hot} strokeWidth="1.5" fill="none" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="28" y={70 + i * 42} width="78" height="30" fill={deep} stroke={stroke} strokeWidth="1.5" />
      ))}
      <rect x="124" y="70" width="78" height="150" fill={deep} stroke={hot} strokeWidth="1.5" />
      <circle cx="163" cy="130" r="28" fill="none" stroke={hot} strokeWidth="1.5" />
      <path d="M163 108 V152 M141 130 H185" stroke={hot} strokeWidth="1.5" />
    </g>
  );
}

function Substation({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path d="M0 36 H360 L340 0 H20 Z" fill={fill} stroke={hot} strokeWidth="1.5" />
      <rect y="36" width="360" height="180" fill={fill} stroke={stroke} strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${16 + i * 114} 52)`}>
          <rect width="100" height="146" fill={deep} stroke={stroke} strokeWidth="1.5" />
          <path d="M16 24 H84 M16 44 H64" stroke={i === 1 ? hot : stroke} strokeWidth="1.5" />
          <rect x="28" y="78" width="44" height="44" fill={fill} stroke={hot} strokeWidth="1.5" />
        </g>
      ))}
    </g>
  );
}
