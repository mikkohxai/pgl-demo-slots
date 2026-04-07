import { useState } from "react";

var T = {
  bg: "#FFFFFF", bgH: "#F7F7F7", bg2: "#F2F2F2", bg3: "#E5E5E5",
  bgP: "#212121", bgBL: "#FAF6F2", bgBrand: "#F3EBE2", bgBS: "#63574A", bgBD: "#423A31",
  bgPos: "#F0F9F4", bgNeg: "#FFE6E6", bgProg: "#FFF2CC", bgInfo: "#E8F0FE", bgAI: "#F5F3FF",
  t1: "#212121", t2: "#636363", tb1: "#423A31", tb2: "#63574A",
  tPos: "#337E53", tProg: "#664D00", tAI: "#7C3AED", tLink: "#2166DB",
  brd: "#D8D8D8", brdB: "#DBD1C6", brdSel: "#212121",
  font: "'Lato', system-ui, sans-serif"
};

var CSS = "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nbody { margin: 0; }\nbutton:focus-visible { outline: 2px solid #212121; outline-offset: 2px; }\n@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }\n@keyframes nodePop { from { opacity: 0; transform: translate(-50%,-50%) scale(0); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }\n@media (max-width: 768px) { .nm-split { flex-direction: column !important; } }";

var CATS = [
  { id: "school", label: "School / PTA", emoji: "\uD83C\uDFEB", color: "#337E53", light: "#F0F9F4" },
  { id: "fitness", label: "Fitness / Wellness", emoji: "\uD83C\uDFCB\uFE0F", color: "#45A86E", light: "#E8F5E9" },
  { id: "social", label: "Social clubs", emoji: "\uD83C\uDF89", color: "#2C6DE8", light: "#E3F2FD" },
  { id: "alumni", label: "Alumni network", emoji: "\uD83C\uDF93", color: "#7C3AED", light: "#F5F3FF" },
  { id: "hobby", label: "Hobby group", emoji: "\uD83C\uDFA8", color: "#D4820A", light: "#FFF3E0" }
];

/* Pre-populated from Rachel Kim quiz results */
var INITIAL = [
  { id: "c1", catId: "school", name: "Lakeside Elementary PTA", website: "lakesidepta.org", details: "Monthly meetings. Know about 40 parents. Great for family travel leads.", reach: "16-30", count: 23 },
  { id: "c2", catId: "fitness", name: "Westchester Running Club", website: "westchesterrunners.com", details: "Run together Saturdays. Tight group of regulars.", reach: "6-15", count: 10 },
  { id: "c3", catId: "social", name: "Thursday Book Club", website: "", details: "8 women. Very close. All travel at least once a year.", reach: "6-15", count: 8 },
  { id: "c4", catId: "alumni", name: "Cornell Class of 2008", website: "alumni.cornell.edu", details: "LinkedIn group. See some at reunions.", reach: "31-50", count: 40 },
  { id: "c5", catId: "hobby", name: "Westchester Wine Society", website: "winewestchester.com", details: "Monthly tastings. Great for luxury travel conversations.", reach: "16-30", count: 23 }
];

function Header() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 24px", borderBottom: "1px solid " + T.brd, background: T.bgBL, minHeight: 36, fontFamily: T.font }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={function() { alert("Back to dashboard"); }} style={{ fontSize: 13, color: T.tLink, background: "none", border: "none", cursor: "pointer", fontFamily: T.font }}>Home</button>
        <span style={{ fontSize: 11, color: T.t2 }}>/</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: T.tb2 }}>Network map</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: T.tProg, background: T.bgProg, padding: "2px 8px", borderRadius: 9999 }}>BETA</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: T.t2, border: "1px solid " + T.brd, padding: "2px 8px", borderRadius: 9999 }}>ACT-NM v1.0.0</span>
      </div>
      <span style={{ fontSize: 9, color: T.t2, fontFamily: T.font }}>Apr 7, 2026</span>
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

