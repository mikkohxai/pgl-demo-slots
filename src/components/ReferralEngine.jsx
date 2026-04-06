import { useState, useCallback } from "react";

// ─── FORA DESIGN SYSTEM ──────────────────────────────────────
const C = {
  navy: "#1B2A4A", navyLight: "#2D3E5E",
  teal: "#2A9D8F", tealLight: "#E8F4F2", tealDark: "#1E7A6E",
  gold: "#E9C46A", goldLight: "#FDF5E1", goldDark: "#C9A84C",
  coral: "#E76F51", coralLight: "#FDEAE5",
  sage: "#94A89A", sageLight: "#F0F4F1",
  cream: "#FAF8F5", white: "#FFFFFF",
  ink: "#1F2937", muted: "#6B7280", light: "#9CA3AF",
  border: "#E8E5E0", borderLight: "#F3F1ED",
  green: "#059669", greenLight: "#ECFDF5", greenBg: "#D1FAE5",
  amber: "#D97706", amberLight: "#FFFBEB",
  red: "#DC2626", redLight: "#FEF2F2",
};

const font = {
  display: "'Playfair Display', 'Georgia', serif",
  body: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
};

const shadow = {
  sm: "0 1px 3px rgba(27,42,74,0.04), 0 1px 2px rgba(27,42,74,0.06)",
  md: "0 4px 12px rgba(27,42,74,0.06), 0 2px 4px rgba(27,42,74,0.04)",
  lg: "0 8px 24px rgba(27,42,74,0.08), 0 4px 8px rgba(27,42,74,0.04)",
};

// ─── MOCK DATA ───────────────────────────────────────────────
const ADVISOR = { name: "Jessica", archetype: "The Connector", archetypeColor: C.teal, streak: 7, referralsSentThisMonth: 2, referralsReceivedTotal: 5, clientsFromReferrals: 2 };

