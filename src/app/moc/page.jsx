"use client";
import { useState } from "react";

var T = {
  bg: "#FFFFFF",
  bgBrand: "#FAF6F2",
  bgBrandStrong: "#F3EBE2",
  textP: "#212121",
  textS: "#636363",
  textBrandS: "#63574A",
  textInv: "#FFFFFF",
  borderP: "#D8D8D8",
  borderBrand: "#D4C8BB",
  bgPrimary: "#423A31",
  bgPrimaryH: "#2E2822",
  purple: "#8655F6",
  purpleLight: "#F5F3FF",
  info: "#2166DB",
  positive: "#337E53",
  posLight: "#F0F9F4",
  warning: "#B45309",
  warnLight: "#FFFBEB",
  danger: "#D1242F",
  dangerLight: "#FFF5F5",
};

var SECTIONS = [
  {
    id: "compliance",
    title: "Compliance Layer",
    icon: "\u2696\uFE0F",
    items: [
      { title: "PP-2632", desc: "PP ticket \u2014 committed, effort low", url: "https://foratravel.atlassian.net/jira/polaris/projects/PP/ideas/view/11647749?selectedIssue=PP-2632&issueViewSection=overview", tag: "Jira" },
      { title: "AEP-5153", desc: "Engineering epic \u2014 Sprint 1 scope", url: "https://foratravel.atlassian.net/browse/AEP-5153", tag: "Jira" },
      { title: "PRD \u2014 Advisor Coaching Tool", desc: "HLUS, phases, measurement", url: "https://foratravel.atlassian.net/wiki/spaces/PP/pages/1946091642/PRD+Advisor+Coach+Tool+Pro+Growth+Lab", tag: "Confluence" },
      { title: "Eng Spec v1.1 \u2014 Draft", desc: "Schema, RLS, APIs, kill switch", url: "https://foratravel.atlassian.net/wiki/spaces/PP/pages/edit-v2/1952546817?draftShareId=050b30b4-4560-4950-a890-3665658fc3a6", tag: "Confluence" },
    ],
  },
  {
    id: "data-sources",
    title: "Canonical Data Sources",
    icon: "\uD83D\uDCC1",
    items: [
      { title: "OQ Registry (15 questions)", desc: "Locked onboarding questions OQ-01\u2013OQ-15", url: "https://docs.google.com/document/d/1SMHvOcZEpOwb2-2_sV1iQx5QmkE3aHRW/edit", tag: "Google Doc" },
      { title: "Task Bank (210 tasks)", desc: "Action calendar starter tasks", url: "https://docs.google.com/spreadsheets/d/1VLvOag7gBKSKC1Fn0f5gM2NRar7RCl9X/edit?gid=1163064228#gid=1163064228", tag: "Google Sheet" },
      { title: "Q2 Operating Plan v3", desc: "14-week program schedule + clusters", url: "https://docs.google.com/document/d/15E4DQOJV1PGaz2z5JRP-DxjHB7TeMFzwlhrZq0gtrjM/edit", tag: "Google Doc" },
    ],
  },
  {
    id: "repos",
    title: "Repos + Infra",
    icon: "\uD83D\uDCBB",
    items: [
      { title: "mikkohxai/advisor-coach-act", desc: "Active build \u2014 Next.js 14 + Supabase", url: "https://github.com/mikkohxai/advisor-coach-act", tag: "GitHub" },
      { title: "mikkohxai/pgl-demo-slots", desc: "Static prototype demos", url: "https://github.com/mikkohxai/pgl-demo-slots", tag: "GitHub" },
      { title: "mikkohxai/sb-fora-obs", desc: "Obsidian vault remote sync", url: "https://github.com/mikkohxai/sb-fora-obs", tag: "GitHub" },
    ],
  },
  {
    id: "design",
    title: "Design System",
    icon: "\uD83C\uDFA8",
    items: [
      { title: "pgl-brand-system-reference-v1.md", desc: "Portal DS tokens, 10 fidelity rules", url: null, tag: "Project File" },
      { title: "fora-brand-guidelines-extracted-v1.md", desc: "Brand book extraction + conflicts", url: null, tag: "Project File" },
      { title: "Portal Design System", desc: "Figma source-of-truth tokens", url: "https://www.figma.com/design/ObokJ6tQzEtWxBMYMgVDkn/Portal-Design-System?node-id=11758-12911", tag: "Figma" },
    ],
  },
  {
    id: "specs",
    title: "Specs (Final Versions)",
    icon: "\uD83D\uDCCB",
    items: [
      { title: "Onboarding Implementation v1.0", desc: "All 15 Qs: options, validation, Amplitude, Supabase DDL, plan gen", url: "https://claude.ai/chat/ba13eb3b-b986-45a8-9bfa-2dcf1c406c88", tag: "Spec" },
      { title: "Network Mapper v1.1", desc: "Progressive bubble map, enrichment panel, community detail", url: "https://claude.ai/chat/3902eece-3002-43d0-97ce-0546934687fd", tag: "Spec" },
      { title: "Network Insights Report v1.0", desc: "Onboarding payoff reveal \u2014 the 'oh' moment", url: "https://claude.ai/chat/074ee7fd-7ad7-407a-ad36-64f3a1458f5c", tag: "Spec" },
      { title: "Eng Spec v2.3", desc: "OQ\u2192column reconciliation, 21 data columns", url: "https://claude.ai/chat/45602736-7b68-4be8-996d-3ef3b18237cb", tag: "Spec" },
      { title: "Supabase Schema v1.0", desc: "17 tables, RLS, seed data, consent", url: "https://claude.ai/chat/1d534d78-3e2e-41c2-819e-ae6c397c4519", tag: "Spec" },
      { title: "Product Vision v1.0", desc: "6-screen IA, queue model, custom instructions", url: "https://claude.ai/chat/aab904d2-5ab2-4e89-b30f-6db689533d09", tag: "Spec" },
      { title: "PIA v1.0", desc: "Consent gates, red lines, religious orgs", url: null, tag: "Project File" },
    ],
  },
  {
    id: "runbooks",
    title: "Runbooks (Paste-and-Go)",
    icon: "\uD83D\uDE80",
    items: [
      { title: "Sprint 1 Full Build", desc: "ACT-18 v5.0.0 \u2014 all 6 HLUS end-to-end", url: "https://claude.ai/chat/3c5085e4-04fe-476e-b406-d35251edee6f", tag: "Runbook" },
      { title: "Sprint 1 Ship Plan", desc: "4-day execution, 12 acceptance gates", url: "https://claude.ai/chat/1f98c23b-d041-4149-8eec-145dd2def624", tag: "Runbook" },
      { title: "Eng Arch + Infra", desc: "Sentry, Amplitude, kill switch config", url: "https://claude.ai/chat/45602736-7b68-4be8-996d-3ef3b18237cb", tag: "Runbook" },
      { title: "Weekly Intel Briefing", desc: "Sunday Cowork \u2014 CLAUDE.md + SPEC.md", url: "https://claude.ai/chat/7854c21d-6378-4ed9-b50e-65aa60a1d66d", tag: "Runbook" },
    ],
  },
  {
    id: "prototypes",
    title: "Prototypes (Latest)",
    icon: "\u26A1",
    items: [
      { title: "ACT-23 \u2014 Network Map Hero v4.0", desc: "60% viewport network map dashboard", url: "https://claude.ai/chat/e4471a05-ca1b-41f7-b081-952ba7768113", tag: "JSX" },
      { title: "NIR v4.1 \u2014 Network Insights Report", desc: "Reveal + cascade animation", url: "https://claude.ai/chat/074ee7fd-7ad7-407a-ad36-64f3a1458f5c", tag: "JSX" },
      { title: "Mapper v1.2 \u2014 Network Mapper", desc: "Progressive quiz + Fora node", url: "https://claude.ai/chat/3902eece-3002-43d0-97ce-0546934687fd", tag: "JSX" },
    ],
  },
  {
    id: "requirements",
    title: "Requirements (Active)",
    icon: "\uD83D\uDD12",
    items: [
      { title: "Shaina Registry v4.0", desc: "50 directives \u2014 verbatim quotes + permalinks", url: "https://claude.ai/chat/167e280d-057d-4096-824b-62b192405814", tag: "Registry" },
      { title: "registry-requirements-v2.md", desc: "72 requirements from 4 sources", url: null, tag: "Project File" },
      { title: "scorecard-shaina-requirements.md", desc: "30 Shaina reqs with scoring", url: null, tag: "Project File" },
      { title: "Sign-Off Pack v1.2.1", desc: "OQ registry + HLUS compliance matrix", url: "https://claude.ai/chat/7854c21d-6378-4ed9-b50e-65aa60a1d66d", tag: "Pack" },
    ],
  },
  {
    id: "schema",
    title: "Schema + Data",
    icon: "\uD83D\uDDC4\uFE0F",
    items: [
      { title: "Supabase Schema XLSX v2", desc: "Full DDL + OQ\u2192column reconciliation", url: "https://claude.ai/chat/45602736-7b68-4be8-996d-3ef3b18237cb", tag: "XLSX" },
    ],
  },
];

