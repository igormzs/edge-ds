'use client';

import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import {
  PageHeader,
  DocSection,
  PreviewCanvas,
  PreviewGroup,
  CodeBlock,
  PropsTable,
  type PropRow,
} from '@/components/DocUI';

// ─── Shared brand focus/highlight treatment ──────────────────────────────────
// Matches the Figma <Select>/<Autocomplete> component's teal focus ring —
// see docs/DOCUMENTATION_STANDARDS.md and the Autocomplete Figma spec.

const turquoiseSx = {
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#07bebe',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#07bebe',
  },
  // Note: the dropdown listbox scrollbar is hidden globally via
  // `MuiAutocomplete.styleOverrides` in src/theme/brandTheme.ts, not here.
  // The listbox renders inside a Popper portaled to `document.body`, so a
  // scoped `& .MuiAutocomplete-listbox` rule in this component-level `sx`
  // can never reach it — it's not a DOM descendant of this element despite
  // being one in the React tree. Theme styleOverrides apply the class
  // directly to the slot's own DOM node instead, portal or not.
};

// Forces the "focused" look without requiring a real DOM focus event — used
// only for the static States & Interactivity preview cell, same trick the
// Figma canvas uses (the component's State=Focused variant is a static
// visual, not a live event either).
const staticFocusedSx = {
  ...turquoiseSx,
  '& .MuiOutlinedInput-root fieldset': {
    borderColor: '#07bebe',
    borderWidth: '2px',
  },
  '& .MuiInputLabel-root': {
    color: '#07bebe',
  },
};

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

// ─── Section 2 data — generic EDGE-DS option/category naming ────────────────
// (Figma canvas corrected 2026-07-20 to drop the movie-name placeholder data
// in favor of this same Category A/B + Option N pattern.)

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
  { category: 'Category B', label: 'Option 8' },
  { category: 'Category B', label: 'Option 9' },
];

// ─── "Starts open" demo wrapper ──────────────────────────────────────────────
// Used for the Open / Expanded previews (Section 2 and Section 4). Controls
// `open` so the dropdown renders open by default on page load — matching the
// static "Open=True" state captured on the Figma canvas — but stays a real
// controlled component afterward: onOpen/onClose actually flip the state, so
// clicking the arrow toggle or focusing out genuinely collapses it, and
// clicking back in / focusing the field genuinely reopens it. Nothing here
// forces the panel back open after a close.

