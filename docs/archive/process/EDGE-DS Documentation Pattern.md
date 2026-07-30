# [ARCHIVED 2026-07-28] Superseded by docs/web-component-page-pattern.md and docs/figma-component-structure.md

This file's Phase 1 (Token Migration) and Phase 2 (Canvas & Documentation Architecture) pointers, Phase 3 (Legacy Scaffolding & Orphan Cleanup), and Phase 4 (Web Production Parity) guidance were consolidated into the two canonical files above (Phase 3 lives in figma-component-structure.md section 8, Phase 4's principles live in figma-component-structure.md section 9 and web-component-page-pattern.md throughout). Read those files instead, this copy is kept for historical reference only.

---

# EDGE-DS Documentation Pattern
### The 4-Phase EDGE-DS Migration Framework — Single Source of Truth

**Status:** Ratified 2026-07-27, established against `<Switch>` (Figma Two-Frame Canvas Architecture + web styleguide parity) and `<Button>` (Phase 1 token migration).

This file is the top-level Standard Operating Procedure for migrating an EDGE Design System component from its legacy MUI-palette state to a fully tokenized, documented, production-parity EDGE-DS component. Every future component migration starts here.

This is a **framework of phases**, not a duplicate rulebook — Phases 1 and 2 already have detailed, ratified execution docs; this file names the phase, states its goal and non-negotiables, and points to the doc that governs its mechanics. Phases 3 and 4 are defined here directly, since no dedicated doc for them exists yet.

---

## Phase 1: Token Migration & Purification

**Goal:** every fill, stroke, and text color in the component's Figma set moves off `MUI palette` / raw hex and onto `Components/*` → `Semantic/*` → `Brand/*` EDGE-DS tokens.

**Governing doc:** [`EDGE-DS-Component-Migration-Playbook.md`](./EDGE-DS-Component-Migration-Playbook.md) — the full 5-step execution workflow (Live Inspection → Gap Analysis → Token Creation → Automated Rebinding → Visual Verification), naming conventions, and a gotchas log. Validated on `<Button>` (573 nodes, 0 regressions). Follow it exactly; do not re-derive the workflow from scratch per component.

**Non-negotiables restated here because they govern every phase, not just this one:**

- **Zero hardcoded hex values.** A raw hex anywhere in a "finished" component is a Phase 1 failure, full stop.
- **Token Governance Rule:** reuse an existing token wherever a direct semantic match exists — search `Semantic/*` and sibling components' `Components/*` tokens before assuming a gap. When no existing token fits, new tokens **must** be created rather than forcing an improper bind or leaving a raw hex — but **before creating any new token, explicitly list the proposed name(s), state why existing tokens don't fit, and wait for explicit user confirmation before binding.** This applies even to small, single-value tokens; token debt compounds silently otherwise.
- **Name-driven rebinding, not binding-driven.** Derive the target token from what a node's variant name/props *declare* itself to be, not from what it happens to currently point to — the current binding is not a trustworthy source of truth (see the Playbook's Button case study on this).

---

## Phase 2: EDGE-DS Canvas & Documentation Architecture

**Goal:** every component's Figma page is rebuilt as a canonical two-frame documentation surface, replacing whatever ad-hoc legacy layout previously existed.

**Governing doc:** [`docs/DOCUMENTATION_STANDARDS.md`](./docs/DOCUMENTATION_STANDARDS.md) — the full Page ⇄ Canvas Translation Law: the Two-Frame Canvas Architecture (§0), master-frame/section-wrapper anatomy (§1–§2), typography token table (§3), page section order (§4), Figma automation gotchas (§5), and a per-component checklist (§6). Validated against `<Switch>` (Two-Frame) and `<ButtonGroup>` (section anatomy). Follow it exactly.

**Restated here because it's the header-level contract every component must satisfy:**

- **Mandatory 2-Frame Canvas Standard**, exactly two top-level frames per component page:
  1. `[Component] — Component Gallery` — exhaustive visual catalog of every real variant that exists, organized by the component's actual variant axes. Build only what's real — query the live component set first, and document gaps (e.g. an edge-case state only built for one color) rather than fabricating a uniform grid to hide them.
  2. `[Component] — Documentation` — the canonical text-based spec page: representative preview (not every variant), Anatomy & Token Architecture, Usage Guidelines & Accessibility, Sizing, Key Props.
- White container cards (`Semantic/Surface/Paper`), clean padding, off-grid external axis/guide labels for state/color/size — never baked inside the card.
- Standardized interactive-state patterns: circular ripple/halo behind a control's knob or focal point (not a border/outline around the control's own silhouette) for Hover/Focus feedback, custom indicators for non-standard states (e.g. an Indeterminate dash), tokenized status badges.
- **Zero hardcoded text properties** — every text layer bound to an official Figma Text Style (§3 exception: no EDGE monospace token exists yet, so inline code/prop values are the one sanctioned raw-text gap until one is created).

---

## Phase 3: Legacy Scaffolding & Orphan Cleanup