const SOURCES = [
  {
    id: 1, name: "Lisa & Mark Martin", avatar: "LM", satisfaction: 10, trips: 3,
    lastTrip: { dest: "Amalfi Coast", date: "Mar 2026", value: "$14,200" },
    relationship: "PTA at Dalton — your kids are in the same 2nd grade class",
    highlight: "Called you 'the best decision we made' in their review. Shared your name with 2 friends unprompted. Haven't been formally asked for referrals.",
    askSent: false, askDate: null,
    draft: "Hi Lisa! I keep smiling thinking about your Amalfi photos — that sunset dinner was *perfect*. 😍 I have a quick question for you: do you know anyone else who's been thinking about planning a special trip? I have a few spots opening up this spring and I'd love to help someone you trust. Totally no pressure — just thought I'd ask since you guys had such a great experience!",
    potentialReferrals: [
      { name: "Amy Chen (Lisa's sister)", context: "Getting married in October — honeymoon planning window is NOW", readiness: 9, signal: "Lisa mentioned at pickup last week" },
      { name: "The Parks (couple friends)", context: "Traveled to Europe together last year — already travel-oriented", readiness: 6, signal: "Lisa tags them in travel posts" },
    ],
  },
  {
    id: 2, name: "David & Rachel Kim", avatar: "DK", satisfaction: 9, trips: 1,
    lastTrip: { dest: "Maldives", date: "Jan 2026", value: "$22,800" },
    relationship: "Cornell Alumni NYC chapter — met at the holiday mixer",
    highlight: "Left a 5-star review. David told 3 Goldman colleagues about the trip at a team dinner. None have reached out yet — warm leads sitting untapped.",
    askSent: false, askDate: null,
    draft: "David! Still dreaming about those Maldives sunsets? 🌅 Hey, random thought — you mentioned your colleagues were jealous of the trip. If any of them are actually thinking about planning something, I'd love to help them out. I can do a quick 15-min call with anyone interested — just have them text me or send them my way. Would mean a lot! 🙏",
    potentialReferrals: [
      { name: "Raj Patel (Goldman colleague)", context: "David said Raj 'won't stop asking about the resort name'", readiness: 8, signal: "David mentioned at alumni event" },
      { name: "Sarah Liu (Goldman colleague)", context: "Also expressed interest in a couples trip", readiness: 5, signal: "Secondhand from David" },
      { name: "Cornell alumni network", context: "David is on the events committee — could intro you at next mixer", readiness: 4, signal: "Structural opportunity" },
    ],
  },
  {
    id: 3, name: "Jennifer Walsh", avatar: "JW", satisfaction: 9, trips: 3,
    lastTrip: { dest: "Kenya Safari", date: "Nov 2025", value: "$18,500" },
    relationship: "Junior League NYC + PTA at Dalton — overlapping circles",
    highlight: "Your most connected client. PTA president, Junior League board member, hosts quarterly dinner parties for 20+ couples. 3 trips booked. Never once asked for referrals.",
    askSent: true, askDate: "Mar 28",
    draft: "Jen! Your safari trip has been living rent-free in my head — those photos with the kids and the elephants 🐘❤️ Quick thought: you know SO many amazing families through Dalton and Junior League. I'm taking on a few new clients this spring and would be thrilled to help anyone in your circle. Would you be open to passing along my name if travel comes up? I can even send you a little blurb to forward. 💛",
    potentialReferrals: [
      { name: "Junior League travel committee", context: "Her committee plans an annual group trip — 12-15 couples", readiness: 7, signal: "She chairs the committee" },
      { name: "Dalton parent network", context: "200+ families, many with travel budgets >$15K/year", readiness: 5, signal: "Wide network, low specificity" },
      { name: "Dinner party circle", context: "6-8 regular couples who attend her quarterly dinners", readiness: 6, signal: "High trust, social proof environment" },
    ],
  },
  {
    id: 4, name: "Alex & Mei Chen", avatar: "AC", satisfaction: 7, trips: 1,
    lastTrip: { dest: "Tokyo", date: "Aug 2025", value: "$9,200" },
    relationship: "Orangetheory Tribeca — friendly but haven't seen in 4 months",
    highlight: "Good trip but not extraordinary — hotel was fine, food recs were the highlight. Haven't been in touch since August. Need to re-engage before asking for anything.",
    askSent: false, askDate: null, needsReengage: true,
    reengageDraft: "Alex! It's been way too long — how are you and Mei? I've been thinking about your Tokyo trip and wanted to share something exciting: there's a brand new ryokan in Kyoto that just opened with an incredible onsen and they're doing a cherry blossom season special. Made me think of you guys immediately. Want me to send the details? Would love to catch up either way! ☺️",
    draft: null,
    potentialReferrals: [],
  },
  {
    id: 5, name: "The Okafor Family", avatar: "OF", satisfaction: 10, trips: 2,
    lastTrip: { dest: "Turks & Caicos", date: "Feb 2026", value: "$11,800" },
    relationship: "Kids' soccer league — you coach together on Saturdays",
    highlight: "Sent you a handwritten thank-you card after Turks. Told the entire soccer parent sideline about the trip. At least 3 parents asked 'who planned that?' but nobody followed up.",
    askSent: false, askDate: null,
    draft: "Chidi! That thank-you card is still on my fridge — you guys are the sweetest. 🥹 Hey, I heard through the soccer grapevine that a few parents were curious about trip planning after your Turks photos. If any of them mention it to you, would you mind pointing them my way? I'd love to help any of the soccer families. And selfishly, it would mean a lot coming from you! 🙏⚽",
    potentialReferrals: [
      { name: "Soccer parent group (~15 families)", context: "3 parents explicitly asked about your trip. Saturday sideline = weekly touchpoint.", readiness: 7, signal: "Direct inquiries after Turks trip" },
    ],
  },
];

const PIPELINE = [
  { id: "p1", name: "Amy Chen", source: "Lisa Martin", status: "conversation", date: "Mar 30", context: "Honeymoon to Santorini — Oct 2026 wedding", value: "$16,000 est.", nextStep: "Send 3 property options by Wednesday" },
  { id: "p2", name: "Raj Patel", source: "David Kim", status: "introduced", date: "Mar 28", context: "Luxury resort trip — flexible dates, $20K+ budget", value: "$20,000 est.", nextStep: "David is texting him your number today" },
  { id: "p3", name: "The Petersons", source: "Soccer sideline", status: "conversation", date: "Mar 22", context: "Family spring break — Cabo or Hawaii", value: "$8,500 est.", nextStep: "Sent proposal — following up Friday" },
  { id: "p4", name: "JL Travel Committee", source: "Jennifer Walsh", status: "name_received", date: "Apr 1", context: "Annual group trip — 12-15 couples, Europe fall 2026", value: "$45,000+ est.", nextStep: "Jen is sharing your contact at Thursday's board meeting" },
  { id: "p5", name: "Sarah Liu", source: "David Kim", status: "name_received", date: "Mar 29", context: "Couples anniversary trip", value: "$12,000 est.", nextStep: "Waiting for David to make intro" },
];

