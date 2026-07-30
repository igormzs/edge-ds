# EDGE-DS Web Component Page Pattern

**Status:** Ratified 2026-07-28 against the refactored `<Switcher>` styleguide page (`src/app/styleguide/form-controls/switcher/page.tsx`), which stands as the canonical reference implementation. Every new or migrated component page in `src/app/styleguide/` follows this document, not tribal memory or an older page's shape.

**Scope:** this file governs the **web styleguide page** only (the live Next.js/MUI documentation site). For the paired Figma documentation canvas, see `docs/figma-component-structure.md`.

**Supersedes:** `skills/edge_ds_component_page.md` (archived, see `docs/archive/process/`). That skill described an earlier, flatter page shape (single "Basic Component" section, no subcomponent tabs, no matrix-card Visual Preview) that predates the patterns below.

---

## 1. Header & Metadata Standards

Every page opens with `<PageHeader>` (from `@/components/DocUI`), immediately below the page's own file boilerplate:

```tsx
<PageHeader
  title="Switcher"
  description="A binary control that allows users to toggle an option on or off immediately."
  muiLink="https://mui.com/material-ui/react-switch/"
  categoryBadge="Components"
  statusBadge="In Design / In Progress"
/>
```

- **Title:** the component's display name (Montserrat Bold, 36px).
- **Description:** one or two sentences, plain language, no jargon.
- **Badge row (top right, left to right):**
  1. **Category Badge** (`categoryBadge`) neutral slate pill. Always `"Components"` for every component page. There is no longer a "Form Controls / Inputs" or similar sub-category, all components live under one flat `Components` group in the sidebar (`src/app/styleguide/navigation.ts`), alphabetically ordered.
  2. **Status Badge** (`statusBadge`) amber pill, e.g. `"In Design / In Progress"`. Optional, omit once a component is fully locked with nothing pending.
  3. **External link badge** always present, always last, always teal, labeled `"{Library} Docs ↗"` (e.g. `"MUI Docs ↗"`), linking to the upstream library's own reference page.

---

## 2. Subcomponent Tab Navigation

**When to use:** any component whose real usage involves one or more closely related subcomponents that deserve their own dedicated documentation (e.g. `Switcher` owns `FormControlLabel` and `FormGroup`). This is the standard pattern going forward for every such component, not a one-off built for Switcher.

**Structure:**

```tsx
const TAB_LABELS = ['Switcher', 'FormControlLabel', 'FormGroup'] as const;

export default function SwitcherPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <PageHeader ... />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="Switcher and subcomponents">
          {TAB_LABELS.map((label, i) => (
            <Tab key={label} label={label} id={`switcher-tab-${i}`} aria-controls={`switcher-tabpanel-${i}`} />
          ))}
        </Tabs>
      </Box>

      <Box role="tabpanel" hidden={tab !== 0} id="switcher-tabpanel-0" aria-labelledby="switcher-tab-0">
        {tab === 0 && <SwitcherTab />}
      </Box>
      {/* ...one Box/tab per subcomponent, same shape... */}
    </Box>
  );
}
```

Rules:

- Tabs sit **directly below the `PageHeader`**, above every other section, on a `borderBottom: 1, borderColor: 'divider'` rule (matches the existing `MuiTabs`/`MuiTab` theme defaults, no extra styling needed, see `brandTheme.ts`).
- The first tab is always the main/master component, in the same name as the page title.
- Each tab is a **separate function component** (`SwitcherTab`, `FormControlLabelTab`, `FormGroupTab`), each owning its own local `useState` for whatever interactive demos it renders. Do not share one giant state object across tabs.
- Each tab is a self-contained view: it renders its own full section backbone (see §6), it is not a partial fragment of a shared layout.
- Conditionally render tab bodies (`{tab === n && <Tab... />}`), do not mount all tabs' state at once.

---

## 3. Visual Preview Canvas (Grid Card Matrix)

This is the single biggest shape change from the pre-2026-07-28 page pattern. The old pattern wrapped every example in one `<PreviewCanvas>` (a single white card, centered flex-wrap content, `alignItems: 'center'` by default). The new pattern is a **matrix of distinct, well-padded cards**, one per logical grouping, each left-aligned.

### 3.1 Local helper components

