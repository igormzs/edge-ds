'use client';

import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Typography,
  Stack,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

// ─── Text formatting helpers ──────────────────────────────────────────────
// Anatomy & Token Architecture and Usage Guidelines & Accessibility render as
// short paragraphs + bulleted lists, matching the same restructure already
// applied to Switcher's, Alert's, and Badge's pages
// (docs/web-component-page-pattern.md §4).

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
          sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, lineHeight: 1.6, color: '#5e6e7d' }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );
}

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

function SnippetLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography sx={{ fontWeight: 600, fontSize: 13, color: '#5e6e7d', mb: 1 }}>{children}</Typography>
  );
}

// ─── Visual Preview matrix helpers ────────────────────────────────────────
// A well-padded card per subsection, with a left-aligned header - replaces
// the old single PreviewCanvas + centered PreviewGroup captions.

function MatrixCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Paper
      elevation={0}
      sx={{ p: 3, borderRadius: 2, border: '1px solid rgba(0,0,0,0.08)', bgcolor: '#ffffff' }}
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

function Swatch({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }}>
      {children}
      <Typography
        sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e', letterSpacing: 0.3, textAlign: 'left' }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Checkbox from '@mui/material/Checkbox';

const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`;

const sizesColorsSnippet = `// Sizes - MuiCheckbox theme override (src/theme/brandTheme.ts):
// 38px (small), 46px (medium, default). There is no "large" size in code.
<Checkbox size="small" defaultChecked />
<Checkbox size="medium" defaultChecked />

// Colors - "secondary" is EDGE-DS's "Neutral" status, same prop, renamed
// only (docs/figma-component-structure.md §5.3).
<Checkbox color="default" defaultChecked />
<Checkbox color="primary" defaultChecked />
<Checkbox color="secondary" defaultChecked /> {/* Neutral */}
<Checkbox color="error" defaultChecked />
<Checkbox color="warning" defaultChecked />
<Checkbox color="info" defaultChecked />
<Checkbox color="success" defaultChecked />

// Disabled
<Checkbox disabled />
<Checkbox disabled defaultChecked />`;

const indeterminateSnippet = `// indeterminate is a real, native prop (unlike Switch, which has no true
// third DOM state) - it overlays a dash glyph without itself changing
// checked. A parent-of-a-group checkbox typically derives it from its
// children's own checked state rather than cycling like this demo does.
const [checked, setChecked] = useState(false);
const [indeterminate, setIndeterminate] = useState(true);

<Checkbox
  checked={checked}
  indeterminate={indeterminate}
  onChange={(e) => {
    setChecked(e.target.checked);
    setIndeterminate(false);
  }}
/>`;

const customIconSnippet = `import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

// icon/checkedIcon fully replace the default outline/checkmark glyphs.
// Real, working MUI API - the Figma master component set has no matching
// instance-swap property for this yet (flagged in Token Architecture below).
<Checkbox
  icon={<FavoriteBorder />}
  checkedIcon={<Favorite />}
  color="error"
/>`;

const composedSnippet = `import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

<FormControlLabel
  control={<Checkbox checked={checked} onChange={onChange} />}
  label="I agree to the Terms & Conditions"
/>

<FormGroup>
  <FormControlLabel control={<Checkbox defaultChecked />} label="Email" />
  <FormControlLabel control={<Checkbox />} label="SMS" />
  <FormControlLabel control={<Checkbox defaultChecked />} label="Push" />
</FormGroup>`;

const formControlLabelSnippet = `import { Checkbox, FormControlLabel } from '@mui/material';

// end | start | top | bottom - the real, confirmed Figma
// <FormControlLabel> | Checkbox variant axis. Unlike Switcher, Checkbox's
// variant set has no "dual" placement today.
<FormControlLabel labelPlacement="end" label="Label" control={<Checkbox />} />
<FormControlLabel labelPlacement="start" label="Label" control={<Checkbox />} />
<FormControlLabel labelPlacement="top" label="Label" control={<Checkbox />} />
<FormControlLabel labelPlacement="bottom" label="Label" control={<Checkbox />} />