// ─── COMPONENTS ──────────────────────────────────────────────

function MetricCard({ value, label, sublabel, color = C.navy, icon }) {
  return (
    <div style={{ background: C.white, borderRadius: 14, padding: "14px 12px", boxShadow: shadow.sm, border: `1px solid ${C.border}`, textAlign: "center", flex: 1, minWidth: 0 }}>
      {icon && <div style={{ fontSize: 16, marginBottom: 2 }}>{icon}</div>}
      <div style={{ fontFamily: font.mono, fontSize: 26, fontWeight: 700, color, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontFamily: font.body, fontSize: 11, fontWeight: 600, color: C.ink, marginTop: 2 }}>{label}</div>
      {sublabel && <div style={{ fontFamily: font.body, fontSize: 9, color: C.light }}>{sublabel}</div>}
    </div>
  );
}

function SatisfactionRing({ score, size = 38 }) {
  const pct = score * 10;
  const color = score >= 9 ? C.green : score >= 7 ? C.gold : C.coral;
  const circumference = 2 * Math.PI * 14;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="18" cy="18" r="14" fill="none" stroke={C.borderLight} strokeWidth="3" />
        <circle cx="18" cy="18" r="14" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.8s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.mono, fontSize: 11, fontWeight: 700, color }}>{score}</div>
    </div>
  );
}

