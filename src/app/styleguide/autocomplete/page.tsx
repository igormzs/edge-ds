'use client';

import React, { useState } from 'react';
import { Autocomplete, TextField, Chip, Box, Typography, Stack, Paper } from '@mui/material';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

// ─── Text formatting helpers ──────────────────────────────────────────────
// Anatomy & Token Architecture, Usage Guidelines, and Accessibility render as
// short paragraphs + bulleted lists instead of one dense flowing block —
// matches the same restructure applied to the Figma Documentation frame
// (docs/figma-component-structure.md §2.3) and every other ratified page
// (Alert, Switcher).

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
// Matches the Alert/Switcher pages exactly — a well-padded card with a
// left-aligned header, replacing the older centered PreviewGroup shape.

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

// A single control + its state caption, with a reserved helper-text slot of
// fixed height so every column's caption lands on the same baseline
// regardless of whether that particular state renders helper text (only
// Error does) — mirrors the same fixed-slot trick used across this page's
// States & Interactivity card.
function StateColumn({
  caption,
  helperText,
  children,
}: {
  caption: string;
  helperText?: string;
  children: React.ReactNode;
}) {
  return (
    // alignItems must stay 'stretch' (the flex default) here — on a
    // column-direction flex box, align-items governs the CROSS axis, which
    // is horizontal. 'flex-start' would size children to content instead
    // of stretching them, which is exactly what shrank the Autocomplete
    // below to ~113px regardless of the `fullWidth` prop on its TextField.
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
      {children}
      <Box sx={{ minHeight: 20, width: '100%' }}>
        {helperText ? (
          <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 12, color: '#d32f2f' }}>
            {helperText}
          </Typography>
        ) : null}
      </Box>
      <Typography
        sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e', letterSpacing: 0.3 }}
      >
        {caption}
      </Typography>
    </Box>
  );
}

// ─── Popper positioning ───────────────────────────────────────────────────
// MUI's Popper enables its `flip` modifier by default, which swaps the
// listbox above the input whenever it detects insufficient space below in
// the viewport — exactly what happens on this page whenever an open panel
// sits near the bottom of the scrollable document. Every Autocomplete below
// opts out of that flip so its dropdown always expands downward, matching
// the intended design regardless of scroll position.
const downwardPopperSlotProps = {
  popper: {
    placement: 'bottom-start' as const,
    modifiers: [{ name: 'flip', enabled: false }],
  },
};

// ─── Demo data ──────────────────────────────────────────────────────────────

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

interface GroupedOption {
  category: string;
  label: string;
}

const groupedOptions: GroupedOption[] = [
  { category: 'Category A', label: 'Option 1' },
  { category: 'Category A', label: 'Option 2' },
  { category: 'Category A', label: 'Option 3' },
  { category: 'Category A', label: 'Option 4' },
  { category: 'Category B', label: 'Option 5' },
  { category: 'Category B', label: 'Option 6' },
  { category: 'Category B', label: 'Option 7' },
];

// ─── "Starts open" demo wrapper ──────────────────────────────────────────
// Used for the Open/Expanded and Grouped/Categorized swatches so the
// dropdown renders open by default on load, matching the static "Open=True"
// state captured on the Figma canvas — but stays a real controlled
// component afterward: onOpen/onClose actually flip the state, so clicking
// the arrow toggle or focusing out genuinely collapses it, and clicking
// back in genuinely reopens it. Unlike the Figma canvas (a static design
// surface that needed manually-reserved vertical space so the dropdown
// wouldn't get clipped, and where the Sizing/States sections had to borrow
// the shared <Select> primitive since the dedicated Autocomplete master has
// no Size/State variant axis of its own — see the Figma Documentation
// frame's visual-richness pass), the web's real MUI <Autocomplete> natively
// supports every one of size/variant/state directly, and its listbox
// renders inside a Popper portaled to `document.body`, so it floats above
// the rest of the page and never pushes surrounding layout around either.

type StartsOpenOption = string | GroupedOption;

function optionLabelOf(option: StartsOpenOption): string {
  return typeof option === 'string' ? option : option.label;
}

