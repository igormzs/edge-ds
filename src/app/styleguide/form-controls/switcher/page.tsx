'use client';

import React, { useState } from 'react';
import { Switch, Box, Typography, Stack, FormGroup, Tabs, Tab, Paper } from '@mui/material';
import { grey } from '@mui/material/colors';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';
import { FormControlLabel } from '@/components/FormControlLabel';

// ─── Simulated Indeterminate swatch ──────────────────────────────────────
// MUI's stock <Switch> has no `indeterminate` prop (unlike <Checkbox>), so
// there is no real DOM element to render here. Sized to match the real
// <Switch> (58x32/44x22 track, 24/18px thumb, brandTheme.ts MuiSwitch
// override) so the two sit flush at the same size in a row. Track is
// grey[300] (`components/switch/track/indeterminate` in Figma) - lighter
// than the Off track (grey[400]): Indeterminate is a "not yet decided"
// pre-interaction state, while Off is a real, determinate choice, and a
// switch can never revert to Indeterminate once interacted with. Knob is
// grey[50] with a horizontal dash mark (#616161) instead of sliding to a
// position - exact geometry read off the live Figma asset: dash width is
// always half the knob's diameter, centered, fully rounded.
function IndeterminateSwatch({
  size = 'medium',
  onActivate,
}: {
  size?: 'small' | 'medium';
  /** When provided, the swatch becomes a clickable/keyboard-operable control
   * (role="switch", aria-checked="mixed") instead of a static aria-hidden
   * illustration - used to kick off the Indeterminate → On → Off → ...
   * tri-state cycle in the "Base & Interactive States" card. */
  onActivate?: () => void;
}) {
  const dims =
    size === 'small'
      ? { box: 44, height: 22, knob: 18, dashW: 9, dashH: 2 }
      : { box: 58, height: 32, knob: 24, dashW: 12, dashH: 2.5 };

  const interactive = Boolean(onActivate);

  return (
    <Box
      role={interactive ? 'switch' : 'img'}
      aria-checked={interactive ? 'mixed' : undefined}
      aria-label={
        interactive
          ? 'Indeterminate switch - click or press Space/Enter to cycle to On'
          : 'Indeterminate switch (simulated preview, not an interactive control)'
      }
      tabIndex={interactive ? 0 : undefined}
      onClick={onActivate}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                onActivate!();
              }
            }
          : undefined
      }
      sx={{
        position: 'relative',
        width: dims.box,
        height: dims.height,
        borderRadius: dims.height / 2,
        bgcolor: grey[300],
        ...(interactive && {
          cursor: 'pointer',
          '&:focus-visible': {
            outline: '2px solid #009f9b',
            outlineOffset: 2,
          },
        }),
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: dims.knob,
          height: dims.knob,
          borderRadius: '50%',
          bgcolor: grey[50],
          boxShadow:
            '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: dims.dashW,
            height: dims.dashH,
            borderRadius: dims.dashH / 2,
            bgcolor: '#616161',
          }}
        />
      </Box>
    </Box>
  );
}

// ─── Text formatting helpers ──────────────────────────────────────────────
// Text-heavy sections (Anatomy & Token Architecture, Usage Guidelines,
// Accessibility) render as short paragraphs + bulleted lists instead of one
// dense flowing block, for scannability.