**Goal:** the component's page holds only the current, live documentation surface — no orphaned legacy frames, no broken instance links, nothing pointing at a component that no longer exists.

**Steps:**

1. **Locate the legacy frame(s).** Before deleting anything, identify what a prior pass built for this component — it may not be named `[Doc] {Component}` or anything predictable (the Switch pass found its legacy equivalent under the plain name `Switch`, an untouched MUI Community library import).
2. **Extract live master sets without breaking instance links.** If the real, current component set lives nested inside the legacy frame (as opposed to sitting independently elsewhere in the file), the legacy frame cannot simply be deleted — the new Documentation/Gallery frames' instances resolve back to that nested master. Duplicate the legacy frame in place first, then work from the duplicate; leave the original frame's master set untouched until the new frames' instances are confirmed to still resolve correctly.
3. **Recursive verification — zero unresolved instances.** `findAll()`-style single-pass queries have confirmed, repeatedly, that they under-traverse deeply-nested instance-swap children (see the Playbook's Appendix: ButtonGroup found 617 nodes via `findAll()`, 1037 via a manual recursive walk). Do the final "is anything still pointing at the old thing" check with a manual recursive walk, not a single `findAll()` call, and re-run it 2-3 times — node-count reads on deeply-nested instance-swap trees have shown genuine read-to-read variance in this file, not just a `findAll()`-specific gap.
4. **Relocate, don't delete.** Move the deprecated frame to a dedicated `🗄️ _Archive / Deprecated Docs` page (create it fresh if it doesn't exist yet), rename it to `_Archive / {Component} / {date}`, and lock it (`locked: true`). Deletion destroys history a future audit may need; archiving preserves it out of the way.
5. **Report the full picture, not just "done."** A Phase 3 pass is complete when the mapping of what was archived, what was verified clean, and what (if anything) was deliberately left in place — and why — are all stated together, not left implicit.

---

## Phase 4: Web Production Parity (1:1 Figma-to-Code Sync)

**Goal:** the live web styleguide page reproduces the Figma Documentation frame's spec with 1:1 fidelity — same section order, same anatomy/token language, same visual behavior — while making full use of the fact that a web page can do things a static Figma canvas structurally cannot (real hover/focus, live interactive controls).

**Steps:**

1. **Pull from the live file, not from a prior summary.** A summary of "what was decided" can drift from what's actually built (see the Known Gaps Found section below — this happened on this very pass). Before writing code, re-derive the ground truth directly: `get_metadata` for section/frame structure, `get_variable_defs` scoped to the *specific child node* (not the whole symbol — a whole-symbol query mixes variables from every descendant and won't tell you which element actually carries which binding), and `get_design_context` (via the mandatory `figma-design-to-code` skill gate) for literal values baked into exported assets (opacity, exact colors, dash/mark geometry) that don't surface as named variables.
2. **Match the Documentation frame's core section order exactly**, top to bottom, as the page's structural backbone: Visual Preview → Anatomy & Token Architecture → Usage Guidelines & Accessibility → Sizing → Key Props. A live web page may append additional sections after this backbone (a live Interactive-States demo, a fuller variant gallery, extra composed-component examples) since those showcase behavior a static canvas cannot — but the backbone order itself is not negotiable.
3. **Reproduce interactive mechanics precisely, not approximately.** If Figma's real interaction feedback is a circular halo/ripple behind a control's knob, the web must literally be a circle centered behind that knob at the confirmed size ratio and opacity values — not a generic MUI hover-background rectangle or default ripple standing in for it. Disable stock component ripple/hover behavior that would conflict with the spec'd mechanism rather than layering the new one on top of it.
4. **Flag, don't silently fix, contradictions between Figma's own descriptive text and its actual built component.** A Documentation frame's prose can go stale relative to the component it describes (found on this pass: the Switch Documentation frame's own Anatomy text described a "Track outline ring on Focus only," while the live component set actually implements a circular Focus Halo behind the knob, present on both Hover and Focus). Build the web to match the **real component**, and report the text discrepancy back rather than either propagating the stale description or silently editing Figma's copy without sign-off.
5. **Verify against a real build, not just a compile.** `next build` (all routes prerendering, zero TypeScript errors) is the floor. Where feasible, start the production build and `curl`/inspect the actual rendered CSS for the specific values that matter (e.g. grep the emitted stylesheet for the exact opacity/color values a spec calls for) — a clean compile confirms the code is well-formed, not that the visual spec is what's actually emitted.

### Known gaps this framework does not yet close

- **No official EDGE monospace/code text style** exists yet (Phase 2, §3.1) — inline code/prop values remain unbound until one is created.
- **No dedicated neutral Focus Halo token** exists yet in the `<Switch>` set — the neutral/unchecked Halo is currently an unbound literal (black, 8%/12% opacity) rather than a named `Components/Switch/Halo/Neutral`-style token. Flagged per the Phase 1 Token Governance Rule rather than created unilaterally during a Phase 4 (web-only) pass.