// Disabled dims both the label and the control together.
<FormControlLabel disabled label="Label" control={<Checkbox />} />`;

const formGroupSnippet = `import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// FormGroup applies an 8px vertical gap between items by default
// (src/theme/brandTheme.ts MuiFormGroup override).
<FormGroup>
  <FormControlLabel control={<Checkbox defaultChecked />} label="Email notifications" />
  <FormControlLabel control={<Checkbox />} label="SMS notifications" />
  <FormControlLabel control={<Checkbox defaultChecked />} label="Push notifications" />
</FormGroup>

// A required, unchecked item in the group can flip its own Checkbox to
// color="error" and pair with a helper text below - there is no dedicated
// FormGroup-level "error" prop, the error state lives on the item itself
// (matches the Figma <FormGroup> | <Checkbox> "Error" variant, which is
// built the same way - a per-item override, not a group-level one).
<FormGroup>
  <FormControlLabel
    control={<Checkbox checked={agreed} onChange={onChange} color={agreed ? 'primary' : 'error'} />}
    label="I agree to the Terms & Conditions"
  />
  {!agreed && <FormHelperText error>This field is required.</FormHelperText>}
</FormGroup>`;

// ─── Key Props ────────────────────────────────────────────────────────────

const checkboxPropRows: PropRow[] = [
  {
    prop: 'checked',
    type: 'boolean',
    default: 'undefined',
    description: 'If true, the component is checked. Leave undefined for an uncontrolled checkbox.',
  },
  {
    prop: 'indeterminate',
    type: 'boolean',
    default: 'false',
    description: 'Renders the indeterminate (dash) icon regardless of the checked prop.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the component and suppresses all interaction states.',
  },
  {
    prop: 'color',
    type: '"default" | "primary" | "secondary" | "error" | "warning" | "info" | "success"',
    default: '"primary"',
    description: 'The color applied to the icon when checked or indeterminate. "secondary" reads as "Neutral" in EDGE-DS naming.',
  },
  {
    prop: 'size',
    type: '"small" | "medium"',
    default: '"medium"',
    description: 'The size of the checkbox. There is no "large" size today.',
  },
  {
    prop: 'onChange',
    type: '(event, checked: boolean) => void',
    default: '—',
    description: 'Callback fired when the checked state changes.',
  },
  {
    prop: 'name',
    type: 'string',
    default: 'undefined',
    description: 'Name attribute of the underlying input element.',
  },
  {
    prop: 'value',
    type: 'any',
    default: 'undefined',
    description: 'The value of the component, used when submitted as part of a form.',
  },
  {
    prop: 'required',
    type: 'boolean',
    default: 'false',
    description: 'If true, the input element is required.',
  },
];

const formControlLabelPropRows: PropRow[] = [
  {
    prop: 'control',
    type: 'React.ReactElement',
    default: '—',
    description: 'The control element to render (e.g. a <Checkbox>).',
  },
  {
    prop: 'label',
    type: 'React.ReactNode',
    default: '—',
    description: 'The label text or element rendered alongside the control.',
  },
  {
    prop: 'labelPlacement',
    type: '"end" | "start" | "top" | "bottom"',
    default: '"end"',
    description: 'Where the label sits relative to the control. Checkbox has no "dual" placement (unlike Switcher).',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Dims the label and disables the control, unless the control already sets its own disabled prop.',
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

// ─── Tab 1: Checkbox ────────────────────────────────────────────────────────

function CheckboxTab() {
  // Every checkbox below is a real, independently-toggleable control - the
  // labels describe the *initial* state shown on load, not a frozen
  // illustration.
  const [state, setState] = useState<Record<string, boolean>>({
    baseUnchecked: false,
    baseChecked: true,
    sizeSmall: true,
    sizeMedium: true,
    customIcon: true,
    composedTerms: false,
    composedEmail: true,
    composedSms: false,
    composedPush: true,
  });
  const toggle = (key: string) => setState((s) => ({ ...s, [key]: !s[key] }));

  // indeterminate is a real, native MUI prop (unlike Switch, which has no
  // true third DOM state - see Switcher's IndeterminateSwatch stand-in).
  // Modeled as a 3-value cycle purely for this always-clickable demo; real
  // usage typically derives indeterminate from a group of child checkboxes
  // rather than cycling on its own click.
  const [triState, setTriState] = useState<'indeterminate' | 'checked' | 'unchecked'>('indeterminate');
  const cycleTriState = () =>
    setTriState((s) => (s === 'indeterminate' ? 'checked' : s === 'checked' ? 'unchecked' : 'indeterminate'));

  return (
    <>
      {/* Visual Preview - four well-padded matrix cards (Sizes, Base &
          Interactive States, Custom Icon, Composed Examples), each with a
          left-aligned header and left-aligned captions. No dedicated
          semantic-colors card - not required for Checkbox documentation.
          Sizing
          and Interactive States are folded in here rather than living as
          separate page sections, per docs/web-component-page-pattern.md §3.2
          and §6. The exhaustive per-color x per-state matrix still lives in
          the Figma "Checkbox - Component Gallery" frame per
          docs/figma-component-structure.md §0, so this stays a
          representative preview, not a full variant dump. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Sizes">
            <Stack direction="row" spacing={5} flexWrap="wrap" alignItems="flex-start">
              <Box>
                <GroupLabel>Small</GroupLabel>
                <Swatch label="Checked">
                  <Checkbox size="small" checked={state.sizeSmall} onChange={() => toggle('sizeSmall')} />
                </Swatch>
              </Box>
              <Box>
                <GroupLabel>Medium (default)</GroupLabel>
                <Swatch label="Checked">
                  <Checkbox checked={state.sizeMedium} onChange={() => toggle('sizeMedium')} />
                </Swatch>
              </Box>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Base & Interactive States">
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={5} flexWrap="wrap" alignItems="flex-start">
                <Box>
                  <GroupLabel>Default</GroupLabel>
                  <Stack direction="row" spacing={2}>
                    <Swatch label="Unchecked">
                      <Checkbox checked={state.baseUnchecked} onChange={() => toggle('baseUnchecked')} />
                    </Swatch>
                    <Swatch label="Checked">
                      <Checkbox checked={state.baseChecked} onChange={() => toggle('baseChecked')} />
                    </Swatch>
                  </Stack>
                </Box>
                <Box>
                  <GroupLabel>Indeterminate</GroupLabel>
                  <Swatch label="Click to cycle: Indeterminate → Checked → Unchecked">
                    <Checkbox
                      checked={triState === 'checked'}
                      indeterminate={triState === 'indeterminate'}
                      onChange={cycleTriState}
                    />
                  </Swatch>
                </Box>
                <Box>
                  <GroupLabel>Disabled</GroupLabel>
                  <Stack direction="row" spacing={2}>
                    <Swatch label="Unchecked">
                      <Checkbox disabled checked={false} />
                    </Swatch>
                    <Swatch label="Checked">
                      <Checkbox disabled checked />
                    </Swatch>
                  </Stack>
                </Box>
              </Stack>
              <Box>
                <GroupLabel>Focus / Hover</GroupLabel>
                <Box
                  sx={{
                    width: '100%',
                    px: 1.5,
                    py: 1,
                    borderRadius: 1.5,
                    bgcolor: 'rgba(0,159,155,0.06)',
                    border: '1px solid rgba(0,159,155,0.25)',
                  }}
                >
                  <Typography sx={{ fontSize: 11.5, lineHeight: 1.5, color: '#5e6e7d' }}>
                    Hover or Tab to any checkbox above to see the square ripple/focus halo behind the
                    icon (a light tint on Hover, a stronger tint on Focus, colored to match the
                    checkbox&apos;s own Color).
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Custom Icon">
            <Box>
              <GroupLabel>Heart icon (icon / checkedIcon)</GroupLabel>
              <Swatch label="Click to toggle">
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  color="error"
                  checked={state.customIcon}
                  onChange={() => toggle('customIcon')}
                />
              </Swatch>
            </Box>
            <Typography sx={{ mt: 2, fontSize: 12.5, lineHeight: 1.6, color: '#9e9e9e', maxWidth: 780 }}>
              Fully supported today via MUI&apos;s <code>icon</code>/<code>checkedIcon</code> props. The
              Figma master component set has no matching instance-swap property for this yet, so this
              example exists only on the web page, not as a real Figma variant (flagged in Token
              Architecture below, not fabricated in Figma).
            </Typography>
          </MatrixCard>

          <MatrixCard title="Composed Examples">
            <Stack direction="row" spacing={6} flexWrap="wrap" alignItems="flex-start">
              <Box>
                <GroupLabel>Checkbox+Label</GroupLabel>
                <FormControlLabel
                  control={<Checkbox checked={state.composedTerms} onChange={() => toggle('composedTerms')} />}
                  label="I agree to the Terms & Conditions"
                />
              </Box>
              <Box>
                <GroupLabel>CheckboxGroup</GroupLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={state.composedEmail} onChange={() => toggle('composedEmail')} />}
                    label="Email"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.composedSms} onChange={() => toggle('composedSms')} />}
                    label="SMS"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.composedPush} onChange={() => toggle('composedPush')} />}
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
                    <strong>Icon</strong> — a single vector glyph swapped between three visual states:
                    an unchecked outline, a checked square with a checkmark, and an indeterminate
                    square with a dash.
                  </Paragraph>
                  <Paragraph>
                    <strong>Ripple / Focus Halo</strong> — a square frame sits behind the icon, fully
                    transparent at rest, appearing only on Hover (a light tint) and Focus (a stronger
                    tint), each colored to match the checkbox&apos;s own Color.
                  </Paragraph>
                  <Paragraph>
                    <strong>Label</strong> — Checkbox itself renders no visible text; the label is
                    supplied by the paired <code>FormControlLabel</code> component, not part of
                    Checkbox&apos;s own anatomy.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    <strong>Sizing</strong> — the icon substrate follows the <code>size</code> prop:
                    38px (Small, 20px glyph) and 46px (Medium, default, 28px glyph). There is no
                    &quot;large&quot; size in code today.
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
                      <strong>Icon</strong>: <code>Components/Checkbox/{'{'}Default, Primary, Neutral,
                      Error, Warning, Info, Success{'}'}</code>, one per Color, aliasing{' '}
                      <code>Semantic/Status/{'{Status}'}/Icon</code> (<code>Brand/Primary/500</code> for
                      Primary).
                    </>,
                    <>
                      <strong>Custom glyphs</strong>: MUI&apos;s Checkbox API also exposes{' '}
                      <code>icon</code>, <code>checkedIcon</code>, and <code>indeterminateIcon</code>{' '}
                      props for fully custom glyphs (see Custom Icon above) — no instance-swap property
                      exists yet on the real Figma master for this, a Figma-side gap, not a limitation
                      of the code.
                    </>,
                    <>
                      <strong>Ripple / Focus Halo</strong>:{' '}
                      <code>Components/Checkbox/Ripple/{'{Status}'}/Hover</code> and{' '}
                      <code>/Focus</code>, 14 tokens total, one translucent tint per status per
                      interaction state.
                    </>,
                    <>
                      <strong>Disabled</strong>: a single shared{' '}
                      <code>Components/Checkbox/Disabled</code> token across every Color — matching the
                      same color-agnostic Disabled pattern already confirmed on Switch and Button.
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
          bulleted, mirroring the Figma Documentation frame 1:1. */}
      <DocSection title="Usage Guidelines & Accessibility">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Usage Guidelines"
              body={
                <BulletList
                  items={[
                    <>
                      Use Checkbox for a binary choice within a form, or for multi-select from a list;
                      use <code>Switch</code> instead for an immediate, standalone toggle with no form
                      submission step.
                    </>,
                    <>
                      Set <code>indeterminate</code> to <code>true</code> when a parent checkbox
                      represents a partially-selected group of children — it is a purely visual
                      override and does not itself change the <code>checked</code> value.
                    </>,
                    <>
                      Pair every checkbox with a visible label via <code>FormControlLabel</code>, and
                      group related checkboxes in a <code>FormGroup</code> so screen readers announce
                      them as one logical set.
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
                    <>
                      Renders a native <code>&lt;input type=&quot;checkbox&quot;&gt;</code> under the
                      hood, so keyboard and screen-reader semantics (<code>Space</code> to toggle,{' '}
                      <code>aria-checked</code> reflecting the indeterminate state) come from the
                      browser, not custom ARIA.
                    </>,
                    <>
                      Always provide an accessible name via <code>FormControlLabel</code> or an explicit{' '}
                      <code>aria-label</code> — an unlabeled checkbox is flagged by every major
                      accessibility auditor.
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
        <PropsTable rows={checkboxPropRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <SnippetLabel>Basic usage</SnippetLabel>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Sizes and colors</SnippetLabel>
            <CodeBlock code={sizesColorsSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Indeterminate</SnippetLabel>
            <CodeBlock code={indeterminateSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Custom icon</SnippetLabel>
            <CodeBlock code={customIconSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Composed with Checkbox+Label / CheckboxGroup</SnippetLabel>
            <CodeBlock code={composedSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </>
  );
}

// ─── Tab 2: FormControlLabel ────────────────────────────────────────────────

function FormControlLabelTab() {
  const [state, setState] = useState({ end: false, start: true, top: false, bottom: true });
  const toggle = (key: keyof typeof state) => setState((s) => ({ ...s, [key]: !s[key] }));

  return (
    <>
      {/* Visual Preview — left-aligned, fully interactive. Mirrors the
          Figma <FormControlLabel> | Checkbox component set's real variant
          axis: End / Start / Top / Bottom x Disabled. No "dual" placement
          here — that is Switcher-specific, Checkbox's real Figma set has
          no such variant. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Label Placement">
            <Stack direction="row" spacing={4} flexWrap="wrap" alignItems="center">
              <Box>
                <GroupLabel>End (default)</GroupLabel>
                <FormControlLabel
                  labelPlacement="end"
                  label="Label"
                  control={<Checkbox checked={state.end} onChange={() => toggle('end')} />}
                />
              </Box>
              <Box>
                <GroupLabel>Start</GroupLabel>
                <FormControlLabel
                  labelPlacement="start"
                  label="Label"
                  control={<Checkbox checked={state.start} onChange={() => toggle('start')} />}
                />
              </Box>
              <Box>
                <GroupLabel>Top</GroupLabel>
                <FormControlLabel
                  labelPlacement="top"
                  label="Label"
                  control={<Checkbox checked={state.top} onChange={() => toggle('top')} />}
                />
              </Box>
              <Box>
                <GroupLabel>Bottom</GroupLabel>
                <FormControlLabel
                  labelPlacement="bottom"
                  label="Label"
                  control={<Checkbox checked={state.bottom} onChange={() => toggle('bottom')} />}
                />
              </Box>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Disabled">
            <Stack direction="row" spacing={4}>
              <Box>
                <GroupLabel>Unchecked</GroupLabel>
                <FormControlLabel disabled label="Label" control={<Checkbox />} />
              </Box>
              <Box>
                <GroupLabel>Checked</GroupLabel>
                <FormControlLabel disabled label="Label" control={<Checkbox defaultChecked />} />
              </Box>
            </Stack>
          </MatrixCard>
        </Stack>
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
                      <code>FormControlLabel</code> pairs a control (e.g. a <code>Checkbox</code>) with
                      a text label as a single clickable unit — clicking the label toggles the control
                      too.
                    </>,
                    <>
                      Use <code>end</code>/<code>start</code>/<code>top</code>/<code>bottom</code> to
                      place a single label on one side of the control; there is no <code>dual</code>{' '}
                      placement for Checkbox (that is a Switcher-specific addition).
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
        <Box>
          <SnippetLabel>Label placement</SnippetLabel>
          <CodeBlock code={formControlLabelSnippet} />
        </Box>
      </DocSection>
    </>
  );
}

// ─── Tab 3: FormGroup ───────────────────────────────────────────────────────

function FormGroupTab() {
  const [state, setState] = useState({ email: true, sms: false, push: true, terms: false });
  const toggle = (key: keyof typeof state) => setState((s) => ({ ...s, [key]: !s[key] }));

  return (
    <>
      {/* Visual Preview — left-aligned, fully interactive. Mirrors the
          Figma <FormGroup> | <Checkbox> component set's real variant axis:
          Enabled / Disabled / Error x Checkboxes 3/5. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Enabled / Disabled">
            <Stack direction="row" spacing={6} flexWrap="wrap" alignItems="flex-start">
              <Box>
                <GroupLabel>Enabled</GroupLabel>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={state.email} onChange={() => toggle('email')} />}
                    label="Email notifications"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.sms} onChange={() => toggle('sms')} />}
                    label="SMS notifications"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.push} onChange={() => toggle('push')} />}
                    label="Push notifications"
                  />
                </FormGroup>
              </Box>
              <Box>
                <GroupLabel>Disabled</GroupLabel>
                <FormGroup>
                  <FormControlLabel disabled control={<Checkbox defaultChecked />} label="Email notifications" />
                  <FormControlLabel disabled control={<Checkbox />} label="SMS notifications" />
                  <FormControlLabel disabled control={<Checkbox defaultChecked />} label="Push notifications" />
                </FormGroup>
              </Box>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Error / Required">
            <Box sx={{ maxWidth: 360 }}>
              <GroupLabel>Required, unchecked — validation error</GroupLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.terms}
                      onChange={() => toggle('terms')}
                      color={state.terms ? 'primary' : 'error'}
                    />
                  }
                  label="I agree to the Terms & Conditions"
                />
              </FormGroup>
              {!state.terms && (
                <Typography sx={{ fontSize: 12, color: '#d32f2f', mt: 0.5, ml: 0.5 }}>
                  This field is required.
                </Typography>
              )}
              <Typography sx={{ fontSize: 12.5, lineHeight: 1.6, color: '#9e9e9e', mt: 2 }}>
                There is no dedicated FormGroup-level &quot;error&quot; prop — the error state lives on
                the item itself, matching the real Figma <code>&lt;FormGroup&gt; | &lt;Checkbox&gt;</code>{' '}
                &quot;Error&quot; variant, which is built the same way.
              </Typography>
            </Box>
          </MatrixCard>
        </Stack>
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
                      notification-type checkboxes) under one visual group.
                    </>,
                    'Items get an 8px vertical gap by default — never rely on the group to render items flush against each other.',
                    'A shared Disabled state dims every item in the group uniformly.',
                    'For a required group item (e.g. accepting terms), flip that item\'s own color to "error" and pair it with helper text rather than looking for a group-level error prop.',
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
                    'Each item still exposes its own accessible name via FormControlLabel, so screen readers announce the group as a sequence of independently labeled checkboxes.',
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
          <SnippetLabel>CheckboxGroup</SnippetLabel>
          <CodeBlock code={formGroupSnippet} />
        </Box>
      </DocSection>
    </>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

const TAB_LABELS = ['Checkbox', 'Checkbox+Label', 'CheckboxGroup'] as const;

export default function CheckboxPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <PageHeader
        title="Checkbox"
        description="A binary or tri-state selection control used to select one or more items from a set, or to toggle a single setting on or off. Supports an indeterminate visual state for partial selection in hierarchical lists."
        muiLink="https://mui.com/material-ui/react-checkbox/"
        categoryBadge="Components"
        statusBadge="In Design / In Progress"
      />

      {/* Subcomponent tab navigation — standard pattern for any component
          page with subcomponents (Checkbox owns FormControlLabel and
          FormGroup, mirroring Switcher's tab structure). Tab labels read
          "Checkbox+Label" / "CheckboxGroup" rather than the raw MUI
          component names — the underlying components rendered in each tab
          are still FormControlLabel/FormGroup. Each tab is a dedicated
          view. */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="Checkbox and subcomponents">
          {TAB_LABELS.map((label, i) => (
            <Tab key={label} label={label} id={`checkbox-tab-${i}`} aria-controls={`checkbox-tabpanel-${i}`} />
          ))}
        </Tabs>
      </Box>

      <Box role="tabpanel" hidden={tab !== 0} id="checkbox-tabpanel-0" aria-labelledby="checkbox-tab-0">
        {tab === 0 && <CheckboxTab />}
      </Box>
      <Box role="tabpanel" hidden={tab !== 1} id="checkbox-tabpanel-1" aria-labelledby="checkbox-tab-1">
        {tab === 1 && <FormControlLabelTab />}
      </Box>
      <Box role="tabpanel" hidden={tab !== 2} id="checkbox-tabpanel-2" aria-labelledby="checkbox-tab-2">
        {tab === 2 && <FormGroupTab />}
      </Box>
    </Box>
  );
}
