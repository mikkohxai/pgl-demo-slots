"use client"

import ACT23NetworkHero from "../../components/ACT23NetworkHero"

export default function Slot1Page() {
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
          Slot 1 · Latest Prototype · ACT-23 Network Hero Map v4.0.0
        </span>
      </div>
      <ACT23NetworkHero />
    </div>
  )
}
