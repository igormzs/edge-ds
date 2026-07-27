'use client';

import React, { useState } from 'react';
import { Switch, Box, Typography, Stack, FormGroup } from '@mui/material';
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
function IndeterminateSwatch({ size = 'medium' }: { size?: 'small' | 'medium' }) {
  const dims =
    size === 'small'
      ? { box: 44, height: 22, knob: 18, dashW: 9, dashH: 2 }
      : { box: 58, height: 32, knob: 24, dashW: 12, dashH: 2.5 };

  return (
    <Box
      role="img"
      aria-label="Indeterminate switch (simulated preview, not an interactive control)"
      sx={{
        position: 'relative',
        width: dims.box,
        height: dims.height,
        borderRadius: dims.height / 2,
        bgcolor: grey[300],
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

// ─── Usage code snippet ──────────────────────────────────────────────────

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

// ─── Key Props ────────────────────────────────────────────────────────

const propRows: PropRow[] = [
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

// ─── Section body row (heading + paragraph) ──────────────────────────────

function SpecRow({ heading, body }: { heading: string; body: React.ReactNode }) {
  return (
    <Box sx={{ mb: 2.5, '&:last-of-type': { mb: 0 } }}>
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: 0.6,
          textTransform: 'uppercase',
          color: '#009f9b',
          mb: 0.75,
        }}
      >
        {heading}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 14,
          lineHeight: 1.6,
          color: '#5e6e7d',
          maxWidth: 780,
        }}
      >
        {body}
      </Typography>
    </Box>
  );
}

export default function SwitcherPage() {
  const [activeChecked, setActiveChecked] = useState(true);

  // "Neutral" is EDGE-DS's design-language name for MUI's "secondary" -
  // same prop, renamed per docs/EDGE-DS-Component-Migration-Playbook.md's
  // status vocabulary (MUI "secondary" is a neutral grey-blue, not a second
  // brand hue). Matches the Figma Documentation frame's "Color Statuses
  // Row" group labels exactly (Primary / Neutral / Error / Warning / Info /
  // Success - Default is shown separately in Base States, not here).
  const statusColorRow: Array<{ label: string; color: any }> = [
    { label: 'Primary', color: 'primary' },
    { label: 'Neutral', color: 'secondary' },
    { label: 'Error', color: 'error' },
    { label: 'Warning', color: 'warning' },
    { label: 'Info', color: 'info' },
    { label: 'Success', color: 'success' },
  ];

  return (
    <Box>
      <PageHeader
        title="Switcher"
        description="A binary control that allows users to toggle an option on or off immediately."
        muiLink="https://mui.com/material-ui/react-switch/"
        categoryBadge="Form Controls / Inputs"
        statusBadge="In Design / In Progress"
      />

      {/* Visual Preview — mirrors the Figma "Switch - Documentation" frame's
          Visual Preview Section 1:1: Base States row, Color Statuses row
          (6 statuses), then Composed Examples (FormControlLabel/FormGroup).
          The exhaustive per-color × per-state matrix lives in the Figma
          "Switch - Component Gallery" frame instead, per
          docs/DOCUMENTATION_STANDARDS.md §0 - this section stays a
          representative preview, not a full variant dump. */}
      <DocSection title="Visual Preview">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <PreviewGroup label="Base States (Default color, Medium)">
              <Stack direction="row" spacing={3} flexWrap="wrap" alignItems="center">
                <PreviewGroup label="Off">
                  <Switch checked={false} />
                </PreviewGroup>
                <PreviewGroup label="On">
                  <Switch checked />
                </PreviewGroup>
                <PreviewGroup label="Indeterminate (simulated - see Key Props below)">
                  <IndeterminateSwatch />
                </PreviewGroup>
              </Stack>
            </PreviewGroup>

            <PreviewGroup label="Color Statuses (Medium, Checked)">
              <Stack direction="row" spacing={4} flexWrap="wrap">
                {statusColorRow.map(({ label, color }) => (
                  <PreviewGroup key={label} label={label} sx={{ gap: 0.5 }}>
                    <Stack direction="row" spacing={1.5}>
                      <Switch color={color} checked={false} />
                      <Switch color={color} checked />
                    </Stack>
                  </PreviewGroup>
                ))}
              </Stack>
            </PreviewGroup>

            <PreviewGroup label="Composed Examples">
              <Stack direction="row" spacing={6} flexWrap="wrap" alignItems="flex-start">
                <PreviewGroup label="<FormControlLabel>">
                  <FormControlLabel control={<Switch defaultChecked />} label="Notifications" />
                </PreviewGroup>
                <PreviewGroup label="<FormGroup>">
                  <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="Email" />
                    <FormControlLabel control={<Switch />} label="SMS" />
                    <FormControlLabel control={<Switch defaultChecked />} label="Push" />
                  </FormGroup>
                </PreviewGroup>
              </Stack>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Anatomy & Token Architecture */}
      <DocSection title="Anatomy & Token Architecture">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Anatomy"
              body={
                <>
                  <strong>Knob</strong>: the circular thumb that slides between Off and On
                  positions, centered within the Track at both sizes (Small 44×22 track / 18×18
                  knob, Medium 58×32 track / 24×24 knob). When <code>checked=&quot;indeterminate&quot;</code>,
                  the Knob shows a horizontal dash mark (grey <code>#616161</code>, width = half the
                  knob&apos;s diameter, fully rounded) instead of sliding, visually distinguishing it
                  from Off. <strong>Track</strong>: the pill-shaped background whose fill color
                  reflects the current checked/color state - and stays visually stable across
                  Hover and Focus; the Track itself never changes color on interaction.{' '}
                  <strong>Focus Halo</strong>: a circle centered behind the Knob (diameter = knob
                  size × 5/3 - 40px Medium, 30px Small), shown on both Hover and Focus - all
                  interactive feedback lives here, not on the Track.
                </>
              }
            />
            <SpecRow
              heading="Token Architecture"
              body={
                <>
                  <strong>Knob</strong>: <code>Components/Switch/Knob/Default</code> (idle fill,
                  grey/50), <code>Components/Switch/Knob/Disabled</code>.{' '}
                  <strong>Track</strong>: <code>Components/Switch/Track/Off</code> (neutral grey,
                  shared across all colors when unchecked), a dedicated{' '}
                  <code>Components/Switch/Track/Indeterminate</code>, and per-status{' '}
                  <code>Components/Switch/Track/{'{'}Status{'}'}/On</code> for Primary, Neutral,
                  Error, Warning, Info, and Success (Neutral reuses the same binding pattern MUI
                  calls &quot;secondary&quot;). Confirmed directly against the live component set: the
                  Track keeps this exact same binding across Enabled/Hovered/Focused - there is no
                  separate Hover/Focus Track token, matching the Anatomy note above.{' '}
                  <strong>Focus Halo</strong>: reuses the checked Track&apos;s own color token for
                  named colors (e.g. <code>Track/Primary/On</code> at 12% opacity Hover / 20%
                  Focus); the neutral/unchecked Halo is currently an <em>unbound literal</em> black
                  at 8% Hover / 12% Focus - a real gap worth a dedicated{' '}
                  <code>Components/Switch/Halo/Neutral</code> token per the Token Governance Rule
                  in <code>EDGE-DS Documentation Pattern.md</code>, not yet created since it wasn&apos;t
                  in scope for this pass.
                </>
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Usage Guidelines & Accessibility */}
      <DocSection title="Usage Guidelines & Accessibility">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Usage Guidelines"
              body={
                <>
                  Use Switch for a single binary setting that takes effect immediately, with no
                  separate &quot;submit&quot; step (e.g. notification toggles, dark mode). Use{' '}
                  <code>Radio Group</code> when choosing one option among several, or{' '}
                  <code>Checkbox</code> when the choice is confirmed later via a form submit, or a
                  true tri-state control is needed - <code>Checkbox</code> has a native{' '}
                  <code>indeterminate</code> prop today; <code>Switch</code> does not (see Key
                  Props above). Supports an Indeterminate state for settings requiring explicit
                  resolution before landing on On or Off. Label placement (before/after the
                  control, or no visible label with an <code>aria-label</code>) is a usage
                  pattern applied via <code>FormControlLabel</code>, not a variant of the Switch
                  itself. <strong>Accessibility</strong>: maintain a 44×44px minimum touch target
                  even at Small size by padding the hit area in layout, not resizing the visual
                  control. <strong>Keyboard</strong>: <code>Tab</code> focuses, <code>Space</code>
                  /<code>Enter</code> toggles. <strong>ARIA</strong>:{' '}
                  <code>role=&quot;switch&quot;</code> with <code>aria-checked</code> reflecting state
                  (<code>true</code>/<code>false</code>/<code>&quot;mixed&quot;</code> for Indeterminate)
                  and a visible label or <code>aria-label</code>.
                </>
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Sizing — Small vs Medium × Off/On, matching the Figma Sizing Matrix
          1:1 (2 columns, not 3 - Indeterminate is shown once in Base States
          above rather than duplicated in every size table). */}
      <DocSection title="Sizing">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <PreviewGroup label="Small">
              <Stack direction="row" spacing={4}>
                <PreviewGroup label="Off">
                  <Switch size="small" checked={false} />
                </PreviewGroup>
                <PreviewGroup label="On">
                  <Switch size="small" checked />
                </PreviewGroup>
              </Stack>
            </PreviewGroup>
            <PreviewGroup label="Medium">
              <Stack direction="row" spacing={4}>
                <PreviewGroup label="Off">
                  <Switch size="medium" checked={false} />
                </PreviewGroup>
                <PreviewGroup label="On">
                  <Switch size="medium" checked />
                </PreviewGroup>
              </Stack>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
        <Typography variant="body2" sx={{ mt: 2, color: '#9e9e9e', maxWidth: 780 }}>
          Indeterminate at both sizes is shown once in Visual Preview above rather than repeated
          here, matching the Figma Documentation frame&apos;s Sizing table exactly (Off/On only).
        </Typography>
      </DocSection>

      {/* Key Props */}
      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      {/* Interactive States — live demo. This section has no Figma
          equivalent (the Documentation frame is a static canvas), but it's
          the only place the real Focus Halo can actually be demonstrated:
          hover with a mouse or Tab to a control below to see it. */}
      <DocSection title="Interactive States">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <PreviewGroup label="Default (Off) / Active (On) - live and clickable">
              <Stack direction="row" spacing={4} alignItems="center">
                <PreviewGroup label="Default">
                  <Switch checked={activeChecked} onChange={(e) => setActiveChecked(e.target.checked)} />
                </PreviewGroup>
                <PreviewGroup label={activeChecked ? 'Active (On)' : 'Click to activate'}>
                  <Switch
                    color="primary"
                    checked={activeChecked}
                    onChange={(e) => setActiveChecked(e.target.checked)}
                  />
                </PreviewGroup>
              </Stack>
            </PreviewGroup>
            <PreviewGroup label="Hover / Focus - hover with a mouse or Tab to it to see the circular Focus Halo appear behind the knob (grey for Off, status color for On)">
              <Stack direction="row" spacing={4}>
                <Switch defaultChecked={false} />
                <Switch color="primary" defaultChecked />
              </Stack>
            </PreviewGroup>
            <PreviewGroup label="Disabled (Off / On)">
              <Stack direction="row" spacing={4}>
                <Switch disabled checked={false} />
                <Switch disabled checked />
              </Stack>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
        <Typography variant="body2" sx={{ mt: 2, color: '#9e9e9e', maxWidth: 780 }}>
          Note on the Disabled-color edge case: in Figma, a real <code>Disabled</code> variant only
          exists on the <code>Primary</code> color (no <code>Default</code>-color Disabled swatch
          in the component set - see <code>docs/components/Switcher.md</code>). On the web this is
          not a limitation: the theme override&apos;s <code>.Mui-disabled</code> styling applies
          uniformly regardless of <code>color</code>, so every color/disabled combination already
          renders correctly here even though Figma hasn&apos;t built every swatch.
        </Typography>
      </DocSection>

      {/* Label Placement (FormControlLabel) */}
      <DocSection title="Label Placement (FormControlLabel)">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <PreviewGroup label="End / Start / Top / Bottom - single label, unchanged">
              <Stack direction="row" spacing={4} flexWrap="wrap" alignItems="center">
                <FormControlLabel labelPlacement="end" label="Label" control={<Switch />} />
                <FormControlLabel labelPlacement="start" label="Label" control={<Switch />} />
                <FormControlLabel labelPlacement="top" label="Label" control={<Switch />} />
                <FormControlLabel labelPlacement="bottom" label="Label" control={<Switch />} />
              </Stack>
            </PreviewGroup>
            <PreviewGroup label="Dual - a label on each side, e.g. No / Yes">
              <Stack direction="row" spacing={4} alignItems="center">
                <PreviewGroup label="Enabled">
                  <FormControlLabel
                    labelPlacement="dual"
                    leftLabel="No"
                    rightLabel="Yes"
                    control={<Switch defaultChecked />}
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
        <Typography variant="body2" sx={{ mt: 2, color: '#9e9e9e', maxWidth: 780 }}>
          Matches the Figma <code>&lt;FormControlLabel&gt; | Switch</code> component set&apos;s{' '}
          <code>Label Placement = Dual</code> variant (node <code>642:114423</code>):{' '}
          <code>[Left Label] [Switch] [Right Label]</code>, centered, with an 8px gap on each side
          (<code>theme.spacing(1)</code>). Disabled dims both labels to{' '}
          <code>theme.palette.text.disabled</code>, matching Figma&apos;s disabled-grey binding on
          the same variant.
        </Typography>
      </DocSection>

      {/* FormGroup — mirrors the Figma <FormGroup> | <Switch> component set
          (node 642:108242): vertically stacked switches, sharing a common
          Enabled/Disabled state. */}
      <DocSection title="FormGroup">
        <PreviewCanvas>
          <Stack direction="row" spacing={6} flexWrap="wrap">
            <PreviewGroup label="Enabled">
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked />} label="Email notifications" />
                <FormControlLabel control={<Switch />} label="SMS notifications" />
                <FormControlLabel control={<Switch defaultChecked />} label="Push notifications" />
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

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>
              Basic usage
            </Typography>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>
              Sizes, colors, disabled
            </Typography>
            <CodeBlock code={variantsSnippet} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>
              Dual label placement (FormControlLabel)
            </Typography>
            <CodeBlock code={dualLabelSnippet} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>
              FormGroup
            </Typography>
            <CodeBlock code={formGroupSnippet} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>
              Indeterminate - proposed API, not implemented today
            </Typography>
            <CodeBlock code={indeterminateSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </Box>
  );
}
