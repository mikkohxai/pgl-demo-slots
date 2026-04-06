"use client"

import ACTPrototypeSuite from "../../components/ACTPrototypeSuite"

export default function Slot2Page() {
  return (
    <div>
      <div style={{
        padding: "8px 16px",
        borderBottom: "1px solid #D8D8D8",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "'Lato', system-ui, sans-serif",
        fontSize: 13,
        background: "#FFFFFF",
      }}>
        <a href="/" style={{ color: "#2166DB", textDecoration: "none", fontWeight: 600 }}>
          ← All slots
        </a>
        <span style={{ color: "#636363", fontSize: 11 }}>
          Slot 2 · Feature Showcase · ACT Enrichment Prototype Suite
        </span>
      </div>
      <ACTPrototypeSuite />
    </div>
  )
}
