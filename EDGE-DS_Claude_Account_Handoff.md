# EDGE-DS: Personal → Corporate Claude Account Migration Handoff

Prepared 2026-07-23, last updated 2026-07-23. Read this document first in the new corporate Cowork session, before touching any component work.

## 1. How to actually migrate this

Anthropic does not support exporting or importing Cowork projects between accounts, even with the same email. There is no "export project" button, and a personal-account data export cannot be re-imported anywhere. The conversation history genuinely cannot be carried over.

What *does* carry over cleanly, because it never lived in the account, it lives on your Mac:

- The project folder itself (`/Users/IgorMenezes/AI Projects/EDGE-DS`), including the full git history, uncommitted working-tree changes, `docs/`, `skills/`, and the `.env` file.
- Your Figma file, tokens, and components (these live in Figma, not in Claude, and are untouched by any of this).

So the migration is really two steps:
1. In the corporate account's Cowork session, select/mount the same `EDGE-DS` folder you already use. All files, git history, and prior commits are immediately there, nothing to copy.
2. Paste this document as your first message in that session (or just say "read the migration handoff doc in the project root"). It replaces the lost conversation history and auto-memory by giving the new session the equivalent context in one shot: process, standards, what's locked, what's mid-flight, and the gotchas already paid for.

This is the standard workaround people use for this exact problem (a "setup instruction document" fed to the fresh session) since there's no first-party alternative.

## 2. Project overview

EDGE Design System (EDGE-DS): the single source of truth for UX/UI across EDGE corporate products, primarily the main platform and the **EDGE Pay Tool**. Clean, minimalist SaaS aesthetic — soft container shadows, consistent rounded corners, high data density without crowding (built for financial/transactional screens).

**Stack:** Next.js (App Router) + React + TypeScript, Material UI (MUI) as the component base, Emotion for styling, Tailwind config present for token consumption, Supabase for auth/data. Figma (Variables, multi-mode) is the design source of truth; `src/theme/brandTheme.ts` is the single source of truth for the web theme.

**Hard rule, always enforce:** never use em dashes ("—") anywhere — text, docs, code comments, generated copy. Use commas, colons, or hyphens instead.

**Repo:** `https://github.com/igormzs/edge-ds.git`, branch `main`.

## 3. Documentation methodology (read before touching any component)

Two canonical references already in the repo, read these instead of re-deriving the pattern (as of 2026-07-28, these superseded the older `docs/DOCUMENTATION_STANDARDS.md` / `EDGE-DS-Component-Migration-Playbook.md` / `EDGE-DS Documentation Pattern.md` / `skills/*.md` files, now archived under `docs/archive/process/`):

- **`docs/web-component-page-pattern.md`** — the ratified web styleguide page pattern: header/badge conventions, subcomponent tab navigation, the matrix-card Visual Preview layout, typography/content-hierarchy rules, theme-level spacing overrides, and the exact section backbone order. Ratified against the refactored `<Switcher>` page.
- **`docs/figma-component-structure.md`** — the ratified Figma-side standard: the Two-Frame Canvas Architecture (Component Gallery + Documentation), master frame/section-wrapper anatomy, typography token table, page order, the token migration workflow (Live Inspection → Gap Analysis → Token Creation → Automated Rebinding → Visual Verification), and a Figma-automation gotcha list. Any new component doc must follow both of these exactly.
- **Figma master template** — a true Figma COMPONENT, `Component Doc - EDGE-DS` (node `751:165195`, page `📘 Component Documentation Template` / `348:63053`, file `EDGE Design System - New`, fileKey `fLQNXhHQhKBZzWnJGtUcwn`). Every new component doc page should **instantiate this**, not get rebuilt from scratch. It has 4 slotted section cards plus a Key Props table with a duplicable row slot, plus optional Header/Footer note slots per section.

