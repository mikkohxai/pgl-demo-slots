import { useState } from "react";

const BRAND = {
  cream: "#F3EBE2", charcoal: "#1E2832", coral: "#D4745F", sage: "#8BA89F",
  purple: "#534AB7", purpleLight: "#EEEDFE", purpleMid: "#AFA9EC",
  sageLight: "#E8F0EC", coralLight: "#FAECE7", amberLight: "#FEF7E6",
  amber: "#B8860B", white: "#FFFFFF", gray100: "#F8F7F5", gray200: "#E8E6E1",
  gray400: "#A8A5A0", gray600: "#6B6966", gray800: "#3A3835",
};

const lato = `'Lato', -apple-system, BlinkMacSystemFont, sans-serif`;

const Badge = ({ color, bg, children }) => (
  <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: bg, color, fontWeight: 500, whiteSpace: "nowrap" }}>{children}</span>
);

const ScoreRing = ({ score, size = 40 }) => {
  const pct = Math.min(100, Math.max(0, score));
  const color = pct >= 75 ? BRAND.purple : pct >= 50 ? "#378ADD" : BRAND.gray400;
  const bg = pct >= 75 ? BRAND.purpleLight : pct >= 50 ? "#E6F1FB" : BRAND.gray100;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${color} 0% ${pct}%, ${bg} ${pct}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: size - 10, height: size - 10, borderRadius: "50%", background: BRAND.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size < 36 ? 10 : 12, fontWeight: 600, color }}>{score}</div>
    </div>
  );
};

const Card = ({ children, style }) => (
  <div style={{ background: BRAND.white, borderRadius: 12, border: `1px solid ${BRAND.gray200}`, padding: "14px 18px", ...style }}>{children}</div>
);

const Btn = ({ primary, children, onClick, style }) => (
  <button onClick={onClick} style={{ fontSize: 12, padding: "6px 16px", borderRadius: 8, border: primary ? "none" : `1px solid ${BRAND.purple}`, background: primary ? BRAND.purple : "transparent", color: primary ? "#fff" : BRAND.purple, cursor: "pointer", fontWeight: 500, fontFamily: lato, ...style }}>{children}</button>
);

const Avatar = ({ initials, bg, color }) => (
  <div style={{ width: 42, height: 42, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 14, color, flexShrink: 0 }}>{initials}</div>
);

const SectionTitle = ({ icon, title, subtitle }) => (
  <div style={{ marginBottom: 14 }}>
    <div style={{ fontWeight: 600, fontSize: 17, color: BRAND.charcoal }}>{icon} {title}</div>
    {subtitle && <div style={{ fontSize: 13, color: BRAND.gray600, marginTop: 2 }}>{subtitle}</div>}
  </div>
);

// ━━━━━━━━━━━━━━━━━━ ACT-21: CLIENT MATCH SCORE ━━━━━━━━━━━━━━━━━━
const CONTACTS = [
  { name: "Sarah Mitchell", initials: "SM", role: "VP at Stripe", loc: "New York, NY", score: 87, tags: [["Income: high", BRAND.sageLight, "#085041"], ["Travels 3x/yr", BRAND.sageLight, "#085041"], ["Same PTA", BRAND.purpleLight, "#3C3489"], ["Family ICP match", BRAND.sageLight, "#085041"]], explanation: "Strong match for your family travel ICP. VP at Stripe with two school-age kids — the exact life stage you specialize in. Active in your PTA community.", action: "text" },
  { name: "Tom Kowalski", initials: "TK", role: "Director at Goldman Sachs", loc: "Greenwich, CT", score: 72, tags: [["Income: high", BRAND.sageLight, "#085041"], ["Travels 1x/yr", BRAND.amberLight, BRAND.amber], ["Gym buddy", BRAND.sageLight, "#085041"]], explanation: "Good income fit but lower travel frequency. Gym connection provides a warm outreach channel.", action: "email" },
  { name: "Lisa Rodriguez", initials: "LR", role: "Teacher", loc: "Stamford, CT", score: 45, tags: [["Income: medium", BRAND.amberLight, BRAND.amber], ["No travel posts", BRAND.gray100, BRAND.gray600], ["Neighbor", BRAND.purpleLight, "#3C3489"]], explanation: "Moderate match. Teaching salary limits luxury travel budget but neighborhood connection is warm.", action: null },
];

