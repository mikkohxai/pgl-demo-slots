"use client"

const SPECS = [
  { id: "ACT-21", name: "Client Match Score™", file: "spec-act-21-client-match-score-v1.md", version: "1.0.0", grade: "A", sprint: "S2" },
  { id: "ACT-18", name: "Neighborhood Navigator™", file: "spec-act-18-neighborhood-navigator-v1.md", version: "1.0.0", grade: "A", sprint: "S3" },
  { id: "ACT-19", name: "Moment Spotter™", file: "spec-act-19-moment-spotter-v1.md", version: "1.0.0", grade: "A", sprint: "S3" },
  { id: "ACT-24", name: "Client Decoder™", file: "spec-act-24-client-decoder-v1.md", version: "1.0.0", grade: "B", sprint: "S3" },
  { id: "ACT-22", name: "Contact Completer™", file: "spec-act-22-contact-completer-v1.md", version: "1.0.0", grade: "B", sprint: "S3" },
  { id: "ACT-20", name: "Event Edge™", file: "spec-act-20-event-edge-v1.md", version: "1.0.0", grade: "B", sprint: "S4" },
  { id: "ACT-23", name: "Travel Intent Scanner™", file: "spec-act-23-travel-intent-scanner-v1.md", version: "1.0.0", grade: "C", sprint: "S4" },
  { id: "ACT-25", name: "Subscriber Upgrade Engine™", file: "spec-act-25-subscriber-upgrade-engine-v1.md", version: "1.0.0", grade: "C", sprint: "S4" },
  { id: "ACT-26", name: "Group Travel Prospector™", file: "spec-act-26-group-travel-prospector-v1.md", version: "1.0.0", grade: "C", sprint: "S5" },
]

const ANALYSIS = [
  { name: "Databar→ACT Translation Matrix", file: "analysis-databar-act-translation-matrix-v2.md", version: "2.0.0" },
  { name: "Derived Prototypes Catalog", file: "spec-databar-derived-prototypes-catalog-v2.md", version: "2.0.0" },
  { name: "Session Continuity Snapshot", file: "continuity-databar-act-forge-session-v1.md", version: "1.0.0" },
  { name: "ConvoMap RAG Recap", file: "convomap-databar-act-forge-20260406--rag-pack-v1.md", version: "1.0.0" },
]

const FIGMA = [
  { name: "Portal Design System", url: "https://www.figma.com/design/ObokJ6tQzEtWxBMYMgVDkn", node: "11758-12911" },
  { name: "PGL Brand System Reference", file: "pgl-brand-system-reference-v1.md", version: "1.3.0" },
]

const JIRA = [
  { name: "PP-2632 — Pro Growth Lab", url: "https://foratravel.atlassian.net/browse/PP-2632" },
  { name: "AEP-5153 — Surge Epic", url: "https://foratravel.atlassian.net/browse/AEP-5153" },
  { name: "Confluence PRD", url: "https://foratravel.atlassian.net/wiki/spaces/PP/pages/1946091642" },
  { name: "Eng Spec Draft", url: "https://foratravel.atlassian.net/wiki/spaces/PP/pages/1952546817" },
]

const REPOS = [
  { name: "pgl-demo-slots", url: "https://github.com/mikkohxai/pgl-demo-slots", desc: "This demo system" },
  { name: "advisor-coach-act", url: "https://github.com/mikkohxai/advisor-coach-act", desc: "Prototype v4 (active build)" },
  { name: "pro-growth-lab", url: "https://github.com/mikkohxai/pro-growth-lab", desc: "Prototype v3 (Supabase)" },
]

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#534AB7", marginBottom: 10 }}>{title}</div>
    {children}
  </div>
)

const Row = ({ left, right, href, sub }) => (
  <a href={href || "#"} target={href ? "_blank" : undefined} rel="noopener" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fff", borderRadius: 10, border: "1px solid #E8E6E1", marginBottom: 6, textDecoration: "none" }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#1E2832" }}>{left}</div>
      {sub && <div style={{ fontSize: 12, color: "#A8A5A0", marginTop: 1 }}>{sub}</div>}
    </div>
    <div style={{ fontSize: 12, color: "#6B6966" }}>{right}</div>
  </a>
)

export default function Resources() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px", fontFamily: "'Lato', sans-serif" }}>
      <a href="/" style={{ fontSize: 12, color: "#534AB7", fontWeight: 600, marginBottom: 20, display: "inline-block" }}>← Demo slots</a>
      <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1E2832", marginBottom: 4 }}>Resource Hub</h1>
      <p style={{ fontSize: 14, color: "#6B6966", marginBottom: 28 }}>All artifacts, specs, Figma files, repos, and tickets in one place.</p>

      <Section title="Prototype Specs (9)">
        {SPECS.map(s => <Row key={s.id} left={`${s.id} — ${s.name}`} right={`v${s.version} · ${s.grade} · ${s.sprint}`} sub={s.file} />)}
      </Section>

      <Section title="Analysis Artifacts">
        {ANALYSIS.map((a, i) => <Row key={i} left={a.name} right={`v${a.version}`} sub={a.file} />)}
      </Section>

      <Section title="Design">
        {FIGMA.map((f, i) => <Row key={i} left={f.name} right={f.version || "Figma"} href={f.url} sub={f.node ? `Node: ${f.node}` : f.file} />)}
      </Section>

      <Section title="Jira / Confluence">
        {JIRA.map((j, i) => <Row key={i} left={j.name} right="→" href={j.url} />)}
      </Section>

      <Section title="Repositories">
        {REPOS.map((r, i) => <Row key={i} left={r.name} right={r.desc} href={r.url} />)}
      </Section>

      <Section title="Demo Slots">
        <Row left="Slot 1 — Latest Prototype" right="ACT Enrichment Suite" href="/slot-1" />
        <Row left="Slot 2 — Feature Showcase" right="Empty" href="/slot-2" />
        <Row left="Slot 3 — Feature Showcase" right="Empty" href="/slot-3" />
        <Row left="Slot 4 — Feature Showcase" right="Empty" href="/slot-4" />
      </Section>
    </div>
  )
}
