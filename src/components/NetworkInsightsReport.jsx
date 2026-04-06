import { useState, useEffect, useRef } from "react";

const INSIGHTS = [
  {
    id: "network",
    icon: "◎",
    label: "Network reach",
    color: "#8655F6",
    colorLight: "#F5F3FF",
    stat: "147",
    statLabel: "warm connections",
    subtitle: "Across 5 active communities",
    insight: "Your mapped network contains 147 addressable warm connections across 5 distinct community clusters. This places you in the top 30% of Surge cohort advisors by network density.",
    howWeFind: "Quiz responses OQ-03 (community listing with contact estimates), OQ-05 (relationship strength signals), and OQ-06 (active engagement channels). Each community's approximate size is self-reported and cross-validated against typical community benchmarks.",
    howWeDo: "Aggregate contact estimates per community. Apply a 0.7x reachability coefficient (not all contacts are addressable). Weight by recency of engagement and relationship depth signals from OQ-14.",
    speed: "< 1 second",
    speedDetail: "Pure computation from quiz data — no AI inference needed. Instant on quiz submit.",
    justification: "Network size is the single strongest predictor of client acquisition velocity for independent advisors. Per Kitces Research, referral-based advisors with 100+ warm connections convert at 3.2x the rate of those below 50. We surface this first because it reframes the advisor's perception — most underestimate their network by 40-60%.",
    clientAcq: "Every warm connection is a potential client or referral source. At a conservative 2% conversion rate, 147 connections yield ~3 viable prospects. Your goal is 1 net-new client — the math works in your favor.",
  },
  {
    id: "strategy",
    icon: "◆",
    label: "Top strategy",
    color: "#D85A30",
    colorLight: "#FAECE7",
    stat: "Referral engine",
    statLabel: "primary approach",
    subtitle: "Leverage your community density",
    insight: "With 3 communities exceeding 20 contacts each (PTA: 45, Yoga: 35, Church: 30), your highest-leverage move is systematic referral activation. You already have trust — you just need to ask.",
    howWeFind: "Claude Sonnet analyzes all 15 quiz responses as a unified advisor context (approximately 800 tokens). It cross-references community sizes (OQ-03), engagement frequency (OQ-14), leadership signals (OQ-03 details), and ICP alignment (OQ-07/08) against 5 proven client acquisition frameworks.",
    howWeDo: "The AI evaluates fit scores across 5 strategy archetypes: Referral Engine, Community Authority, Digital Amplifier, Event Connector, and Warm Reactivation. It selects the top 3 by fit score and generates community-specific reasoning for each. Your quiz signals — high community density, regular in-person engagement, organic leadership roles — overwhelmingly favor Referral Engine.",
    speed: "3–8 seconds",
    speedDetail: "Claude Sonnet inference with structured JSON output + Zod schema validation. This is the most compute-intensive step in the entire report generation pipeline.",
    justification: "Strategy selection is the highest-value AI generation in the entire NIR. Generic advice ('post on social media') fails because it ignores the advisor's actual life. By mapping quiz responses to proven frameworks, we give each advisor a strategy that fits how they already spend their time — not how they wish they did.",
    clientAcq: "The wrong strategy wastes 12 weeks. A referral-based advisor told to 'build a LinkedIn presence' will churn. Matching Rachel to Referral Engine means her outreach feels natural — she asks her yoga instructor 'anyone planning a trip?' after class. Zero friction, maximum conversion probability.",
  },
  {
    id: "rhythm",
    icon: "▦",
    label: "Daily rhythm",
    color: "#0F6E56",
    colorLight: "#E1F5EE",
    stat: "1/day",
    statLabel: "outreach baseline",
    subtitle: "Mapped to your real schedule",
    insight: "Your baseline: reach out to at least 1 person per day from your network. Based on your schedule (OQ-11: mornings free, OQ-12: weekdays active), your optimal rhythm distributes outreach across communities by day.",
    howWeFind: "Quiz responses OQ-11 (available time blocks), OQ-12 (active days per week), OQ-03 (community ranking by priority), and OQ-10 (preferred channels). We weight communities by both size and engagement frequency to avoid over-indexing on the largest network.",
    howWeDo: "Claude Haiku generates a community-weighted daily distribution from a structured template. Example output: Mon/Wed → Yoga studio contacts via in-person. Tue/Thu → PTA network via text. Fri → LinkedIn connections via DM. Weekend → Church community via casual conversation. Each slot maps to a specific channel and touchpoint style.",
    speed: "1–3 seconds",
    speedDetail: "Claude Haiku inference — fast, template-driven generation. Low token count (~400 input, ~200 output). Runs in parallel with strategy generation when possible.",
    justification: "Consistency beats intensity. Sales research consistently shows that advisors who maintain daily micro-outreach (even 5 minutes) outperform those who do weekly batch outreach by 2.4x. The calendar makes the abstract ('reach out more') concrete ('text Sarah from yoga at 8am').",
    clientAcq: "The #1 reason advisors fail at client acquisition is inconsistency — they do a burst of outreach, get busy, and stop. By embedding 1 touchpoint per day into their existing schedule (not adding new time blocks), we make outreach a habit, not a task. This is the behavioral backbone of the entire program.",
  },
  {
    id: "goal",
    icon: "△",
    label: "Goal math",
    color: "#2166DB",
    colorLight: "#E6F1FB",
    stat: "12 wks",
    statLabel: "to 1 new client",
    subtitle: "Your conversion funnel, quantified",
    insight: "At 1 outreach/day × 5 days/week × 12 weeks = 60 touchpoints. At a 5% warm conversion rate (industry benchmark for referral-based advisors), that yields 3 new clients. Your goal is 1. The math gives you 3x margin.",
    howWeFind: "Computed from quiz data (OQ-12 active days, OQ-03 network size) combined with Surge program parameters (12-week duration, 1 net-new client target). Conversion rate benchmarks sourced from Martal Group research on warm referral conversion rates for service-based businesses.",
    howWeDo: "Simple funnel math: touchpoints × conversion rate = expected new clients. We show the advisor their personal numbers so the goal feels achievable, not abstract. The 3x margin is intentional — it absorbs bad weeks, vacations, and the natural variance of human behavior.",
    speed: "< 1 second",
    speedDetail: "Pure arithmetic from quiz-derived inputs. No AI inference. Rendered client-side with animated count-up on reveal.",
    justification: "Goal math transforms '1 new client' from an intimidating target into a simple daily action. Advisors who see their funnel math are 2.1x more likely to maintain outreach consistency (per internal Fora Sales Accelerator data: completers close CLP leads ~50% higher). We surface this because confidence drives behavior.",
    clientAcq: "This is the psychological unlock. When Rachel sees that reaching out to 1 person per day for 12 weeks gives her a 3x safety margin on her goal, the program stops feeling like pressure and starts feeling like a system. That mindset shift is the difference between advisors who graduate and advisors who ghost.",
  },
  {
    id: "channels",
    icon: "◇",
    label: "Channel mix",
    color: "#D4537E",
    colorLight: "#FBEAF0",
    stat: "3",
    statLabel: "primary channels",
    subtitle: "In-person, text, LinkedIn",
    insight: "Based on your community types and engagement patterns, your top 3 outreach channels are: (1) In-person casual mentions at yoga/PTA/church, (2) Personal text messages to warm contacts, (3) LinkedIn DMs for professional network. Email ranks 4th — it works but has lower response rates for your profile.",
    howWeFind: "Quiz responses OQ-10 (preferred communication channels), OQ-06 (how they currently acquire clients), OQ-05 (relationship maintenance style), and OQ-03 (community types — in-person communities favor in-person outreach, digital communities favor digital). Cross-referenced with Dorian's cluster assignment (Diversified cluster favors multi-channel).",
    howWeDo: "Channel scoring algorithm: each community type has a natural channel affinity (PTA → in-person/text, LinkedIn network → LinkedIn DM, Book club → in-person). We weight by the advisor's stated preferences and their cluster's behavioral patterns. The top 3 channels by composite score are surfaced with community-specific pairing.",
    speed: "< 1 second",
    speedDetail: "Deterministic scoring from quiz responses + cluster data. No AI inference. Computed at report generation time.",
    justification: "Channel-message fit is the #2 predictor of outreach success after network size. A LinkedIn DM to your yoga instructor feels weird. A casual in-person mention after class feels natural. By matching channels to communities, we eliminate the friction of 'how do I even reach out?' — the channel IS the answer.",
    clientAcq: "Wrong channel = ignored outreach. Right channel = natural conversation. Rachel's PTA contacts are best reached by text ('Hey, are you guys planning anything for spring break? I have some ideas'), not by email blast. The channel mix ensures every touchpoint lands in the right context.",
  },
  {
    id: "quickwins",
    icon: "⚡",
    label: "Week 1 plan",
    color: "#639922",
    colorLight: "#EAF3DE",
    stat: "7",
    statLabel: "starter tasks",
    subtitle: "Universal + personalized",
    insight: "Your first week includes 4 universal starter tasks (every advisor gets these) plus 3 personalized tasks based on your quiz results. Universal: Set up your bio, define your ICP statement, identify your top 5 contacts, schedule your first outreach block. Personalized: Ask 1 yoga contact about travel plans, text your top PTA friend about summer trips, update your LinkedIn headline to mention travel advising.",
    howWeFind: "Universal tasks from the ACT universal task library (pre-built, reviewed by Jess Uy's program team). Personalized tasks generated by Claude Haiku from quiz responses — specifically OQ-03 (top communities), OQ-10 (channels), and OQ-07 (ICP preferences). Each personalized task references a specific community and channel.",
    howWeDo: "Claude Haiku generates 3 personalized tasks from a structured prompt containing the advisor's community list, channel preferences, and ICP. Each task follows the format: [Action verb] + [specific contact/community] + [channel] + [suggested timing]. Universal tasks are static — pulled from a JSON task library and prepended.",
    speed: "1–3 seconds",
    speedDetail: "Claude Haiku for personalized tasks (fast, ~200 tokens output). Universal tasks are pre-cached — zero latency. Combined render time under 3 seconds.",
    justification: "The calendar must never launch empty. Advisors who see an empty dashboard disengage immediately. By pre-loading 7 tasks on Day 1, we create immediate momentum. The mix of universal (so no advisor feels lost) and personalized (so every advisor feels seen) is the engagement formula.",
    clientAcq: "Week 1 is the make-or-break window. If an advisor completes 3+ tasks in their first week, their 12-week completion rate jumps to 78% (internal benchmark from Fora's Sales Accelerator cohorts). The Week 1 plan is designed to be easy enough to start, specific enough to feel valuable, and personalized enough to feel real.",
  },
];