function StartsOpenAutocomplete({
  label,
  grouped = false,
  highlightLabel,
}: {
  label: string;
  grouped?: boolean;
  highlightLabel?: string;
}) {
  const [open, setOpen] = useState(true);
  const optionList: StartsOpenOption[] = grouped ? groupedOptions : options;

  return (
    <Autocomplete<StartsOpenOption>
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={optionList}
      defaultValue={optionList[0]}
      getOptionLabel={optionLabelOf}
      slotProps={downwardPopperSlotProps}
      groupBy={grouped ? (option) => (option as GroupedOption).category : undefined}
      renderOption={(props, option) => {
        const label = optionLabelOf(option);
        return (
          <Box
            component="li"
            {...props}
            key={label}
            sx={label === highlightLabel ? { bgcolor: 'rgba(0,0,0,0.06)' } : undefined}
          >
            {label}
          </Box>
        );
      }}
      renderInput={(params) => <TextField {...params} label={label} fullWidth />}
    />
  );
}

// ─── Usage code snippets ──────────────────────────────────────────────────

const basicSnippet = `import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const options = ['Option 1', 'Option 2', 'Option 3'];

<Autocomplete
  options={options}
  renderInput={(params) => <TextField {...params} label="Category" />}
/>`;

const multipleSnippet = `import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

<Autocomplete
  multiple
  options={options}
  defaultValue={[options[0], options[1]]}
  renderInput={(params) => <TextField {...params} label="Assignees" />}
  renderTags={(value, getTagProps) =>
    value.map((option, index) => (
      <Chip label={option} size="small" {...getTagProps({ index })} key={option} />
    ))
  }
/>`;

const groupedSnippet = `import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const groupedOptions = [
  { category: 'Category A', label: 'Option 1' },
  { category: 'Category A', label: 'Option 2' },
  { category: 'Category B', label: 'Option 3' },
  // ...
];

<Autocomplete
  options={groupedOptions}
  groupBy={(option) => option.category}
  getOptionLabel={(option) => option.label}
  renderInput={(params) => <TextField {...params} label="Category" />}
/>`;

const sizingVariantsSnippet = `// variant — passed through to the underlying TextField
<Autocomplete options={options} renderInput={(params) => <TextField {...params} variant="outlined" label="Label" />} />
<Autocomplete options={options} renderInput={(params) => <TextField {...params} variant="standard" label="Label" />} />

// size — 'small' | 'medium', no 'large' in stock MUI or EDGE-DS today
<Autocomplete size="small" options={options} renderInput={(params) => <TextField {...params} label="Label" />} />
<Autocomplete size="medium" options={options} renderInput={(params) => <TextField {...params} label="Label" />} />`;

const statesSnippet = `// disabled
<Autocomplete disabled options={options} renderInput={(params) => <TextField {...params} label="Label" />} />

// error / validation — passed through to the underlying TextField
<Autocomplete options={options} renderInput={(params) => <TextField {...params} label="Label" error helperText="This field is required" />} />

// freeSolo — accept values outside the option list
<Autocomplete freeSolo options={options} renderInput={(params) => <TextField {...params} label="Tag" />} />

// loading — shows a progress indicator in place of the listbox
<Autocomplete loading options={options} renderInput={(params) => <TextField {...params} label="Category" />} />`;

// ─── Key Props ────────────────────────────────────────────────────────────
// Matches the 8-row Key Props table built on the Autocomplete Figma
// Documentation frame's Key Props Rows instance 1:1.

