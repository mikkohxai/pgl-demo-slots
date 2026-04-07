import { useState } from "react";

var T = {
  bg: "#FFFFFF", bgH: "#F7F7F7", bg2: "#F2F2F2", bg3: "#E5E5E5",
  bgP: "#212121", bgBL: "#FAF6F2", bgBrand: "#F3EBE2", bgBS: "#63574A", bgBD: "#423A31",
  bgPos: "#F0F9F4", bgProg: "#FFF2CC", bgInfo: "#E8F0FE", bgAI: "#F5F3FF",
  t1: "#212121", t2: "#636363", tb1: "#423A31", tb2: "#63574A",
  tPos: "#337E53", tProg: "#664D00", tAI: "#7C3AED", tLink: "#2166DB",
  brd: "#D8D8D8", brdB: "#DBD1C6",
  font: "'Lato', system-ui, sans-serif"
};

var CSS = "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nbody { margin: 0; }\nbutton:focus-visible { outline: 2px solid #212121; outline-offset: 2px; }\n@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }";

var ADV = { name: "Rachel Kim", initials: "RK", communities: 5, reach: 96, tasksWeek: 7, done: 2, specs: ["Luxury resorts", "Family travel", "Honeymoons"], pct: 62 };

var CARDS = [
  { id: "network", title: "Network map", desc: "Explore your communities and connections. Click into each bubble to see details.", stat: ADV.communities + " communities", sub: "~" + ADV.reach + " reachable", color: T.tPos, bg: T.bgPos, emoji: "\uD83D\uDDFA\uFE0F" },
  { id: "calendar", title: "Action calendar", desc: "Your weekly outreach plan with daily tasks mapped to your schedule.", stat: ADV.tasksWeek + " tasks this week", sub: ADV.done + " completed", color: T.tProg, bg: T.bgProg, emoji: "\uD83D\uDCC5" },
  { id: "profile", title: "Advisor profile", desc: "Your ideal client, writing style, brand voice, and social links.", stat: ADV.pct + "% complete", sub: "3 sections to fill", color: T.tAI, bg: T.bgAI, emoji: "\uD83D\uDC64" }
];

var SOCIALS = ["LinkedIn URL", "Instagram handle", "Twitter / X handle", "TikTok handle", "Facebook profile", "Threads handle", "Personal website", "Company website"];

function Header() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 24px", borderBottom: "1px solid " + T.brd, background: T.bgBL, minHeight: 36, fontFamily: T.font }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: T.tb2 }}>Pro Growth Lab</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: T.tProg, background: T.bgProg, padding: "2px 8px", borderRadius: 9999 }}>BETA</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: T.t2, border: "1px solid " + T.brd, padding: "2px 8px", borderRadius: 9999 }}>ACT-DASH v1.0.0</span>
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
  var [hov, setHov] = useState(null);

  return (
    <div style={{ fontFamily: T.font, color: T.t1, background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{CSS}</style>
      <Header />
      <div style={{ flex: 1, padding: "32px 24px", maxWidth: 960, margin: "0 auto", width: "100%" }}>

        {/* Welcome */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.bgP, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#FFFFFF", fontSize: 20, fontWeight: 700 }}>{ADV.initials}</span>
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Welcome back, {ADV.name.split(" ")[0]}</h1>
            <p style={{ fontSize: 15, color: T.t2 }}>{ADV.communities} communities - ~{ADV.reach} reachable - {ADV.tasksWeek} actions this week</p>
          </div>
        </div>

        {/* Profile bar */}
        <div style={{ padding: 16, background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 8, marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.tb1 }}>Profile completeness</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: T.tProg, background: T.bgProg, padding: "2px 10px", borderRadius: 9999 }}>{ADV.pct}%</span>
          </div>
          <div style={{ height: 6, background: T.brdB, borderRadius: 3 }}>
            <div style={{ height: 6, background: T.tb2, borderRadius: 3, width: ADV.pct + "%", transition: "width 0.5s" }} />
          </div>
          <p style={{ fontSize: 11, color: T.tb2, marginTop: 8 }}>Complete your ideal client description and writing style to unlock personalized outreach scripts.</p>
        </div>

        {/* Nav cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
          {CARDS.map(function(c, i) {
            var h = hov === c.id;
            return (
              <div key={c.id} onMouseEnter={function() { setHov(c.id); }} onMouseLeave={function() { setHov(null); }}
                onClick={function() { alert("Opens " + c.title + " (separate prototype)"); }}
                style={{ padding: 24, background: T.bg, border: "1px solid " + (h ? "#212121" : T.brd), borderRadius: 8, cursor: "pointer", transition: "all 0.15s", transform: h ? "translateY(-2px)" : "none", animation: "fadeUp 0.4s ease both", animationDelay: (i * 100) + "ms" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 24 }}>{c.emoji}</span>
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>{c.title}</h2>
                </div>
                <p style={{ fontSize: 13, color: T.t2, lineHeight: "20px", marginBottom: 16 }}>{c.desc}</p>
                <div style={{ padding: 12, background: c.bg, borderRadius: 6 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: c.color }}>{c.stat}</p>
                  <p style={{ fontSize: 11, color: c.color }}>{c.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strengthen profile */}
        <div style={{ padding: 20, background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 8, marginBottom: 24 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: T.tb1, marginBottom: 8 }}>Strengthen your profile</p>
          <p style={{ fontSize: 13, color: T.tb2, marginBottom: 16, lineHeight: "20px" }}>Add your online presence so your coach can personalize recommendations.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {SOCIALS.map(function(s) {
              return <input key={s} placeholder={s} style={{ padding: "9px 12px", borderRadius: 6, border: "1px solid " + T.brdB, fontSize: 13, fontFamily: T.font, color: T.t1, background: T.bg }} />;
            })}
          </div>
          <button style={{ marginTop: 12, padding: "8px 20px", borderRadius: 6, border: "none", background: T.bgBS, color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: T.font }}>Save</button>
        </div>

        {/* Specialties */}
        <div style={{ padding: 20, background: T.bg, border: "1px solid " + T.brd, borderRadius: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Your travel specialties</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {ADV.specs.map(function(s) { return <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 9999, background: T.bg2, color: T.t1 }}>{s}</span>; })}
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}