var BLOCKERS = [
  { blocker: "Zach P intro thread", owner: "Shaina", priority: "P0" },
  { blocker: "Eng Spec review \u2192 publish", owner: "Shaina \u2192 Mikkoh", priority: "P0" },
  { blocker: "Domain finalization", owner: "Zach P", priority: "P1" },
  { blocker: "Sharhad architecture review", owner: "Mikkoh + Sharhad", priority: "P1" },
  { blocker: "Jess Typeform deconflict", owner: "Mikkoh + Jess", priority: "P1" },
];

var TAG_COLORS = {
  "Jira": { bg: "#E3F2FD", text: "#1565C0" },
  "Confluence": { bg: "#E3F2FD", text: "#1565C0" },
  "Google Doc": { bg: "#E8F5E9", text: "#2E7D32" },
  "Google Sheet": { bg: "#E8F5E9", text: "#2E7D32" },
  "GitHub": { bg: "#F3E5F5", text: "#7B1FA2" },
  "Figma": { bg: "#FCE4EC", text: "#C62828" },
  "Project File": { bg: "#FFF3E0", text: "#E65100" },
  "Spec": { bg: T.purpleLight, text: "#5B21B6" },
  "Runbook": { bg: T.posLight, text: T.positive },
  "JSX": { bg: "#EDE9FE", text: "#6D28D9" },
  "Registry": { bg: T.warnLight, text: T.warning },
  "Pack": { bg: "#FFF7ED", text: "#9A3412" },
  "XLSX": { bg: "#ECFDF5", text: "#065F46" },
};

