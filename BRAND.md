---
title: "Claude Code Brand Instructions — ACT Phase 1"
version: 1.1.0
upom_tag: claude-code-brand-instructions-act
status: production-ready
aicopilot_chat_url: "https://claude.ai/chat"
created_date: 2026-04-07
last_modified: "2026-04-07 12:00:00 UTC"
changelog: "1.0.0 — Initial consolidated instruction file for Claude Code. Synthesized from pgl-brand-system-reference-v1.md (v1.3.0), fora-brand-guidelines-extracted-v1.md (v1.0.0), prompts-proto-interactiveforge-v2.md (v2.2.0), checklist-act-prototype-selfaudit-v2.md (v2.0.0), Color Use.pdf, Font Use.pdf, and scope-lock-act-phase1-v1.md (v1.0.0)."
---

# ACT — Claude Code Brand Instructions

## ⛔ COLOR ENFORCEMENT — READ FIRST

**Claude does NOT know Fora's colors from training data.** Do not guess. Do not infer from "luxury travel brand." Use ONLY the hex values in this file.

| If you're tempted to use... | STOP. Use this instead. |
|---|---|
| Any blue (`#1B2A4A`, `#2C3E50`, `#1E3A5F`, etc.) | `#212121` (primary) or `#2166DB` (links only) |
| Any teal/green (`#2A9D8F`, `#2E8B8B`, `#10B981`) | `#337E53` (success states only) or `#45A86E` (charts only) |
| Any gold/amber (`#E9C46A`, `#F59E0B`, `#D4AF37`) | `#F3EBE2` (THE CREME) or `#FAF6F2` (light cream) |
| Any coral/orange (`#E76F51`, `#FF6B6B`) | `#CC0000` (errors only) |
| Any navy for backgrounds | `#FFFFFF` (white — 90%+ of surface area) |
| Any gray not in this file | `#636363` (secondary text) or `#D8D8D8` (borders) |
| `bg-blue-*`, `bg-teal-*`, `bg-emerald-*` Tailwind classes | Custom Fora tokens only. No default Tailwind color classes. |

**Fora's brand is warm cream + near-black.** NOT blue. NOT teal. NOT navy. The Advisor Portal is a white-background app with cream accent sections and near-black text. If your output looks like a generic SaaS dashboard with blue headers, you read this wrong.

---

Read this file before writing ANY UI code. Every color, font, radius, and spacing value must trace to a token below. No exceptions.

**Source of truth for deep detail:** `pgl-brand-system-reference-v1.md` (567 lines, full token tables).
**Figma source:** Portal Design System `ObokJ6tQzEtWxBMYMgVDkn`, Advisor Portal mode.

---

## TOKENS — Top 25 (Use These)

### Backgrounds

| Token | Hex | Use |
|---|---|---|
| `bg/surface-1` | `#FFFFFF` | Page background. DEFAULT for everything. 90%+ surface area is white. |
| `bg/brand-light` | `#FAF6F2` | Branded highlight cards ONLY. Onboarding hero, AI callouts. NOT default card bg. |
| `bg/brand` | `#F3EBE2` | THE CREME. Branded sections, feature highlights. Use sparingly. |
| `bg/primary` | `#212121` | Primary CTA button fill. Max 1 dark CTA per screen. |
| `bg/secondary` | `rgba(0,0,0,0.08)` | Ghost/secondary buttons. |
| `bg/AI` | `#F5F3FF` | AI-generated content background. |
| `bg/positive` | `#F0F9F4` | Success state background. |
| `bg/negative` | `#FFE6E6` | Error state background. |

### Text

