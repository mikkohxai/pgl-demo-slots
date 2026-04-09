"use client"

export default function Slot7() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0C0B0F" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/" style={{ fontSize: 12, color: "rgba(245,241,236,0.5)", textDecoration: "none", fontFamily: "'Lato',system-ui,sans-serif" }}>← All slots</a>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#F3EBE2", fontFamily: "'Lato',system-ui,sans-serif" }}>Slot 7 · ACT Elevated Design Direction</span>
          <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "rgba(134,85,246,0.12)", color: "#8655F6", border: "1px solid rgba(134,85,246,0.2)" }}>NEW</span>
        </div>
        <span style={{ fontSize: 10, color: "rgba(245,241,236,0.3)", fontFamily: "'Lato',system-ui,sans-serif" }}>Apr 9, 2026</span>
      </div>
      <iframe
        src="/act-elevated-v5.html"
        style={{ flex: 1, border: "none", width: "100%", minHeight: "calc(100vh - 44px)" }}
        title="ACT Elevated v5"
      />
    </div>
  )
}