Define these once per page (co-located in the page file, not promoted to shared `DocUI.tsx` yet, since the exact visual language is still page-specific):

```tsx
// A well-padded card per subsection, with a left-aligned header.
function MatrixCard({ title, children }) {
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.08)', bgcolor: '#ffffff' }}>
      <Typography sx={{ fontWeight: 700, fontSize: 12, letterSpacing: 0.6, textTransform: 'uppercase', color: '#009f9b', mb: 2.5, textAlign: 'left' }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

// Sub-group label ("Small", "Default", "Primary"), left-aligned above its controls.
function GroupLabel({ children }) {
  return (
    <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#5e6e7d', letterSpacing: 0.4, textTransform: 'uppercase', textAlign: 'left', mb: 1 }}>
      {children}
    </Typography>
  );
}

// A single control plus its state caption, left-aligned underneath (never centered).
function Swatch({ label, children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
      {children}
      <Typography sx={{ fontSize: 11, color: '#9e9e9e', letterSpacing: 0.3, textAlign: 'left' }}>{label}</Typography>
    </Box>
  );
}
```

### 3.2 Layout rules

- **Left-aligned, always.** The old `PreviewGroup` primitive (still available in `DocUI.tsx` for simpler, non-matrix pages) centers its caption text and, combined with a `width: '100%'` inner `Stack`, produced excessive dead whitespace and visually "floating" captions. The matrix pattern never does this: `justifyContent: 'flex-start'`, no forced-full-width inner stack, captions sit directly under (or beside) their control, left-aligned.
- **One `MatrixCard` per logical grouping.** For `Switcher` these are, in order: **Sizes**, **Base & Interactive States**, **Color Status**, **Composed Examples**. The exact card names are component-specific, name them after what a designer would actually look for (`Sizes`, `Color Status`, `States`, `Composed Examples`, etc.), not generic placeholders.
- **Fold "Interactive States" into Visual Preview, do not give it a separate page section.** A standalone "Interactive States" section duplicates content that a live, already-interactive Visual Preview already demonstrates (Disabled swatches, a Hover/Focus explainer callout). Put Disabled and any Hover/Focus explanation directly inside the relevant `MatrixCard` (see `Base & Interactive States` in the Switcher reference).
- **Consistent baseline alignment.** Rows mixing multiple controls of the same size should use `alignItems="center"` (or `"flex-end"` when captions sit below) so controls line up on a shared visual baseline within their row.
- **Single-state optimization for long variant lists.** When a card would otherwise show a redundant Off/On (or equivalent) pair for every item in a long list (e.g. six color statuses), show **one live, interactive control per item, defaulted to its most illustrative state** (e.g. checked/On), not a side-by-side pair. The control is real and interactive, so a viewer tests the other state by clicking it. This keeps a 6+ item grid compact instead of doubling its width.

### 3.3 Full interactivity, no exceptions

**Every control rendered in Visual Preview must be a real, live, interactive instance**, not a static illustration:

