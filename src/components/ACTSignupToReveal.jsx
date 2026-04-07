import { useState, useEffect } from "react";

/* ═══ TOKENS (pgl-brand-system-reference-v1.md v1.3.0) ═══ */
var T = {
  bg: "#FFFFFF", bgH: "#F7F7F7", bg2: "#F2F2F2", bg3: "#E5E5E5",
  bgP: "#212121", bgPH: "#2E2E2E",
  bgBL: "#FAF6F2", bgBrand: "#F3EBE2", bgBS: "#63574A", bgBD: "#423A31",
  bgPos: "#F0F9F4", bgPosS: "#337E53",
  bgNeg: "#FFE6E6", bgProg: "#FFF2CC", bgInfo: "#E8F0FE", bgAI: "#F5F3FF",
  t1: "#212121", t2: "#636363",
  tb1: "#423A31", tb2: "#63574A",
  tNeg: "#CC0000", tPos: "#337E53", tProg: "#664D00",
  tInfo: "#1B4EA0", tAI: "#7C3AED", tLink: "#2166DB",
  brd: "#D8D8D8", brdB: "#DBD1C6", brdSel: "#212121",
  aiBg: "#8655F6",
  font: "'Lato', system-ui, sans-serif"
};

var CSS = [
  "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');",
  "*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }",
  "body { margin: 0; }",
  "::selection { background: #DDD6FE; }",
  "input:focus, textarea:focus { border-color: #212121 !important; outline: none; box-shadow: 0 0 0 2px rgba(33,33,33,0.1); }",
  "button:focus-visible { outline: 2px solid #212121; outline-offset: 2px; }",
  "@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; } }",
  "@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }",
  "@keyframes nodePop { from { opacity: 0; transform: translate(-50%,-50%) scale(0); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }",
  "@keyframes countUp { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }",
  "@keyframes spin { to { transform: rotate(360deg); } }",
  "@media (max-width: 768px) { .quiz-split { flex-direction: column !important; } .quiz-map-panel { display: none !important; } }"
].join("\n");

/* ═══ DATA ═══ */
var EMAILS = ["demo@fora.travel", "rachel.kim@fora.travel", "david.torres@fora.travel", "mikkoh.chen@fora.travel"];

var CATS = [
  { id: "school", label: "School / PTA", emoji: "\uD83C\uDFEB" },
  { id: "fitness", label: "Fitness / Wellness", emoji: "\uD83C\uDFCB\uFE0F" },
  { id: "social", label: "Social clubs", emoji: "\uD83C\uDF89" },
  { id: "faith", label: "Faith community", emoji: "\u2728" },
  { id: "alumni", label: "Alumni network", emoji: "\uD83C\uDF93" },
  { id: "professional", label: "Professional group", emoji: "\uD83D\uDCBC" },
  { id: "neighborhood", label: "Neighborhood / Local", emoji: "\uD83C\uDFE0" },
  { id: "hobby", label: "Hobby / Interest group", emoji: "\uD83C\uDFA8" },
  { id: "other", label: "Other", emoji: "\u2795" }
];
var CAT_COLORS = ["#337E53", "#45A86E", "#2C6DE8", "#8F6E00", "#7C3AED", "#D4820A", "#E76F51", "#2166DB", "#636363"];

var INTERESTS = [
  "Fitness and running", "Food and wine", "Book clubs", "Volunteering",
  "Travel (personal)", "Yoga and mindfulness", "Photography", "Hiking and outdoors",
  "Arts and culture", "Parenting groups"
];

var TRAVEL_SPECS = [
  "Luxury resorts", "Honeymoons and romance", "Adventure travel",
  "Family vacations", "Destination weddings", "Cruises",
  "Culinary experiences", "Wellness retreats", "Safari and wildlife",
  "Cultural immersion", "Group travel", "Solo travel"
];