| Token | Hex | Use |
|---|---|---|
| `text/primary` | `#212121` | ALL headings, body, labels, form values. |
| `text/secondary` | `#636363` | Descriptions, helper text, metadata. MINIMUM for readable text on white. |
| `text/tertiary` | `#B1B1B1` | INPUT PLACEHOLDER ONLY. Never for readable text. |
| `text/brand-primary` | `#423A31` | Headings on cream surfaces. |
| `text/brand-secondary` | `#63574A` | Descriptions on cream. MINIMUM for readable text on cream. |
| `text/inverse-primary` | `#FFFFFF` | Text on dark buttons/backgrounds. |
| `text/AI` | `#7C3AED` | AI feature labels ("AI suggested", "Generated"). |
| `text/positive` | `#337E53` | Success text. |
| `text/negative` | `#CC0000` | Error text, validation errors. |
| `text/information` | `#2166DB` | ALL clickable links. Always blue. Never warm tones for links. |

### Borders

| Token | Hex | Use |
|---|---|---|
| `border/primary` | `#D8D8D8` | Default card/input borders on white. 1px solid. |
| `border/brand` | `#DBD1C6` | Card borders on cream surfaces only. |
| `border/selected` | `#212121` | Focus rings, selected states. 2px solid, 2px offset. |
| `border/AI` | `#7C3AED` | AI-generated content outlines. |

### Chart Colors

| Token | Hex |
|---|---|
| `bg/graph-positive` | `#45A86E` |
| `bg/graph-information` | `#4A91F9` |
| `bg/graph-caution` | `#FFCC33` |
| `bg/graph-reserve` | `#7C3AED` |

---

## TYPOGRAPHY

Font: **Lato** via Google Fonts. No other primary font.

````css
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap');
````

| Scale | Size | Weight | Use |
|---|---|---|---|
| Display | 45px | 700 | Hero headings only |
| H1 | 30px | 700 | Page titles |
| H2 | 24px | 700 | Section headers |
| H3 | 20px | 600 | Card titles |
| H4 | 18px | 600 | Subsection headers |
| Body | 15px | 400 | Default body text |
| Body-sm | 13px | 400 | Secondary text, descriptions |
| Caption | 11px | 600 | Labels, badges, metadata |
| Micro | 9px | 400 | Fine print only |

Fallback: `system-ui, sans-serif`. Weights: 400, 600, 700 ONLY.

---

## GEOMETRY

| Property | Value |
|---|---|
| Card border-radius | 8px |
| Button border-radius | 6px |
| Input border-radius | 6px |
| Badge/pill border-radius | 9999px |
| Modal border-radius | 12px |
| Card shadow | NONE. Border-only. `1px solid #D8D8D8`. |
| Modal shadow | `0 8px 24px rgba(0,0,0,0.12)` |
| Card padding | 20px min (desktop) |
| Section gap | 24px min |
| Spacing scale | 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48px |

---

## BREAKPOINTS

| Name | Width | Layout |
|---|---|---|
| Desktop | ≥1440px | Sidebar + main content. Full network map. |
| Laptop | ≥1024px | Sidebar collapses to icons. Content fills. |
| Tablet | ≥768px | No sidebar. Stacked layout. Phase 2 concern. |
| Mobile | <768px | Single column. Phase 2 concern. |

Container max-width: 1280px centered. Desktop and laptop only for Phase 1.

---

## ICONS

Library: `lucide-react@0.383.0`. Line-style only. Never filled.

| Size | Use |
|---|---|
| 16px | Inline with text |
| 20px | Default (buttons, nav) |
| 24px | Hero/feature icons |

Color: `#636363` default. `#212121` active/selected. Semantic colors for status only.

### Community Category Map

| Category | Icon | Color |
|---|---|---|
| Personal & Family | Heart | `#337E53` |
| Professional & Alumni | Briefcase | `#7C3AED` |
| Fitness & Sports | Activity | `#45A86E` |
| Religious & Spiritual | Building2 | `#8F6E00` |
| Hobby & Interest | BookOpen | `#2C6DE8` |
| Neighborhood & Local | MapPin | `#D4820A` |

---

## 10 PORTAL FIDELITY RULES (Mandatory)

