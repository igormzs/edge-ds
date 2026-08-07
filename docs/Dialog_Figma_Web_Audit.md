# Dialog Component 1:1 Figma-to-Web Parity Audit

**Note on this file:** Dialog predates the `{Component}_Figma_Web_Audit.md` convention (introduced starting with Drawer). Its full build history — the composite `<DialogTitle>`/`<DialogContent>`/`<DialogActions>`/`Dialog Elements`/`<Dialog>` structure, the `Semantic/Surface/Paper`/`Semantic/Text/Primary`/`Semantic/Border/Divider` token migration, the Gallery/Documentation build, and two later parity-correction passes — lives in the `edge_ds_migration_status` memory record, not in a doc file. This file starts fresh, covering only the 2026-08-07 chrome rebind pass below.

**Figma source:** `EDGE Design System - New` (`fLQNXhHQhKBZzWnJGtUcwn`), page `Dialog✅📃🔗🆗` (`6586:47137`). `Dialog - Component Gallery` (`1336:927`), `Dialog - Documentation` (`1336:86993`).

## 2026-08-07 chrome token rebind: Gallery/Documentation raw-hex cleanup

**Root cause.** A 2026-08-03 audit found and fixed raw/literal chrome colors (card backgrounds, borders, captions, body text) baked into the `Component Doc - EDGE-DS` master template, mapping them to existing `Semantic/*` and `Documentation/*` tokens. That fix does not retroactively reach frames cloned from an already-drifted ancestor. Dialog's Gallery/Documentation frames were built 2026-08-04, before that fix existed, so the same gap recurred here — not a new defect, and unrelated to Dialog's own already-migrated master-component tokens (`Semantic/Surface/Paper`, `Semantic/Text/Primary`, `Semantic/Border/Divider`, all confirmed still clean on `<DialogTitle>` and `<DialogActions>`).

**What was found, before rebinding.** A parallel discovery pass across both top-level frames plus all 5 real masters found 70 flagged paints total:
- 33 are the known, intentional `_Library / Instance Slot` placeholder pattern (purple, `#9747FF` family) scattered across `<Dialog>`, `<DialogContent>`, and `Dialog Elements` — not a gap, left untouched.
- 9 are colors bound to the legacy MUI-palette collection (not raw/unbound), sitting in the already-known real-world-mockup background-simulation chrome (a `<Skeleton>` and a background `<Paper>`/header/body simulating the page behind the modal, inside the "open on interaction" and "open as screen" use cases) — pre-existing, out of scope for this documentation-chrome pass.
- The remaining 28 are genuinely raw/unbound literal fills and text colors in `Dialog - Documentation`'s own chrome.

**What was rebound.** 32 raw fills/strokes: white card backgrounds (Sizes/Content & Dividers/Actions cards) → `Semantic/Surface/Paper`, 8%-alpha-black card borders → `Documentation/Border/Subtle` (forced to fully opaque, the same accepted 2026-08-03 precedent), black body/bullet text (Anatomy, Usage Guidelines, Accessibility) → `Semantic/Text/Primary`. `<DialogTitle>` and `<DialogActions>` masters reconfirmed fully clean, zero findings, exactly as before.

**Content investigation, not a defect.** The discovery pass flagged that the Anatomy & Token Architecture section's `Component Placeholder Slot` appeared to contain stale Checkbox-topic prose. Checked live `.characters` directly (not the node's `.name`, which Figma never re-syncs after a text edit): the real content is fully correct, Dialog-specific prose (the real `<Paper>`/`DialogTitle`/`DialogContent`/`DialogActions`/scrim anatomy and the `Semantic/Surface/Paper`/`Semantic/Text/Primary`/`Semantic/Border/Divider` token architecture). No duplicate content exists; this was a stale-name false read, not a content bug.

**Explicitly not touched.** The 33 `_Library / Instance Slot` occurrences and the 9 MUI-bound real-world-mockup background paints, both per the discovery pass's own classification above.

**Verification.** 3 consecutive clean residual scans, 0 remaining matches for any of the raw chrome values.

## 2026-08-07 closing update: Paper's token migration inherited automatically, zero edits here

Paper's own pass (`docs/Paper_Figma_Web_Audit.md`) migrated the shared `<Paper>` `COMPONENT_SET` (`6584:46711`) that Dialog's real-world `<Paper>` instances compose internally. Confirmed directly, not assumed: all 8 of Dialog's `<Paper>` instances resolve to that exact master (`mainComponent.parent.id === '6584:46711'`, checked both immediately before and immediately after Paper's rebind and legacy-frame reparenting), and none of them carry any instance-level fill/stroke/effect override. Because they were never detached or overridden, they inherited Paper's full token migration automatically — `Semantic/Surface/Paper` (background), `Semantic/Border/Default` (outlined border, not applicable to Dialog's `Elevation=24`/`Elevation=1` instances but confirmed the mechanism holds), and the new `Semantic/Elevation/{1,24}` Effect Styles (shadow) — with zero edits made to this Dialog page itself. Same pattern as List's own migration automatically closing Drawer's nested-List-content gap (`docs/Drawer_Figma_Web_Audit.md` §8).