const ACT21 = () => {
  const [expanded, setExpanded] = useState(0);
  return (
    <div>
      <SectionTitle icon="📊" title="Client Match Score™" subtitle="Your contacts ranked by client fit — highest potential first" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CONTACTS.map((c, i) => (
          <Card key={i} style={{ opacity: c.score < 50 ? 0.7 : 1, cursor: "pointer" }} >
            <div style={{ display: "flex", gap: 12 }} onClick={() => setExpanded(expanded === i ? -1 : i)}>
              <Avatar initials={c.initials} bg={c.score >= 75 ? BRAND.purpleLight : c.score >= 50 ? "#E6F1FB" : BRAND.gray100} color={c.score >= 75 ? "#3C3489" : c.score >= 50 ? "#0C447C" : BRAND.gray600} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: BRAND.charcoal }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: BRAND.gray600 }}>{c.role} · {c.loc}</div>
                  </div>
                  <ScoreRing score={c.score} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
                  {c.tags.map(([label, bg, color], j) => <Badge key={j} bg={bg} color={color}>{label}</Badge>)}
                </div>
                {expanded === i && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${BRAND.gray200}` }}>
                    <div style={{ fontSize: 13, color: BRAND.gray600, lineHeight: 1.6 }}>{c.explanation}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      {c.action && <Btn primary>Draft message</Btn>}
                      <Btn>View full profile</Btn>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━ ACT-18: NEIGHBORHOOD NAVIGATOR ━━━━━━━━━━━━━━━━━━
const VENUES = [
  { name: "CorePower Yoga — Upper West Side", addr: "160 W 73rd St", type: "Fitness", rating: 4.7, reviews: 312, fit: "High", explanation: "Premium yoga studio in affluent UWS neighborhood. Clientele skews professional women 30–50 with disposable income.", suggestion: "Attend the Saturday 9 AM community class — regulars chat after. Mention you're a travel advisor during cooldown.", initial: "Y", gradient: [BRAND.sageLight, BRAND.sage] },
  { name: "Vino Levain — Wine & Supper Club", addr: "462 Amsterdam Ave", type: "Dining", rating: 4.8, reviews: 187, fit: "High", explanation: "Upscale wine bar with monthly supper club events. Members skew couples 35–55 in finance and creative fields.", suggestion: "Attend the next Thursday tasting. Couples at wine events are prime honeymoon prospects.", initial: "W", gradient: [BRAND.amberLight, "#FAC775"] },
  { name: "Equinox — Columbus Circle", addr: "10 Columbus Cir", type: "Fitness", rating: 4.2, reviews: 524, fit: "Medium", explanation: "Premium gym with affluent membership, but large facility makes it harder to build relationships.", suggestion: "Try group fitness classes over open gym — smaller groups, more conversation.", initial: "E", gradient: [BRAND.gray100, BRAND.gray200] },
];

const ACT18 = () => {
  const [filters, setFilters] = useState(["Fitness", "Dining"]);
  const types = ["Fitness", "Dining", "Schools", "Social clubs", "Professional"];
  return (
    <div>
      <SectionTitle icon="📍" title="Neighborhood Navigator™" subtitle="Venues where your ideal clients spend time" />
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <input defaultValue="10023" style={{ width: 80, padding: "6px 10px", fontSize: 13, borderRadius: 8, border: `1px solid ${BRAND.gray200}`, fontFamily: lato }} />
        <span style={{ fontSize: 12, color: BRAND.gray400, alignSelf: "center" }}>10 mi</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {types.map(t => (
          <span key={t} onClick={() => setFilters(f => f.includes(t) ? f.filter(x => x !== t) : [...f, t])} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: filters.includes(t) ? BRAND.purpleLight : "transparent", color: filters.includes(t) ? "#3C3489" : BRAND.gray600, border: `1px solid ${filters.includes(t) ? BRAND.purpleMid : BRAND.gray200}`, cursor: "pointer" }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {VENUES.map((v, i) => (
          <Card key={i} style={{ opacity: v.fit === "Medium" ? 0.75 : 1 }}>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 10, background: `linear-gradient(135deg, ${v.gradient[0]}, ${v.gradient[1]})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: BRAND.charcoal, flexShrink: 0 }}>{v.initial}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: BRAND.charcoal }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: BRAND.gray600 }}>{v.addr} · {v.type} · {v.rating} ★ ({v.reviews})</div>
                  </div>
                  <Badge bg={v.fit === "High" ? BRAND.sageLight : BRAND.amberLight} color={v.fit === "High" ? "#085041" : BRAND.amber}>{v.fit} fit</Badge>
                </div>
                <div style={{ fontSize: 12, color: BRAND.gray600, marginTop: 6, lineHeight: 1.5 }}>{v.explanation}</div>
                <div style={{ fontSize: 12, color: BRAND.purple, marginTop: 6, fontWeight: 500 }}>{v.suggestion}</div>
                {v.fit === "High" && <div style={{ marginTop: 8 }}><Btn primary>Add to my radar</Btn></div>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━ ACT-19: MOMENT SPOTTER ━━━━━━━━━━━━━━━━━━
const MOMENTS = [
  { name: "Sarah Mitchell", event: "Promoted to SVP at Stripe", icon: "🎉", type: "promotion", message: "Congrats on SVP, Sarah! Many of my clients celebrate big career moves with a trip. Want me to plan something special?", channel: "text" },
  { name: "Tom Kowalski", event: "Engaged! (Instagram post)", icon: "💍", type: "engagement", message: "Tom, congratulations! If you're thinking about a honeymoon, I'd love to help make it unforgettable.", channel: "DM" },
  { name: "Priya Sharma", event: "Youngest started college (LinkedIn post)", icon: "🎓", type: "empty_nest", message: "What an exciting new chapter, Priya! With the kids off to school, this is the perfect time for that dream trip you've been postponing. Where have you always wanted to go?", channel: "email" },
];

const ACT19 = () => {
  const [dismissed, setDismissed] = useState([]);
  return (
    <div>
      <SectionTitle icon="✨" title="Moment Spotter™" subtitle={`${MOMENTS.length - dismissed.length} moments this week`} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MOMENTS.filter((_, i) => !dismissed.includes(i)).map((m, i) => (
          <Card key={i}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: BRAND.charcoal }}>{m.name} — {m.event}</div>
                <div style={{ fontSize: 13, color: BRAND.gray600, marginTop: 8, lineHeight: 1.6, padding: "10px 14px", background: BRAND.gray100, borderRadius: 8, borderLeft: `3px solid ${BRAND.purple}` }}>"{m.message}"</div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <Btn primary>Send via {m.channel}</Btn>
                  <Btn>Edit</Btn>
                  <Btn onClick={() => setDismissed(d => [...d, i])} style={{ color: BRAND.gray400, borderColor: BRAND.gray200 }}>Dismiss</Btn>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {dismissed.length === MOMENTS.length && (
          <div style={{ textAlign: "center", padding: 30, color: BRAND.gray400, fontSize: 14 }}>All moments handled this week — check back Monday!</div>
        )}
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━ ACT-24: CLIENT DECODER ━━━━━━━━━━━━━━━━━━
const ACT24 = () => (
  <div>
    <SectionTitle icon="🔎" title="Client Decoder™" subtitle="AI-researched intelligence card" />
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Avatar initials="SM" bg={BRAND.purpleLight} color="#3C3489" />
          <div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Sarah Mitchell</div>
            <div style={{ fontSize: 12, color: BRAND.gray600 }}>VP at Stripe · New York</div>
          </div>
        </div>
        <ScoreRing score={87} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: BRAND.charcoal, marginBottom: 6 }}>Interests</div>
        {[
          { interest: "Marathon runner", evidence: "Finished Boston 2025", source: "LinkedIn", verified: true },
          { interest: "Wine collector", evidence: "Napa Valley posts monthly", source: "Instagram", verified: true },
          { interest: "Cookbook author", evidence: "Published 2024", source: "Amazon", verified: true },
          { interest: "Likely foodie", evidence: "Inferred from cookbook + wine", source: "inference", verified: false },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < 3 ? `1px solid ${BRAND.gray100}` : "none" }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.charcoal }}>{item.interest}</span>
              <span style={{ fontSize: 11, color: BRAND.gray400, marginLeft: 8 }}>{item.evidence}</span>
            </div>
            <Badge bg={item.verified ? BRAND.sageLight : BRAND.amberLight} color={item.verified ? "#085041" : BRAND.amber}>{item.verified ? `✓ ${item.source}` : "Inferred"}</Badge>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: BRAND.charcoal, marginBottom: 6 }}>Trip suggestions</div>
        {[
          { dest: "🍷 Bordeaux, France", why: "Wine harvest tour + running trails through vineyard country", timing: "September" },
          { dest: "🏃 Tokyo, Japan", why: "Tokyo Marathon + family-friendly cultural immersion", timing: "March" },
          { dest: "🍳 Tuscany, Italy", why: "Cooking villa ties cookbook hobby to family vacation", timing: "June–August" },
        ].map((t, i) => (
          <div key={i} style={{ padding: "8px 12px", background: BRAND.gray100, borderRadius: 8, marginBottom: 6 }}>
            <div style={{ fontWeight: 500, fontSize: 13, color: BRAND.charcoal }}>{t.dest} <span style={{ fontSize: 11, color: BRAND.gray400, fontWeight: 400 }}>· {t.timing}</span></div>
            <div style={{ fontSize: 12, color: BRAND.gray600, marginTop: 2 }}>{t.why}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: BRAND.charcoal, marginBottom: 6 }}>Conversation starters</div>
        <div style={{ fontSize: 13, color: BRAND.gray600, lineHeight: 1.6, padding: "8px 12px", background: BRAND.purpleLight, borderRadius: 8, borderLeft: `3px solid ${BRAND.purple}` }}>"How was Boston this year? I have a client who did Tokyo Marathon and said it changed her life."</div>
      </div>
      <Btn primary>Draft message using these insights</Btn>
    </Card>
  </div>
);

