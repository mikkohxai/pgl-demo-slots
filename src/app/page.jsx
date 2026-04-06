"use client"

const SLOTS = [
  { id: 1, name: "ACT Enrichment Prototype Suite", status: "live", type: "Latest Prototype", description: "Current production prototype — 9 enrichment experiments (ACT-18 through ACT-26): Client Match Score, Neighborhood Navigator, Moment Spotter, Client Decoder, Contact Completer, Event Edge, Travel Intent Scanner, Subscriber Upgrade Engine, Group Travel Prospector", version: "1.0.0", updated: "2026-04-06" },
  { id: 2, name: "Empty Slot", status: "empty", type: "Feature Showcase", description: "Drop a net-new feature prototype here to demo it independently.", version: "—", updated: "—" },
  { id: 3, name: "Empty Slot", status: "empty", type: "Feature Showcase", description: "Drop a net-new feature prototype here to demo it independently.", version: "—", updated: "—" },
  { id: 4, name: "Empty Slot", status: "empty", type: "Feature Showcase", description: "Drop a net-new feature prototype here to demo it independently.", version: "—", updated: "—" },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px", fontFamily: "'Lato', sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#534AB7", textTransform: "uppercase", marginBottom: 6 }}>Pro Growth Lab</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1E2832", marginBottom: 4 }}>Demo Slots</h1>
        <p style={{ fontSize: 14, color: "#6B6966", lineHeight: 1.6 }}>1 production prototype + 3 feature showcase slots. <a href="/resources" style={{ color: "#534AB7", fontWeight: 600 }}>View all resources →</a></p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {SLOTS.map(s => (
          <a key={s.id} href={"/slot-" + s.id} style={{ display: "block", background: "#fff", borderRadius: 14, border: "1px solid " + (s.status === "live" ? "#8BA89F" : "#E8E6E1"), padding: "20px 24px", transition: "box-shadow 0.15s", cursor: "pointer", textDecoration: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: s.status === "live" ? "#534AB7" : "#E8E6E1", display: "flex", alignItems: "center", justifyContent: "center", color: s.status === "live" ? "#fff" : "#A8A5A0", fontWeight: 700, fontSize: 16 }}>{s.id}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "#1E2832" }}>{s.id === 1 ? s.name : s.type + " " + (s.id - 1)}</div>
                  <div style={{ fontSize: 12, color: "#A8A5A0" }}>{s.type} · v{s.version} · {s.updated}</div>
                </div>
              </div>
              <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, fontWeight: 600, background: s.status === "live" ? "#E8F0EC" : "#F8F7F5", color: s.status === "live" ? "#085041" : "#A8A5A0" }}>{s.status === "live" ? "● Live" : "○ Empty"}</span>
            </div>
            <p style={{ fontSize: 13, color: "#6B6966", lineHeight: 1.5 }}>{s.description}</p>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 24, padding: "14px 18px", background: "#EEEDFE", borderRadius: 10, fontSize: 13, color: "#3C3489", lineHeight: 1.6 }}>
        <strong>Slot 1</strong> = latest full prototype (swap when a new version ships). <strong>Slots 2–4</strong> = individual feature demos for review. <a href="/resources" style={{ color: "#534AB7", fontWeight: 600 }}>All artifacts + Figma + Jira →</a>
      </div>
    </div>
  )
}
