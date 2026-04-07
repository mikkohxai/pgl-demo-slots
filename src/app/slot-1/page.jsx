"use client";
import NetworkMapperV2 from "../../components/NetworkMapperV2";

export default function Slot1Page() {
  return (
    <div>
      <div style={{ padding: "8px 16px", borderBottom: "1px solid #D8D8D8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontSize: 13, color: "#2166DB", textDecoration: "none", fontFamily: "'Lato',system-ui,sans-serif" }}>← All slots</a>
        <span style={{ fontSize: 11, color: "#636363", fontFamily: "'Lato',system-ui,sans-serif" }}>Slot 1 — Latest Prototype</span>
      </div>
      <NetworkMapperV2 />
    </div>
  );
}