const propRows: PropRow[] = [
  {
    prop: 'options',
    type: 'Array<any>',
    default: '[]',
    description: 'Array of options to display in the dropdown menu.',
  },
  {
    prop: 'value',
    type: 'any',
    default: '—',
    description:
      "The selected value(s); an array when multiple is true. Required in controlled mode — use defaultValue for uncontrolled.",
  },
  {
    prop: 'onChange',
    type: '(event, value) => void',
    default: '—',
    description: 'Callback fired when the selected value changes.',
  },
  {
    prop: 'multiple',
    type: 'boolean',
    default: 'false',
    description: 'If true, value must be an array and the input renders removable tags for each selection.',
  },
  {
    prop: 'freeSolo',
    type: 'boolean',
    default: 'false',
    description: "If true, the input value does not need to match any of the available options.",
  },
  {
    prop: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'If true, shows a loading indicator in the dropdown panel in place of the option list.',
  },
  {
    prop: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'If true, the component is disabled and cannot be interacted with.',
  },
  {
    prop: 'size',
    type: "'small' | 'medium'",
    default: "'medium'",
    description: 'The size of the component.',
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AutocompletePage() {
  return (
    <Box>
      <PageHeader
        title="Autocomplete"
        description="A text input combined with a dropdown list, letting users filter and select from a set of suggested options. Supports single or multiple selection, with selected values in multi-select shown as removable tags."
        muiLink="https://mui.com/material-ui/react-autocomplete/"
        categoryBadge="Components"
        statusBadge="Migrated ✓"
      />

      {/* Visual Preview — four matrix cards, mirroring the four visual
          sections re-introduced on the Figma "Autocomplete - Documentation"
          frame's own visual-richness pass 1:1 (Combo Box & Multiple Values,
          Grouped / Categorized Options, Sizing & Variants, States &
          Interactivity). Every control below is real, live, and
          interactive — there is no Figma-side "borrowed from a different
          master" caveat needed here, since MUI's real <Autocomplete>
          natively supports every size/variant/state shown. */}
      <DocSection title="Visual Preview">
        <Stack spacing={3}>
          <MatrixCard title="Combo Box & Multiple Values">
            <Stack direction="row" spacing={5} flexWrap="wrap" alignItems="flex-start">
              <Box sx={{ width: 260 }}>
                <GroupLabel>Basic Usage — Single Select</GroupLabel>
                <Autocomplete
                  options={options}
                  defaultValue="Option 1"
                  slotProps={downwardPopperSlotProps}
                  renderInput={(params) => <TextField {...params} label="Category" fullWidth />}
                />
              </Box>
              <Box sx={{ width: 320 }}>
                <GroupLabel>Multiple Values — Tags / Chips</GroupLabel>
                <Autocomplete
                  multiple
                  options={options}
                  defaultValue={['Option 1', 'Option 2']}
                  slotProps={downwardPopperSlotProps}
                  renderInput={(params) => <TextField {...params} label="Assignees" fullWidth />}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip label={option} size="small" {...getTagProps({ index })} key={option} />
                    ))
                  }
                />
              </Box>
            </Stack>
          </MatrixCard>

          <MatrixCard title="Grouped / Categorized Options">
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 13, color: '#5e6e7d', mb: 2 }}>
              Options are separated by sticky category headers via the <code>groupBy</code> prop — shown
              here open by default with a suggestion highlighted.
            </Typography>
            <Box sx={{ width: 300 }}>
              <StartsOpenAutocomplete label="Category" grouped highlightLabel="Option 2" />
            </Box>
          </MatrixCard>

          <MatrixCard title="Sizing & Variants">
            <Stack direction="row" spacing={6} flexWrap="wrap">
              <Stack spacing={3}>
                <GroupLabel>Outlined Variant</GroupLabel>
                <Box sx={{ width: 240 }}>
                  <Autocomplete
                    size="medium"
                    options={options}
                    defaultValue="Option 1"
                    slotProps={downwardPopperSlotProps}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Label" fullWidth />}
                  />
                </Box>
                <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e' }}>
                  Medium (default)
                </Typography>
                <Box sx={{ width: 240 }}>
                  <Autocomplete
                    size="small"
                    options={options}
                    defaultValue="Option 1"
                    slotProps={downwardPopperSlotProps}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Label" fullWidth />}
                  />
                </Box>
                <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e' }}>
                  Small
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <GroupLabel>Standard Variant</GroupLabel>
                <Box sx={{ width: 240 }}>
                  <Autocomplete
                    size="medium"
                    options={options}
                    defaultValue="Option 1"
                    slotProps={downwardPopperSlotProps}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Label" fullWidth />}
                  />
                </Box>
                <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e' }}>
                  Medium (default)
                </Typography>
                <Box sx={{ width: 240 }}>
                  <Autocomplete
                    size="small"
                    options={options}
                    defaultValue="Option 1"
                    slotProps={downwardPopperSlotProps}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Label" fullWidth />}
                  />
                </Box>
                <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 11, color: '#9e9e9e' }}>
                  Small
                </Typography>
              </Stack>
            </Stack>
            <Typography sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 12, color: '#9e9e9e', mt: 3 }}>
              Note: EDGE-DS currently ships Small and Medium sizes only for &lt;Select&gt;/&lt;Autocomplete&gt;.
              A dedicated Large size token does not yet exist in the system.
            </Typography>
          </MatrixCard>

          <MatrixCard title="States & Interactivity">
            {/* Fixed 240px-wide columns, not a rigid `1fr` grid — a
                5-column `repeat(5, 1fr)` grid squeezed each Autocomplete
                below the width it needs to render "Option 1" without the
                input ellipsis-truncating its own value text. The deeper
                cause: MUI's Autocomplete root defaults to `display:
                inline-flex` (sized to content), so it never actually
                stretches to fill a wrapping Box's width without `fullWidth`
                on the underlying TextField — every renderInput below passes
                it explicitly for exactly this reason.

                This row must stay single-line (`flexWrap: 'nowrap'`, with
                horizontal scroll as the overflow escape valve) rather than
                wrapping to a second line: the Open/Expanded column's listbox
                is a Popper portaled to `document.body`, so it renders well
                below its own 38px-tall input regardless of what the flex
                layout "thinks" its height is. If a 5th column ever wraps
                onto a second row, it lands directly underneath that
                overflowing listbox and the two visually overlap. */}
            <Stack
              direction="row"
              spacing={3}
              alignItems="flex-start"
              sx={{ flexWrap: 'nowrap', overflowX: 'auto', pb: 1 }}
            >
              <Box sx={{ width: 240, flexShrink: 0 }}>
                <StateColumn caption="DEFAULT / RESTING">
                  <Autocomplete
                    options={options}
                    defaultValue="Option 1"
                    slotProps={downwardPopperSlotProps}
                    renderInput={(params) => <TextField {...params} label="Label" fullWidth />}
                  />
                </StateColumn>
              </Box>
              <Box sx={{ width: 240, flexShrink: 0 }}>
                <StateColumn caption="OPEN / EXPANDED">
                  <StartsOpenAutocomplete label="Option" highlightLabel="Option 2" />
                </StateColumn>
              </Box>
              <Box sx={{ width: 240, flexShrink: 0 }}>
                <StateColumn caption="FOCUSED">
                  {/* A real, genuine DOM focus via autoFocus — not a static
                      CSS trick — so the teal focus ring shown here is exactly
                      what a user sees after clicking in, no sx override
                      needed at all. */}
                  <Autocomplete
                    options={options}
                    defaultValue="Option 1"
                    slotProps={downwardPopperSlotProps}
                    renderInput={(params) => <TextField {...params} label="Label" autoFocus fullWidth />}
                  />
                </StateColumn>
              </Box>
              <Box sx={{ width: 240, flexShrink: 0 }}>
                <StateColumn caption="DISABLED">
                  <Autocomplete
                    options={options}
                    defaultValue="Option 1"
                    disabled
                    slotProps={downwardPopperSlotProps}
                    renderInput={(params) => <TextField {...params} label="Label" fullWidth />}
                  />
                </StateColumn>
              </Box>
              <Box sx={{ width: 240, flexShrink: 0 }}>
                <StateColumn caption="ERROR / VALIDATION" helperText="This field is required">
                  <Autocomplete
                    options={options}
                    defaultValue="Option 1"
                    slotProps={downwardPopperSlotProps}
                    renderInput={(params) => <TextField {...params} label="Label" error fullWidth />}
                  />
                </StateColumn>
              </Box>
            </Stack>
          </MatrixCard>
        </Stack>
      </DocSection>

      {/* Anatomy & Token Architecture — mirrors the Figma Documentation
          frame's Anatomy Paragraph Group + Token Architecture Bullet List
          content 1:1 (docs/figma-component-structure.md §2.3). */}
      <DocSection title="Anatomy & Token Architecture">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Anatomy"
              body={
                <>
                  <Paragraph>
                    <strong>Input</strong> — a text field (built on the shared
                    Select/TextField input primitive) that shows the current value or filter text,
                    with a floating label above.
                  </Paragraph>
                  <Paragraph>
                    <strong>Value / Placeholder</strong> — the current selection&apos;s label, or
                    filter text while typing; placeholder text shows only when both value and any
                    selected tags are empty.
                  </Paragraph>
                  <Paragraph>
                    <strong>Tags</strong> (multi-select only) — <code>Chip</code> instances rendered
                    inline before the input text when <code>multiple</code> is true, each with its
                    own close (&quot;×&quot;) affordance.
                  </Paragraph>
                  <Paragraph>
                    <strong>Clear and Popup Indicators</strong> — a clear (&quot;×&quot;) icon shown
                    once a value or filter text is present, and a dropdown arrow that flips between
                    down (closed) and up (open) to reflect menu state.
                  </Paragraph>
                  <Paragraph sx={{ mb: 0 }}>
                    <strong>Dropdown Listbox</strong> — a Paper-elevated Menu of options anchored
                    directly below the input, visible only while the menu is open.
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
                      Input value and label text reuse the theme&apos;s <code>text.primary</code> and{' '}
                      <code>text.secondary</code> directly — no component-scoped override needed,
                      matching Figma&apos;s <code>Semantic/Text/Primary</code> and{' '}
                      <code>/Secondary</code>.
                    </>,
                    <>
                      Focused input border and floating label: <code>theme.palette.primary.main</code>{' '}
                      (default MUI focus behavior, no custom <code>sx</code> required) — matches
                      Figma&apos;s <code>Semantic/Border/Focus</code> and the new{' '}
                      <code>Components/Autocomplete/Label/Focus</code>, both aliasing{' '}
                      <code>Brand/Primary/500</code>.
                    </>,
                    <>
                      Default (unfocused) input border: <code>theme.palette.divider</code> /
                      MUI&apos;s stock outlined-input border — matches the new{' '}
                      <code>Components/Autocomplete/Border/Default</code> token created during the
                      Figma token migration, aliasing <code>Semantic/Border/Default</code>.
                    </>,
                    <>
                      Dropdown Paper background: <code>theme.palette.background.paper</code>,
                      matching Figma&apos;s <code>Semantic/Surface/Paper</code>.
                    </>,
                    <>
                      Tags reuse Chip&apos;s own theme tokens (<code>MuiChip.colorDefault</code> in{' '}
                      <code>src/theme/brandTheme.ts</code>) unchanged, matching Figma&apos;s{' '}
                      <code>Components/Chip/Default/Filled/*</code>.
                    </>,
                    <>
                      <strong>Known divergence, flagged not silently fixed:</strong> the dropdown
                      arrow and clear icons here currently render in{' '}
                      <code>theme.palette.action.active</code> (brand teal —{' '}
                      <code>colors.edgeTurquoise.active</code>), because that&apos;s MUI&apos;s stock
                      default color for these indicator icons and no override exists yet in{' '}
                      <code>MuiAutocomplete</code>. The Figma spec instead migrated this to a neutral{' '}
                      <code>Semantic/Icon/Default</code> token — created as a literal near-black value
                      (no Brand-tier neutral primitive exists yet in EDGE palette) rather than brand
                      teal. Reconciling the two would be a theme-level change affecting every
                      Autocomplete/Select icon app-wide, not a fix scoped to this doc page, so it is
                      called out here rather than changed unilaterally.
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
          bulleted, mirroring the Figma Documentation frame 1:1. Covers
          single vs. multi-select guidance, keyboard navigation, filtering
          behavior, and ARIA combobox/listbox roles. */}
      <DocSection title="Usage Guidelines & Accessibility">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Usage Guidelines"
              body={
                <BulletList
                  items={[
                    'Use single-select Autocomplete for one value from a list; turn on multiple when users may pick more than one option, shown as removable tags.',
                    'Prefer Autocomplete over a plain Select whenever the option list is long enough that typing to filter is faster than scanning a static menu.',
                    'Keep option labels short and unambiguous; long labels should truncate rather than wrap the input.',
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
                      The input carries <code>role=&quot;combobox&quot;</code> with{' '}
                      <code>aria-expanded</code> reflecting the open state,{' '}
                      <code>aria-haspopup=&quot;listbox&quot;</code>, and <code>aria-controls</code>{' '}
                      pointing at the listbox id.
                    </>,
                    <>
                      The dropdown carries <code>role=&quot;listbox&quot;</code> with each option as{' '}
                      <code>role=&quot;option&quot;</code> and <code>aria-selected</code> set on the
                      current value(s).
                    </>,
                    <>
                      <strong>Keyboard</strong>: Arrow Up/Down move the active option, Enter selects
                      it, and Escape closes the menu and returns focus to the input without changing
                      the value.
                    </>,
                    <>
                      <strong>Filtering</strong>: happens as the user types; the highlighted option
                      updates to the first match and is announced via{' '}
                      <code>aria-activedescendant</code>.
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
        <PropsTable rows={propRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <Stack spacing={3}>
          <Box>
            <SnippetLabel>Basic usage — single select</SnippetLabel>
            <CodeBlock code={basicSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Multiple values — tags / chips</SnippetLabel>
            <CodeBlock code={multipleSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Grouped / categorized options</SnippetLabel>
            <CodeBlock code={groupedSnippet} />
          </Box>
          <Box>
            <SnippetLabel>Sizing & variants</SnippetLabel>
            <CodeBlock code={sizingVariantsSnippet} />
          </Box>
          <Box>
            <SnippetLabel>States — disabled, error, freeSolo, loading</SnippetLabel>
            <CodeBlock code={statesSnippet} />
          </Box>
        </Stack>
      </DocSection>
    </Box>
  );
}