function StartsOpenAutocomplete({
  label,
  optionsList,
  grouped = false,
  highlightLabel,
  defaultValueLabel,
  forceDownward = false,
}: {
  label: string;
  optionsList: GroupedOption[];
  grouped?: boolean;
  highlightLabel?: string;
  defaultValueLabel?: string;
  // The Grouped/Categorized Options card sits directly under its own
  // section title with a tall 9-option list below it — at a shrunk
  // viewport height, MUI's Popper "flip" modifier (on by default) detects
  // there isn't enough room below and flips the panel to open upward
  // instead, covering the input and the section title above it. This
  // component starts every instance open by default (see above), which
  // makes that flip especially visible/likely compared to a normal
  // click-to-open dropdown. Setting this pins the panel to `bottom-start`
  // and disables the flip modifier so it always expands downward, matching
  // the Figma spec's fixed "Open=True" layout.
  forceDownward?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const defaultValue = defaultValueLabel
    ? optionsList.find((o) => o.label === defaultValueLabel) ?? null
    : null;

  return (
    <Autocomplete
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={optionsList}
      defaultValue={defaultValue}
      getOptionLabel={(option) => option.label}
      groupBy={grouped ? (option) => option.category : undefined}
      sx={turquoiseSx}
      slotProps={
        forceDownward
          ? {
              popper: {
                placement: 'bottom-start',
                modifiers: [
                  {
                    name: 'flip',
                    enabled: false,
                  },
                ],
              },
            }
          : undefined
      }
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          key={option.label}
          sx={
            option.label === highlightLabel
              ? { bgcolor: 'rgba(0,0,0,0.06)' }
              : undefined
          }
        >
          {option.label}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

// ─── Usage snippet ────────────────────────────────────────────────────────

const codeSnippet = `import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

// Basic Usage — single select
<Autocomplete
  options={options}
  renderInput={(params) => (
    <TextField {...params} label="Label" helperText="Choose from the list or type to search" />
  )}
/>

// Multiple Values — Tags / Chips
<Autocomplete
  multiple
  options={options}
  defaultValue={[options[0], options[1]]}
  renderInput={(params) => (
    <TextField {...params} label="Label" helperText="Select one or more options" />
  )}
  renderTags={(value, getTagProps) =>
    value.map((option, index) => (
      <Chip label={option} size="small" {...getTagProps({ index })} key={option} />
    ))
  }
/>

// Grouped / Categorized Options
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
/>

// Sizing & Variants
<Autocomplete size="small" options={options} renderInput={(params) => <TextField {...params} variant="outlined" label="Label" />} />
<Autocomplete size="medium" options={options} renderInput={(params) => <TextField {...params} variant="standard" label="Label" />} />

// States
<Autocomplete disabled options={options} renderInput={(params) => <TextField {...params} label="Label" />} />
<Autocomplete options={options} renderInput={(params) => <TextField {...params} label="Label" error helperText="This field is required" />} />`;

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
    description: 'The selected value. Required when controlled.',
  },
  {
    prop: 'multiple',
    type: 'bool',
    default: 'false',
    description: 'If true, value must be an array and the input renders tags for selections.',
  },
  {
    prop: 'freeSolo',
    type: 'bool',
    default: 'false',
    description: 'If true, the Autocomplete is allowed to accept arbitrary string values outside the predefined option list.',
  },
  {
    prop: 'disabled',
    type: 'bool',
    default: 'false',
    description: 'If true, the component is disabled.',
  },
  {
    prop: 'loading',
    type: 'bool',
    default: 'false',
    description: 'If true, the component shows a progress indicator inside the dropdown panel.',
  },
  {
    prop: 'renderInput',
    type: 'func',
    default: '—',
    description: 'Render the input textfield element.',
  },
];

// ─── States & Interactivity grid column ──────────────────────────────────────
// A fixed 5-column grid (not PreviewCanvas's flex-wrap, which breaks onto a
// second row at medium widths) with every column sharing this exact same
// three-row internal shape: [demo] → [reserved helper-text slot, same
// height whether or not this state has one] → [caption]. Reserving that
// slot on all 5 columns — not just Error/Validation — is what keeps every
// caption on one shared baseline; if only the Error cell grew to fit its
// helper text, its caption alone would sit lower than the other four, which
// was the actual bug (input tops were already aligned — the captions
// weren't).

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
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      {children}
      <Box sx={{ minHeight: 20, width: '100%' }}>
        {helperText ? (
          <Typography
            sx={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: 12,
              color: '#d32f2f',
              textAlign: 'center',
            }}
          >
            {helperText}
          </Typography>
        ) : null}
      </Box>
      <Typography
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: 11,
          color: '#9e9e9e',
          letterSpacing: 0.5,
          textAlign: 'center',
          width: '100%',
        }}
      >
        {caption}
      </Typography>
    </Box>
  );
}

// ─── Specs & Accessibility Notes card ────────────────────────────────────────
// Mirrors the Figma master template's bottom Specs Card: two teal
// sub-headings, each followed by one explanatory paragraph.

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
          color: '#212121',
        }}
      >
        {body}
      </Typography>
    </Box>
  );
}