// ━━━━━━━━━━━━━━━━━━ ACT-22: CONTACT COMPLETER ━━━━━━━━━━━━━━━━━━
const ACT22 = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const doSearch = () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setLoading(false);
      setResult({ name: "Sarah Mitchell", role: "SVP, Head of Payments", company: "Stripe", location: "New York, NY", email: "sarah.m@stripe.com", linkedin: "linkedin.com/in/sarahmitchell", phone: "+1 (212) 555-0147", score: 87, confidence: { email: "High", phone: "Medium", role: "High", location: "High" } });
    }, 2000);
  };
  return (
    <div>
      <SectionTitle icon="🧩" title="Contact Completer™" subtitle="Enter any fragment — we'll build the full card" />
      <Card>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Name, email, LinkedIn URL, or phone..." style={{ flex: 1, padding: "10px 14px", fontSize: 14, borderRadius: 8, border: `1px solid ${BRAND.gray200}`, fontFamily: lato }} onKeyDown={e => e.key === "Enter" && doSearch()} />
          <Btn primary onClick={doSearch}>Enrich</Btn>
        </div>
        {loading && (
          <div style={{ textAlign: "center", padding: 30 }}>
            <div style={{ fontSize: 14, color: BRAND.purple, fontWeight: 500, marginBottom: 8 }}>Searching across providers...</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              {["Tier 1: AI Research", "Tier 2: Email verify", "Tier 3: Full profile"].map((t, i) => (
                <span key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: i === 0 ? BRAND.purpleLight : BRAND.gray100, color: i === 0 ? BRAND.purple : BRAND.gray400 }}>{i === 0 ? "⏳ " : ""}{t}</span>
              ))}
            </div>
          </div>
        )}
        {result && (
          <div style={{ borderTop: `1px solid ${BRAND.gray200}`, paddingTop: 14 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <Avatar initials="SM" bg={BRAND.purpleLight} color="#3C3489" />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{result.name}</div>
                <div style={{ fontSize: 12, color: BRAND.gray600 }}>{result.role} at {result.company}</div>
              </div>
              <ScoreRing score={result.score} />
            </div>
            <table style={{ width: "100%", fontSize: 13 }}>
              <tbody>
                {[["Email", result.email, result.confidence.email], ["Phone", result.phone, result.confidence.phone], ["LinkedIn", result.linkedin, "High"], ["Location", result.location, result.confidence.location]].map(([label, val, conf], i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${BRAND.gray100}` }}>
                    <td style={{ padding: "6px 0", color: BRAND.gray400, width: 80 }}>{label}</td>
                    <td style={{ padding: "6px 0", color: BRAND.charcoal }}>{val}</td>
                    <td style={{ padding: "6px 0", textAlign: "right" }}><Badge bg={conf === "High" ? BRAND.sageLight : BRAND.amberLight} color={conf === "High" ? "#085041" : BRAND.amber}>{conf}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Btn primary>Add to network</Btn>
              <Btn>Draft message</Btn>
            </div>
          </div>
        )}
        {!loading && !result && (
          <div style={{ textAlign: "center", padding: 20, color: BRAND.gray400, fontSize: 13 }}>Try: "Sarah, Stripe" or "sarah@stripe.com" or a LinkedIn URL</div>
        )}
      </Card>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━ ACT-20: EVENT EDGE ━━━━━━━━━━━━━━━━━━
const ACT20 = () => {
  const [phase, setPhase] = useState("pre");
  const attendees = [
    { name: "Jennifer Park", role: "CEO, Luxe Retreats", score: 91, met: false },
    { name: "David Chen", role: "VP Travel, Amex GBT", score: 84, met: false },
    { name: "Maria Gonzalez", role: "Dir. Events, Marriott", score: 78, met: false },
    { name: "Robert Kim", role: "Founder, TripWise", score: 65, met: false },
  ];
  const [metList, setMetList] = useState({});
  return (
    <div>
      <SectionTitle icon="🎯" title="Event Edge™" subtitle="Conference intelligence & auto follow-up" />
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {["pre", "during", "post"].map(p => (
          <span key={p} onClick={() => setPhase(p)} style={{ fontSize: 12, padding: "5px 14px", borderRadius: 20, background: phase === p ? BRAND.purple : "transparent", color: phase === p ? "#fff" : BRAND.gray600, border: `1px solid ${phase === p ? BRAND.purple : BRAND.gray200}`, cursor: "pointer", fontWeight: 500, textTransform: "capitalize" }}>{p === "pre" ? "Pre-event" : p === "during" ? "During" : "Post-event"}</span>
        ))}
      </div>
      {phase === "pre" && (
        <Card>
          <div style={{ padding: "16px", background: BRAND.gray100, borderRadius: 8, textAlign: "center", marginBottom: 14, border: `2px dashed ${BRAND.gray200}` }}>
            <div style={{ fontSize: 14, color: BRAND.gray600, fontWeight: 500 }}>Drop attendee CSV here</div>
            <div style={{ fontSize: 12, color: BRAND.gray400, marginTop: 4 }}>Name + Company/Role/Email/LinkedIn</div>
          </div>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: BRAND.charcoal }}>Who to Meet — ranked by client fit</div>
          {attendees.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${BRAND.gray100}` }}>
              <ScoreRing score={a.score} size={32} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: BRAND.charcoal }}>{a.name}</div>
                <div style={{ fontSize: 11, color: BRAND.gray400 }}>{a.role}</div>
              </div>
              <Badge bg={BRAND.purpleLight} color="#3C3489">Talking points ready</Badge>
            </div>
          ))}
        </Card>
      )}
      {phase === "during" && (
        <Card>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: BRAND.charcoal }}>Mark contacts you've met</div>
          {attendees.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${BRAND.gray100}` }}>
              <div onClick={() => setMetList(m => ({ ...m, [i]: !m[i] }))} style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${metList[i] ? BRAND.sage : BRAND.gray200}`, background: metList[i] ? BRAND.sageLight : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: BRAND.sage }}>{metList[i] ? "✓" : ""}</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: BRAND.charcoal }}>{a.name}</span>
                <span style={{ fontSize: 11, color: BRAND.gray400, marginLeft: 6 }}>{a.role}</span>
              </div>
              {metList[i] && <input placeholder="Quick note..." style={{ width: 140, fontSize: 11, padding: "4px 8px", borderRadius: 6, border: `1px solid ${BRAND.gray200}`, fontFamily: lato }} />}
            </div>
          ))}
        </Card>
      )}
      {phase === "post" && (
        <Card>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: BRAND.charcoal }}>Auto-drafted follow-ups</div>
          {attendees.slice(0, 2).map((a, i) => (
            <div key={i} style={{ padding: "10px 14px", background: BRAND.gray100, borderRadius: 8, marginBottom: 8, borderLeft: `3px solid ${BRAND.purple}` }}>
              <div style={{ fontWeight: 500, fontSize: 13, color: BRAND.charcoal, marginBottom: 4 }}>To: {a.name}</div>
              <div style={{ fontSize: 12, color: BRAND.gray600, lineHeight: 1.5 }}>"Great meeting you at ILTM! I loved our conversation about {i === 0 ? "luxury wellness retreats in Bali" : "corporate travel innovation"}. I'd love to continue the discussion — are you free for a quick call this week?"</div>
              <div style={{ display: "flex", gap: 6, marginTop: 8 }}><Btn primary>Send</Btn><Btn>Edit</Btn></div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: BRAND.gray400, textAlign: "center", marginTop: 8 }}>2 of 4 follow-ups generated · Send all →</div>
        </Card>
      )}
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━ ACT-23: TRAVEL INTENT SCANNER ━━━━━━━━━━━━━━━━━━
const SIGNALS = [
  { platform: "Reddit", sub: "r/honeymoonplanning", author: "u/excited_bride_2026", text: "My fiancé and I can't decide between Maldives and Bora Bora for our honeymoon. Budget is around $15K for 10 days. Any recommendations?", suggestion: "You specialize in both destinations! Share your comparison insights and offer a free consultation." },
  { platform: "Nextdoor", sub: "Upper West Side", author: "Jessica L.", text: "Can anyone recommend a good travel advisor? We want to plan a family trip to Europe this summer but have no idea where to start with 3 kids.", suggestion: "This is your exact ICP — family travel in your neighborhood. Respond with your credentials and a specific family-friendly itinerary idea." },
  { platform: "Reddit", sub: "r/luxurytravel", author: "u/anniversary_planner", text: "Planning a 25th anniversary trip for my parents. They love wine, cooking classes, and coastal towns. Budget flexible. Ideas?", suggestion: "Suggest Amalfi Coast or Bordeaux — both match wine + cooking + coastal. Offer to create a custom itinerary." },
];