function Tag(props) {
  var c = TAG_COLORS[props.label] || { bg: "#F5F5F5", text: "#666" };
  return React.createElement("span", {
    style: {
      display: "inline-block",
      fontSize: 9,
      fontWeight: 600,
      fontFamily: "Lato, system-ui, sans-serif",
      padding: "2px 8px",
      borderRadius: 9999,
      background: c.bg,
      color: c.text,
      letterSpacing: "0.02em",
      lineHeight: "16px",
      whiteSpace: "nowrap",
    },
  }, props.label);
}

function ItemRow(props) {
  var item = props.item;
  var isLink = item.url !== null;
  return React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
      padding: "10px 0",
      borderBottom: "1px solid " + T.borderP,
    },
  },
    React.createElement("div", { style: { flex: 1, minWidth: 0 } },
      isLink
        ? React.createElement("a", {
            href: item.url,
            target: "_blank",
            rel: "noopener noreferrer",
            style: {
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "Lato, system-ui, sans-serif",
              color: T.info,
              textDecoration: "none",
              lineHeight: "20px",
            },
            onMouseEnter: function(e) { e.target.style.textDecoration = "underline"; },
            onMouseLeave: function(e) { e.target.style.textDecoration = "none"; },
          }, item.title + " \u2197")
        : React.createElement("span", {
            style: {
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "Lato, system-ui, sans-serif",
              color: T.textP,
              lineHeight: "20px",
            },
          }, item.title),
      React.createElement("div", {
        style: { fontSize: 11, color: T.textS, marginTop: 2, lineHeight: "16px" },
      }, item.desc)
    ),
    React.createElement(Tag, { label: item.tag })
  );
}

function Section(props) {
  var section = props.section;
  var isOpen = props.isOpen;
  var onToggle = props.onToggle;
  return React.createElement("div", {
    style: {
      background: T.bg,
      border: "1px solid " + T.borderP,
      borderRadius: 8,
      marginBottom: 8,
      overflow: "hidden",
    },
  },
    React.createElement("button", {
      onClick: onToggle,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        width: "100%",
        padding: "12px 16px",
        background: isOpen ? T.bgBrand : T.bg,
        border: "none",
        cursor: "pointer",
        fontFamily: "Lato, system-ui, sans-serif",
        textAlign: "left",
        transition: "background 0.15s",
      },
    },
      React.createElement("span", { style: { fontSize: 16 } }, section.icon),
      React.createElement("span", {
        style: { flex: 1, fontSize: 13, fontWeight: 700, color: T.textP },
      }, section.title),
      React.createElement("span", {
        style: { fontSize: 11, color: T.textS, marginRight: 8 },
      }, section.items.length),
      React.createElement("span", {
        style: {
          fontSize: 11,
          color: T.textS,
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
        },
      }, "\u25BC")
    ),
    isOpen ? React.createElement("div", { style: { padding: "0 16px 8px" } },
      section.items.map(function(item, i) {
        return React.createElement(ItemRow, { key: i, item: item });
      })
    ) : null
  );
}