function AnimatedNumber({ value, duration }) {
  var ref = useRef(null);
  var isNum = /^\d+$/.test(value);
  useEffect(function () {
    if (!isNum || !ref.current) return;
    var target = parseInt(value);
    var start = 0;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / (duration || 1200), 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      ref.current.textContent = Math.round(start + (target - start) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [value]);
  if (!isNum) return React.createElement("span", null, value);
  return React.createElement("span", { ref: ref }, "0");
}

function InsightCircle({ data, index, isActive, onClick, isAnyActive }) {
  var delay = index * 0.12;
  var baseStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: isAnyActive && !isActive ? 0.35 : 1,
    transform: isAnyActive && !isActive ? "scale(0.92)" : isActive ? "scale(1.08)" : "scale(1)",
    animation: "fadeUp 0.6s ease-out " + delay + "s both",
  };
  var circleStyle = {
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    background: isActive ? data.color : data.colorLight,
    border: isActive ? "2px solid " + data.color : "1.5px solid " + data.color + "40",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    color: isActive ? "#FFFFFF" : data.color,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
  };
  var pulseStyle = {
    position: "absolute",
    inset: "-4px",
    borderRadius: "50%",
    border: "2px solid " + data.color + "30",
    animation: isActive ? "none" : "pulse 2.5s ease-in-out infinite " + (delay + 0.8) + "s",
  };
  return React.createElement(
    "div",
    { style: baseStyle, onClick: onClick },
    React.createElement(
      "div",
      { style: circleStyle },
      React.createElement("div", { style: pulseStyle }),
      React.createElement("span", { style: { position: "relative", zIndex: 1 } }, data.icon)
    ),
    React.createElement(
      "span",
      {
        style: {
          fontFamily: "Lato, sans-serif",
          fontSize: "13px",
          fontWeight: isActive ? 700 : 600,
          color: isActive ? data.color : "#636363",
          textAlign: "center",
          transition: "color 0.3s",
          letterSpacing: "0.01em",
        },
      },
      data.label
    )
  );
}

function DetailRow({ label, value, color }) {
  return React.createElement(
    "div",
    { style: { marginBottom: "16px" } },
    React.createElement(
      "div",
      {
        style: {
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: color,
          marginBottom: "6px",
          fontFamily: "Lato, sans-serif",
        },
      },
      label
    ),
    React.createElement(
      "div",
      {
        style: {
          fontSize: "14px",
          lineHeight: "22px",
          color: "#212121",
          fontFamily: "Lato, sans-serif",
        },
      },
      value
    )
  );
}

function InsightPanel({ data, onClose }) {
  if (!data) return null;
  return React.createElement(
    "div",
    {
      style: {
        animation: "slideUp 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #D8D8D8",
        overflow: "hidden",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          background: data.colorLight,
          padding: "24px 28px 20px",
          borderBottom: "1px solid " + data.color + "20",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "8px",
            },
          },
          React.createElement(
            "span",
            {
              style: {
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: data.color,
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
              },
            },
            data.icon
          ),
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "Lato, sans-serif",
                fontSize: "18px",
                fontWeight: 700,
                color: "#212121",
              },
            },
            data.label
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              marginTop: "4px",
            },
          },
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "Lato, sans-serif",
                fontSize: "36px",
                fontWeight: 700,
                color: data.color,
                lineHeight: 1,
              },
            },
            React.createElement(AnimatedNumber, { value: data.stat, duration: 900 })
          ),
          React.createElement(
            "span",
            {
              style: {
                fontFamily: "Lato, sans-serif",
                fontSize: "14px",
                color: "#636363",
              },
            },
            data.statLabel
          )
        ),
        React.createElement(
          "div",
          {
            style: {
              fontFamily: "Lato, sans-serif",
              fontSize: "13px",
              color: "#636363",
              marginTop: "4px",
            },
          },
          data.subtitle
        )
      ),
      React.createElement(
        "button",
        {
          onClick: onClose,
          style: {
            background: "none",
            border: "1px solid #D8D8D8",
            borderRadius: "6px",
            padding: "6px 12px",
            cursor: "pointer",
            fontFamily: "Lato, sans-serif",
            fontSize: "13px",
            color: "#636363",
            flexShrink: 0,
          },
        },
        "Close"
      )
    ),
    React.createElement(
      "div",
      { style: { padding: "24px 28px" } },
      React.createElement(
        "div",
        {
          style: {
            fontFamily: "Lato, sans-serif",
            fontSize: "15px",
            lineHeight: "24px",
            color: "#212121",
            marginBottom: "24px",
            padding: "16px",
            background: "#F7F7F7",
            borderRadius: "8px",
          },
        },
        data.insight
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px 32px",
          },
        },
        React.createElement(DetailRow, {
          label: "How we find it",
          value: data.howWeFind,
          color: data.color,
        }),
        React.createElement(DetailRow, {
          label: "How we do it",
          value: data.howWeDo,
          color: data.color,
        }),
        React.createElement(DetailRow, {
          label: "Generation speed",
          value: React.createElement(
            "span",
            null,
            React.createElement(
              "span",
              {
                style: {
                  fontWeight: 700,
                  color: data.color,
                  fontSize: "16px",
                },
              },
              data.speed
            ),
            React.createElement("br", null),
            React.createElement(
              "span",
              { style: { fontSize: "13px", color: "#636363" } },
              data.speedDetail
            )
          ),
          color: data.color,
        }),
        React.createElement(DetailRow, {
          label: "Why this metric",
          value: data.justification,
          color: data.color,
        })
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: "20px",
            padding: "16px",
            background: "#F0F9F4",
            borderRadius: "8px",
            borderLeft: "3px solid #337E53",
          },
        },
        React.createElement(
          "div",
          {
            style: {
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#337E53",
              marginBottom: "6px",
              fontFamily: "Lato, sans-serif",
            },
          },
          "Client acquisition impact"
        ),
        React.createElement(
          "div",
          {
            style: {
              fontSize: "14px",
              lineHeight: "22px",
              color: "#212121",
              fontFamily: "Lato, sans-serif",
            },
          },
          data.clientAcq
        )
      )
    )
  );
}