export default function AutocompletePage() {
  return (
    <Box>
      <PageHeader
        title="Autocomplete"
        description="The autocomplete is a normal text input enhanced by a panel of suggested options. It is useful for setting the value of a single-line textbox in one of two scenarios: the value for the textbox must be chosen from a predefined set of allowed values, or the textbox may contain a custom value, but the user should be offered suggestions."
        muiLink="https://mui.com/material-ui/api/autocomplete/"
      />

      {/* Section 1 — Combo Box & Multiple Values */}
      <DocSection title="Combo Box & Multiple Values">
        <PreviewCanvas>
          <PreviewGroup label="BASIC USAGE — SINGLE SELECT">
            <Box sx={{ width: 300 }}>
              <Autocomplete
                options={options}
                defaultValue="Option 3"
                sx={turquoiseSx}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    helperText="Choose from the list or type to search"
                  />
                )}
              />
            </Box>
          </PreviewGroup>
          <PreviewGroup label="MULTIPLE VALUES — TAGS / CHIPS">
            {/* Chip labels and trailing input text mirror the Figma canvas's
                <Autocomplete> component exactly as built there — matches its
                default un-relabeled tag/value placeholders 1:1. */}
            <Box sx={{ width: 360 }}>
              <Autocomplete
                multiple
                freeSolo
                options={options}
                defaultValue={['Chip', 'Chip']}
                inputValue="Option 1"
                onInputChange={() => {}}
                sx={turquoiseSx}
                renderInput={(params) => (
                  <TextField {...params} label="Assignees" helperText="Select one or more options" />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} size="small" {...getTagProps({ index })} key={`${option}-${index}`} />
                  ))
                }
              />
            </Box>
          </PreviewGroup>
        </PreviewCanvas>
      </DocSection>

      {/* Section 2 — Grouped / Categorized Options */}
      <DocSection title="Grouped / Categorized Options">
        <Typography
          sx={{ fontFamily: '"Open Sans", sans-serif', fontSize: 14, color: '#5e6e7d', mb: 2 }}
        >
          Options are separated by sticky category headers via the <code>groupBy</code> prop —
          shown here open by default with a suggestion highlighted, matching the Figma spec.
        </Typography>
        <PreviewCanvas>
          <Box sx={{ width: 300 }}>
            <StartsOpenAutocomplete
              label="Category"
              optionsList={groupedOptions}
              grouped
              highlightLabel="Option 2"
              forceDownward
            />
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Section 3 — Sizing & Variants */}
      <DocSection title="Sizing & Variants">
        <PreviewCanvas>
          <Stack direction="row" spacing={6} flexWrap="wrap" sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <Typography
                sx={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 600, fontSize: 13, color: '#212121' }}
              >
                OUTLINED VARIANT
              </Typography>
              <PreviewGroup label="Medium (default)">
                <Box sx={{ width: 240 }}>
                  <Autocomplete
                    size="medium"
                    options={options}
                    defaultValue="Option 1"
                    sx={turquoiseSx}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Label" />}
                  />
                </Box>
              </PreviewGroup>
              <PreviewGroup label="Small">
                <Box sx={{ width: 240 }}>
                  <Autocomplete
                    size="small"
                    options={options}
                    defaultValue="Option 1"
                    sx={turquoiseSx}
                    renderInput={(params) => <TextField {...params} variant="outlined" label="Label" />}
                  />
                </Box>
              </PreviewGroup>
            </Stack>
            <Stack spacing={3}>
              <Typography
                sx={{ fontFamily: '"Open Sans", sans-serif', fontWeight: 600, fontSize: 13, color: '#212121' }}
              >
                STANDARD VARIANT
              </Typography>
              <PreviewGroup label="Medium (default)">
                <Box sx={{ width: 240 }}>
                  <Autocomplete
                    size="medium"
                    options={options}
                    defaultValue="Option 1"
                    sx={turquoiseSx}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Label" />}
                  />
                </Box>
              </PreviewGroup>
              <PreviewGroup label="Small">
                <Box sx={{ width: 240 }}>
                  <Autocomplete
                    size="small"
                    options={options}
                    defaultValue="Option 1"
                    sx={turquoiseSx}
                    renderInput={(params) => <TextField {...params} variant="standard" label="Label" />}
                  />
                </Box>
              </PreviewGroup>
            </Stack>
          </Stack>
        </PreviewCanvas>
        <Typography
          sx={{
            fontFamily: '"Open Sans", sans-serif',
            fontSize: 12,
            color: '#9e9e9e',
            mt: 1.5,
          }}
        >
          Note: EDGE-DS currently ships Small and Medium sizes only for &lt;Select&gt;/&lt;Autocomplete&gt;.
          A dedicated Large size token does not yet exist in the system.
        </Typography>
      </DocSection>

      {/* Section 4 — States & Interactivity */}
      <DocSection title="States & Interactivity">
        <PreviewCanvas>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              alignItems: 'flex-start',
              gap: 3,
              width: '100%',
            }}
          >
            <StateColumn caption="DEFAULT / RESTING">
              <Box sx={{ width: '100%' }}>
                <Autocomplete
                  options={options}
                  defaultValue="Option 1"
                  sx={turquoiseSx}
                  renderInput={(params) => <TextField {...params} label="Label" />}
                />
              </Box>
            </StateColumn>
            <StateColumn caption="OPEN / EXPANDED — HIGHLIGHTED SUGGESTION">
              <Box sx={{ width: '100%' }}>
                <StartsOpenAutocomplete
                  label="Option"
                  optionsList={options.map((o) => ({ category: '', label: o }))}
                  highlightLabel="Option 2"
                  defaultValueLabel="Option 1"
                />
              </Box>
            </StateColumn>
            <StateColumn caption="FOCUSED">
              <Box sx={{ width: '100%' }}>
                <Autocomplete
                  options={options}
                  defaultValue="Option 1"
                  sx={staticFocusedSx}
                  renderInput={(params) => <TextField {...params} label="Label" />}
                />
              </Box>
            </StateColumn>
            <StateColumn caption="DISABLED">
              <Box sx={{ width: '100%' }}>
                <Autocomplete
                  options={options}
                  defaultValue="Option 1"
                  disabled
                  sx={turquoiseSx}
                  renderInput={(params) => <TextField {...params} label="Label" />}
                />
              </Box>
            </StateColumn>
            <StateColumn caption="ERROR / VALIDATION" helperText="This field is required">
              <Box sx={{ width: '100%' }}>
                <Autocomplete
                  options={options}
                  defaultValue="Option 1"
                  sx={turquoiseSx}
                  renderInput={(params) => <TextField {...params} label="Label" error />}
                />
              </Box>
            </StateColumn>
          </Box>
        </PreviewCanvas>
      </DocSection>

      {/* Section 5 — Key Props */}
      <DocSection title="Key Props">
        <PropsTable rows={propRows} />
      </DocSection>

      {/* Usage */}
      <DocSection title="Usage">
        <CodeBlock code={codeSnippet} />
      </DocSection>

      {/* Section 6 — Specs & Accessibility Notes */}
      <DocSection title="Specs & Accessibility Notes">
        <PreviewCanvas>
          <Box sx={{ width: '100%' }}>
            <SpecRow
              heading="Geometry & Design Tokens"
              body="Dropdown overlay menu must align with input container width (minimum 240px) with elevated shadow token elevation/3. List items scale as 36px (Dense) or 48px (Standard) vertical height with 12px horizontal padding."
            />
            <SpecRow
              heading="Accessibility & Keyboard Navigation"
              body={
                <>
                  Implements <code>role=&quot;combobox&quot;</code> with <code>aria-expanded</code>,{' '}
                  <code>aria-autocomplete=&quot;list&quot;</code>, and <code>aria-controls</code>. Must
                  support full ARIA-1.2 keyboard controls (Up/Down arrows to navigate options, Enter to
                  select, Escape to close panel, and Backspace to delete tags in multi-select mode).
                </>
              }
            />
          </Box>
        </PreviewCanvas>
      </DocSection>
    </Box>
  );
}