function BlockerRow(props) {
  var b = props.blocker;
  var isP0 = b.priority === "P0";
  return React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "8px 12px",
      background: isP0 ? T.dangerLight : T.warnLight,
      borderRadius: 6,
      marginBottom: 4,
      border: "1px solid " + (isP0 ? "#FECACA" : "#FDE68A"),
    },
  },
    React.createElement("span", {
      style: {
        fontSize: 9,
        fontWeight: 700,
        fontFamily: "Lato, system-ui, sans-serif",
        color: isP0 ? T.danger : T.warning,
        padding: "2px 6px",
        borderRadius: 4,
        background: isP0 ? "#FEE2E2" : "#FEF3C7",
        minWidth: 24,
        textAlign: "center",
      },
    }, b.priority),
    React.createElement("span", {
      style: { flex: 1, fontSize: 12, fontWeight: 600, color: T.textP, fontFamily: "Lato, system-ui, sans-serif" },
    }, b.blocker),
    React.createElement("span", {
      style: { fontSize: 11, color: T.textS, fontFamily: "Lato, system-ui, sans-serif" },
    }, b.owner)
  );
}

export default function MOCPage() {
  var allIds = SECTIONS.map(function(s) { return s.id; });
  var [openSections, setOpenSections] = useState(allIds);

  function toggleSection(id) {
    setOpenSections(function(prev) {
      if (prev.indexOf(id) >= 0) {
        return prev.filter(function(x) { return x !== id; });
      }
      return prev.concat([id]);
    });
  }

  function expandAll() { setOpenSections(allIds); }
  function collapseAll() { setOpenSections([]); }

  var totalItems = SECTIONS.reduce(function(sum, s) { return sum + s.items.length; }, 0);

  return React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: "0 auto",
      padding: "24px 16px 64px",
      fontFamily: "Lato, system-ui, sans-serif",
      background: T.bg,
      minHeight: "100vh",
    },
  },
    React.createElement("a", {
      href: "/",
      style: { fontSize: 12, color: T.info, textDecoration: "none", display: "inline-block", marginBottom: 16 },
    }, "\u2190 All slots"),

    React.createElement("div", {
      style: {
        background: T.bgBrand,
        borderRadius: 8,
        padding: "20px 24px",
        marginBottom: 20,
        border: "1px solid " + T.borderBrand,
      },
    },
      React.createElement("div", {
        style: { fontSize: 9, fontWeight: 600, color: T.textBrandS, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 },
      }, "ACT / Pro Growth Lab"),
      React.createElement("h1", {
        style: { fontSize: 20, fontWeight: 700, color: T.textP, margin: "0 0 6px", lineHeight: "28px" },
      }, "Sprint 1 Build MOC"),
      React.createElement("div", {
        style: { fontSize: 12, color: T.textBrandS, lineHeight: "18px" },
      }, "Onboarding \u2192 Network Map \u2192 Action Calendar \u2192 Advisor Profile. Ship Apr 10."),
      React.createElement("div", {
        style: { display: "flex", gap: 16, marginTop: 12 },
      },
        React.createElement("span", { style: { fontSize: 11, color: T.textS } }, totalItems + " resources"),
        React.createElement("span", { style: { fontSize: 11, color: T.textS } }, "v3.1.0"),
        React.createElement("span", { style: { fontSize: 11, color: T.textS } }, "97% confidence")
      )
    ),

    React.createElement("div", {
      style: { display: "flex", gap: 8, marginBottom: 12 },
    },
      React.createElement("button", {
        onClick: expandAll,
        style: {
          fontSize: 11, fontWeight: 600, fontFamily: "Lato, system-ui, sans-serif",
          padding: "4px 12px", borderRadius: 6, border: "1px solid " + T.borderP,
          background: T.bg, color: T.textS, cursor: "pointer",
        },
      }, "Expand all"),
      React.createElement("button", {
        onClick: collapseAll,
        style: {
          fontSize: 11, fontWeight: 600, fontFamily: "Lato, system-ui, sans-serif",
          padding: "4px 12px", borderRadius: 6, border: "1px solid " + T.borderP,
          background: T.bg, color: T.textS, cursor: "pointer",
        },
      }, "Collapse all")
    ),

    SECTIONS.map(function(section) {
      return React.createElement(Section, {
        key: section.id,
        section: section,
        isOpen: openSections.indexOf(section.id) >= 0,
        onToggle: function() { toggleSection(section.id); },
      });
    }),

    React.createElement("div", {
      style: { marginTop: 20, padding: "16px", background: T.dangerLight, borderRadius: 8, border: "1px solid #FECACA" },
    },
      React.createElement("div", {
        style: { fontSize: 13, fontWeight: 700, color: T.danger, marginBottom: 8 },
      }, "Open Blockers"),
      BLOCKERS.map(function(b, i) {
        return React.createElement(BlockerRow, { key: i, blocker: b });
      })
    ),

    React.createElement("div", {
      style: { marginTop: 24, textAlign: "center", fontSize: 9, color: T.textS },
    }, "ACT Sprint 1 Build MOC v3.1.0 \u00B7 Last updated Apr 6, 2026 \u00B7 doc_id: moc-act-pro-growth-lab")
  );
}