- Use controlled `useState` + `onChange`, defaulted to whatever value best illustrates the label (`checked`, a specific `color`, etc.), so the page loads showing the intended state but remains fully clickable.
- Where a component has no true intermediate state in the underlying library (e.g. MUI's stock `<Switch>` has no real `indeterminate` DOM state), build a purpose-made interactive stand-in rather than a static decoration: give it `role`, `aria-*`, `tabIndex`, and keyboard handling matching the real semantic it represents, and wire its own click/keyboard handler into whatever custom state machine is needed (see `IndeterminateSwatch`'s `onActivate` prop and the Switcher's Indeterminate → On → Off → Indeterminate tri-state cycle for the reference implementation).
- A demo control that cannot be clicked is a bug in the page, not an acceptable simplification.

---

## 4. Typography & Content Hierarchy

Text-heavy sections, specifically **Anatomy & Token Architecture**, **Usage Guidelines**, and **Accessibility**, must never render as one dense paragraph. Use these two local helpers:

```tsx
function Paragraph({ children, sx }) {
  return (
    <Typography sx={{ fontSize: 14, lineHeight: 1.6, color: '#5e6e7d', mb: 1.5, '&:last-child': { mb: 0 }, ...sx }}>
      {children}
    </Typography>
  );
}

function BulletList({ items, sx }) {
  return (
    <Box component="ul" sx={{ m: 0, mb: 1.5, pl: 2.5, display: 'flex', flexDirection: 'column', gap: 0.75, '&:last-child': { mb: 0 }, ...sx }}>
      {items.map((item, i) => (
        <Typography key={i} component="li" sx={{ fontSize: 14, lineHeight: 1.6, color: '#5e6e7d' }}>{item}</Typography>
      ))}
    </Box>
  );
}
```

Rules:

- Each distinct idea gets its own `Paragraph` or its own `BulletList` item, never a single run-on sentence covering three unrelated facts.
- Split **"Usage Guidelines"** and **"Accessibility"** into two separate `SpecRow`s (heading + body), even though they used to be crammed into one "Usage Guidelines & Accessibility" paragraph. The section title stays `"Usage Guidelines & Accessibility"`, the two sub-headings inside it are what split.
- `SpecRow`'s body wrapper must be a plain `<Box>`, not a `<Typography>`, so nested `Paragraph`/`BulletList` elements do not end up invalid-nested inside a `<p>`.
- Explicit `margin-bottom` (`mb`) between paragraphs and lists, not reliance on default browser spacing.

---

## 5. Layout & Spacing Overrides

Prefer an explicit theme-level override in `src/theme/brandTheme.ts` over incidental spacing that happens to "look right" by accident. Two concrete, ratified examples:

```ts
// Stock MuiFormGroup has no built-in spacing between stacked items.
MuiFormGroup: {
  styleOverrides: {
    root: { gap: 8 }, // 8px, design-system-wide, never touching/overlapping items
  },
},

// Stock MuiFormControlLabel's marginLeft:-11 / marginRight:16 offset the
// whole [control, label] unit externally, they do not add space BETWEEN
// the control and its label. Use `gap` (not a one-sided margin) because
// FormControlLabelRoot flips flexDirection per labelPlacement
// (row / row-reverse / column / column-reverse); a flex gap works
// identically regardless of which side the label ends up on.
MuiFormControlLabel: {
  styleOverrides: {
    root: { gap: baseTheme.spacing(1) }, // 8px, matches the `sizing/1` Figma token
  },
},
```

Why this matters: an earlier pass zeroed `MuiSwitch`'s root padding to match Figma's exact track geometry, which incidentally removed the padding stock MUI's Switch used to rely on for visual breathing room next to its label. The fix is an explicit, named override at the theme layer (so every consumer of `FormGroup`/`FormControlLabel` app-wide benefits, not just one page), never a one-off `sx` patch on a single page.

**Rule of thumb:** if a spacing gap "just happens to look fine" because of an unrelated component's padding, that is latent debt. Name the gap explicitly as a theme override once you notice you are relying on it.

---

## 6. Section Backbone Order

Every tab (the main component's tab and every subcomponent's tab) renders this exact order, top to bottom. A tab may omit a section that does not apply (e.g. a simple subcomponent may skip "Anatomy & Token Architecture"), but never reorders what it does include:

1. **Visual Preview** (§3), the matrix-card grid, fully interactive.
2. **Anatomy & Token Architecture** (main/complex component tab only, typically not needed on a thin subcomponent tab), split Anatomy and Token Architecture into two `SpecRow`s.
3. **Usage Guidelines & Accessibility** (§4), split into two `SpecRow`s.
4. **Key Props**, a `<PropsTable>`.
5. **Usage**, one or more `<CodeBlock>`s, each preceded by a short `SnippetLabel`.

This matches the reference `<Switcher>` page's actual, verified structure (confirmed via a live `next build` and a headless-browser click-through) as of 2026-07-28: **Visual Preview → Anatomy & Token Architecture → Usage Guidelines & Accessibility → Key Props → Usage** on the main tab, and **Visual Preview → Usage Guidelines & Accessibility → Key Props → Usage** on each subcomponent tab.

**Known divergence from `docs/figma-component-structure.md`, flagged not silently reconciled:** the Figma Documentation frame's own page-order table (inherited from the pre-matrix-card era) still lists **Sizing** and **Interactive States** as separate backbone sections. The web pattern above folds both into Visual Preview's matrix cards instead. Nobody has rebuilt the Figma Documentation frame to match this newer web shape yet, that is an open follow-up, not a claim that the two are already 1:1.

---

## 7. DocUI Primitives Reference

Shared primitives live in `src/components/DocUI.tsx`. Import what you need:

```tsx
import {
  PageHeader,
  DocSection,
  PreviewCanvas,   // still used for simple, non-matrix sections (Anatomy, Usage Guidelines, etc.)
  PreviewGroup,    // legacy centered-caption primitive, fine for simple pages, superseded by
                    // MatrixCard/GroupLabel/Swatch (§3) inside a Visual Preview matrix
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';
```

- **`<DocSection title="...">`**: labeled divider + content, one per backbone item in §6.
- **`<PreviewCanvas sx={{...}}>`**: white bordered card, `p: 4` default, `display: flex; flexWrap: wrap; alignItems: center` by default. Accepts an optional `sx` prop (merged over the defaults) so a page can opt into `justifyContent: 'flex-start'` without changing the primitive's default behavior everywhere else it is used.
- **`<PropsTable rows={PropRow[]}>`**: `{ prop, type, default, description }` per row.
- **`<CodeBlock code={string}>`**: dark, copy-button-equipped code block.

---

## 8. New Component Page Checklist

1. **Create the page file:** `src/app/styleguide/<component-name>/page.tsx`, starting with `'use client';` (every doc page is a client component, they use `useState`).
2. **Register in navigation:** add an entry to the single flat `Components` group in `src/app/styleguide/navigation.ts`, alphabetically:
   ```ts
   { label: 'ComponentName', href: '/styleguide/component-name' },
   ```
   There is no longer a category-specific nav group (e.g. no "Form Controls / Inputs"), every component's `categoryBadge` and nav placement both read `"Components"`.
3. **Add theme overrides if needed:** inside `components: {}` in `src/theme/brandTheme.ts`, a `Mui<ComponentName>` entry following the existing alphabetically-ordered pattern (see §5 for the shape).
4. **Verify before calling it done:**
   - `npx tsc --noEmit` clean.
   - `npx next build` clean, all routes prerender.
   - A live click-through (headless browser or manual) confirming every interactive control actually toggles, tab navigation switches panels, and there are zero console errors. A clean compile confirms the code is well-formed, it does not confirm the interactions actually work.
5. **Build & deploy** (once verified):
   ```bash
   npm run build
   npx vercel --prod
   ```

---

## 9. EDGE-DS Quick Reference (design tokens used throughout this pattern)

| Token | Value | Usage |
|---|---|---|
| Primary | `#009f9b` | Active indicator, selected text, `MatrixCard`/`SpecRow` headings, icons |
| Primary Dark | `#00918c` | Hover/active state on primary |
| Subtle | `rgba(0,159,155,0.06)` | Hover background / callout background on primary items |
| Secondary text | `#5e6e7d` | Labels, `GroupLabel`, secondary text |
| Text Primary | `#212121` | Main body text |
| Text Disabled | `#9e9e9e` | Disabled state, `Swatch` captions |
| Surface Default | `#ffffff` / `#fafafa` | Card background / page background |
| Divider | `rgba(0,0,0,0.08)`–`rgba(0,0,0,0.12)` | Card borders, dividers |
| Border radius | `4px` base, `8px` cards | Shape |
| Spacing grid | multiples of `8px` (`theme.spacing(1)` = 8px) | All layout gaps, paddings, margins |

**Typography:** Montserrat (700) for display/headings, Open Sans (400/600) for body/labels/captions, Roboto Mono for inline code.

---

## Appendix: Known Open Items (flagged, not silently fixed)

- **Em dash usage:** `EDGE-DS_Claude_Account_Handoff.md` and `Project Context from Gemini.md` both state a hard, repo-wide rule: never use an em dash ("—") anywhere, in text, docs, code comments, or generated copy, use commas, colons, or hyphens instead. The current `Switcher` page (and several of this project's own `.md` files predating this pattern doc) contain multiple em dashes in code comments and rendered copy. This pattern doc itself was written without any em dashes. Cleaning up the existing violations is an open follow-up, called out here rather than silently left unmentioned.
- **Figma parity gap:** see §6's "Known divergence" note, the Figma Documentation frame has not yet been rebuilt to mirror the matrix-card Visual Preview shape described here.