const ACT23 = () => (
  <div>
    <SectionTitle icon="📡" title="Travel Intent Scanner™" subtitle="People actively planning trips — before they book with someone else" />
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {SIGNALS.map((s, i) => (
        <Card key={i}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
            <Badge bg={s.platform === "Reddit" ? "#FCEBEB" : BRAND.sageLight} color={s.platform === "Reddit" ? "#791F1F" : "#085041"}>{s.platform}</Badge>
            <span style={{ fontSize: 11, color: BRAND.gray400 }}>{s.sub} · {s.author}</span>
          </div>
          <div style={{ fontSize: 13, color: BRAND.charcoal, lineHeight: 1.6, marginBottom: 10 }}>"{s.text}"</div>
          <div style={{ fontSize: 12, color: BRAND.purple, lineHeight: 1.5, padding: "8px 12px", background: BRAND.purpleLight, borderRadius: 8, marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>Suggested response:</span> {s.suggestion}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn primary>Respond on {s.platform}</Btn>
            <Btn>Save lead</Btn>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━ ACT-25: SUBSCRIBER UPGRADE ENGINE ━━━━━━━━━━━━━━━━━━
const SUBSCRIBERS = [
  { name: "Amanda Foster", email: "amanda.f@gmail.com", opens: "92%", clicks: "34%", score: 81, role: "Marketing Director", lastOpen: "2 days ago" },
  { name: "Brian Nguyen", email: "brian.n@outlook.com", opens: "78%", clicks: "22%", score: 74, role: "Architect", lastOpen: "5 days ago" },
  { name: "Carla Smith", email: "carla.s@yahoo.com", opens: "65%", clicks: "12%", score: 58, role: "Unknown", lastOpen: "12 days ago" },
];

const ACT25 = () => (
  <div>
    <SectionTitle icon="💌" title="Subscriber Upgrade Engine™" subtitle="Your warmest unconverted leads — newsletter subscribers scored by client fit" />
    <Card style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
        <Badge bg={BRAND.sageLight} color="#085041">Mailchimp connected</Badge>
        <span style={{ fontSize: 12, color: BRAND.gray400 }}>340 subscribers · 17 scored ≥70</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <Badge bg={BRAND.purpleLight} color="#3C3489">Score ≥70</Badge>
        <Badge bg={BRAND.amberLight} color={BRAND.amber}>Opened last 3 emails</Badge>
      </div>
    </Card>
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {SUBSCRIBERS.map((s, i) => (
        <Card key={i} style={{ opacity: s.score < 70 ? 0.65 : 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ScoreRing score={s.score} size={36} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14, color: BRAND.charcoal }}>{s.name}</span>
                  <span style={{ fontSize: 11, color: BRAND.gray400, marginLeft: 8 }}>{s.role}</span>
                </div>
                <div style={{ display: "flex", gap: 8, fontSize: 11, color: BRAND.gray400 }}>
                  <span>Opens: <b style={{ color: BRAND.charcoal }}>{s.opens}</b></span>
                  <span>Clicks: <b style={{ color: BRAND.charcoal }}>{s.clicks}</b></span>
                </div>
              </div>
              <div style={{ fontSize: 11, color: BRAND.gray400, marginTop: 2 }}>{s.email} · Last opened {s.lastOpen}</div>
            </div>
            {s.score >= 70 && <Btn primary style={{ fontSize: 11, padding: "4px 10px" }}>Draft upgrade</Btn>}
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━ ACT-26: GROUP TRAVEL PROSPECTOR ━━━━━━━━━━━━━━━━━━
const COMPANIES = [
  { name: "Lattice", size: "850 employees", industry: "HR Tech", hq: "San Francisco, CA", growth: "+32% YoY headcount", contact: "Rachel Torres", contactRole: "Head of People Operations", contactEmail: "r.torres@lattice.com", pitch: "I noticed Lattice grew from 640 to 850 employees this year — are you planning team retreats to keep your expanding teams connected? I specialize in group experiences for fast-growing tech companies." },
  { name: "Notion Labs", size: "520 employees", industry: "Productivity SaaS", hq: "San Francisco, CA", growth: "+18% YoY", contact: "Kevin Park", contactRole: "Office & Events Manager", contactEmail: "k.park@notion.so", pitch: "With Notion's distributed team continuing to grow, annual offsites are more important than ever. I've helped teams your size plan memorable retreats that actually improve retention." },
];

const ACT26 = () => (
  <div>
    <SectionTitle icon="🏢" title="Group Travel Prospector™" subtitle="Find the right person at any company for corporate travel" />
    <Card style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="Company name or URL..." style={{ flex: 1, padding: "8px 12px", fontSize: 13, borderRadius: 8, border: `1px solid ${BRAND.gray200}`, fontFamily: lato }} />
        <Btn primary>Find contacts</Btn>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        {["200–500 emp", "Tech", "San Francisco"].map((f, i) => (
          <Badge key={i} bg={BRAND.purpleLight} color="#3C3489">{f}</Badge>
        ))}
      </div>
    </Card>
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {COMPANIES.map((c, i) => (
        <Card key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: BRAND.charcoal }}>{c.name}</div>
              <div style={{ fontSize: 12, color: BRAND.gray600 }}>{c.size} · {c.industry} · {c.hq}</div>
              <Badge bg={BRAND.sageLight} color="#085041">{c.growth}</Badge>
            </div>
          </div>
          <div style={{ background: BRAND.gray100, borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: BRAND.charcoal, marginBottom: 4 }}>Decision maker identified</div>
            <div style={{ fontSize: 13, color: BRAND.charcoal }}>{c.contact} — <span style={{ color: BRAND.gray600 }}>{c.contactRole}</span></div>
            <div style={{ fontSize: 12, color: BRAND.purple, marginTop: 2 }}>{c.contactEmail}</div>
          </div>
          <div style={{ fontSize: 12, color: BRAND.gray600, lineHeight: 1.5, padding: "8px 12px", borderLeft: `3px solid ${BRAND.purple}`, background: BRAND.purpleLight, borderRadius: 8, marginBottom: 10 }}>"{c.pitch}"</div>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn primary>Send proposal</Btn>
            <Btn>View company profile</Btn>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━ MAIN APP ━━━━━━━━━━━━━━━━━━
const TABS = [
  { id: "act21", label: "Match Score", icon: "📊", component: ACT21 },
  { id: "act18", label: "Navigator", icon: "📍", component: ACT18 },
  { id: "act19", label: "Moments", icon: "✨", component: ACT19 },
  { id: "act24", label: "Decoder", icon: "🔎", component: ACT24 },
  { id: "act22", label: "Completer", icon: "🧩", component: ACT22 },
  { id: "act20", label: "Event Edge", icon: "🎯", component: ACT20 },
  { id: "act23", label: "Intent Scan", icon: "📡", component: ACT23 },
  { id: "act25", label: "Subscribers", icon: "💌", component: ACT25 },
  { id: "act26", label: "Group Travel", icon: "🏢", component: ACT26 },
];

export default function ACTPrototypeSuite() {
  const [tab, setTab] = useState("act21");
  const ActiveComponent = TABS.find(t => t.id === tab)?.component || ACT21;

  return (
    <div style={{ fontFamily: lato, color: BRAND.charcoal, maxWidth: 800, margin: "0 auto" }}>
      <div style={{ background: BRAND.charcoal, borderRadius: "14px 14px 0 0", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: BRAND.cream, letterSpacing: 0.5 }}>Pro Growth Lab</div>
          <div style={{ fontSize: 11, color: BRAND.gray400, marginTop: 2 }}>Enrichment Prototype Suite · 9 experiments</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: BRAND.coral }}></div>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: BRAND.sage }}></div>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: BRAND.purple }}></div>
        </div>
      </div>

      <div style={{ background: BRAND.cream, padding: "4px 8px", display: "flex", gap: 2, overflowX: "auto", borderBottom: `1px solid ${BRAND.gray200}` }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ fontSize: 11, padding: "8px 10px", borderRadius: 8, border: "none", background: tab === t.id ? BRAND.white : "transparent", color: tab === t.id ? BRAND.purple : BRAND.gray600, cursor: "pointer", fontFamily: lato, fontWeight: tab === t.id ? 600 : 400, whiteSpace: "nowrap", boxShadow: tab === t.id ? `0 1px 3px rgba(0,0,0,0.08)` : "none" }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={{ background: BRAND.gray100, borderRadius: "0 0 14px 14px", padding: 20, minHeight: 500 }}>
        <ActiveComponent />
      </div>
    </div>
  );
}