function Paragraph({ children, sx }: { children: React.ReactNode; sx?: any }) {
  return (
    <Typography
      sx={{
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 14,
        lineHeight: 1.6,
        color: '#5e6e7d',
        mb: 1.5,
        '&:last-child': { mb: 0 },
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

function BulletList({ items, sx }: { items: React.ReactNode[]; sx?: any }) {
  return (
    <Box
      component="ul"
      sx={{
        m: 0,
        mb: 1.5,
        pl: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75,
        '&:last-child': { mb: 0 },
        ...sx,
      }}
    >
      {items.map((item, i) => (
        <Typography
          key={i}
          component="li"
          sx={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: 14,
            lineHeight: 1.6,
            color: '#5e6e7d',
          }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );
}

// ─── Section body row (heading + formatted body) ──────────────────────────

function SpecRow({ heading, body }: { heading: string; body: React.ReactNode }) {
  return (
    <Box sx={{ mb: 3, '&:last-of-type': { mb: 0 } }}>
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: '#009f9b',
          mb: 1,
        }}
      >
        {heading}
      </Typography>
      <Box sx={{ maxWidth: 780 }}>{body}</Box>
    </Box>
  );
}

// ─── Snippet header ────────────────────────────────────────────────────────

function SnippetLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>
      {children}
    </Typography>
  );
}

// ─── Visual Preview matrix helpers ────────────────────────────────────────
// A well-padded card per subsection, with a left-aligned header - replaces
// the old single PreviewCanvas + centered PreviewGroup captions, which read
// as floating/centered rather than a scannable grid.

function MatrixCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid rgba(0,0,0,0.08)',
        bgcolor: '#ffffff',
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: '#009f9b',
          mb: 2.5,
          textAlign: 'left',
        }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

// Sub-group label (e.g. "Small", "Default", "Primary") - left-aligned,
// sits directly above its controls instead of centered underneath them.
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      sx={{
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 11,
        fontWeight: 600,
        color: '#5e6e7d',
        letterSpacing: 0.4,
        textTransform: 'uppercase',
        textAlign: 'left',
        mb: 1,
      }}
    >
      {children}
    </Typography>
  );
}

