'use client';

import React, { useState } from 'react';
import { Switch, Box, Typography, Stack } from '@mui/material';
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

// ─── Simulated Indeterminate swatch ──────────────────────────────────────
// MUI's stock <Switch> has no `indeterminate` prop (unlike <Checkbox>), so
// there is no real DOM element to render here. This is a static visual
// mock, sized to match the real <Switch> next to it - now that the
// MuiSwitch theme override (src/theme/brandTheme.ts) makes the real track
// 58x32/44x22 with a 24/18px thumb and zero extra root padding, this swatch
// uses the exact same numbers (outer box === track box, no separate
// touch-target inset) so the two sit flush at the same size in a row.
// Track color is `grey[300]`, matching the Figma `components/switch/
// slideFillIndeterminate` token - deliberately lighter than the Off track
// (`grey[400]`, in the theme's `MuiSwitch` track override): Indeterminate
// is a "not yet decided" pre-interaction state, while Off is a real,
// determinate choice, and a switch can never revert to Indeterminate once
// interacted with - the lighter fill reinforces that it's the quieter,
// pre-decision state of the two. Thumb is `grey[50]` (#fafafa) - confirmed
// against the live Figma file that Indeterminate's knob is bound to the
// same `components/switch/knobFillEnabled` token as the Off state (not
// pure white), so this swatch matches that exactly.

function IndeterminateSwatch({ size = 'medium' }: { size?: 'small' | 'medium' }) {
  const dims =
    size === 'small'
      ? { box: 44, height: 22, thumb: 18 }
      : { box: 58, height: 32, thumb: 24 };

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
          width: dims.thumb,
          height: dims.thumb,
          borderRadius: '50%',
          bgcolor: grey[50],
          boxShadow:
            '0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)',
        }}
      />
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
// matching the Figma <Switch> component set rather than stock MUI.
<Switch color="primary" defaultChecked />
<Switch color="secondary" defaultChecked />
<Switch color="error" defaultChecked />
<Switch color="warning" defaultChecked />
<Switch color="info" defaultChecked />
<Switch color="success" defaultChecked />