General working pattern established across every component so far: audit Figma geometry/tokens → fix real bugs found (not silently, always flagged) → create/bind design tokens → build or correct the web styleguide page (`src/app/styleguide/...`) → build the Figma documentation canvas from the master template → run a 1:1 parity audit between the two → commit locally (pushes are held for you to do manually, or blocked by sandbox network restrictions in Claude's own bash sandbox — never a problem on your real machine).

## 4. Component status (what's locked vs. what's open)

| Component | Status | Notes |
|---|---|---|
| Button | Locked (2026-07-15, corrected 2026-07-16) | Tokens mapped, real State-variant axis used for Hover/Focus, doc page built from master template |
| Chip | Locked/complete (2026-07-09) | 45 tokens created + bound; 3 intentional gaps deferred (disabled-state colors, no focus ring, no outlined-hover fill) — see `Chip_Context_Progress_Report.md` |
| Breadcrumbs | Locked/complete | Website + tokens done; Figma canvas rebuilt from master template (2026-07-15) |
| Pagination | Locked/complete | Website + tokens done; Figma canvas from master template; Hover state is a flagged manual approximation (no real Hover variant exists on `PaginationItem`) |
| Button Group | Locked/complete | Corner-radius bug fixed, dead fill removed; 6 of 14 divider tokens are literal values, not aliases (flagged architecture gap, not a bug) |
| Accordion | Locked (2026-07-17) | Filters variant now built from real `<Accordion>` shell + real `<Chip>` instances, no bespoke components |
| Alert | Locked (2026-07-17) | All 4 master slots relabeled to Alert's own categories (Severities/Variants/States/Filled-All) |
| Alert token discrepancy | Resolved (2026-07-20) | Figma bg/text tokens were pinned to raw palette steps while Web computed them dynamically; fixed by writing Figma's literal computed values; also fixed a Warning text/icon color collision. Dark-mode parity for Alert was **not** covered — flag if asked |
| Autocomplete | Built (2026-07-20), long troubleshooting history | Sizing slot has reset to empty 4+ times on file reload (root cause: uncommitted slot content is live-runtime-only until a structural fix persists it — a durable fix requires detaching the whole top-level instance, which needs your manual approval/action in Figma). As of 2026-07-21 it reloaded correctly. If it happens again, the rebuild script is already known/recorded, don't re-diagnose from scratch |
| Backdrop | Built (2026-07-21) | Web page/doc/audit done; the Figma **master component itself is still a raw, un-adapted MUI import with zero variants** — real next step is building an actual Style/Visibility variant set in Figma, tracked as a pending item |
| Switcher | Built (2026-07-21/22) | Parity audit found and fixed 4 real Figma token/binding bugs (wrong Secondary color token, broken Primary opacity, knob color mismatch, Off-track token drift). 2026-07-22: Off vs Indeterminate lightness was intentionally flipped so Indeterminate reads lighter/undecided. Committed (`fcdfeec`) and pushed, no pending changes |

Not started yet, mentioned as candidates in various sessions: Menu (visible in Figma's Navigation & Structure group, not yet built), a native Figma variant set for Backdrop, Alert dark-mode parity, and continuing the "Navigation & Structure" page group.

## 5. Current git / working-tree state (as of 2026-07-23)

- `main` and `origin/main` are **fully in sync** (`fcdfeec`), nothing ahead or behind. The previously-held-back 5 commits (Chip/Pagination progress-report docs, Switcher doc page + Figma/web token fixes, Backdrop rebuild, Alert token-discrepancy write-up, docs-infra/master-template padding tweak) plus a 6th (`fcdfeec`, the Off/Indeterminate lightness-flip fix for Switcher) have all been committed and pushed.
- Working tree is clean, no uncommitted changes.
- `.claude/` and this handoff doc itself are untracked (local Claude settings + migration doc, harmless, fine to leave out of git or add them if you want the doc versioned too).
- Note for future sessions: two stale `.git/*.lock` files (`index.lock`, `HEAD.lock`) from a crashed session on 2026-07-21 blocked committing until cleared — if a fresh session ever hits "Unable to create '.git/index.lock'... Another git process seems to be running", check the lock's timestamp before assuming a real process is active; a multi-day-old lock is almost always stale and safe to remove.

Going forward: continue committing locally as normal and push from your own machine whenever you're ready, no need to batch.

## 6. Known environment gotchas worth not re-learning

- **Figma Plugin API / MCP bridge:** editing a live INSTANCE's plain-frame (non-slot) children fails ("Cannot move node..."); fix is `detachInstance()` first. Cloning an instance nested inside another live instance can corrupt node-ID resolution; fix is to detach immediately after cloning and hold object references rather than re-fetching by ID. `figma.createAutoLayout()` throws in this bridge; use the manual `createFrame` + set `layoutMode` recipe instead. Scripts are not atomic, a failure partway through can leave orphaned nodes; always re-screenshot and recheck `page.children` before calling a build done.
- **Local build sandbox:** `next build`/`next dev` cannot run directly against the FUSE-mounted project path in Claude's sandbox (Turbopack `EPERM` on `.next`). Workaround used previously: `rsync` the repo to a real local path (e.g. `/tmp/edge-ds-build`) and build there. Not an issue on your actual machine.
- **Master template:** never delete-and-replace the shared master component's children to add structure, it silently wipes every other component's instance overrides file-wide (happened once, recovered via Figma version history). Append-only edits are safe.

Full blow-by-blow detail for any of the above lives in this session's memory files if you want the complete history, but the summary above is what matters for continuing the work.

## 7. Figma access for the corporate account

Your new Figma personal access token (for setting up the Figma connector / MCP integration on the corporate account) was shared out-of-band and has since been rotated — it is intentionally not reproduced here.

Notes:
- The repo's own `.env` already has a `FIGMA_ACCESS_TOKEN` entry (used by the Next.js app, not by Claude's tools), and `.env`/`.env*.local` are already gitignored — any new token does not need to touch git either way.
- Treat this class of key as live and sensitive: never paste it into any committed file, Slack message, or shared doc.
- If you're using the `figma-console` Desktop Bridge plugin (the one used throughout this project for direct Plugin-API automation), that connects via the Figma desktop app's plugin session, not this token, no action needed there beyond opening the file with the plugin running.

## 8. Suggested first message in the new corporate session

> "This is the EDGE Design System (EDGE-DS) project, migrated from my personal Claude account. Read `EDGE-DS_Account_Migration_Handoff.md` in the project root for full context: stack, documentation standards, component status, and open items. [Then state whatever you want to work on next.]"
