"use client";
import ReferralEngine from "../../components/ReferralEngine";

export default function Slot3() {
  return (
    <div>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: "#1B2A4A", padding: "6px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        borderBottom: "2px solid #2A9D8F"
      }}>
        <a href="/" style={{ color: "#94A3B8", fontSize: 12, textDecoration: "none" }}>
          ← All Slots
        </a>
        <span style={{ color: "#E9C46A", fontSize: 11, fontWeight: 600, letterSpacing: 0.5 }}>
          SLOT 6 — REFERRAL ENGINE v2.0
        </span>
        <span style={{ color: "#6B7280", fontSize: 10 }}>
          Phase 2 Feature Showcase
        </span>
      </div>
      <div style={{ paddingTop: 36 }}>
        <ReferralEngine />
      </div>
    </div>
  );
}