// Disabled
<Switch disabled />
<Switch disabled defaultChecked />`;

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
    description: 'The color of the track/thumb when checked.',
  },
];

// ─── Specs & Accessibility Notes ─────────────────────────────────────────
// Same SpecRow pattern used by autocomplete/page.tsx and the other
// standardized doc pages - a bordered PreviewCanvas containing one
// teal-heading + body pair per row, folding usage guidance, anatomy/token
// mapping, and accessibility into a single bottom section instead of a
// standalone top-of-page "Overview & Usage" block.

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

  const colorRow: Array<{ label: string; color: any }> = [
    { label: 'Default', color: 'default' },
    { label: 'Primary', color: 'primary' },
    { label: 'Secondary', color: 'secondary' },
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

      {/* Visual Variants */}
      <DocSection title="Visual Variants">
        <PreviewCanvas>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <PreviewGroup label="Off">
              <Stack direction="row" spacing={3} flexWrap="wrap">
                {colorRow.map(({ label, color }) => (
                  <PreviewGroup key={label} label={label} sx={{ gap: 0.5 }}>
                    <Switch color={color} checked={false} />
                  </PreviewGroup>
                ))}
              </Stack>
            </PreviewGroup>
            <PreviewGroup label="On">
              <Stack direction="row" spacing={3} flexWrap="wrap">
                {colorRow.map(({ label, color }) => (
                  <PreviewGroup key={label} label={label} sx={{ gap: 0.5 }}>
                    <Switch color={color} checked />
                  </PreviewGroup>
                ))}
              </Stack>
            </PreviewGroup>
            <PreviewGroup label="Indeterminate (Default color only - simulated, see Key Props below)">
              <Stack direction="row" spacing={3} flexWrap="wrap" alignItems="center">
                <PreviewGroup label="Default">
                  <IndeterminateSwatch />
                </PreviewGroup>
              </Stack>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
        <Typography variant="body2" sx={{ mt: 2, color: '#9e9e9e', maxWidth: 780 }}>
          These now render the custom <code>MuiSwitch</code> theme override in{' '}
          <code>brandTheme.ts</code> - 58×32 track / 24×24 thumb (Medium), matching the Figma{' '}
          <code>&lt;Switch&gt;</code> component set 1:1, rather than stock MUI&apos;s thinner
          default. See Specs &amp; Accessibility Notes below for the full token mapping.
        </Typography>
      </DocSection>

      {/* Sizing */}
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
                <PreviewGroup label="Indeterminate">
                  <IndeterminateSwatch size="small" />
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
                <PreviewGroup label="Indeterminate">
                  <IndeterminateSwatch size="medium" />
                </PreviewGroup>
              </Stack>
            </PreviewGroup>
          </Stack>
        </PreviewCanvas>
      </DocSection>

      {/* Interactive States */}
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
            <PreviewGroup label="Hover / Focus - this is a real, live control: hover with a mouse or Tab to it to see both states directly, no static mock needed">
              <Switch defaultChecked />
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

      {/* Key Props */}
      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
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
              Indeterminate - proposed API, not implemented today
            </Typography>
            <CodeBlock code={indeterminateSnippet} />
          </Box>
        </Stack>
      </DocSection>

      {/* Specs & Accessibility Notes */}
      <DocSection title="Specs & Accessibility Notes">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Overview & Usage"
              body={
                <>
                  Use a Switcher for a single, binary setting that takes effect immediately, with no
                  separate &quot;submit&quot; step - notification toggles, dark mode, feature flags
                  a user controls directly. Reach for <code>Radio Group</code> when selecting one
                  option among several, or <code>Checkbox</code> when the choice will be confirmed
                  later via a form submit, multiple independent options can be selected at once, or
                  a true tri-state control is needed - <code>Checkbox</code> has a native{' '}
                  <code>indeterminate</code> prop today; <code>Switch</code> does not (see Key Props
                  above). Label placement (before/after the control, or no visible label with an{' '}
                  <code>aria-label</code>) is a usage pattern applied via{' '}
                  <code>FormControlLabel</code>, not a variant of the Switch itself.
                </>
              }
            />
            <SpecRow
              heading="Anatomy & Token Specs"
              body={
                <>
                  Track and Thumb now read from this app&apos;s <code>MuiSwitch</code> theme
                  override (<code>src/theme/brandTheme.ts</code>) instead of stock MUI defaults:
                  Medium is 58×32 track / 24×24 thumb / 4px inset, Small is 44×22 track / 18×18
                  thumb / 2px inset - matching the Figma <code>&lt;Switch&gt;</code> component set
                  1:1. The Off-state track resolves to grey/400 (<code>#bdbdbd</code>) via Figma&apos;s{' '}
                  <code>components/switch/slideFill</code> token, and Indeterminate resolves to the
                  lighter grey/300 (<code>#e0e0e0</code>) via its own dedicated{' '}
                  <code>components/switch/slideFillIndeterminate</code> token - Indeterminate is
                  deliberately the lighter of the two: it represents a pre-interaction, not-yet-decided
                  state, while Off is a real, determinate choice the user has already made, and a
                  switch can never revert to Indeterminate once toggled. Each per-color checked track
                  resolves to that color&apos;s <code>theme.palette[color].main</code>, solid. The thumb resolves to
                  grey/50 (<code>#fafafa</code>) for Off and Indeterminate, matching Figma&apos;s{' '}
                  <code>components/switch/knobFillEnabled</code> token exactly, then goes pure
                  white (<code>#ffffff</code>) for every checked named color - color=&quot;default&quot;
                  is the one exception, where the checked thumb and track both go near-black.
                  A live-file audit also caught two Figma-side binding bugs this now matches:
                  <code>Color=Secondary</code> had been wired to the <code>primary/main</code> token
                  instead of <code>secondary/main</code>, and <code>Color=Primary</code>&apos;s
                  checked track carried a stray 38% opacity that rendered it as a washed-out grey
                  instead of solid teal - both fixed at the source in Figma, not patched around in
                  code. Label &amp;
                  Subtext (when composed by a consumer) should use the standard Body/Medium type
                  token - this design system has no &quot;Satoshi&quot; typeface anywhere in{' '}
                  <code>brandTheme.ts</code>; body copy is Open Sans, headings are Montserrat.
                </>
              }
            />
            <SpecRow
              heading="Accessibility & Micro-Interactions"
              body={
                <>
                  Maintain a minimum 44×44px touch target around the visible track/thumb, even at
                  the Small size, by padding the hit area in layout (e.g. via{' '}
                  <code>FormControlLabel</code> spacing) rather than resizing the visual control -
                  the theme override intentionally keeps the component&apos;s own root sized to the
                  visual track, so this padding is a per-usage layout responsibility, not baked into
                  every <code>Switch</code> instance. <code>Tab</code> moves focus to the switch;{' '}
                  <code>Spacebar</code> or <code>Enter</code> toggles it. Apply{' '}
                  <code>role=&quot;switch&quot;</code> with{' '}
                  <code>aria-checked=&quot;true|false&quot;</code> reflecting the current state, and
                  either a visible <code>&lt;label&gt;</code> (via <code>FormControlLabel</code>) or
                  an <code>aria-label</code> when none is present. When Indeterminate, set{' '}
                  <code>aria-checked=&quot;mixed&quot;</code> instead of <code>&quot;true&quot;</code>
                  /<code>&quot;false&quot;</code> until the user makes an explicit choice. The thumb
                  slides between Off/On positions via the theme&apos;s transform transition; hover
                  applies MUI&apos;s built-in state-layer, and <code>:focus-visible</code> keeps its
                  default ring (no dedicated Focus/Border token wired in yet).
                </>
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>
    </Box>
  );
}
