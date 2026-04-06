"use client"
import ACTPrototypeSuite from "@/components/ACTPrototypeSuite"

export default function Slot1() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8F7F5", padding: "24px 16px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <a href="/" style={{ fontSize: 12, color: "#534AB7", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>← All slots</a>
        <ACTPrototypeSuite />
      </div>
    </div>
  )
}