1. **White-first.** 90%+ surface area is `#FFFFFF`. Cream is sparse — hero/callout cards only.
2. **No dark header bars.** Top nav = white or `#FAF6F2`. Never dark.
3. **Sentence case.** All labels. NO ALL CAPS except acronyms (ACT, BETA, PRO).
4. **Understated buttons.** Default = ghost/outlined. Max 1 filled dark CTA per screen.
5. **Ultra-subtle borders.** Cards use `#D8D8D8` at 1px. No cream-colored borders on white.
6. **No arbitrary gold/amber.** Badge colors trace to semantic tokens only.
7. **Blue links always.** All text links use `#2166DB`. Never warm tones.
8. **Generous whitespace.** 20px card padding min, 24px section gaps.
9. **Outline icons.** Line-style, `#636363` default. No filled colored icons unless status-specific.
10. **Contrast floor.** `#B1B1B1` and `#BDB1A4` NEVER for readable text. Min = `#636363` on white, `#63574A` on cream.

---

## MICROCOPY

| Element | Rule | Example |
|---|---|---|
| Buttons | Verb-first, sentence case, ≤3 words | "Start quiz", "Add community", "Export calendar" |
| Errors | What happened + how to fix | "Email not found. Check spelling or contact support." |
| Empty states | Friendly observation + actionable CTA | "No communities yet. Add your first one to get started." |
| Loading | Phased, ≤5 words, personality-ok | "Mapping your network..." → "Almost there..." |
| AI coaching | Empowering, not prescriptive | "You might try..." not "You should..." |
| Placeholders | Realistic Fora examples | "e.g., Greenwich Academy PTA" not "Enter text here" |

---

## DO NOT

| Rule | Reason |
|---|---|
| No navy `#1B2A4A`, teal `#2A9D8F`, gold `#E9C46A` | Marketing-only. Not Portal tokens. |
| No Sangria `#870D13`, Olive `#77742A`, Indigo `#333880` | Brand secondary accents. Not in Portal system. |
| No goals display, no outreach tracking | Scope-lock R-04, R-06. |
| No Fora live data connection | Scope-lock R-03. |
| No data consent screen | Scope-lock R-05. Killed permanently. |
| No archetype bucketing | Scope-lock CUT-11. Killed permanently. |
| No dark mode | Not in scope. Single cream/white theme. |
| No Blanco or Chiswick Sans Text | Brand book fonts. ACT uses Lato only (Alex-approved). |

---

## ACCESSIBILITY MINIMUM (Phase 1)

| Rule | Implementation |
|---|---|
| Semantic HTML | Use `<nav>`, `<main>`, `<section>`, `<button>`, `<h1>`–`<h6>`. |
| Keyboard nav | All interactive elements focusable. Tab order logical. |
| Focus rings | `2px solid #212121`, 2px offset. Visible on all backgrounds. |
| Alt text | All meaningful icons and images. Decorative = `aria-hidden="true"`. |
| No color-only info | Status always has text label + color, not color alone. |
| Dynamic content | `aria-live="polite"` on quiz score updates and task completion. |
| Drag alternatives | Every drag action (community ranking) has a button/menu fallback. |

---

## LOGO

Wordmark SVG: `public/Fora_Logo_Wordmark_Black-Sand.svg` (fill: `#131313`).
Icon SVG: `public/Fora_Logo_Icon_Black-Sand.svg` (fill: `#131313`).
Min wordmark width: 30px. Min icon size: 50px. Clearspace: 0.5× icon width around all sides.
On cream backgrounds: use Sand variant (fill: `#FEFAF5`).

---

## PROTOTYPE HEADER

Every build renders a visible header bar: prototype title + version badge + build date.
Style: 11px Lato SemiBold, `#63574A` text on `#FAF6F2` background.
Example: `⚡ ACT — Network Mapper v2.0.0 · 2026-04-07`

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-04-07 | Initial creation. Consolidated from 7 source files into single Claude Code instruction surface. |
| 1.1.0 | 2026-04-07 | Added COLOR ENFORCEMENT block at line 1. Claude hallucinates travel-brand blues/teals without aggressive guardrails. Remapping table prevents the 6 most common hallucinated palettes. |
