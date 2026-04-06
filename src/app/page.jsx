"use client"

const SLOTS = [
  { id: 1, name: "ACT-23 Network Hero Map", status: "live", type: "Latest Prototype", description: "End-to-end Sprint 1: Login → Quiz with live map → Network Map dashboard (60% hero) + community detail panel with enrichment fields.", version: "4.0.0", updated: "2026-04-07" },
  { id: 2, name: "ACT Enrichment Prototype Suite", status: "live", type: "Feature Showcase", description: "9 enrichment experiments: Client Match Score, Neighborhood Navigator, Moment Spotter, Client Decoder, Contact Completer, Event Edge, Travel Intent Scanner, Subscriber Upgrade, Group Travel Prospector.", version: "1.0.0", updated: "2026-04-06" },
  { id: 3, name: "Vertical Network Map Reveal", status: "live", type: "Feature Showcase", description: "Shaina-preferred vertical bubble layout. Progressive reveal animation. Community cards with enrichment fields and AI expansion prompts.", version: "1.0.0", updated: "2026-04-07" },
  { id: 4, name: "Action Calendar", status: "live", type: "Feature Showcase", description: "Month/week/day views. Google Calendar sync. Plant/Grow/Convert phase badges, community color stripes, functional checkboxes.", version: "1.0.0", updated: "2026-04-07" },
  { id: 5, name: "Network Insights Report", status: "live", type: "Feature Showcase", description: "6-section AI-generated report: Network reach, top strategy, daily rhythm, goal math, channel mix, Week 1 plan. Animated counters, expandable cards with methodology.", version: "1.0.0", updated: "2026-04-06" },
  { id: 6, name: "Referral Engine", status: "live", type: "Feature Showcase", description: "Phase 2 — Systematic referral generation from happiest clients. AI-drafted voice-matched referral asks. Pipeline tracker (name to intro to conversation to booked). USC Revenue Factory framework.", version: "2.0.0", updated: "2026-04-06" },
  { id: 7, name: "Empty", status: "empty", type: "Feature Showcase", description: "Available for next feature prototype.", version: "—", updated: "—" },
  { id: 8, name: "Empty", status: "empty", type: "Feature Showcase", description: "Available for next feature prototype.", version: "—", updated: "—" },
  { id: 9, name: "Empty", status: "empty", type: "Feature Showcase", description: "Available for next feature prototype.", version: "—", updated: "—" },
  { id: 10, name: "Empty", status: "empty", type: "Feature Showcase", description: "Available for next feature prototype.", version: "—", updated: "—" },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px", fontFamily: "'Lato', sans-serif" }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: "#534AB7", textTransform: "uppercase", marginBottom: 6 }}>Pro Growth Lab</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1E2832", marginBottom: 4 }}>Demo Hub</h1>
        <p style={{ fontSize: 14, color: "#6B6966", lineHeight: 1.6 }}>1 production prototype + 9 feature showcase slots. <a href="/resources" style={{ color: "#534AB7", fontWeight: 600 }}>Resources →</a>  ·  <a href="/moc" style={{ color: "#534AB7", fontWeight: 600 }}>Sprint 1 MOC →</a></p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {SLOTS.map(s => (
          <a key={s.id} href={"/slot-" + s.id} style={{ display: "block", background: "#fff", borderRadius: 14, border: "1px solid " + (s.status === "live" ? "#8BA89F" : "#E8E6E1"), padding: "16px 20px", transition: "box-shadow 0.15s", cursor: "pointer", textDecoration: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: s.status === "live" ? "#534AB7" : "#E8E6E1", display: "flex", alignItems: "center", justifyContent: "center", color: s.status === "live" ? "#fff" : "#A8A5A0", fontWeight: 700, fontSize: 14 }}>{s.id}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1E2832" }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "#A8A5A0" }}>{s.type} · v{s.version} · {s.updated}</div>
                </div>
              </div>
              <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, fontWeight: 600, background: s.status === "live" ? "#E8F0EC" : "#F8F7F5", color: s.status === "live" ? "#085041" : "#A8A5A0" }}>{s.status === "live" ? "● Live" : "○ Empty"}</span>
            </div>
            <p style={{ fontSize: 12, color: "#6B6966", lineHeight: 1.5, margin: 0 }}>{s.description}</p>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "12px 16px", background: "#EEEDFE", borderRadius: 10, fontSize: 12, color: "#3C3489", lineHeight: 1.6 }}>
        <strong>Slot 1</strong> = latest full prototype. <strong>Slots 2–10</strong> = individual feature demos. <a href="/resources" style={{ color: "#534AB7", fontWeight: 600 }}>Resources →</a>  ·  <a href="/moc" style={{ color: "#534AB7", fontWeight: 600 }}>Sprint 1 MOC →</a>
      </div>
      <div style={{ textAlign: "center", padding: "14px 0", fontSize: 11, color: "#A8A5A0", marginTop: 10 }}>Last verified: April 7, 2026 · {SLOTS.filter(s => s.status === "live").length} of 10 slots active</div>
    </div>
  )
}