var REACH_RANGES = [
  { value: "1-5", label: "Just a few (1-5)", mid: 3 },
  { value: "6-15", label: "A solid group (6-15)", mid: 10 },
  { value: "16-30", label: "A good network (16-30)", mid: 23 },
  { value: "31-50", label: "A wide circle (31-50)", mid: 40 },
  { value: "50+", label: "A big community (50+)", mid: 75 },
  { value: "unknown", label: "Not sure yet", mid: 0 }
];

var CHANNELS = ["Text message", "Email", "Social DM", "Phone call", "In person"];
var SCHEDULES = ["Mornings before work", "Lunch breaks", "Afternoons", "Evenings", "Weekends"];

/* ═══ SHARED UI ═══ */
function Header() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 24px", borderBottom: "1px solid " + T.brd, background: T.bgBL, minHeight: 36, fontFamily: T.font }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: T.tb2 }}>Pro Growth Lab</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: T.tProg, background: T.bgProg, padding: "2px 8px", borderRadius: 9999 }}>BETA</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: T.t2, border: "1px solid " + T.brd, padding: "2px 8px", borderRadius: 9999 }}>ACT-S1 v1.0.0</span>
      </div>
      <span style={{ fontSize: 9, color: T.t2 }}>Apr 7, 2026</span>
    </div>
  );
}

function Foot() {
  return (
    <div style={{ padding: "12px 24px", borderTop: "1px solid " + T.brd, display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: T.font }}>
      <span style={{ fontSize: 11, color: T.t2 }}>Pro Growth Lab - Fora Travel</span>
      <button onClick={function() { alert("Thank you! Your feedback has been submitted."); }} style={{ fontSize: 11, color: T.tLink, background: "none", border: "none", cursor: "pointer", fontFamily: T.font }}>Report a problem</button>
    </div>
  );
}

