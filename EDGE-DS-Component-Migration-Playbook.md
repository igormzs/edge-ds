# EDGE-DS Component Migration Playbook

**Status:** Official SOP
**Validated on:** `<Button>` (573 nodes rebound, 0 visual regressions)
**Scope:** Standard procedure for migrating the remaining ~40 EDGE Design System components from MUI palette to EDGE palette.

---

## 1. Overview & Principles

### Why we migrate from MUI palette to EDGE palette

The EDGE Design System was originally built on top of MUI's default theme tokens (`primary/main`, `error/contrast`, `action/disabledBackground`, etc.). Components bound directly to this **MUI palette** collection are structurally coupled to a vendor-defined token set that:

- Cannot express EDGE's own brand scale (`EDGE-Turquoise`, `EDGE-Blue`, `EDGE-Red`, …) without duplicating values
- Has no single source of truth — the same visual color can be reachable through multiple raw MUI tokens (`error/main` vs `error/dark` vs a hardcoded hex) with no semantic layer tying them together
- Makes global rebranding or theming changes impossible without touching every component individually

**EDGE palette** exists as the replacement: a collection with three tiers —

```
Brand/*              → raw brand primitives (EDGE-Turquoise/500, Brand/White, …)
Semantic/*            → meaning-based tokens that alias Brand primitives
                        (Semantic/Text/Primary, Semantic/Status/Error/Text, Semantic/State/Hover, …)
Components/{Name}/*   → component-scoped tokens that alias Semantic (or occasionally Brand) tokens
                        (Components/Button/Primary/BG/Default, …)
```

Migrating a component means: every fill, stroke, and text color currently bound to `MUI palette` gets rebound to a `Components/{ComponentName}/*` token, which itself resolves (via alias) up through `Semantic/*` to `Brand/*`. Nothing in a finished component should point directly at `MUI palette` or contain a hardcoded hex.

### Name-driven rebinding philosophy

**The current variable binding on a node is not a trustworthy source of truth. The node's own declared intent — its variant name, its component props (`Color=`, `State=`, `Variant=`) — is.**

Concretely: don't write scripts that say "find everything bound to `error/dark` and rename the reference." Write scripts that say "find every node whose name/props declare `Color=Warning, State=Hovered`, and bind its fill to whatever the Warning-Hovered token is supposed to be — regardless of what it currently points to."

This matters because source files accumulate copy-paste bugs. During the Button migration, every `Color=Warning, State=Hovered` variant across all three sizes was bound to `error/dark` instead of `warning/dark` — a pre-existing bug invisible until we looked at raw bindings. A rebind driven by the *old variable name* would have faithfully preserved that bug under a new name. A rebind driven by the *variant's own declared name* fixed it automatically, as a side effect, with zero extra work.

**Rule of thumb:** derive the target token from what the node claims to be, not from what it happens to currently point to.

---

## 2. Step-by-Step Execution Workflow

### Step 1: Live Inspection & Discovery

Before touching anything, establish ground truth from the live file — never trust a prior report, a memory, or a summary of "what should be there."

1. Confirm the Figma Desktop Bridge is actually live (not just "paired") by running a real read call (`get_variable_defs` or a `use_figma` read-only script) against a concrete node ID. A "nothing selected" error means the bridge isn't actually feeding live selection — don't proceed until a real node resolves.
2. Locate the component set's real node ID. `search_design_system` returns library metadata (names, keys, scopes) but **not** resolved values or canvas node IDs — use `get_metadata` (page-level) or a `use_figma` discovery script with `findAllWithCriteria({ types: ['COMPONENT_SET'] })` to get the actual on-canvas ID.
3. Pull every current fill/stroke/text binding in the component set's subtree via a read-only `use_figma` script. Group by **bound variable name**, not by node, so you get counts and sample names, not an unreadable node-by-node dump (large dumps get truncated — design the read query to return aggregates).
4. Cross-check against the published library with `search_design_system`. **Library edits must be published before they're visible this way** — if you just made changes in Figma Desktop and a check doesn't reflect them, publish first and re-check before concluding something is missing.

**Output of this step:** a table of `{current MUI variable name} → {count} → {sample variant names}`, plus the component set's real node ID.

### Step 2: Gap Analysis & Token Scope

For every distinct MUI variable binding found in Step 1, classify it:

| Classification | Meaning | Action |
|---|---|---|
| **Already migrated** | Already bound to a `Components/*` or `Semantic/*` token | No action |
| **Alias-only gap** | A `Semantic/*` token for this already exists (check `Semantic/Status/*`, `Semantic/State/*`, `Semantic/Text/*`, `Semantic/Border/*`, `Semantic/Surface/*` before assuming it doesn't) | New `Components/{Name}/*` token needed, but it should **alias the existing Semantic token** — do not create a duplicate |
| **True gap** | No Semantic-tier equivalent exists anywhere in EDGE palette | New token needed, aliased to the raw `Brand/*` or `MUI palette` primitive that currently supplies the value (see Step 3 rules) |
| **Ambiguous / conflicting variant styles** | The same property name means different things in different contexts (e.g. a solid "Contained" background vs. a light hover tint both being called "hover") | **Stop and flag to a human.** Do not guess a shared name across two different visual roles — pick distinct names before creating anything. |

**Before proposing new tokens, always search for an existing `Semantic/Status/*`, `Components/{OtherComponent}/*` precedent first.** During the Button migration, a full `Semantic/Status/{Error,Warning,Info,Success,Neutral}/{Text,Border}` family already existed (created earlier for ButtonGroup dividers) — reusing it via alias avoided recreating five duplicate color families from scratch.

**Output of this step:** an exact mapping table (`From MUI/current → To EDGE token`) and an explicit **UNMAPPED TOKENS** list with a proposed name for each, ready for approval.

### Step 3: Token Creation & Approval

1. Present the mapping table and any new token names for sign-off before creating anything — naming and aliasing decisions are hard to walk back once dozens of nodes reference them.
2. Create every new token as an **alias**, never a fresh hardcoded hex, unless Step 2 genuinely found no existing primitive to point to. Aliasing means: if the primitive (`{status}/main`, `Brand/White`, an existing `Semantic/Status/*` token) already carries the right value, the new `Components/*` token should reference it via `VARIABLE_ALIAS`, not duplicate its value.
3. Match the file's existing scope convention. In this file, EDGE palette tokens consistently use `ALL_SCOPES` — don't impose a narrower convention unilaterally; check what siblings in the same collection already use.
4. Verify zero naming collisions before creating (check the new names don't already exist) and confirm every alias target resolves before writing.

**Output of this step:** the new tokens exist in `EDGE palette`, confirmed via a read-only re-check, with zero unresolved aliases.

### Step 4: Automated Rebinding

1. Write the rebind as a `use_figma` script that iterates the component set's own children, reads each variant's **name** (not its current binding) to determine Color/State/Variant/Size, and computes the target token from that declared identity.
2. Handle shared/generic states (typically `Disabled`) separately from per-status states — confirm via Step 1 data whether Disabled is genuinely color-agnostic (same binding regardless of Color prop) before assuming it maps to a shared token.
3. Work in small, reversible batches — one script per structurally distinct group (e.g. "Contained variant", "Outlined/Text variant", "shared states"), not one script attempting the entire component at once. `use_figma` calls are atomic: a failed script makes zero changes, so smaller batches mean a failure only costs you that batch, not the whole migration.
4. Every rebind script must `return` counts per target token and the full list of mutated node IDs — this is both the audit trail and the input to the next validation step.
5. Re-run the Step 1 discovery query after each batch to confirm the remaining-binding count is shrinking as expected, and to catch anything the batch's pattern-matching missed.

### Step 5: Visual Verification & Residual Handling

1. After rebinding, call `node.screenshot()` on the full component set and visually compare against the pre-migration appearance (colors, disabled states, borders, hover tints should all look identical — only the underlying binding changed).
2. Run one final discovery pass for any remaining `MUI palette`-bound fills/strokes. Expect small residuals in **nested instance overrides** (icons, spinners, sub-components) — these sometimes resist both subtree traversal and direct-ID mutation because they live inside a separate sub-component's own definition rather than the top-level component set.
3. **Do not force nested-instance residuals.** If a node resists two independent mutation approaches, stop, document it as a named residual (which sub-component, how many nodes, what they're bound to), and note that it needs fixing at that sub-component's own source — not by repeatedly patching each parent instance.
4. Explicitly list anything deferred (adjacent component sets found but out of scope, ambiguous bindings not yet resolved) rather than letting them disappear silently. A migration is "done" when the mapping table, the rebind, the verification, and the deferred list are all reported together — not just when the script stops erroring.

---

## 3. Standard Token Naming Conventions

### Hierarchy

All EDGE palette tokens use **slash-separated paths**, never curly braces or other grouping syntax:

```
Components/{ComponentName}/{Status}/{Property}
```

Correct: `Components/Button/Error/BG/Hover`
Incorrect: `Components/Button/{Error}/BG/Hover`, `Components/Button.Error.BG.Hover`

### Status vocabulary

Use exactly these five status names across all components — do not introduce synonyms (`Danger`, `Alert`, `Default`, etc.):

| Status | Maps from (MUI) |
|---|---|
| `Error` | `error/*` |
| `Warning` | `warning/*` |
| `Info` | `info/*` |
| `Success` | `success/*` |
| `Neutral` | `secondary/*` (MUI's "secondary" color is a neutral grey-blue, not a second brand hue — always rename to `Neutral` in EDGE palette) |

`Primary` is handled separately — it is the brand teal, already established via `Components/{Name}/Primary/*`, and is not part of the 5-status family above.

### Property/state suffixes

| Suffix | Meaning | Typical alias target |
|---|---|---|
| `BG/Default` | Solid fill, default/enabled state (Contained-style) | `{status}/main` (or its EDGE-native equivalent once one exists) |
| `BG/Hover` | Solid fill, hovered state (Contained-style — darker/stronger) | `{status}/dark` |
| `BG/OnFill/Text` | Text/icon color rendered **on top of** a solid `BG/Default` fill | `Brand/White` (or the applicable inverse-text token) |
| `Text` | Colored text for Outlined/Text-style variants (no solid fill behind it) | Existing `Semantic/Status/{Status}/Text` |
| `Border` | Outline/stroke color for Outlined-style variants | Existing `Semantic/Status/{Status}/Border` |
| `Outlined/BG/Hover` | Light background tint shown on hover for Outlined/Text-style variants (distinct from `BG/Hover`, which is the Contained-style dark hover) | `{status}/hover` (translucent tint) |

**Never reuse `BG/Hover` to mean two different visual roles.** If a component has both a Contained variant (solid fill darkens on hover) and an Outlined/Text variant (transparent background gains a light tint on hover), these need **two distinct token names** — `BG/Hover` for the former, `Outlined/BG/Hover` for the latter. Collapsing them into one name was an early mistake in the Button migration, caught during gap analysis before any tokens were created — check for this pattern proactively in every future component.

### Shared vs. per-status tokens

Not every state needs a per-status variant. `Disabled` is typically shared across all Color/Status values (confirmed empirically in Button: all five status colors' Disabled state bound to the identical `action/disabledBackground` / `action/disabled` pair). When Step 1 data confirms a state is genuinely color-agnostic, rebind it to a single shared token (e.g. `Components/{Name}/Disabled/BG`, `Components/{Name}/Disabled/Text`) rather than creating five redundant per-status copies.

---

## Appendix: Gotchas Log (carry forward to remaining components)

- **Library publish lag:** `search_design_system` reflects the *published* library, not unpublished local edits. If a check doesn't show an expected token/deletion, publish in Figma Desktop and re-check before concluding it's missing.
- **Bridge "nothing selected" errors:** a failing `get_variable_defs` call doesn't always mean the bridge is broken — it can mean no concrete node ID was resolved yet. Get a real node ID first (via a documentation link or `get_metadata` page listing), then retry.
- **`get_metadata` on large subtrees can exceed output limits** and silently truncate. Prefer targeted `use_figma` read scripts that aggregate/group results server-side rather than dumping full node trees back to the agent.
- **Nested instance overrides (icons, spinners) can resist mutation** via both subtree traversal and direct `getNodeByIdAsync` addressing. Treat these as a distinct, smaller follow-up against the sub-component's own definition — don't burn cycles forcing it through the parent.
- **A component's "Color" prop can span multiple structurally different variant styles** (e.g. Contained/Outlined/Text all sharing one `Color=` enum). Audit *all* variant styles for a given status/color before assuming a single set of tokens covers it — the true node count is often 2-3x the first estimate.
- **`node.findAll(() => true)` can silently under-traverse deeply-nested instance-swap children** (icon sub-components 2-3 levels deep, with compound node IDs like `I6543:40615;9974:113227;7475:54092`). Confirmed on ButtonGroup: `findAll()` from the component set root returned 617 nodes and reported the migration complete; a manual recursive walk of `node.children` from the same root found 1037 nodes, surfacing 38 more MUI-bound layers (icon fills, Outlined/Text label colors) that `findAll()` never saw. **Always do the Step 5 final residual check with a manual recursive walk, not `findAll()`** — and if a user can see a lingering MUI/raw token in Figma's own "Selection colors" panel, trust that over a `findAll()`-based script result. This will recur on every remaining component that has icon or instance-swap children, not just ButtonGroup.
- **Even the manual recursive walk gives inconsistent node counts call-to-call** (confirmed on Button: 2351, then 2355, then 2350, then 2350 again across four consecutive identical-logic scans on an unchanged tree). The bridge's resolution of deeply-nested instance-swap content appears to have genuine read-to-read variance, not just a `findAll()`-specific gap. **Never trust a single "zero residual" read as final.** Re-run the same manual-walk audit at least 2-3 times and require consecutive agreement before declaring a component clean, and where possible ask the user to cross-check Figma's own "Selection colors" panel on the live selection — it has proven more reliable than any scripted read so far.