function PipelineStage({ status }) {
  const stages = [
    { key: "name_received", label: "Name", icon: "📝" },
    { key: "introduced", label: "Intro'd", icon: "🤝" },
    { key: "conversation", label: "Talking", icon: "💬" },
    { key: "booked", label: "Booked", icon: "✈️" },
  ];
  const activeIdx = stages.findIndex(s => s.key === status);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {stages.map((s, i) => {
        const isActive = i <= activeIdx;
        const isCurrent = i === activeIdx;
        return (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <div style={{
              width: isCurrent ? 28 : 22, height: isCurrent ? 28 : 22, borderRadius: "50%",
              background: isActive ? (isCurrent ? C.teal : C.tealLight) : C.borderLight,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isCurrent ? 12 : 10, transition: "all 0.3s",
              border: isCurrent ? `2px solid ${C.teal}` : "none",
            }}>
              {isActive ? s.icon : "○"}
            </div>
            {i < stages.length - 1 && (
              <div style={{ width: 12, height: 2, background: i < activeIdx ? C.teal : C.borderLight, borderRadius: 1 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SourceCard({ source, isExpanded, onToggle, onMarkSent }) {
  const [localSent, setLocalSent] = useState(source.askSent);
  const [copied, setCopied] = useState(false);
  const isReengage = source.needsReengage;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText?.(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSent = () => {
    setLocalSent(true);
    if (onMarkSent) onMarkSent(source.id);
  };

  return (
    <div style={{ background: C.white, borderRadius: 16, boxShadow: shadow.sm, border: `1px solid ${C.border}`, overflow: "hidden", transition: "box-shadow 0.3s" }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = shadow.md}
      onMouseLeave={e => e.currentTarget.style.boxShadow = shadow.sm}>

      {/* Header — always visible */}
      <div onClick={onToggle} style={{ padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
        <SatisfactionRing score={source.satisfaction} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontFamily: font.display, fontSize: 16, fontWeight: 700, color: C.navy }}>{source.name}</span>
            {localSent && <span style={{ padding: "2px 8px", borderRadius: 8, background: C.greenLight, color: C.green, fontSize: 10, fontWeight: 600 }}>✓ Ask Sent {source.askDate || "Today"}</span>}
            {isReengage && !localSent && <span style={{ padding: "2px 8px", borderRadius: 8, background: C.amberLight, color: C.amber, fontSize: 10, fontWeight: 600 }}>Re-engage First</span>}
            {!localSent && !isReengage && <span style={{ padding: "2px 8px", borderRadius: 8, background: C.goldLight, color: C.goldDark, fontSize: 10, fontWeight: 600 }}>Ready to Ask</span>}
          </div>
          <div style={{ fontFamily: font.body, fontSize: 12, color: C.muted, marginTop: 2 }}>{source.relationship}</div>
          <div style={{ display: "flex", gap: 12, marginTop: 4, fontSize: 11, color: C.light }}>
            <span>📍 {source.lastTrip.dest}</span>
            <span>📅 {source.lastTrip.date}</span>
            <span style={{ fontFamily: font.mono, fontWeight: 600, color: C.teal }}>{source.lastTrip.value}</span>
            <span>{source.trips} trip{source.trips > 1 ? "s" : ""}</span>
          </div>
        </div>
        {source.potentialReferrals.length > 0 && (
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: C.gold }}>{source.potentialReferrals.length}</div>
            <div style={{ fontSize: 9, color: C.light }}>potential<br/>referrals</div>
          </div>
        )}
        <div style={{ fontSize: 14, color: C.light, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", flexShrink: 0 }}>▾</div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{ borderTop: `1px solid ${C.borderLight}` }}>
          {/* Intel section */}
          <div style={{ margin: "0 18px", padding: "14px 0", borderBottom: `1px solid ${C.borderLight}` }}>
            <div style={{ fontFamily: font.body, fontSize: 10, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Why This Client, Why Now</div>
            <div style={{ fontFamily: font.body, fontSize: 13, color: C.ink, lineHeight: 1.6 }}>{source.highlight}</div>
          </div>

          {/* Potential referrals */}
          {source.potentialReferrals.length > 0 && (
            <div style={{ margin: "0 18px", padding: "14px 0", borderBottom: `1px solid ${C.borderLight}` }}>
              <div style={{ fontFamily: font.body, fontSize: 10, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>People They Could Refer to You</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {source.potentialReferrals.map((r, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: r.readiness >= 7 ? C.goldLight : C.cream, borderRadius: 10, border: `1px solid ${r.readiness >= 7 ? C.gold + "33" : C.border}` }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.readiness >= 8 ? C.green : r.readiness >= 6 ? C.gold : C.light, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: font.body, fontSize: 13, fontWeight: 600, color: C.navy }}>{r.name}</div>
                      <div style={{ fontFamily: font.body, fontSize: 11, color: C.muted }}>{r.context}</div>
                      {r.signal && <div style={{ fontFamily: font.body, fontSize: 10, color: C.teal, marginTop: 2 }}>📡 {r.signal}</div>}
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: font.mono, fontSize: 14, fontWeight: 700, color: r.readiness >= 7 ? C.green : C.muted }}>{r.readiness}</div>
                      <div style={{ fontSize: 8, color: C.light }}>/10 ready</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message draft */}
          <div style={{ margin: "0 18px", padding: "14px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, fontWeight: 700, color: isReengage ? C.amber : C.gold, textTransform: "uppercase", letterSpacing: 0.8 }}>
                {isReengage ? "🔄 Re-Engage Message" : "✨ Your Referral Ask"}
              </div>
              <span style={{ fontFamily: font.body, fontSize: 10, color: C.light }}>Voice-matched to {ADVISOR.archetype}</span>
            </div>
            <div style={{ padding: 14, background: isReengage ? C.amberLight : C.goldLight, borderRadius: 12, border: `1px solid ${isReengage ? C.amber + "22" : C.gold + "33"}` }}>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.ink, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {isReengage ? source.reengageDraft : source.draft}
              </div>
            </div>

            {/* Action bar */}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={() => handleCopy(isReengage ? source.reengageDraft : source.draft)}
                style={{ flex: 1, padding: "12px 16px", borderRadius: 12, border: "none", background: copied ? C.greenLight : C.navy, color: copied ? C.green : C.white, fontFamily: font.body, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.3s" }}>
                {copied ? "✓ Copied to Clipboard" : "📋 Copy Message"}
              </button>
              {!localSent ? (
                <button onClick={handleSent}
                  style={{ padding: "12px 20px", borderRadius: 12, border: "none", background: C.teal, color: C.white, fontFamily: font.body, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  ✓ I Sent It
                </button>
              ) : (
                <div style={{ padding: "12px 16px", borderRadius: 12, background: C.greenLight, color: C.green, fontFamily: font.body, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  ✅ Sent
                </div>
              )}
            </div>

            {/* Post-send follow-up */}
            {localSent && (
              <div style={{ marginTop: 10, padding: 12, background: C.tealLight, borderRadius: 10, border: `1px solid ${C.teal}22` }}>
                <div style={{ fontFamily: font.body, fontSize: 11, fontWeight: 600, color: C.teal, marginBottom: 6 }}>Did they respond with a name?</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.green}44`, background: C.greenLight, color: C.green, fontFamily: font.body, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Yes — add to pipeline!</button>
                  <button style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.cream, color: C.muted, fontFamily: font.body, fontSize: 11, cursor: "pointer" }}>Not yet</button>
                  <button style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.cream, color: C.muted, fontFamily: font.body, fontSize: 11, cursor: "pointer" }}>They said no</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PipelineCard({ item }) {
  return (
    <div style={{ background: C.white, borderRadius: 14, padding: 16, boxShadow: shadow.sm, border: `1px solid ${C.border}`, display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: font.display, fontSize: 15, fontWeight: 700, color: C.navy }}>{item.name}</span>
          <PipelineStage status={item.status} />
        </div>
        <div style={{ fontFamily: font.body, fontSize: 12, color: C.muted }}>via {item.source} · {item.context}</div>
        <div style={{ display: "flex", gap: 12, marginTop: 6, alignItems: "center" }}>
          <span style={{ fontFamily: font.mono, fontSize: 13, fontWeight: 600, color: C.teal }}>{item.value}</span>
          <span style={{ fontSize: 10, color: C.light }}>·</span>
          <span style={{ fontSize: 11, color: C.light }}>Added {item.date}</span>
        </div>
      </div>
      <div style={{ flexShrink: 0 }}>
        <div style={{ padding: "8px 14px", background: C.tealLight, borderRadius: 10, border: `1px solid ${C.teal}22` }}>
          <div style={{ fontFamily: font.body, fontSize: 10, fontWeight: 600, color: C.teal, marginBottom: 2 }}>Next Step</div>
          <div style={{ fontFamily: font.body, fontSize: 11, color: C.ink, maxWidth: 180 }}>{item.nextStep}</div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────
export default function ReferralEngine() {
  const [tab, setTab] = useState("ask");
  const [expandedId, setExpandedId] = useState(1);
  const [asksSent, setAsksSent] = useState(SOURCES.filter(s => s.askSent).length);

  const handleMarkSent = useCallback(() => {
    setAsksSent(prev => prev + 1);
  }, []);

  const readySources = SOURCES.filter(s => !s.askSent && !s.needsReengage);
  const sentSources = SOURCES.filter(s => s.askSent);
  const reengageSources = SOURCES.filter(s => s.needsReengage);

  const pipelineValue = PIPELINE.reduce((sum, p) => {
    const num = parseInt(p.value.replace(/[^0-9]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const tabs = [
    { id: "ask", label: "Who to Ask", icon: "💛", count: readySources.length + reengageSources.length },
    { id: "pipeline", label: "Pipeline", icon: "📋", count: PIPELINE.length },
    { id: "sent", label: "Sent", icon: "✅", count: sentSources.length },
  ];

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", fontFamily: font.body, color: C.ink, background: C.cream, minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`, padding: "20px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: font.body, fontSize: 10, fontWeight: 600, color: C.teal, letterSpacing: 1.2, textTransform: "uppercase" }}>Pro Growth Lab</div>
            <div style={{ fontFamily: font.display, fontSize: 24, fontWeight: 700, color: C.white, marginTop: 2 }}>Your Referral Engine</div>
            <div style={{ fontFamily: font.body, fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
              Your happiest clients are your best growth channel
            </div>
          </div>
          <div style={{ background: `${C.gold}18`, borderRadius: 12, padding: "8px 14px", textAlign: "center" }}>
            <div style={{ fontFamily: font.mono, fontSize: 28, fontWeight: 800, color: C.gold, lineHeight: 1 }}>25%</div>
            <div style={{ fontFamily: font.body, fontSize: 9, color: "#94A3B8", marginTop: 2 }}>referral close rate</div>
            <div style={{ fontFamily: font.body, fontSize: 8, color: "#64748B" }}>3× better than social</div>
          </div>
        </div>

        {/* Metrics row */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, paddingBottom: 16 }}>
          <MetricCard value={SOURCES.length} label="Happy Clients" sublabel="satisfaction 7+" icon="💛" color={C.gold} />
          <MetricCard value={asksSent} label="Asks Sent" sublabel="this month" icon="📨" color={C.teal} />
          <MetricCard value={PIPELINE.length} label="In Pipeline" sublabel={`$${(pipelineValue / 1000).toFixed(0)}K+ value`} icon="📋" color={C.navy} />
          <MetricCard value={ADVISOR.clientsFromReferrals} label="Clients Won" sublabel="from referrals" icon="✈️" color={C.green} />
        </div>
      </div>

      {/* ── THE LOOP VISUAL ── */}
      <div style={{ margin: "0 16px", padding: "12px 16px", background: C.white, borderRadius: "0 0 14px 14px", boxShadow: shadow.sm, border: `1px solid ${C.border}`, borderTop: "none" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
          {[
            { label: "Happy Client", bg: C.goldLight, color: C.goldDark, icon: "💛" },
            { label: "→", bg: "transparent", color: C.light, plain: true },
            { label: "Ask for Referral", bg: C.tealLight, color: C.tealDark, icon: "💬" },
            { label: "→", bg: "transparent", color: C.light, plain: true },
            { label: "Get a Name", bg: "#DBEAFE", color: "#2563EB", icon: "📝" },
            { label: "→", bg: "transparent", color: C.light, plain: true },
            { label: "Start Talking", bg: C.amberLight, color: C.amber, icon: "🤝" },
            { label: "→", bg: "transparent", color: C.light, plain: true },
            { label: "New Client", bg: C.greenLight, color: C.green, icon: "✈️" },
            { label: "🔄", bg: "transparent", color: C.teal, plain: true },
          ].map((s, i) => s.plain ? (
            <span key={i} style={{ fontSize: 12, color: s.color }}>{s.label}</span>
          ) : (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 8, background: s.bg, color: s.color, fontSize: 10, fontWeight: 600, fontFamily: font.body }}>
              <span>{s.icon}</span>{s.label}
            </span>
          ))}
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display: "flex", margin: "16px 16px 0", background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: shadow.sm }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              flex: 1, padding: "12px 8px", border: "none", background: tab === t.id ? `${C.teal}08` : "transparent",
              borderBottom: tab === t.id ? `3px solid ${C.teal}` : "3px solid transparent",
              cursor: "pointer", fontFamily: font.body, fontSize: 12, fontWeight: tab === t.id ? 700 : 400,
              color: tab === t.id ? C.teal : C.light, transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
            <span>{t.icon}</span>
            <span>{t.label}</span>
            <span style={{ fontFamily: font.mono, fontSize: 10, padding: "1px 6px", borderRadius: 6, background: tab === t.id ? `${C.teal}15` : C.cream, color: tab === t.id ? C.teal : C.light }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>

        {/* ASK TAB */}
        {tab === "ask" && (
          <>
            {/* Ready to ask section */}
            {readySources.length > 0 && (
              <>
                <div style={{ fontFamily: font.body, fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 0.8 }}>
                  Ready to Ask ({readySources.length})
                </div>
                {readySources.map(s => (
                  <SourceCard key={s.id} source={s}
                    isExpanded={expandedId === s.id}
                    onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)}
                    onMarkSent={handleMarkSent} />
                ))}
              </>
            )}

            {/* Re-engage section */}
            {reengageSources.length > 0 && (
              <>
                <div style={{ fontFamily: font.body, fontSize: 11, fontWeight: 700, color: C.amber, textTransform: "uppercase", letterSpacing: 0.8, marginTop: 8 }}>
                  Re-Engage First ({reengageSources.length})
                </div>
                <div style={{ fontFamily: font.body, fontSize: 11, color: C.muted, marginTop: -4 }}>
                  These clients had good experiences but you've been out of touch. Reconnect before asking for referrals.
                </div>
                {reengageSources.map(s => (
                  <SourceCard key={s.id} source={s}
                    isExpanded={expandedId === s.id}
                    onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)}
                    onMarkSent={handleMarkSent} />
                ))}
              </>
            )}

            {/* Coaching insight */}
            <div style={{ padding: 14, background: C.white, borderRadius: 14, boxShadow: shadow.sm, border: `1px solid ${C.teal}22`, marginTop: 4 }}>
              <div style={{ fontFamily: font.body, fontSize: 10, fontWeight: 700, color: C.teal, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>💡 Your Referral Insight</div>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.ink, lineHeight: 1.6 }}>
                You have <strong>5 happy clients</strong> but have only asked <strong>{asksSent === 1 ? "1 of them" : `${asksSent} of them`}</strong> for referrals.
                At a 25% conversion rate, every referral name you receive has a 1-in-4 chance of becoming a new client.
                <strong style={{ color: C.teal }}> Sending 3 more asks this week could generate 1-2 new names for your pipeline.</strong>
              </div>
            </div>
          </>
        )}

        {/* PIPELINE TAB */}
        {tab === "pipeline" && (
          <>
            <div style={{ fontFamily: font.body, fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 0.8 }}>
              Active Referral Pipeline
            </div>
            <div style={{ fontFamily: font.body, fontSize: 12, color: C.muted }}>
              {PIPELINE.length} people referred to you — track them from name to booked client.
            </div>
            <div style={{ display: "flex", gap: 8, padding: "8px 0" }}>
              {[
                { label: "📝 Names", count: PIPELINE.filter(p => p.status === "name_received").length, color: "#2563EB" },
                { label: "🤝 Intro'd", count: PIPELINE.filter(p => p.status === "introduced").length, color: C.amber },
                { label: "💬 Talking", count: PIPELINE.filter(p => p.status === "conversation").length, color: C.green },
                { label: "✈️ Booked", count: 0, color: C.navy },
              ].map(s => (
                <div key={s.label} style={{ flex: 1, background: C.white, borderRadius: 10, padding: "8px 10px", textAlign: "center", boxShadow: shadow.sm, border: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: s.color }}>{s.count}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PIPELINE.map(p => <PipelineCard key={p.id} item={p} />)}
            </div>
            <div style={{ padding: 14, background: C.goldLight, borderRadius: 14, border: `1px solid ${C.gold}33`, marginTop: 4 }}>
              <div style={{ fontFamily: font.body, fontSize: 13, color: C.ink }}>
                <strong style={{ color: C.goldDark }}>Pipeline value: ${(pipelineValue / 1000).toFixed(0)}K+</strong> — at 25% close rate, you could book
                <strong style={{ color: C.green }}> ${Math.round(pipelineValue * 0.25).toLocaleString()}</strong> in new travel from these referrals alone.
              </div>
            </div>
          </>
        )}

        {/* SENT TAB */}
        {tab === "sent" && (
          <>
            <div style={{ fontFamily: font.body, fontSize: 11, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 0.8 }}>
              Asks You've Sent
            </div>
            {sentSources.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, background: C.white, borderRadius: 14, boxShadow: shadow.sm, border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>📨</div>
                <div style={{ fontFamily: font.display, fontSize: 16, color: C.navy }}>No asks sent yet</div>
                <div style={{ fontFamily: font.body, fontSize: 13, color: C.muted, marginTop: 4 }}>Go to "Who to Ask" to get started — your happiest clients are waiting to help you grow.</div>
              </div>
            ) : (
              sentSources.map(s => (
                <SourceCard key={s.id} source={s}
                  isExpanded={expandedId === s.id}
                  onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)}
                  onMarkSent={handleMarkSent} />
              ))
            )}
          </>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div style={{ padding: "12px 16px 24px", textAlign: "center" }}>
        <div style={{ fontFamily: font.body, fontSize: 11, color: C.light }}>
          Referrals convert at 25% — 3× better than social, events, or content.
          Your happiest clients <em>want</em> to help. You just have to ask.
        </div>
      </div>
    </div>
  );
}