/* ═══ NETWORK MAP — Large, glassmorphic circles ═══ */
function NetMap(props) {
  var comms = props.communities || [];
  var onClickNode = props.onClickNode;
  var h = props.height || 440;

  /* Fora Travel is always present */
  var nodes = [{ id: "fora", label: "Fora Travel", color: T.tb1, isFora: true }];
  comms.forEach(function(c) {
    var idx = CATS.findIndex(function(cat) { return cat.id === c.catId; });
    nodes.push({ id: c.id, label: c.label, color: CAT_COLORS[idx >= 0 ? idx : 8], catId: c.catId, reach: c.reach });
  });

  /* Orbital positions around center */
  var orbits = [];
  nodes.forEach(function(node, i) {
    if (i === 0) {
      /* Fora Travel — top of center, slightly offset */
      orbits.push({ x: 50, y: 24, r: 32 });
    } else {
      var count = nodes.length - 1;
      var angle = ((i - 1) / Math.max(count, 1)) * Math.PI * 1.6 + Math.PI * 0.2;
      var dist = 28 + (i % 2 === 0 ? 4 : 0);
      var nodeR = Math.max(24, 32 - count * 1.5);
      orbits.push({
        x: 50 + Math.cos(angle) * dist,
        y: 52 + Math.sin(angle) * dist,
        r: nodeR
      });
    }
  });

  return (
    <div style={{ position: "relative", width: "100%", height: h, borderRadius: 8, background: T.bg, border: "1px solid " + T.brd, overflow: "hidden" }}>
      {/* SVG connection lines */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {nodes.map(function(node, i) {
          if (i === 0) return null;
          var p = orbits[i];
          return (
            <line key={"l" + i} x1="50" y1="48" x2={p.x} y2={p.y}
              stroke={node.color} strokeWidth="0.25" strokeDasharray="1.5 1.5" opacity="0.4" />
          );
        })}
        {/* Line from center to Fora */}
        {nodes.length > 0 && (
          <line x1="50" y1="48" x2="50" y2="24" stroke={T.tb1} strokeWidth="0.25" strokeDasharray="1.5 1.5" opacity="0.4" />
        )}
      </svg>

      {/* Center "You" node */}
      <div style={{
        position: "absolute", left: "50%", top: "48%", transform: "translate(-50%, -50%)",
        width: 64, height: 64, borderRadius: "50%", background: T.bgP,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
      }}>
        <span style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: "#FFFFFF" }}>You</span>
      </div>

      {/* Fora Travel — permanent, clickable */}
      <div
        onClick={function() { if (onClickNode) onClickNode("fora"); }}
        style={{
          position: "absolute", left: "50%", top: "24%", transform: "translate(-50%, -50%)",
          width: 60, height: 60, borderRadius: "50%",
          background: T.bgBL, border: "2px solid " + T.tb1,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 8, cursor: onClickNode ? "pointer" : "default",
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          animation: "nodePop 0.5s cubic-bezier(0.34,1.56,0.64,1) both"
        }}
      >
        <span style={{ fontFamily: T.font, fontSize: 9, fontWeight: 700, color: T.tb1, lineHeight: "11px", textAlign: "center" }}>Fora</span>
        <span style={{ fontFamily: T.font, fontSize: 9, fontWeight: 700, color: T.tb1, lineHeight: "11px" }}>Travel</span>
      </div>

      {/* Community bubbles — glassmorphic circles */}
      {nodes.map(function(node, i) {
        if (i === 0) return null;
        var p = orbits[i];
        if (!p) return null;
        var words = node.label.split(" ");
        var line1 = words.slice(0, 2).join(" ");
        return (
          <div
            key={node.id}
            onClick={function() { if (onClickNode) onClickNode(node.id); }}
            style={{
              position: "absolute", left: p.x + "%", top: p.y + "%",
              transform: "translate(-50%, -50%)",
              width: p.r * 2, height: p.r * 2, borderRadius: "50%",
              background: node.color + "15",
              border: "2px solid " + node.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: onClickNode ? "pointer" : "default",
              zIndex: 5,
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              animation: "nodePop 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
              animationDelay: (i * 120) + "ms"
            }}
          >
            <span style={{
              fontFamily: T.font, fontSize: p.r > 22 ? 9 : 8, fontWeight: 700,
              color: node.color, textAlign: "center", lineHeight: "10px",
              padding: 3, wordBreak: "break-word", maxWidth: p.r * 2 - 14
            }}>{line1}</span>
          </div>
        );
      })}

      {/* Empty state */}
      {comms.length === 0 && (
        <div style={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center" }}>
          <p style={{ fontFamily: T.font, fontSize: 13, color: T.t2 }}>Select communities to grow your map</p>
        </div>
      )}
    </div>
  );
}

/* ═══ ANIMATED COUNTER ═══ */
function AnimNum(props) {
  var target = props.value;
  var dur = props.dur || 1400;
  var [val, setVal] = useState(0);
  useEffect(function() {
    if (target <= 0) { setVal(0); return; }
    var start = Date.now();
    function tick() {
      var pct = Math.min((Date.now() - start) / dur, 1);
      setVal(Math.round(pct * target));
      if (pct < 1) requestAnimationFrame(tick);
    }
    tick();
  }, [target]);
  return val;
}

