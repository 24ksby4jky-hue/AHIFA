import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AHIFA",
  description: "广东阿海法电气",
  alternates: { canonical: "/zh/" },
};

export default function RootRedirectPage() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "18vh 24px",
        background: "#0A1E38",
        color: "#F4F7FA",
        minHeight: "100vh",
        fontFamily: "Inter, 'Noto Sans SC', 'WenQuanYi Micro Hei', sans-serif",
      }}
    >
      <meta httpEquiv="refresh" content="0; url=/zh/" />
      <p style={{ letterSpacing: "0.18em", color: "#3B82F6", fontFamily: "ui-monospace, monospace" }}>AHIFA</p>
      <h1 style={{ fontSize: 32, lineHeight: "40px", fontWeight: 600 }}>正在进入中文首页</h1>
      <p style={{ fontSize: 16, lineHeight: "26px" }}>
        <Link href="/zh" style={{ color: "#fff", marginRight: 20 }}>
          中文首页
        </Link>
        <Link href="/en" style={{ color: "#fff" }}>
          English home
        </Link>
      </p>
      <script
        dangerouslySetInnerHTML={{
          __html: 'location.replace("/zh/")',
        }}
      />
    </main>
  );
}
