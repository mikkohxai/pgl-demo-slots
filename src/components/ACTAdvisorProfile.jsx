import { useState } from "react";

var T = {
  bg: "#FFFFFF", bgH: "#F7F7F7", bg2: "#F2F2F2", bg3: "#E5E5E5",
  bgP: "#212121", bgBL: "#FAF6F2", bgBrand: "#F3EBE2", bgBS: "#63574A", bgBD: "#423A31",
  bgPos: "#F0F9F4", bgNeg: "#FFE6E6", bgProg: "#FFF2CC", bgInfo: "#E8F0FE", bgAI: "#F5F3FF",
  t1: "#212121", t2: "#636363", tb1: "#423A31", tb2: "#63574A",
  tPos: "#337E53", tProg: "#664D00", tAI: "#7C3AED", tLink: "#2166DB",
  brd: "#D8D8D8", brdB: "#DBD1C6",
  font: "'Lato', system-ui, sans-serif"
};

var CSS = "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nbody { margin: 0; }\nbutton:focus-visible { outline: 2px solid #212121; outline-offset: 2px; }\ntextarea:focus, input:focus { border-color: #212121 !important; outline: none; box-shadow: 0 0 0 2px rgba(33,33,33,0.1); }\n@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }";

var SPECS = ["Luxury resorts", "Family travel", "Honeymoons"];
var INTS = ["Fitness and running", "Food and wine", "Book clubs"];
var COMMS = [
  { name: "Fora Travel", cat: "Always", color: T.tb1, count: "1,500+ advisors", permanent: true },
  { name: "Lakeside Elementary PTA", cat: "School / PTA", color: "#337E53", count: "~23 reachable" },
  { name: "Westchester Running Club", cat: "Fitness", color: "#45A86E", count: "~10 reachable" },
  { name: "Thursday Book Club", cat: "Social", color: "#2C6DE8", count: "~8 reachable" },
  { name: "Cornell Class of 2008", cat: "Alumni", color: "#7C3AED", count: "~40 reachable" },
  { name: "Westchester Wine Society", cat: "Hobby", color: "#D4820A", count: "~23 reachable" }
];

var SOCIAL_FIELDS = [
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/yourname", icon: "\uD83D\uDD17" },
  { key: "instagram", label: "Instagram", placeholder: "@yourhandle", icon: "\uD83D\uDCF7" },
  { key: "twitter", label: "Twitter / X", placeholder: "@yourhandle", icon: "\uD83D\uDCAC" },
  { key: "tiktok", label: "TikTok", placeholder: "@yourhandle", icon: "\uD83C\uDFB5" },
  { key: "facebook", label: "Facebook", placeholder: "facebook.com/yourname", icon: "\uD83D\uDC64" },
  { key: "threads", label: "Threads", placeholder: "@yourhandle", icon: "\uD83E\uDDF5" },
  { key: "website", label: "Personal website", placeholder: "https://yoursite.com", icon: "\uD83C\uDF10" },
  { key: "company", label: "Company website", placeholder: "https://company.com", icon: "\uD83C\uDFE2" }
];