// A single control + its state caption (e.g. "Off"/"On"), left-aligned
// underneath the control rather than centered.
function Swatch({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
      {children}
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 11,
          color: '#9e9e9e',
          letterSpacing: 0.3,
          textAlign: 'left',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const [checked, setChecked] = useState(false);

<FormControlLabel
  control={
    <Switch
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  }
  label="Enable notifications"
/>`;

const variantsSnippet = `// Sizes
<Switch size="small" />
<Switch size="medium" />

// Colors - custom MuiSwitch theme override (src/theme/brandTheme.ts)
// resolves these to solid theme.palette[color].main tracks/thumbs,
// matching the Figma <Switch> component set 1:1. "secondary" is EDGE-DS's
// "Neutral" status - same prop, design-system-level rename only.
<Switch color="primary" defaultChecked />
<Switch color="secondary" defaultChecked /> {/* Neutral */}
<Switch color="error" defaultChecked />
<Switch color="warning" defaultChecked />
<Switch color="info" defaultChecked />
<Switch color="success" defaultChecked />

// Disabled
<Switch disabled />
<Switch disabled defaultChecked />`;

const dualLabelSnippet = `import { Switch } from '@mui/material';
import { FormControlLabel } from '@/components/FormControlLabel';

<FormControlLabel
  labelPlacement="dual"
  leftLabel="No"
  rightLabel="Yes"
  control={<Switch checked={checked} onChange={onChange} />}
/>

// Disabled dims both labels the same way single-label placements do:
<FormControlLabel
  labelPlacement="dual"
  leftLabel="No"
  rightLabel="Yes"
  disabled
  control={<Switch checked={checked} onChange={onChange} />}
/>`;

const formGroupSnippet = `import { Switch, FormGroup } from '@mui/material';
import { FormControlLabel } from '@/components/FormControlLabel';

// FormGroup applies an 8px vertical gap between items by default
// (src/theme/brandTheme.ts MuiFormGroup override) - no extra spacing
// props needed to keep stacked rows from touching.
<FormGroup>
  <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
  <FormControlLabel control={<Switch />} label="SMS notifications" />
  <FormControlLabel control={<Switch defaultChecked />} label="Push notifications" />
</FormGroup>`;

const indeterminateSnippet = `// Proposed API - not implemented today. MUI's stock <Switch> has
// no third "indeterminate" state (unlike <Checkbox indeterminate />).
// This is the shape an EDGE-DS <Switcher> wrapper would need to add:
<Switcher checked="indeterminate" onChange={handleChange} />

// Until that wrapper exists, an indeterminate-looking preview must be
// built manually (see IndeterminateSwatch in this page's source) or a
// third state should be modeled at the form/state layer instead
// (e.g. null = indeterminate, true/false = resolved).`;

// ─── Key Props ────────────────────────────────────────────────────────────

const switchPropRows: PropRow[] = [
  {
    prop: 'checked',
    type: "boolean | 'indeterminate'",
    default: "'indeterminate'",
    description:
      'Represents an uninitialized or mixed state where the switch position is centered, prior to explicit On/Off toggling. Note: this is the Figma-spec\'d shape for a future EDGE-DS wrapper - the stock MUI <Switch> used on this page today only accepts boolean.',
  },
  {
    prop: 'onChange',
    type: '(event, checked: boolean) => void',
    default: '—',
    description: 'Callback fired when the checked state changes.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'If true, the switch is disabled and cannot be toggled.',
  },
  {
    prop: 'size',
    type: "'small' | 'medium'",
    default: "'medium'",
    description: 'The size of the switch track and thumb.',
  },
  {
    prop: 'color',
    type: "'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'",
    default: "'default'",
    description:
      'The color of the track/thumb/Focus Halo when checked. "secondary" reads as "Neutral" in EDGE-DS naming.',
  },
];

const formControlLabelPropRows: PropRow[] = [
  {
    prop: 'control',
    type: 'React.ReactElement',
    default: '—',
    description: 'The control element to render (e.g. a <Switch>).',
  },
  {
    prop: 'label',
    type: 'React.ReactNode',
    default: '—',
    description:
      'Single label text. Used as-is for end/start/top/bottom placements; falls back to the right-side label in dual placement if leftLabel/rightLabel are omitted.',
  },
  {
    prop: 'labelPlacement',
    type: "'end' | 'start' | 'top' | 'bottom' | 'dual'",
    default: "'end'",
    description:
      'Where the label sits relative to the control. EDGE-DS adds "dual" (a label on both sides, e.g. No / Yes) on top of MUI\'s stock placements.',
  },
  {
    prop: 'leftLabel',
    type: 'React.ReactNode',
    default: '—',
    description: 'Text or element rendered to the left of the control. Only used in dual layout.',
  },
  {
    prop: 'rightLabel',
    type: 'React.ReactNode',
    default: '—',
    description: 'Text or element rendered to the right of the control. Only used in dual layout.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description:
      'Dims the label(s) to theme.palette.text.disabled and disables the control, unless the control already sets its own disabled prop.',
  },
];

const formGroupPropRows: PropRow[] = [
  {
    prop: 'children',
    type: 'React.ReactNode',
    default: '—',
    description: 'One or more <FormControlLabel> (or other control) rows to stack.',
  },
  {
    prop: 'row',
    type: 'boolean',
    default: 'false',
    description: 'Displays group items in a horizontal row instead of a vertical stack.',
  },
];

// ─── Color statuses row (shared by Switcher tab) ───────────────────────────
// "Neutral" is EDGE-DS's design-language name for MUI's "secondary" - same
// prop, renamed per docs/EDGE-DS-Component-Migration-Playbook.md's status
// vocabulary (MUI "secondary" is a neutral grey-blue, not a second brand
// hue). Matches the Figma Documentation frame's "Color Statuses Row" group
// labels exactly (Primary / Neutral / Error / Warning / Info / Success -
// Default is shown separately in Base States, not here).
const statusColorRow: Array<{ label: string; color: any }> = [
  { label: 'Primary', color: 'primary' },
  { label: 'Neutral', color: 'secondary' },
  { label: 'Error', color: 'error' },
  { label: 'Warning', color: 'warning' },
  { label: 'Info', color: 'info' },
  { label: 'Success', color: 'success' },
];

// ─── Tab 1: Switcher ────────────────────────────────────────────────────────

function SwitcherTab() {
  // Every switch below is a real, independently-toggleable control - the
  // labels ("Off"/"On", a color name, etc.) describe the *initial* state
  // shown on load, not a frozen illustration.
  const [state, setState] = useState<Record<string, boolean>>({
    sizeSmallOff: false,
    sizeSmallOn: true,
    sizeMediumOff: false,
    sizeMediumOn: true,
    baseOff: false,
    baseOn: true,
    composedNotifications: true,
    composedEmail: true,
    composedSms: false,
    composedPush: true,
    ...Object.fromEntries(statusColorRow.map(({ color }) => [`color-${color}-on`, true])),
  });
  const toggle = (key: string) => setState((s) => ({ ...s, [key]: !s[key] }));

  // Tri-state cycle for the Indeterminate swatch below: Indeterminate → On →
  // Off → Indeterminate → ... MUI's stock <Switch> has no real indeterminate
  // DOM state (see IndeterminateSwatch above), so this is modeled as its own
  // 3-value state rather than a boolean, and the click handler always
  // advances the cycle rather than reading the event's own checked value.
  const [triState, setTriState] = useState<'indeterminate' | 'on' | 'off'>('indeterminate');
  const cycleTriState = () =>
    setTriState((s) => (s === 'indeterminate' ? 'on' : s === 'on' ? 'off' : 'indeterminate'));

  return (
    <>
      {/* Visual Preview — four well-padded matrix cards (Sizes, Base &
          Interactive States, Color Statuses, Composed Examples), each with
          a left-aligned header and left-aligned per-item captions instead
          of the old centered floating labels. Interactive States is folded
          into "Base & Interactive States" here rather than living as its
          own section further down the page, since Disabled and the Focus
          Halo are both just states of the same real, already-interactive
          Switch controls shown above. Mirrors the Figma "Switch -
          Documentation" frame's Visual Preview content - the exhaustive
          per-color x per-state matrix still lives in the Figma "Switch -
          Component Gallery" frame per docs/figma-component-structure.md §0,
          so this stays a representative preview, not a full variant dump. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Sizes">
            <Stack direction="row" spacing={5} flexWrap="wrap" alignItems="flex-start">
              <Box>
                <GroupLabel>Small</GroupLabel>
                <Stack direction="row" spacing={2}>
                  <Swatch label="Off">
                    <Switch size="small" checked={state.sizeSmallOff} onChange={() => toggle('sizeSmallOff')} />
                  </Swatch>
                  <Swatch label="On">
                    <Switch size="small" checked={state.sizeSmallOn} onChange={() => toggle('sizeSmallOn')} />
                  </Swatch>
                </Stack>
              </Box>
              <Box>
                <GroupLabel>Medium</GroupLabel>
                <Stack direction="row" spacing={2}>
                  <Swatch label="Off">
                    <Switch checked={state.sizeMediumOff} onChange={() => toggle('sizeMediumOff')} />
                  </Swatch>
                  <Swatch label="On">
                    <Switch checked={state.sizeMediumOn} onChange={() => toggle('sizeMediumOn')} />
                  </Swatch>
                </Stack>
              </Box>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Base & Interactive States">
            <Stack direction="row" spacing={5} flexWrap="wrap" alignItems="flex-start">
              <Box>
                <GroupLabel>Default (Medium)</GroupLabel>
                <Stack direction="row" spacing={2}>
                  <Swatch label="Off">
                    <Switch checked={state.baseOff} onChange={() => toggle('baseOff')} />
                  </Swatch>
                  <Swatch label="On">
                    <Switch checked={state.baseOn} onChange={() => toggle('baseOn')} />
                  </Swatch>
                </Stack>
              </Box>
              <Box>
                <GroupLabel>Indeterminate</GroupLabel>
                <Swatch label="Click to cycle: Indeterminate → On → Off">
                  {triState === 'indeterminate' ? (
                    <IndeterminateSwatch onActivate={cycleTriState} />
                  ) : (
                    <Switch checked={triState === 'on'} onChange={cycleTriState} />
                  )}
                </Swatch>
              </Box>
              <Box>
                <GroupLabel>Disabled</GroupLabel>
                <Stack direction="row" spacing={2}>
                  <Swatch label="Off">
                    <Switch disabled checked={false} />
                  </Swatch>
                  <Swatch label="On">
                    <Switch disabled checked />
                  </Swatch>
                </Stack>
              </Box>
              <Box sx={{ maxWidth: 220 }}>
                <GroupLabel>Focus / Hover</GroupLabel>
                <Box
                  sx={{
                    display: 'inline-flex',
                    px: 1.5,
                    py: 1,
                    borderRadius: 1.5,
                    bgcolor: 'rgba(0,159,155,0.06)',
                    border: '1px solid rgba(0,159,155,0.25)',
                  }}
                >
                  <Typography sx={{ fontSize: 11.5, lineHeight: 1.5, color: '#5e6e7d' }}>
                    Hover or Tab to any switch above to see the circular Focus Halo behind the knob
                    (grey for Off, status color for On).
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Typography variant="body2" sx={{ mt: 2.5, color: '#9e9e9e', maxWidth: 780 }}>
              Note on the Disabled-color edge case: in Figma, a real <code>Disabled</code> variant
              only exists on the <code>Primary</code> color (no <code>Default</code>-color Disabled
              swatch in the component set — see <code>docs/components/Switcher.md</code>). On the web
              this is not a limitation: the theme override&apos;s <code>.Mui-disabled</code> styling
              applies uniformly regardless of <code>color</code>, so every color/disabled combination
              already renders correctly here even though Figma hasn&apos;t built every swatch.
            </Typography>
          </MatrixCard>

          <MatrixCard title="Color Status">
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, minmax(0, 1fr))',
                  sm: 'repeat(3, minmax(0, 1fr))',
                  md: 'repeat(6, minmax(0, 1fr))',
                },
                columnGap: 3,
                rowGap: 3,
              }}
            >
              {statusColorRow.map(({ label, color }) => (
                <Box key={label}>
                  <GroupLabel>{label}</GroupLabel>
                  {/* One live switch per color, defaulted to On - since it's
                      fully interactive, clicking it demonstrates the Off
                      state directly rather than showing a static Off/On
                      pair, keeping the grid compact. */}
                  <Switch
                    color={color}
                    checked={state[`color-${color}-on`]}
                    onChange={() => toggle(`color-${color}-on`)}
                    inputProps={{ 'aria-label': `${label} switch` }}
                  />
                </Box>
              ))}
            </Box>
          </MatrixCard>

          <MatrixCard title="Composed Examples">
            <Stack direction="row" spacing={6} flexWrap="wrap" alignItems="flex-start">
              <Box>
                <GroupLabel>&lt;FormControlLabel&gt;</GroupLabel>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.composedNotifications}
                      onChange={() => toggle('composedNotifications')}
                    />
                  }
                  label="Notifications"
                />
              </Box>
              <Box>
                <GroupLabel>&lt;FormGroup&gt;</GroupLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Switch checked={state.composedEmail} onChange={() => toggle('composedEmail')} />}
                    label="Email"
                  />
                  <FormControlLabel
                    control={<Switch checked={state.composedSms} onChange={() => toggle('composedSms')} />}
                    label="SMS"
                  />
                  <FormControlLabel
                    control={<Switch checked={state.composedPush} onChange={() => toggle('composedPush')} />}
                    label="Push"
                  />
                </FormGroup>
              </Box>
            </Stack>
          </MatrixCard>
        </Stack>
      </DocSection>

      {/* Anatomy & Token Architecture */}
      <DocSection title="Anatomy & Token Architecture">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Anatomy"
              body={
                <>
                  <Paragraph>
                    <strong>Knob</strong> — the circular thumb that slides between Off and On
                    positions, centered within the Track at both sizes.
                  </Paragraph>
                  <BulletList
                    items={[
                      'Small: 44×22 track, 18×18 knob.',
                      'Medium: 58×32 track, 24×24 knob.',
                      <>
                        <code>checked=&quot;indeterminate&quot;</code> shows a horizontal dash (grey{' '}
                        <code>#616161</code>, width = half the knob&apos;s diameter, fully rounded)
                        instead of sliding, visually distinguishing it from Off.
                      </>,
                    ]}
                  />
                  <Paragraph>
                    <strong>Track</strong> — the pill-shaped background whose fill color reflects
                    the current checked/color state, and stays visually stable across Hover and
                    Focus; the Track itself never changes color on interaction.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    <strong>Focus Halo</strong> — a circle centered behind the Knob (diameter = knob
                    size × 5/3 — 40px Medium, 30px Small), shown on both Hover and Focus. All
                    interactive feedback lives here, not on the Track.
                  </Paragraph>
                </>
              }
            />
            <SpecRow
              heading="Token Architecture"
              body={
                <BulletList
                  items={[
                    <>
                      <strong>Knob</strong>: <code>Components/Switch/Knob/Default</code> (idle fill,
                      grey/50), <code>Components/Switch/Knob/Disabled</code>.
                    </>,
                    <>
                      <strong>Track</strong>: <code>Components/Switch/Track/Off</code> (neutral grey,
                      shared across all colors when unchecked), a dedicated{' '}
                      <code>Components/Switch/Track/Indeterminate</code>, and per-status{' '}
                      <code>Components/Switch/Track/{'{'}Status{'}'}/On</code> for Primary, Neutral,
                      Error, Warning, Info, and Success (Neutral reuses the same binding pattern MUI
                      calls &quot;secondary&quot;).
                    </>,
                    'Confirmed directly against the live component set: the Track keeps this exact same binding across Enabled/Hovered/Focused - there is no separate Hover/Focus Track token, matching the Anatomy note above.',
                    <>
                      <strong>Focus Halo</strong>: reuses the checked Track&apos;s own color token for
                      named colors (e.g. <code>Track/Primary/On</code> at 12% opacity Hover / 20%
                      Focus); the neutral/unchecked Halo is currently an <em>unbound literal</em>{' '}
                      black at 8% Hover / 12% Focus — a real gap worth a dedicated{' '}
                      <code>Components/Switch/Halo/Neutral</code> token per the Token Governance Rule
                      in <code>EDGE-DS Documentation Pattern.md</code>, not yet created since it
                      wasn&apos;t in scope for this pass.
                    </>,
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Usage Guidelines & Accessibility — split into two SpecRows, each
          bulleted, instead of one dense flowing paragraph. */}
      <DocSection title="Usage Guidelines & Accessibility">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Usage Guidelines"
              body={
                <BulletList
                  items={[
                    'Use Switch for a single binary setting that takes effect immediately, with no separate "submit" step (e.g. notification toggles, dark mode).',
                    <>
                      Use <code>Radio Group</code> when choosing one option among several.
                    </>,
                    <>
                      Use <code>Checkbox</code> when the choice is confirmed later via a form submit,
                      or a true tri-state control is needed — <code>Checkbox</code> has a native{' '}
                      <code>indeterminate</code> prop today; <code>Switch</code> does not (see Key
                      Props below).
                    </>,
                    'Supports an Indeterminate state for settings requiring explicit resolution before landing on On or Off.',
                    <>
                      Label placement (before/after the control, or no visible label with an{' '}
                      <code>aria-label</code>) is a usage pattern applied via{' '}
                      <code>FormControlLabel</code>, not a variant of the Switch itself.
                    </>,
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
            <SpecRow
              heading="Accessibility"
              body={
                <BulletList
                  items={[
                    'Maintain a 44×44px minimum touch target even at Small size by padding the hit area in layout, not resizing the visual control.',
                    <>
                      <strong>Keyboard</strong>: <code>Tab</code> focuses, <code>Space</code>/
                      <code>Enter</code> toggles.
                    </>,
                    <>
                      <strong>ARIA</strong>: <code>role=&quot;switch&quot;</code> with{' '}
                      <code>aria-checked</code> reflecting state (<code>true</code>/<code>false</code>
                      /<code>&quot;mixed&quot;</code> for Indeterminate) and a visible label or{' '}
                      <code>aria-label</code>.
                    </>,
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Key Props */}
      <DocSection title="Key Props">
        <PropsTable rows={switchPropRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <SnippetLabel>Basic usage</SnippetLabel>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Sizes, colors, disabled</SnippetLabel>
            <CodeBlock code={variantsSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Indeterminate — proposed API, not implemented today</SnippetLabel>
            <CodeBlock code={indeterminateSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </>
  );
}

// ─── Tab 2: FormControlLabel ────────────────────────────────────────────────

function FormControlLabelTab() {
  const [state, setState] = useState({
    end: false,
    start: true,
    top: false,
    bottom: true,
    dualEnabled: true,
  });
  const toggle = (key: keyof typeof state) => setState((s) => ({ ...s, [key]: !s[key] }));

  return (
    <>
      {/* Visual Preview — left-aligned, fully interactive. Mirrors the
          Figma <FormControlLabel> | Switch component set's placement
          variants (node 642:114423). */}
      <DocSection title="Visual Preview">
        <PreviewCanvas sx={{ justifyContent: 'flex-start', p: 3 }}>
          <Stack spacing={2.5} sx={{ width: 'auto', maxWidth: '100%', alignItems: 'flex-start' }}>
            <PreviewGroup label="End / Start / Top / Bottom — single label placement">
              <Stack direction="row" spacing={4} flexWrap="wrap" alignItems="center">
                <FormControlLabel
                  labelPlacement="end"
                  label="Label"
                  control={<Switch checked={state.end} onChange={() => toggle('end')} />}
                />
                <FormControlLabel
                  labelPlacement="start"
                  label="Label"
                  control={<Switch checked={state.start} onChange={() => toggle('start')} />}
                />
                <FormControlLabel
                  labelPlacement="top"
                  label="Label"
                  control={<Switch checked={state.top} onChange={() => toggle('top')} />}
                />
                <FormControlLabel
                  labelPlacement="bottom"
                  label="Label"
                  control={<Switch checked={state.bottom} onChange={() => toggle('bottom')} />}
                />
              </Stack>
            </PreviewGroup>
            <PreviewGroup label="Dual — a label on each side, e.g. No / Yes">
              <Stack direction="row" spacing={4} alignItems="center">
                <PreviewGroup label="Enabled">
                  <FormControlLabel
                    labelPlacement="dual"
                    leftLabel="No"
                    rightLabel="Yes"
                    control={<Switch checked={state.dualEnabled} onChange={() => toggle('dualEnabled')} />}
                  />
                </PreviewGroup>
                <PreviewGroup label="Disabled">
                  <FormControlLabel
                    labelPlacement="dual"
                    leftLabel="No"
                    rightLabel="Yes"
                    disabled
                    control={<Switch defaultChecked />}
                  />
                </PreviewGroup>
              </Stack>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Usage Guidelines & Accessibility */}
      <DocSection title="Usage Guidelines & Accessibility">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Usage Guidelines"
              body={
                <BulletList
                  items={[
                    <>
                      <code>FormControlLabel</code> pairs a control (e.g. a <code>Switch</code>) with a
                      text label as a single clickable unit — clicking the label toggles the control
                      too.
                    </>,
                    <>
                      Use <code>end</code>/<code>start</code>/<code>top</code>/<code>bottom</code> for
                      a single label on one side of the control.
                    </>,
                    <>
                      Use EDGE-DS&apos;s <code>dual</code> placement (via <code>leftLabel</code>/
                      <code>rightLabel</code>) when a setting reads better as two opposing states side
                      by side (e.g. &quot;No&quot; — Switch — &quot;Yes&quot;) rather than one
                      after-the-fact label.
                    </>,
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
            <SpecRow
              heading="Accessibility"
              body={
                <BulletList
                  items={[
                    'The label is rendered as a native <label> element wrapping the control, so clicking anywhere in the label toggles the control without extra ARIA wiring.',
                    'Disabled dims both the label and the control to the same disabled-text color, so the pairing still reads as one unit in that state.',
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Key Props */}
      <DocSection title="Key Props">
        <PropsTable rows={formControlLabelPropRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <SnippetLabel>Basic usage</SnippetLabel>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Dual label placement</SnippetLabel>
            <CodeBlock code={dualLabelSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </>
  );
}

// ─── Tab 3: FormGroup ───────────────────────────────────────────────────────

function FormGroupTab() {
  const [state, setState] = useState({ email: true, sms: false, push: true });
  const toggle = (key: keyof typeof state) => setState((s) => ({ ...s, [key]: !s[key] }));

  return (
    <>
      {/* Visual Preview — left-aligned, fully interactive. Mirrors the
          Figma <FormGroup> | <Switch> component set (node 642:108242):
          vertically stacked switches sharing a common Enabled/Disabled
          state, with an 8px vertical gap between items (theme default -
          see MuiFormGroup override in src/theme/brandTheme.ts) so rows
          never touch or overlap. */}
      <DocSection title="Visual Preview">
        <PreviewCanvas sx={{ justifyContent: 'flex-start', p: 3 }}>
          <Stack direction="row" spacing={6} flexWrap="wrap" sx={{ alignItems: 'flex-start' }}>
            <PreviewGroup label="Enabled">
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={state.email} onChange={() => toggle('email')} />}
                  label="Email notifications"
                />
                <FormControlLabel
                  control={<Switch checked={state.sms} onChange={() => toggle('sms')} />}
                  label="SMS notifications"
                />
                <FormControlLabel
                  control={<Switch checked={state.push} onChange={() => toggle('push')} />}
                  label="Push notifications"
                />
              </FormGroup>
            </PreviewGroup>
            <PreviewGroup label="Disabled">
              <FormGroup>
                <FormControlLabel disabled control={<Switch defaultChecked />} label="Email notifications" />
                <FormControlLabel disabled control={<Switch />} label="SMS notifications" />
                <FormControlLabel disabled control={<Switch defaultChecked />} label="Push notifications" />
              </FormGroup>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Usage Guidelines & Accessibility */}
      <DocSection title="Usage Guidelines & Accessibility">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Usage Guidelines"
              body={
                <BulletList
                  items={[
                    <>
                      <code>FormGroup</code> stacks a set of related controls (e.g. several
                      notification-type switches) under one visual group.
                    </>,
                    'Items get an 8px vertical gap by default — never rely on the group to render items flush against each other.',
                    'A shared Disabled state dims every item in the group uniformly.',
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
            <SpecRow
              heading="Accessibility"
              body={
                <BulletList
                  items={[
                    'FormGroup itself is a layout wrapper, not a form-semantics role — pair it with a <FormLabel>/<FormControl> (or an aria-label on a containing element) when the group needs an accessible name.',
                    'Each item still exposes its own accessible name via FormControlLabel, so screen readers announce the group as a sequence of independently labeled switches.',
                  ]}
                  sx={{ mb: 0 }}
                />
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Key Props */}
      <DocSection title="Key Props">
        <PropsTable rows={formGroupPropRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Box>
          <SnippetLabel>FormGroup</SnippetLabel>
          <CodeBlock code={formGroupSnippet} />
        </Box>
      </DocSection>
    </>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

const TAB_LABELS = ['Switcher', 'FormControlLabel', 'FormGroup'] as const;

export default function SwitcherPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <PageHeader
        title="Switcher"
        description="A binary control that allows users to toggle an option on or off immediately."
        muiLink="https://mui.com/material-ui/react-switch/"
        categoryBadge="Components"
        statusBadge="In Design / In Progress"
      />

      {/* Subcomponent tab navigation — standard pattern for any component
          page with subcomponents (Switcher owns FormControlLabel and
          FormGroup). Each tab is a dedicated view under this master page. */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          aria-label="Switcher and subcomponents"
        >
          {TAB_LABELS.map((label, i) => (
            <Tab key={label} label={label} id={`switcher-tab-${i}`} aria-controls={`switcher-tabpanel-${i}`} />
          ))}
        </Tabs>
      </Box>

      <Box role="tabpanel" hidden={tab !== 0} id="switcher-tabpanel-0" aria-labelledby="switcher-tab-0">
        {tab === 0 && <SwitcherTab />}
      </Box>
      <Box role="tabpanel" hidden={tab !== 1} id="switcher-tabpanel-1" aria-labelledby="switcher-tab-1">
        {tab === 1 && <FormControlLabelTab />}
      </Box>
      <Box role="tabpanel" hidden={tab !== 2} id="switcher-tabpanel-2" aria-labelledby="switcher-tab-2">
        {tab === 2 && <FormGroupTab />}
      </Box>
    </Box>
  );
}
