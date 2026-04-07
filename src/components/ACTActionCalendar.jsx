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

var CSS = "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nbody { margin: 0; }\nbutton:focus-visible { outline: 2px solid #212121; outline-offset: 2px; }\n@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }";

var PHASE_COLORS = {
  Plant: { bg: T.bgPos, color: T.tPos },
  Grow: { bg: T.bgProg, color: T.tProg },
  Convert: { bg: T.bgAI, color: T.tAI }
};

var TYPE_COLORS = {
  Acquisition: { bg: T.bgBL, color: T.tb2 },
  Foundation: { bg: T.bg2, color: T.t2 },
  Bonus: { bg: T.bgInfo, color: "#1B4EA0" }
};

var CAT_COLORS = { school: "#337E53", fitness: "#45A86E", social: "#2C6DE8", alumni: "#7C3AED", hobby: "#D4820A", neighborhood: "#E76F51" };

/* 3 weeks of tasks across the calendar */
var TASKS = [
  /* Week 1 — Plant */
  { id: "t01", day: 0, week: 0, title: "Text 3 PTA parents about grabbing coffee", phase: "Plant", type: "Acquisition", cat: "school", time: "11am" },
  { id: "t02", day: 0, week: 0, title: "Update your Fora advisor profile photo", phase: "Plant", type: "Foundation", cat: null, time: "2pm" },
  { id: "t03", day: 1, week: 0, title: "Mention an upcoming trip in your running group chat", phase: "Plant", type: "Acquisition", cat: "fitness", time: "8am" },
  { id: "t04", day: 1, week: 0, title: "Share a travel tip in your book club group text", phase: "Plant", type: "Acquisition", cat: "social", time: "5pm" },
  { id: "t05", day: 2, week: 0, title: "Comment on 2 alumni LinkedIn posts about travel", phase: "Plant", type: "Acquisition", cat: "alumni", time: "11am" },
  { id: "t06", day: 2, week: 0, title: "Set up your writing style preferences", phase: "Plant", type: "Foundation", cat: null, time: "3pm" },
  { id: "t07", day: 3, week: 0, title: "Ask a neighbor about their dream vacation", phase: "Plant", type: "Acquisition", cat: "neighborhood", time: "4pm" },
  { id: "t08", day: 4, week: 0, title: "Write your Top 20 list from all communities", phase: "Plant", type: "Foundation", cat: null, time: "10am" },
  { id: "t09", day: 5, week: 0, title: "Post a weekend travel photo on Instagram", phase: "Plant", type: "Acquisition", cat: null, time: "9am" },
  { id: "t10", day: 6, week: 0, title: "Plan next week outreach targets", phase: "Plant", type: "Foundation", cat: null, time: "Evening" },
  /* Week 2 — Grow */
  { id: "t11", day: 0, week: 1, title: "Follow up on the coffee chat from last week", phase: "Grow", type: "Acquisition", cat: "school", time: "11am" },
  { id: "t12", day: 1, week: 1, title: "Share a destination article in your alumni group", phase: "Grow", type: "Acquisition", cat: "alumni", time: "12pm" },
  { id: "t13", day: 2, week: 1, title: "DM book club member who mentioned Italy", phase: "Grow", type: "Acquisition", cat: "social", time: "7pm" },
  { id: "t14", day: 3, week: 1, title: "Ask running buddy about their summer plans", phase: "Grow", type: "Acquisition", cat: "fitness", time: "8am" },
  { id: "t15", day: 4, week: 1, title: "Send a curated resort list to a warm lead", phase: "Grow", type: "Acquisition", cat: null, time: "2pm" },
  /* Week 3 — Convert */
  { id: "t16", day: 0, week: 2, title: "Reach out to top 3 prospects with a trip idea", phase: "Convert", type: "Acquisition", cat: null, time: "10am" },
  { id: "t17", day: 2, week: 2, title: "Propose a small group trip to PTA parents", phase: "Convert", type: "Acquisition", cat: "school", time: "11am" },
  { id: "t18", day: 4, week: 2, title: "Follow up on the resort list you sent", phase: "Convert", type: "Acquisition", cat: null, time: "3pm" }
];

var DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var WEEK_LABELS = ["Week 1: Apr 7-13", "Week 2: Apr 14-20", "Week 3: Apr 21-27"];
var WEEK_DATES = [
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27]
];

function Header() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 24px", borderBottom: "1px solid " + T.brd, background: T.bgBL, minHeight: 36, fontFamily: T.font }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button onClick={function() { alert("Back to dashboard"); }} style={{ fontSize: 13, color: T.tLink, background: "none", border: "none", cursor: "pointer", fontFamily: T.font }}>Home</button>
        <span style={{ fontSize: 11, color: T.t2 }}>/</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: T.tb2 }}>Action calendar</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: T.tProg, background: T.bgProg, padding: "2px 8px", borderRadius: 9999 }}>BETA</span>
        <span style={{ fontSize: 9, fontWeight: 600, color: T.t2, border: "1px solid " + T.brd, padding: "2px 8px", borderRadius: 9999 }}>ACT-CAL v1.0.0</span>
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
  var [week, setWeek] = useState(0);
  var [selectedTask, setSelectedTask] = useState(null);
  var [phaseFilter, setPhaseFilter] = useState("all");
  var [view, setView] = useState("week"); /* week or month */

  var weekTasks = TASKS.filter(function(t) { return t.week === week; });
  var filtered = phaseFilter === "all" ? weekTasks : weekTasks.filter(function(t) { return t.phase === phaseFilter; });

  function tasksForDay(dayIdx) {
    return filtered.filter(function(t) { return t.day === dayIdx; });
  }

  var selTask = selectedTask ? TASKS.find(function(t) { return t.id === selectedTask; }) : null;
  var today = 0; /* Monday is today for demo */

  return (
    <div style={{ fontFamily: T.font, color: T.t1, background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{CSS}</style>
      <Header />

      <div style={{ flex: 1, padding: "24px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* Title bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Action calendar</h1>
            <p style={{ fontSize: 13, color: T.t2 }}>Your outreach plan mapped to your schedule. 2 acquisition + 1 foundation task per day.</p>
          </div>
          <button onClick={function() { alert("Exporting all tasks to Google Calendar..."); }} style={{
            padding: "9px 20px", borderRadius: 6, border: "1px solid " + T.brd,
            background: T.bg, color: T.t1, fontSize: 13, fontWeight: 600,
            cursor: "pointer", fontFamily: T.font, display: "flex", alignItems: "center", gap: 6
          }}>
            Export to GCal
          </button>
        </div>

        {/* Week selector + phase filter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", gap: 4 }}>
            {WEEK_LABELS.map(function(wl, i) {
              var on = week === i;
              return (
                <button key={i} onClick={function() { setWeek(i); setSelectedTask(null); }} style={{
                  padding: "6px 14px", borderRadius: 6, border: "1px solid " + (on ? T.brdSel : T.brd),
                  background: on ? T.bgP : T.bg, color: on ? "#FFFFFF" : T.t1,
                  fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: T.font
                }}>{wl}</button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["all", "Plant", "Grow", "Convert"].map(function(f) {
              var on = phaseFilter === f;
              var pc = PHASE_COLORS[f];
              return (
                <button key={f} onClick={function() { setPhaseFilter(f); }} style={{
                  padding: "4px 12px", borderRadius: 9999, border: "1px solid " + (on ? T.brdSel : T.brd),
                  background: on && pc ? pc.bg : on ? T.bgP : T.bg,
                  color: on && pc ? pc.color : on ? "#FFFFFF" : T.t2,
                  fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: T.font
                }}>{f === "all" ? "All" : f}</button>
              );
            })}
          </div>
        </div>

        {/* CALENDAR GRID — 7 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0, border: "1px solid " + T.brd, borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
          {/* Day headers */}
          {DAYS.map(function(d, i) {
            var isToday = i === today && week === 0;
            return (
              <div key={d} style={{ padding: "10px 8px", background: T.bg2, borderBottom: "1px solid " + T.brd, borderRight: i < 6 ? "1px solid " + T.brd : "none", textAlign: "center" }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: T.t2 }}>{d}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: isToday ? "#FFFFFF" : T.t1, background: isToday ? T.bgP : "transparent", borderRadius: "50%", width: 28, height: 28, lineHeight: "28px", margin: "4px auto 0", textAlign: "center" }}>
                  {WEEK_DATES[week][i]}
                </p>
              </div>
            );
          })}

          {/* Day cells */}
          {DAYS.map(function(d, dayIdx) {
            var dayTasks = tasksForDay(dayIdx);
            var isToday = dayIdx === today && week === 0;
            return (
              <div key={"cell-" + dayIdx} style={{
                minHeight: 140, padding: 6,
                borderRight: dayIdx < 6 ? "1px solid " + T.brd : "none",
                background: isToday ? "#FAFAFA" : T.bg,
                display: "flex", flexDirection: "column", gap: 4
              }}>
                {dayTasks.map(function(task) {
                  var pc = PHASE_COLORS[task.phase] || { bg: T.bg2, color: T.t2 };
                  var catColor = task.cat ? CAT_COLORS[task.cat] : null;
                  var isSel = selectedTask === task.id;
                  return (
                    <button key={task.id} onClick={function() { setSelectedTask(isSel ? null : task.id); }}
                      style={{
                        display: "block", width: "100%", textAlign: "left",
                        padding: "6px 8px", borderRadius: 4,
                        background: pc.bg, border: "none",
                        borderLeft: catColor ? "3px solid " + catColor : "3px solid " + T.brd,
                        cursor: "pointer", fontFamily: T.font,
                        outline: isSel ? "2px solid " + T.brdSel : "none",
                        outlineOffset: 1
                      }}>
                      <p style={{ fontSize: 9, fontWeight: 700, color: pc.color, marginBottom: 2 }}>{task.phase}</p>
                      <p style={{ fontSize: 11, color: T.t1, lineHeight: "14px" }}>
                        {task.title.length > 45 ? task.title.substring(0, 43) + ".." : task.title}
                      </p>
                      {task.time && <p style={{ fontSize: 9, color: T.t2, marginTop: 2 }}>{task.time}</p>}
                    </button>
                  );
                })}
                {dayTasks.length === 0 && (
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <p style={{ fontSize: 11, color: T.bg3 }}>No tasks</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Task detail panel */}
        {selTask && (
          <div style={{ padding: 20, background: T.bg, border: "1px solid " + T.brd, borderRadius: 8, animation: "fadeUp 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 10px", borderRadius: 9999, background: PHASE_COLORS[selTask.phase].bg, color: PHASE_COLORS[selTask.phase].color }}>{selTask.phase}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 10px", borderRadius: 9999, background: TYPE_COLORS[selTask.type].bg, color: TYPE_COLORS[selTask.type].color }}>{selTask.type}</span>
                  {selTask.cat && <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 10px", borderRadius: 9999, background: T.bg2, color: T.t1 }}>{selTask.cat}</span>}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{selTask.title}</h3>
                <p style={{ fontSize: 13, color: T.t2 }}>{DAYS[selTask.day]}, Apr {WEEK_DATES[selTask.week][selTask.day]} at {selTask.time}</p>
              </div>
              <button onClick={function() { alert("Adding to Google Calendar: " + selTask.title); }} style={{
                padding: "8px 16px", borderRadius: 6, border: "1px solid " + T.brd,
                background: T.bg, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: T.font, color: T.t1, whiteSpace: "nowrap"
              }}>Add to GCal</button>
            </div>
            <div style={{ padding: 12, background: T.bgBL, border: "1px solid " + T.brdB, borderRadius: 6 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: T.tb1, marginBottom: 4 }}>These are examples to adapt in your own voice</p>
              <p style={{ fontSize: 13, color: T.tb2, lineHeight: "20px" }}>Personalize this action to match your relationship with the person. The goal is a natural conversation, not a sales pitch.</p>
            </div>
          </div>
        )}

        {/* Phase legend */}
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          {["Plant", "Grow", "Convert"].map(function(p) {
            var pc = PHASE_COLORS[p];
            return (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: pc.bg, border: "1px solid " + pc.color }} />
                <span style={{ fontSize: 11, color: T.t2 }}><strong style={{ color: pc.color }}>{p}</strong> - {p === "Plant" ? "Build trust" : p === "Grow" ? "Deepen relationship" : "Make the ask"}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Foot />
    </div>
  );
}