export default function App() {
  var [communities, setCommunities] = useState(INITIAL);
  var [selected, setSelected] = useState(null);
  var [editField, setEditField] = useState({});

  var totalReach = communities.reduce(function(s, c) { return s + (c.count || 0); }, 0);

  /* Orbital positions */
  var allNodes = [{ id: "fora", label: "Fora Travel", color: T.tb1, isFora: true }];
  communities.forEach(function(c) {
    var cat = CATS.find(function(ct) { return ct.id === c.catId; });
    allNodes.push({ id: c.id, label: c.name, color: cat ? cat.color : "#636363", catId: c.catId });
  });

  var positions = [];
  allNodes.forEach(function(node, i) {
    if (i === 0) { positions.push({ x: 50, y: 20, r: 34 }); }
    else {
      var n = allNodes.length - 1;
      var angle = ((i - 1) / Math.max(n, 1)) * Math.PI * 1.7 + Math.PI * 0.15;
      var dist = 30 + (i % 2 === 0 ? 3 : 0);
      positions.push({ x: 50 + Math.cos(angle) * dist, y: 52 + Math.sin(angle) * dist, r: Math.max(22, 30 - n) });
    }
  });

  var selComm = selected ? communities.find(function(c) { return c.id === selected; }) : null;
  var selCat = selComm ? CATS.find(function(ct) { return ct.id === selComm.catId; }) : null;

  return (
    <div style={{ fontFamily: T.font, color: T.t1, background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{CSS}</style>
      <Header />

      <div className="nm-split" style={{ flex: 1, display: "flex", gap: 24, padding: 24 }}>
        {/* Map — 60% */}
        <div style={{ flex: 3, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700 }}>Your network</h1>
            <span style={{ fontSize: 13, color: T.t2 }}>{communities.length + 1} communities - ~{totalReach} reachable</span>
          </div>

          {/* Large map */}
          <div style={{ position: "relative", width: "100%", height: 480, borderRadius: 8, background: T.bg, border: "1px solid " + T.brd, overflow: "hidden", marginBottom: 16 }}>
            {/* Connection lines */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {allNodes.map(function(node, i) {
                if (i === 0) return <line key="fl" x1="50" y1="46" x2="50" y2="20" stroke={T.tb1} strokeWidth="0.2" strokeDasharray="1.5 1.5" opacity="0.4" />;
                var p = positions[i];
                return <line key={"l" + i} x1="50" y1="46" x2={p.x} y2={p.y} stroke={node.color} strokeWidth="0.2" strokeDasharray="1.5 1.5" opacity={selected === node.id ? "0.8" : "0.3"} />;
              })}
            </svg>

            {/* Center You */}
            <div style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%,-50%)", width: 72, height: 72, borderRadius: "50%", background: T.bgP, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF" }}>You</span>
            </div>

            {/* Fora Travel */}
            <div onClick={function() { setSelected(selected === "fora" ? null : "fora"); }} style={{ position: "absolute", left: "50%", top: "20%", transform: "translate(-50%,-50%)", width: 64, height: 64, borderRadius: "50%", background: T.bgBL, border: "2px solid " + T.tb1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 8, cursor: "pointer", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", animation: "nodePop 0.5s cubic-bezier(0.34,1.56,0.64,1) both", boxShadow: selected === "fora" ? "0 0 0 3px " + T.tb1 + "44" : "none" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: T.tb1, lineHeight: "11px" }}>Fora</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: T.tb1, lineHeight: "11px" }}>Travel</span>
            </div>

            {/* Community bubbles */}
            {allNodes.map(function(node, i) {
              if (i === 0) return null;
              var p = positions[i];
              var isSel = selected === node.id;
              return (
                <div key={node.id} onClick={function() { setSelected(isSel ? null : node.id); }}
                  style={{ position: "absolute", left: p.x + "%", top: p.y + "%", transform: "translate(-50%,-50%)", width: p.r * 2, height: p.r * 2, borderRadius: "50%", background: node.color + "15", border: (isSel ? "3px" : "2px") + " solid " + node.color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: isSel ? 9 : 5, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", animation: "nodePop 0.5s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: (i * 100) + "ms", boxShadow: isSel ? "0 0 0 4px " + node.color + "33" : "none", transition: "box-shadow 0.2s" }}>
                  <span style={{ fontSize: p.r > 22 ? 9 : 8, fontWeight: 700, color: node.color, textAlign: "center", lineHeight: "10px", padding: 2, wordBreak: "break-word", maxWidth: p.r * 2 - 14 }}>
                    {node.label.length > 16 ? node.label.substring(0, 14) + ".." : node.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Community list below map */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {communities.map(function(c) {
              var cat = CATS.find(function(ct) { return ct.id === c.catId; });
              var isSel = selected === c.id;
              return (
                <button key={c.id} onClick={function() { setSelected(isSel ? null : c.id); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 6, border: "1px solid " + (isSel ? T.brdSel : T.brd), background: isSel ? T.bg2 : T.bg, cursor: "pointer", fontFamily: T.font }}>
                  <span style={{ fontSize: 14 }}>{cat ? cat.emoji : "+"}</span>
                  <span style={{ fontSize: 13, fontWeight: isSel ? 600 : 400, color: T.t1 }}>{c.name}</span>
                  {c.count > 0 && <span style={{ fontSize: 11, color: T.t2 }}>~{c.count}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel — 40% */}
        <div style={{ flex: 2, minWidth: 300, maxWidth: 380 }}>
          {selected === "fora" ? (
            <div style={{ padding: 20, background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 8, animation: "fadeUp 0.3s ease", position: "sticky", top: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.bgBrand, border: "2px solid " + T.tb1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>F</div>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 700, color: T.tb1 }}>Fora Travel</p>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 9999, background: T.bgBrand, color: T.tb2 }}>Always in your network</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: T.tb2, lineHeight: "20px", marginBottom: 12 }}>Your home base. 1,500+ advisors in the Fora network who share your passion for travel. This community is always part of your map.</p>
              <a href="https://foratravel.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: T.tLink, fontFamily: T.font }}>foratravel.com</a>
            </div>
          ) : selComm ? (
            <div style={{ padding: 20, background: T.bg, border: "1px solid " + T.brd, borderRadius: 8, animation: "fadeUp 0.3s ease", position: "sticky", top: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: (selCat ? selCat.color : "#636363") + "18", border: "2px solid " + (selCat ? selCat.color : "#636363"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{selCat ? selCat.emoji : "+"}</div>
                <div>
                  <p style={{ fontSize: 18, fontWeight: 700, color: T.t1 }}>{selComm.name}</p>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 9999, background: selCat ? selCat.light : T.bg2, color: selCat ? selCat.color : T.t2 }}>{selCat ? selCat.label : "Other"}</span>
                </div>
              </div>

              {selComm.count > 0 && (
                <div style={{ padding: 12, background: T.bgPos, borderRadius: 6, marginBottom: 16 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: T.tPos }}>~{selComm.count} reachable people</p>
                  <p style={{ fontSize: 11, color: T.tPos }}>Range: {selComm.reach}</p>
                </div>
              )}

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: T.t2, display: "block", marginBottom: 4 }}>Organization name</label>
                <input defaultValue={selComm.name} style={{ width: "100%", padding: "9px 12px", borderRadius: 6, border: "1px solid " + T.brd, fontSize: 13, fontFamily: T.font, color: T.t1 }} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: T.t2, display: "block", marginBottom: 4 }}>Website</label>
                <input defaultValue={selComm.website} placeholder="https://" style={{ width: "100%", padding: "9px 12px", borderRadius: 6, border: "1px solid " + T.brd, fontSize: 13, fontFamily: T.font, color: T.t1 }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: T.t2, display: "block", marginBottom: 4 }}>Key details and notes</label>
                <textarea defaultValue={selComm.details} rows={3} placeholder="Who comes to mind? Name 1-2 people you could reach out to..." style={{ width: "100%", padding: "9px 12px", borderRadius: 6, border: "1px solid " + T.brd, fontSize: 13, fontFamily: T.font, color: T.t1, resize: "vertical" }} />
              </div>

              <button style={{ width: "100%", padding: "10px", borderRadius: 6, border: "none", background: T.bgP, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: T.font }}>Save changes</button>
            </div>
          ) : (
            <div style={{ padding: 32, background: T.bg, border: "1px solid " + T.brd, borderRadius: 8, textAlign: "center", position: "sticky", top: 24 }}>
              <p style={{ fontSize: 24, marginBottom: 8 }}>{"\uD83D\uDC46"}</p>
              <p style={{ fontSize: 15, color: T.t2 }}>Click a community bubble to see details</p>
              <p style={{ fontSize: 13, color: T.t2, marginTop: 8 }}>You can edit names, websites, notes, and connection counts for each community.</p>
            </div>
          )}
        </div>
      </div>
      <Foot />
    </div>
  );
}