/* ═══ LOGIN ═══ */
function Login(props) {
  var [email, setEmail] = useState("demo@fora.travel");
  var [pass, setPass] = useState("");
  var [err, setErr] = useState("");

  function doLogin() {
    var e = email.trim().toLowerCase();
    if (!e) { setErr("Please enter your Fora email."); return; }
    if (EMAILS.indexOf(e) === -1) {
      setErr("We could not find your email in our advisor list. If you are part of Pro Growth Lab, reach out to your program lead and we will get you set up.");
      return;
    }
    if (!pass) { setErr("Please enter your password."); return; }
    setErr("");
    props.next();
  }

  return (
    <div style={{ fontFamily: T.font, color: T.t1, background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{CSS}</style>
      <Header />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: T.t2, letterSpacing: "0.05em", marginBottom: 8 }}>PRO GROWTH LAB</p>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, lineHeight: "32px" }}>Welcome to your network</h1>
            <p style={{ fontSize: 13, color: T.t2, lineHeight: "20px" }}>Sign in with your Fora advisor email to get started.</p>
          </div>

          <div style={{ background: T.bg, border: "1px solid " + T.brd, borderRadius: 8, padding: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Email address</label>
              <input value={email} onChange={function(e) { setEmail(e.target.value); setErr(""); }}
                onKeyDown={function(e) { if (e.key === "Enter") doLogin(); }}
                placeholder="you@fora.travel"
                style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid " + (err ? T.tNeg : T.brd), fontSize: 15, fontFamily: T.font, color: T.t1 }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" value={pass} onChange={function(e) { setPass(e.target.value); setErr(""); }}
                onKeyDown={function(e) { if (e.key === "Enter") doLogin(); }}
                placeholder="Enter your password"
                style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid " + (err ? T.tNeg : T.brd), fontSize: 15, fontFamily: T.font, color: T.t1 }} />
            </div>

            {err && (
              <div style={{ padding: 12, background: T.bgNeg, borderRadius: 6, marginBottom: 16, animation: "fadeUp 0.3s ease" }}>
                <p style={{ fontSize: 13, color: T.tNeg, lineHeight: "18px" }}>{err}</p>
              </div>
            )}

            <button onClick={doLogin} style={{ width: "100%", padding: "12px", borderRadius: 6, border: "none", background: T.bgP, color: "#FFFFFF", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: T.font, marginBottom: 12 }}>Sign in</button>
            <div style={{ textAlign: "center" }}>
              <button style={{ fontSize: 13, color: T.tLink, background: "none", border: "none", cursor: "pointer", fontFamily: T.font }}>Forgot password?</button>
            </div>
          </div>

          <div style={{ marginTop: 16, padding: 12, background: T.bg2, borderRadius: 8, textAlign: "center" }}>
            <p style={{ fontSize: 11, color: T.t2 }}>Demo: try <strong>demo@fora.travel</strong> with any password</p>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}

/* ═══ QUIZ — 5 steps, progressive map, all fixes ═══ */
function Quiz(props) {
  var [step, setStep] = useState(1);
  var [selectedCats, setSelectedCats] = useState([]);
  var [communities, setCommunities] = useState([]);
  var [otherName, setOtherName] = useState("");
  var [interests, setInterests] = useState([]);
  var [reachVals, setReachVals] = useState({});
  var [schedule, setSchedule] = useState([]);
  var [channels, setChannels] = useState([]);
  var [travelSpecs, setTravelSpecs] = useState([]);
  var [foraDetail, setForaDetail] = useState(false);

  var stepLabels = ["About you", "Your communities", "How deep is your network", "Your schedule", "What you are known for"];

  function toggle(arr, val) { return arr.indexOf(val) > -1 ? arr.filter(function(x) { return x !== val; }) : arr.concat([val]); }

  function selectCat(catId) {
    if (catId === "other" && selectedCats.indexOf("other") > -1) {
      setSelectedCats(selectedCats.filter(function(x) { return x !== "other"; }));
      setCommunities(communities.filter(function(c) { return c.catId !== "other"; }));
      setOtherName("");
      return;
    }
    var newCats = toggle(selectedCats, catId);
    setSelectedCats(newCats);
    if (catId !== "other") {
      var newComms = newCats.filter(function(id) { return id !== "other"; }).map(function(cid) {
        var existing = communities.find(function(c) { return c.catId === cid; });
        return existing || { id: "c-" + cid, catId: cid, label: CATS.find(function(cc) { return cc.id === cid; }).label, reach: null };
      });
      /* Add other community if it exists */
      var otherComm = communities.find(function(c) { return c.catId === "other"; });
      if (otherComm) newComms.push(otherComm);
      setCommunities(newComms);
    }
  }

  function addOther() {
    if (!otherName.trim()) return;
    var newCats = selectedCats.indexOf("other") === -1 ? selectedCats.concat(["other"]) : selectedCats;
    setSelectedCats(newCats);
    var filtered = communities.filter(function(c) { return c.catId !== "other"; });
    filtered.push({ id: "c-other", catId: "other", label: otherName.trim(), reach: null });
    setCommunities(filtered);
  }

  function setReach(catId, val) {
    var nv = {};
    Object.keys(reachVals).forEach(function(k) { nv[k] = reachVals[k]; });
    nv[catId] = val;
    setReachVals(nv);
    var range = REACH_RANGES.find(function(r) { return r.value === val; });
    setCommunities(communities.map(function(c) {
      return c.catId === catId ? { id: c.id, catId: c.catId, label: c.label, reach: val, count: range ? range.mid : 0 } : c;
    }));
  }

  function canNext() {
    if (step === 1) return interests.length >= 1;
    if (step === 2) return selectedCats.length >= 1;
    if (step === 3) return true;
    if (step === 4) return schedule.length >= 1;
    if (step === 5) return travelSpecs.length >= 1;
    return false;
  }

  function handleNext() {
    if (step < 5) setStep(step + 1);
    else props.next(communities);
  }

  /* Chip */
  function Chip(cp) {
    var on = cp.active;
    return (
      <button onClick={cp.onClick} disabled={cp.disabled} style={{
        fontFamily: T.font, fontSize: 13, fontWeight: on ? 600 : 400,
        padding: "7px 16px", borderRadius: 20,
        border: "1px solid " + (on ? T.brdSel : T.brd),
        background: on ? T.bgP : T.bg, color: on ? "#FFFFFF" : T.t1,
        cursor: cp.disabled ? "not-allowed" : "pointer",
        opacity: cp.disabled ? 0.4 : 1,
        transition: "all 0.15s"
      }}>{cp.label}</button>
    );
  }

  /* Step renderers */
  function renderStep() {
    if (step === 1) return (
      <div style={{ animation: "fadeUp 0.4s ease" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>What do you enjoy outside of work and travel?</h2>
        <p style={{ fontSize: 15, color: T.t2, marginBottom: 20, lineHeight: "22px" }}>Select all that apply. This helps us tailor your outreach coaching.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {INTERESTS.map(function(int) {
            return <Chip key={int} label={int} active={interests.indexOf(int) > -1} onClick={function() { setInterests(toggle(interests, int)); }} />;
          })}
        </div>
      </div>
    );

    if (step === 2) return (
      <div style={{ animation: "fadeUp 0.4s ease" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Where do you show up in your community?</h2>
        <p style={{ fontSize: 15, color: T.t2, marginBottom: 20, lineHeight: "22px" }}>Select the groups where people already know and trust you.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {CATS.map(function(cat) {
            var on = selectedCats.indexOf(cat.id) > -1;
            if (cat.id === "other") {
              return (
                <div key="other">
                  <div style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
                    border: "1px solid " + (on ? T.brdSel : T.brd), borderRadius: 6,
                    background: on ? T.bg2 : T.bg,
                    cursor: "pointer"
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{cat.emoji}</span>
                    <input
                      value={otherName}
                      onChange={function(e) { setOtherName(e.target.value); }}
                      onKeyDown={function(e) { if (e.key === "Enter" && otherName.trim()) addOther(); }}
                      placeholder="Type a custom community name..."
                      onClick={function(e) { e.stopPropagation(); }}
                      style={{ flex: 1, border: "none", background: "transparent", fontSize: 13, fontFamily: T.font, color: T.t1, outline: "none" }}
                    />
                    {otherName.trim() && (
                      <button onClick={addOther} style={{ fontSize: 11, fontWeight: 600, color: "#FFFFFF", background: T.bgP, border: "none", borderRadius: 6, padding: "4px 12px", cursor: "pointer", fontFamily: T.font }}>Add</button>
                    )}
                  </div>
                </div>
              );
            }
            return (
              <button key={cat.id} onClick={function() { selectCat(cat.id); }} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
                border: "1px solid " + (on ? T.brdSel : T.brd), borderRadius: 6,
                background: on ? T.bg2 : T.bg,
                cursor: "pointer", fontFamily: T.font, fontSize: 13, fontWeight: on ? 600 : 400,
                color: T.t1, textAlign: "left", width: "100%"
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );

    if (step === 3) return (
      <div style={{ animation: "fadeUp 0.4s ease" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>How many people could you comfortably reach out to?</h2>
        <p style={{ fontSize: 15, color: T.t2, marginBottom: 20, lineHeight: "22px" }}>Think about people you would feel comfortable texting or messaging.</p>
        {communities.length === 0 ? (
          <div style={{ padding: 20, background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 8, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: T.tb2 }}>Go back and select at least one community first.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {communities.map(function(comm) {
              var catObj = CATS.find(function(c) { return c.id === comm.catId; });
              var idx = CATS.indexOf(catObj);
              return (
                <div key={comm.id} style={{ padding: 16, background: T.bg, border: "1px solid " + T.brd, borderRadius: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: CAT_COLORS[idx] + "18", border: "2px solid " + CAT_COLORS[idx], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{catObj ? catObj.emoji : "+"}</div>
                    <span style={{ fontSize: 15, fontWeight: 600 }}>{comm.label}</span>
                  </div>
                  <select value={reachVals[comm.catId] || ""} onChange={function(e) { setReach(comm.catId, e.target.value); }}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid " + T.brd, fontSize: 13, fontFamily: T.font, color: T.t1, appearance: "auto", background: T.bg }}>
                    <option value="">How many can you reach?</option>
                    {REACH_RANGES.map(function(r) { return <option key={r.value} value={r.value}>{r.label}</option>; })}
                  </select>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );

    if (step === 4) return (
      <div style={{ animation: "fadeUp 0.4s ease" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>When do you have time for outreach?</h2>
        <p style={{ fontSize: 15, color: T.t2, marginBottom: 20, lineHeight: "22px" }}>We will build your action calendar around your actual availability.</p>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Best time windows</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {SCHEDULES.map(function(s) {
            return <Chip key={s} label={s} active={schedule.indexOf(s) > -1} onClick={function() { setSchedule(toggle(schedule, s)); }} />;
          })}
        </div>
        <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>How do your clients prefer to hear from you?</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {CHANNELS.map(function(ch) {
            return <Chip key={ch} label={ch} active={channels.indexOf(ch) > -1} onClick={function() { setChannels(toggle(channels, ch)); }} />;
          })}
        </div>
      </div>
    );

    if (step === 5) return (
      <div style={{ animation: "fadeUp 0.4s ease" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>What are you known for?</h2>
        <p style={{ fontSize: 15, color: T.t2, marginBottom: 20, lineHeight: "22px" }}>Select up to 5 travel specialties. This shapes your outreach scripts.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TRAVEL_SPECS.map(function(spec) {
            var on = travelSpecs.indexOf(spec) > -1;
            var atMax = travelSpecs.length >= 5 && !on;
            return <Chip key={spec} label={spec} active={on} disabled={atMax} onClick={function() { if (!atMax) setTravelSpecs(toggle(travelSpecs, spec)); }} />;
          })}
        </div>
        {travelSpecs.length > 0 && (
          <p style={{ fontSize: 11, color: T.t2, marginTop: 8 }}>{travelSpecs.length}/5 selected</p>
        )}
      </div>
    );
  }

  var totalReach = communities.reduce(function(sum, c) { return sum + (c.count || 0); }, 0);

  return (
    <div style={{ fontFamily: T.font, color: T.t1, background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{CSS}</style>
      <Header />

      {/* Progress bar */}
      <div style={{ padding: "12px 24px", borderBottom: "1px solid " + T.brd }}>
        <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
          {stepLabels.map(function(s, i) {
            return <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? T.tPos : i === step - 1 ? T.bgP : T.bg3, transition: "background 0.3s" }} />;
          })}
        </div>
        <p style={{ fontSize: 11, color: T.t2 }}>Step {step} of 5 - {stepLabels[step - 1]}</p>
      </div>

      {/* Split layout: quiz left, map right */}
      <div className="quiz-split" style={{ flex: 1, display: "flex", gap: 32, padding: "24px 24px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* Quiz content */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: 520 }}>
          {step === 1 && (
            <div style={{ padding: 20, background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 8, marginBottom: 24 }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: T.tb1, marginBottom: 8 }}>Welcome to Pro Growth Lab</p>
              <p style={{ fontSize: 13, color: T.tb2, lineHeight: "20px" }}>Every community you add makes your outreach plan smarter. Watch your network grow as you answer each question.</p>
            </div>
          )}

          {renderStep()}

          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {step > 1 && (
              <button onClick={function() { setStep(step - 1); }} style={{
                padding: "10px 20px", borderRadius: 6, border: "1px solid " + T.brd,
                background: T.bg, color: T.t1, fontSize: 15, fontWeight: 600,
                cursor: "pointer", fontFamily: T.font
              }}>Back</button>
            )}
            <button onClick={handleNext} disabled={!canNext()} style={{
              padding: "10px 24px", borderRadius: 6, border: "none",
              background: canNext() ? T.bgP : T.bg3, color: canNext() ? "#FFFFFF" : T.t2,
              fontSize: 15, fontWeight: 600, cursor: canNext() ? "pointer" : "not-allowed",
              fontFamily: T.font
            }}>
              {step === 5 ? "See my network" : "Continue"}
            </button>
          </div>
        </div>

        {/* Network map panel — LARGE */}
        <div className="quiz-map-panel" style={{ width: 380, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start" }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: T.t2, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>Your network</p>
          <NetMap communities={communities} height={380} onClickNode={function(id) { if (id === "fora") setForaDetail(!foraDetail); }} />
          {communities.length > 0 && (
            <p style={{ fontSize: 13, color: T.t2, textAlign: "center", marginTop: 12 }}>{communities.length + 1} communities {totalReach > 0 ? " - ~" + totalReach + " reachable" : ""}</p>
          )}
          {foraDetail && (
            <div style={{ marginTop: 12, padding: 16, background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 8, animation: "fadeUp 0.3s ease" }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: T.tb1, marginBottom: 8 }}>Fora Travel</p>
              <p style={{ fontSize: 13, color: T.tb2, lineHeight: "20px", marginBottom: 8 }}>Your home base. 1,500+ advisors in the Fora network who share your passion for travel.</p>
              <p style={{ fontSize: 11, color: T.tLink }}>foratravel.com</p>
            </div>
          )}
        </div>
      </div>
      <Foot />
    </div>
  );
}

/* ═══ NETWORK INSIGHTS REVEAL ═══ */
function Reveal(props) {
  var communities = props.communities || [];
  var [phase, setPhase] = useState(0);
  var totalReach = communities.reduce(function(sum, c) { return sum + (c.count || 0); }, 0);

  useEffect(function() {
    var t1 = setTimeout(function() { setPhase(1); }, 600);
    var t2 = setTimeout(function() { setPhase(2); }, 1600);
    var t3 = setTimeout(function() { setPhase(3); }, 2800);
    return function() { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div style={{ fontFamily: T.font, color: T.t1, background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{CSS}</style>
      <Header />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>

        {/* Phase 0: Loading */}
        {phase === 0 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 40, height: 40, border: "3px solid " + T.brd, borderTopColor: T.bgP, borderRadius: "50%", animation: "spin 0.7s linear infinite", margin: "0 auto 16px" }} />
            <p style={{ fontSize: 13, color: T.t2 }}>Building your network map...</p>
          </div>
        )}

        {/* Phase 1: Count */}
        {phase >= 1 && (
          <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.8s ease both" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: T.t2, letterSpacing: "0.05em", marginBottom: 16 }}>YOUR NETWORK</p>
            <div style={{ fontSize: 45, fontWeight: 700, lineHeight: 1, marginBottom: 8, animation: "countUp 0.6s ease both" }}>
              <AnimNum value={communities.length} dur={1000} />
            </div>
            <p style={{ fontSize: 20, color: T.t2 }}>{communities.length === 1 ? "community" : "communities"}</p>
          </div>
        )}

        {/* Phase 2: Community cards */}
        {phase >= 2 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 640, marginBottom: 48 }}>
            {communities.map(function(c, i) {
              var catObj = CATS.find(function(cat) { return cat.id === c.catId; });
              var idx = CATS.indexOf(catObj);
              return (
                <div key={c.id} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 18px",
                  background: T.bg, border: "1px solid " + T.brd, borderRadius: 8,
                  animation: "fadeUp 0.5s ease both", animationDelay: (i * 120) + "ms"
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: CAT_COLORS[idx] + "18", border: "2px solid " + CAT_COLORS[idx], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>
                    {catObj ? catObj.emoji : "+"}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</p>
                    {c.count > 0 && <p style={{ fontSize: 11, color: T.t2 }}>~{c.count} reachable</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Phase 3: Total + CTA */}
        {phase >= 3 && (
          <div style={{ textAlign: "center", animation: "fadeUp 0.6s ease both" }}>
            {totalReach > 0 && (
              <p style={{ fontSize: 15, color: T.t2, marginBottom: 20 }}>
                That is roughly <span style={{ fontWeight: 700, color: T.tPos }}>{totalReach}</span> people you already know.
              </p>
            )}
            <button onClick={props.next} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "14px 32px", borderRadius: 6, border: "none",
              background: T.bgP, color: "#FFFFFF", fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: T.font
            }}>
              Explore your dashboard
            </button>
          </div>
        )}
      </div>
      <Foot />
    </div>
  );
}

/* ═══ APP ═══ */
export default function App() {
  var [screen, setScreen] = useState("login");
  var [communities, setCommunities] = useState([]);

  return (
    <div>
      {screen === "login" && <Login next={function() { setScreen("quiz"); }} />}
      {screen === "quiz" && <Quiz next={function(comms) { setCommunities(comms || []); setScreen("reveal"); }} />}
      {screen === "reveal" && <Reveal communities={communities} next={function() { setScreen("done"); }} />}
      {screen === "done" && (
        <div style={{ fontFamily: T.font, color: T.t1, background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <style>{CSS}</style>
          <Header />
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, textAlign: "center" }}>
            <div>
              <p style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>You made it to the dashboard</p>
              <p style={{ fontSize: 15, color: T.t2, marginBottom: 24, lineHeight: "22px" }}>Parts 2-5 are separate prototypes: Home Dashboard, Network Map, Action Calendar, and Advisor Profile.</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                {["Home Dashboard", "Network Map", "Action Calendar", "Advisor Profile"].map(function(name) {
                  return (
                    <div key={name} style={{ padding: "16px 24px", background: T.bg, border: "1px solid " + T.brd, borderRadius: 8 }}>
                      <p style={{ fontSize: 13, fontWeight: 600 }}>{name}</p>
                      <p style={{ fontSize: 11, color: T.t2 }}>Separate prototype</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Foot />
        </div>
      )}
    </div>
  );
}