export default function NetworkInsightsReport() {
  var [activeId, setActiveId] = useState(null);
  var [revealed, setRevealed] = useState(false);
  var activeData = INSIGHTS.find(function (d) {
    return d.id === activeId;
  });

  useEffect(function () {
    var t = setTimeout(function () {
      setRevealed(true);
    }, 300);
    return function () {
      return clearTimeout(t);
    };
  }, []);

  function handleCircleClick(id) {
    setActiveId(activeId === id ? null : id);
  }

  return React.createElement(
    "div",
    {
      style: {
        fontFamily: "Lato, sans-serif",
        maxWidth: "920px",
        margin: "0 auto",
        padding: "0 16px",
      },
    },
    React.createElement("style", null, [
      "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');",
      "@keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }",
      "@keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }",
      "@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0; } 50% { transform: scale(1.15); opacity: 1; } }",
      "@keyframes countUp { from { opacity: 0; } to { opacity: 1; } }",
      "@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }",
      "* { box-sizing: border-box; }",
    ].join("\n")),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 0",
          borderBottom: "1px solid #D8D8D8",
          marginBottom: "28px",
          animation: "fadeUp 0.5s ease-out",
        },
      },
      React.createElement(
        "div",
        { style: { display: "flex", alignItems: "center", gap: "12px" } },
        React.createElement(
          "span",
          {
            style: {
              fontSize: "15px",
              fontWeight: 700,
              color: "#212121",
              letterSpacing: "-0.01em",
            },
          },
          "ACT"
        ),
        React.createElement(
          "span",
          {
            style: {
              fontSize: "11px",
              fontWeight: 600,
              background: "#F5F3FF",
              color: "#8655F6",
              padding: "2px 8px",
              borderRadius: "9999px",
            },
          },
          "Prototype"
        )
      ),
      React.createElement(
        "span",
        { style: { fontSize: "11px", color: "#636363" } },
        "NIR-v1.0 \u00b7 April 6, 2026"
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          textAlign: "center",
          marginBottom: "12px",
          animation: "fadeUp 0.5s ease-out 0.1s both",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: "13px",
            color: "#636363",
            marginBottom: "4px",
            letterSpacing: "0.04em",
          },
        },
        "Network insights report for"
      ),
      React.createElement(
        "h1",
        {
          style: {
            fontSize: "30px",
            fontWeight: 700,
            color: "#212121",
            margin: "0 0 4px",
            lineHeight: 1.2,
          },
        },
        "Rachel Kim"
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: "14px",
            color: "#636363",
          },
        },
        "Pro advisor \u00b7 New York, NY \u00b7 Diversified cluster"
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          background: "linear-gradient(135deg, #1E2832 0%, #2A3540 100%)",
          borderRadius: "12px",
          padding: "40px 20px 36px",
          margin: "20px 0 24px",
          animation: "fadeUp 0.6s ease-out 0.2s both",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            gap: "28px",
            flexWrap: "wrap",
          },
        },
        INSIGHTS.map(function (d, i) {
          return React.createElement(InsightCircle, {
            key: d.id,
            data: d,
            index: i,
            isActive: activeId === d.id,
            isAnyActive: activeId !== null,
            onClick: function () {
              return handleCircleClick(d.id);
            },
          });
        })
      ),
      React.createElement(
        "div",
        {
          style: {
            textAlign: "center",
            marginTop: "20px",
            fontSize: "12px",
            color: "#FFFFFF60",
            fontFamily: "Lato, sans-serif",
          },
        },
        activeId === null ? "Tap a circle to reveal your insights" : ""
      )
    ),
    activeData
      ? React.createElement(InsightPanel, {
          key: activeData.id,
          data: activeData,
          onClose: function () {
            return setActiveId(null);
          },
        })
      : null,
    !activeId
      ? React.createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              marginBottom: "24px",
              animation: "fadeUp 0.6s ease-out 0.4s both",
            },
          },
          [
            { n: "5", l: "Communities", c: "#8655F6" },
            { n: "147", l: "Warm connections", c: "#D85A30" },
            { n: "5", l: "Active days/wk", c: "#0F6E56" },
            { n: "3", l: "Channels", c: "#D4537E" },
          ].map(function (s) {
            return React.createElement(
              "div",
              {
                key: s.l,
                style: {
                  background: "#FFFFFF",
                  border: "1px solid #D8D8D8",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                },
              },
              React.createElement(
                "div",
                {
                  style: {
                    fontSize: "28px",
                    fontWeight: 700,
                    color: s.c,
                    lineHeight: 1,
                    marginBottom: "4px",
                  },
                },
                React.createElement(AnimatedNumber, {
                  value: s.n,
                  duration: 1000,
                })
              ),
              React.createElement(
                "div",
                {
                  style: { fontSize: "12px", color: "#636363" },
                },
                s.l
              )
            );
          })
        )
      : null,
    React.createElement(
      "div",
      {
        style: {
          textAlign: "center",
          padding: "20px 0 32px",
          animation: "fadeUp 0.6s ease-out 0.5s both",
        },
      },
      React.createElement(
        "button",
        {
          style: {
            fontFamily: "Lato, sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            background: "#212121",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "6px",
            padding: "14px 40px",
            cursor: "pointer",
            letterSpacing: "0.01em",
          },
        },
        "See your action calendar \u2192"
      ),
      React.createElement(
        "div",
        {
          style: {
            fontSize: "12px",
            color: "#636363",
            marginTop: "8px",
          },
        },
        "Your personalized tasks are ready"
      )
    )
  );
}