function Header() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 24px", borderBottom: "1px solid " + T.brd, background: T.bgBL, minHeight: 36, fontFamily: T.font }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={function() { alert("Back to dashboard"); }} style={{ fontSize: 13, color: T.tLink, background: "none", border: "none", cursor: "pointer", fontFamily: T.font }}>Home</button>
        <span style={{ fontSize: 11, color: T.t2 }}>/</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: T.tb2 }}>Advisor profile</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: T.tProg, background: T.bgProg, padding: "2px 8px", borderRadius: 9999 }}>BETA</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: T.t2, border: "1px solid " + T.brd, padding: "2px 8px", borderRadius: 9999 }}>ACT-PROF v1.0.0</span>
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
  var [icp, setIcp] = useState("");
  var [wStyle, setWStyle] = useState("");
  var [phrases, setPhrases] = useState("");
  var [banned, setBanned] = useState("");
  var [socials, setSocials] = useState({});
  var [saved, setSaved] = useState(false);

  function updateSocial(key, val) {
    var n = {};
    Object.keys(socials).forEach(function(k) { n[k] = socials[k]; });
    n[key] = val;
    setSocials(n);
  }

  /* Profile completeness */
  var checks = [
    { label: "Communities", done: true },
    { label: "Ideal client", done: icp.length > 10 },
    { label: "Writing style", done: wStyle.length > 10 },
    { label: "Brand phrases", done: phrases.length > 5 },
    { label: "Social links", done: Object.keys(socials).some(function(k) { return socials[k] && socials[k].length > 3; }) }
  ];
  var pct = Math.round(checks.filter(function(c) { return c.done; }).length / checks.length * 100);

  function doSave() {
    setSaved(true);
    setTimeout(function() { setSaved(false); }, 2000);
  }

  return (
    <div style={{ fontFamily: T.font, color: T.t1, background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{CSS}</style>
      <Header />

      <div style={{ flex: 1, display: "flex", gap: 24, padding: 24, maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Your advisor profile</h1>
          <p style={{ fontSize: 15, color: T.t2, marginBottom: 24, lineHeight: "22px" }}>This powers your personalized outreach plan. Edit anything to refine your recommendations.</p>

          {/* Ideal client */}
          <div style={{ background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>{"\uD83C\uDFAF"}</span>
              <p style={{ fontSize: 15, fontWeight: 700, color: T.tb1 }}>Your ideal client</p>
            </div>
            <p style={{ fontSize: 13, color: T.tb2, marginBottom: 10, lineHeight: "20px" }}>Describe who you love working with. The more specific, the better your outreach scripts will be.</p>
            <textarea value={icp} onChange={function(e) { setIcp(e.target.value); }} rows={3}
              placeholder="e.g., High-net-worth families in Westchester who travel 3+ times per year, prefer luxury resorts, and have school-age children."
              style={{ width: "100%", padding: "11px 14px", borderRadius: 6, border: "1px solid " + T.brdB, fontSize: 13, fontFamily: T.font, color: T.t1, resize: "vertical", lineHeight: "20px", background: T.bg }} />
          </div>

          {/* Writing style */}
          <div style={{ background: T.bg, border: "1px solid " + T.brd, borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>{"\u270D\uFE0F"}</span>
              <p style={{ fontSize: 15, fontWeight: 700 }}>Writing style</p>
            </div>
            <p style={{ fontSize: 13, color: T.t2, marginBottom: 10, lineHeight: "20px" }}>How do you naturally write to clients? This powers DM scripts and email drafts.</p>
            <textarea value={wStyle} onChange={function(e) { setWStyle(e.target.value); }} rows={3}
              placeholder="e.g., Warm and conversational. I use exclamation points sparingly. I call clients by first name. I keep messages short."
              style={{ width: "100%", padding: "11px 14px", borderRadius: 6, border: "1px solid " + T.brd, fontSize: 13, fontFamily: T.font, color: T.t1, resize: "vertical", lineHeight: "20px" }} />
          </div>

          {/* Brand phrases */}
          <div style={{ background: T.bg, border: "1px solid " + T.brd, borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>{"\u2728"}</span>
              <p style={{ fontSize: 15, fontWeight: 700 }}>Brand phrases and voice</p>
            </div>
            <p style={{ fontSize: 13, color: T.t2, marginBottom: 10, lineHeight: "20px" }}>Words and phrases you always use (or never use) when talking to clients.</p>
            <textarea value={phrases} onChange={function(e) { setPhrases(e.target.value); }} rows={2}
              placeholder={'Always say: "let me handle everything", "curated for you"'}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 6, border: "1px solid " + T.brd, fontSize: 13, fontFamily: T.font, color: T.t1, resize: "vertical", lineHeight: "20px", marginBottom: 8 }} />
            <textarea value={banned} onChange={function(e) { setBanned(e.target.value); }} rows={2}
              placeholder={'Never say: "cheap", "deal", "budget", "discount"'}
              style={{ width: "100%", padding: "11px 14px", borderRadius: 6, border: "1px solid " + T.brd, fontSize: 13, fontFamily: T.font, color: T.t1, resize: "vertical", lineHeight: "20px" }} />
          </div>

          {/* Social links */}
          <div style={{ background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>{"\uD83D\uDD17"}</span>
              <p style={{ fontSize: 15, fontWeight: 700, color: T.tb1 }}>Social links and websites</p>
            </div>
            <p style={{ fontSize: 13, color: T.tb2, marginBottom: 12, lineHeight: "20px" }}>Add your online presence. This helps your coach personalize recommendations and find content opportunities.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {SOCIAL_FIELDS.map(function(sf) {
                return (
                  <div key={sf.key}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: T.tb2, display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                      <span style={{ fontSize: 13 }}>{sf.icon}</span> {sf.label}
                    </label>
                    <input
                      value={socials[sf.key] || ""}
                      onChange={function(e) { updateSocial(sf.key, e.target.value); }}
                      placeholder={sf.placeholder}
                      style={{ width: "100%", padding: "9px 12px", borderRadius: 6, border: "1px solid " + T.brdB, fontSize: 13, fontFamily: T.font, color: T.t1, background: T.bg }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Travel specialties */}
          <div style={{ background: T.bg, border: "1px solid " + T.brd, borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Travel specialties</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {SPECS.map(function(s) { return <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "5px 14px", borderRadius: 9999, background: T.bg2, color: T.t1 }}>{s}</span>; })}
              <button style={{ fontSize: 11, fontWeight: 600, padding: "5px 14px", borderRadius: 9999, background: T.bg, border: "1px dashed " + T.brd, color: T.t2, cursor: "pointer", fontFamily: T.font }}>+ Edit</button>
            </div>
          </div>

          {/* Interests */}
          <div style={{ background: T.bg, border: "1px solid " + T.brd, borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Interests and hobbies</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {INTS.map(function(s) { return <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "5px 14px", borderRadius: 9999, background: T.bg2, color: T.t1 }}>{s}</span>; })}
              <button style={{ fontSize: 11, fontWeight: 600, padding: "5px 14px", borderRadius: 9999, background: T.bg, border: "1px dashed " + T.brd, color: T.t2, cursor: "pointer", fontFamily: T.font }}>+ Edit</button>
            </div>
          </div>

          {/* Communities list */}
          <div style={{ background: T.bg, border: "1px solid " + T.brd, borderRadius: 8, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ fontSize: 15, fontWeight: 700 }}>Communities ({COMMS.length})</p>
              <button style={{ fontSize: 11, color: T.tLink, background: "none", border: "none", cursor: "pointer", fontFamily: T.font }}>View network map</button>
            </div>
            {COMMS.map(function(c) {
              return (
                <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid " + T.bg2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</p>
                      <p style={{ fontSize: 11, color: T.t2 }}>{c.cat}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, color: T.t2 }}>{c.count}</span>
                </div>
              );
            })}
          </div>

          {/* Save */}
          <button onClick={doSave} style={{
            padding: "12px 32px", borderRadius: 6, border: "none",
            background: T.bgP, color: "#FFFFFF", fontSize: 15, fontWeight: 600,
            cursor: "pointer", fontFamily: T.font, marginBottom: 24
          }}>
            {saved ? "Saved!" : "Save all changes"}
          </button>
        </div>

        {/* Sidebar — profile card + completeness */}
        <div style={{ width: 300, flexShrink: 0 }}>
          <div style={{ position: "sticky", top: 24 }}>
            {/* Profile card */}
            <div style={{ padding: 20, background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 8, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.bgP, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 700 }}>RK</span>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: T.tb1 }}>Rachel Kim</p>
                  <p style={{ fontSize: 11, color: T.tb2 }}>Fora Travel Advisor</p>
                </div>
              </div>

              {/* Completeness */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.tb2 }}>Profile completeness</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: pct === 100 ? T.tPos : T.tProg, background: pct === 100 ? T.bgPos : T.bgProg, padding: "2px 10px", borderRadius: 9999 }}>{pct}%</span>
                </div>
                <div style={{ height: 4, background: T.brdB, borderRadius: 2 }}>
                  <div style={{ height: 4, background: pct === 100 ? T.tPos : T.tb2, borderRadius: 2, width: pct + "%", transition: "width 0.5s" }} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {checks.map(function(c) {
                  return (
                    <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 11, color: c.done ? T.tPos : T.tb2, fontWeight: 600 }}>{c.done ? "\u2713" : "\u25CB"}</span>
                      <span style={{ fontSize: 11, color: c.done ? T.tPos : T.tb2 }}>{c.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Network summary */}
            <div style={{ padding: 20, background: T.bg, border: "1px solid " + T.brd, borderRadius: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: T.t2, marginBottom: 8 }}>Your network</p>
              <p style={{ fontSize: 24, fontWeight: 700, color: T.t1 }}>6</p>
              <p style={{ fontSize: 11, color: T.t2, marginBottom: 8 }}>communities</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: T.t1 }}>~104</p>
              <p style={{ fontSize: 11, color: T.t2 }}>estimated connections</p>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}
