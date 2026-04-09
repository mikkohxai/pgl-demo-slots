"use client";
import SalesJourneyMap from "../../components/SalesJourneyMap";

export default function Slot8Page() {
  return (
    <div>
      <div style={{ padding: "8px 16px", background: "#FAF6F2", borderBottom: "1px solid #E5DBD0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontSize: 13, color: "#8655F6", textDecoration: "none", fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>← All slots</a>
        <span style={{ fontSize: 11, color: "#999", fontFamily: "'Lato', sans-serif" }}>Slot 8 · Sales Journey Map · Research-Integrated Final</span>
      </div>
      <SalesJourneyMap />
    </div>
  );
}
