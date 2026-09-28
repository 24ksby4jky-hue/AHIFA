export default function RootNotFound() {
  return (
    <html lang="zh">
      <body
        style={{
          margin: 0,
          background: "#0A1E38",
          color: "#F4F7FA",
          fontFamily: "Inter, 'Noto Sans SC', 'WenQuanYi Micro Hei', sans-serif",
        }}
      >
        <main style={{ maxWidth: 720, margin: "0 auto", padding: "18vh 24px" }}>
          <p style={{ letterSpacing: "0.18em", color: "#3B82F6", fontFamily: "ui-monospace, monospace" }}>
            404 / AHIFA
          </p>
          <h1 style={{ fontSize: 48, lineHeight: "56px", fontWeight: 600 }}>页面不在这套图纸里</h1>
          <p style={{ fontSize: 16, lineHeight: "26px", color: "rgba(244,247,250,0.75)" }}>
            地址没有对应的产品、方案或文章。回到首页，或改用英文站。
          </p>
          <p style={{ marginTop: 28 }}>
            <a href="/zh" style={{ color: "#fff", marginRight: 20 }}>
              中文首页
            </a>
            <a href="/en" style={{ color: "#fff" }}>
              English home
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
